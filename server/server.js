const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db.js");
const multer = require("multer");

const uidSafe = require("uid-safe");
const cookieSession = require("cookie-session");
const cryptoRandomString = require("crypto-random-string");
const s3 = require("./s3.js");

const server = require("http").Server(app);

//------------------------------ STATIC FILES -------------------------------

const { sendEmail } = require("./ses.js");

const COOKIE_SECRET =
    process.env.COOKIE_SECRET || require("./secrets.json").COOKIE_SECRET;

//------------------------------- MIDDLEWARE ----------------------------------

app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
const cookieSessionMiddleware = cookieSession({
    secret: COOKIE_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 90,
    sameSite: true, // Web security --- to against CSRF
});
app.use(cookieSessionMiddleware);
app.use((req, res, next) => {
    res.setHeader("x-frame-options", "deny");
    console.log(req.url);
    console.log(req.session);
    next();
});

// Parses url-encoded request bodies + makes them available as "req.body".
app.use(require("body-parser").urlencoded({ extended: false }));

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 10097152,
    },
});

//--------------------------------  ROUTE  -------------------------------

app.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});

// --------------------------------  login --------------------------------

app.post("/login", (req, res) => {
    db.showHashPw(req.body.email)
        .then((userPw) => {
            if (!userPw) {
                return res.json({ success: false });
            } else {
                return db.checkPassword(req.body.password, userPw);
            }
        })
        .then((doesMatch) => {
            if (doesMatch) {
                db.getLoginId(req.body.email).then((id) => {
                    // req.session.userId = id;
                    return res.json({ success: true });
                });
            } else {
                return res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("err on POST Login:", err);
            return res.json({ success: false });
        });
});

// -------------------------------- Reset-Password --------------------------------

app.post("/password/reset/start", (req, res) => {
    console.log("lalalalal!!!!!");
    const code = cryptoRandomString({
        length: 6,
    });
    let { email } = req.body;
    db.confirmUser(email)
        .then((data) => {
            if (data.rows.length > 0) {
                db.storeCode(email, code).then(() => {
                    sendEmail(
                        email,
                        "Reset Password",
                        "This is one-time code to reset your password\n" +
                            "Please reset your password with this code\n" +
                            `${code}\nThis code will expire in 10 minutes.`
                    );
                });
                return res.json({ success: true });
            } else {
                return res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("err in POST confirmUser", err);
        });
});

app.post("/password/reset/verify", (req, res) => {
    let { email, newPass, code } = req.body;
    db.verifyResetCode(code, email)
        .then((data) => {
            console.log("data.rows[0].code", data.rows[0].code);
            if (data.rows[0].code === code) {
                db.hashPassword(newPass)
                    .then((hashedPassword) => {
                        return db.updatePassword(hashedPassword, email);
                    })
                    .then(() => {
                        res.json({ success: true });
                    })
                    .catch((err) => {
                        console.log("err in POST ResetPassword", err);
                        res.json({ error: true });
                    });
            }
        })
        .catch((err) => {
            console.log("err in verifyResetCode", err);
            res.json({ error: true });
        });
});

// -----------------------------  Models Profile  -----------------------------

app.get("/models.json", (req, res) => {
    db.getModels()
        .then((result) => {
            return res.json(result.rows);
        })
        .catch((err) => {
            console.log("err on POST models.json:", err);
        });
});

app.get("/models/:id.json", (req, res) => {
    db.getModelById(req.params.id)
        .then((result) => {
            console.log("hello");
            console.log(result.rows);
            return res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log("err on POST models/:id.json:", err);
        });
});

app.post("/search", uploader.single("file"), s3.upload, (req, res) => {
    console.log("req.file", req.file);
    const url = `https://s3.amazonaws.com/spicedling/${req.file.filename}`;
    // console.log(fs.createReadStream(req.file.path));
    if (req.file.path) {
        let dataToSend;
        const PythonShell = require("python-shell").PythonShell;
        let options = {
            mode: "json",
            pythonOptions: ["-u"], // get print results in real-time
            args: [req.file.path],
        };
        let pyshell = new PythonShell(
            "/Users/zoey/Spiced/Z-lab/server/zlab.py",
            options
        );
        pyshell.on("message", function (message) {
            // received a message sent from the Python script (a simple "print" statement)
            dataToSend = message;
        });
        pyshell.end(function (err, code, signal) {
            if (err) {
                res.json({ success: false, url: url });
                console.log("cannot find a match");
            } else {
                res.json({ success: true, data: dataToSend, url: url });
                console.log("The exit code was: " + code);
                console.log("The exit signal was: " + signal);
                console.log("finished");
            }
        });

        //     .then(({ rows }) => res.json(rows[0]))
        //     .catch((err) => console.log("error on UPLOAD ProfilePic:", err));
    } else {
        res.sendStatus(500);
    }
});

app.post("/getModel", (req, res) => {
    console.log(req.body);
    db.getModelByAgencyProfile(req.body.agency_url).then((result) => {
        let resp = [];
        for (var i in result.rows) {
            for (let j = 0; j < 3; j++) {
                if (req.body.agency_url[j] == result.rows[i].agency_url) {
                    resp.push({
                        id: result.rows[i].id,
                        agency_url: result.rows[i].agency_url,
                        match_picture: req.body.match_pictures[j],
                    });
                }
            }
        }
        res.json(resp);
    });
});

// --------------------------------  logout  ----------------------------------

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
