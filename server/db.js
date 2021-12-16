const spicedPg = require("spiced-pg");
const bcrypt = require("bcryptjs");

const db = spicedPg(
    process.env.DATABASE_URL || "postgres:postgres:postgres@localhost/zlab"
);

module.exports.hashPassword = (plainTextPassword) => {
    return new Promise(function (resolve, reject) {
        bcrypt.genSalt(function (err, salt) {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(plainTextPassword, salt, function (err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
};

module.exports.showHashPw = (email) => {
    return db
        .query(`SELECT password FROM users WHERE email = $1`, [email])
        .then(function (result) {
            return result.rows[0] && result.rows[0].password;
        })
        .catch(function (err) {
            console.log(err);
        });
};

module.exports.checkPassword = (
    textEnteredInLoginForm,
    hashedPasswordFromDatabase
) => {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(
            textEnteredInLoginForm,
            hashedPasswordFromDatabase,
            function (err, doesMatch) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doesMatch);
                }
            }
        );
    });
};

module.exports.getLoginId = (email) => {
    console.log(email);
    return db
        .query(`SELECT id FROM users WHERE email = $1`, [email])
        .then(function (result) {
            return result.rows[0].id;
        });
};

module.exports.storeCode = (email, code) => {
    return db.query(
        `INSERT INTO otp (email, code)
               VALUES($1, $2)
               ON CONFLICT (email) DO UPDATE 
               SET code = $2`,
        [email, code]
    );
};

module.exports.verifyResetCode = (code, email) => {
    const q = `SELECT * FROM otp
                WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
                AND code = $1
                AND email = $2
                ORDER BY created_at ASC
                LIMIT 1`;
    const params = [code, email];
    return db.query(q, params);
};

module.exports.updatePassword = (hashedPassword, email) => {
    const q = `UPDATE users 
                SET password = $1
                WHERE email = $2`;
    const params = [hashedPassword, email];
    return db.query(q, params);
};

module.exports.confirmUser = (email) => {
    const q = `SELECT email FROM users
                WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.getModels = () => {
    const q = `SELECT * FROM MODELS ORDER BY RANDOM() LIMIT 12;`;
    return db.query(q);
};

module.exports.getModelById = (id) => {
    const q = `SELECT * FROM MODELS WHERE id = $1`;
    const params = [id];
    return db.query(q, params);
};

module.exports.getModelByAgencyProfile = (agency_profile) => {
    const q = `select id, c.agency_url
from models c
join (
  values
    ($1,1),
    ($2,2),
    ($3,3)
) x (agency_url, ordering) on c.agency_url = x.agency_url
order by x.ordering`;
    const params = [...agency_profile];
    return db.query(q, params).catch((err) => console.log(err));
};
