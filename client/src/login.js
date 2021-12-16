import useForm from "./hooks/use-form.js";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/users/slice.js";
import { useState } from "react";

export default function Login() {
    const [error, setError] = useState(false);
    const [userInput, handleChange] = useForm();
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => {
        return state.loggedInUser;
    });
    const history = useHistory();
    const submit = (e) => {
        console.log("subit coming in: ", userInput);
        console.log("event:", e);
        e.preventDefault(); // we need to prevent the default or else the form tag will automatically force request (& reload)
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success) {
                    dispatch(login());
                    history.push("/models");
                } else {
                    setError(true);
                }
            });
    };
    return (
        <>
            <div id="login-container">
                <div id="login-right">
                    <img src="./img/1.jpeg"></img>

                    {/* <img src="./img/2.jpeg"></img> */}
                </div>
                <div id="login-box">
                    <h2>Z-Lab</h2>
                    {error && (
                        <div className="error">
                            Oops!Somenthing wrong, please try again
                        </div>
                    )}

                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Password"
                    />
                    <button onClick={submit}>log in</button>

                    <p>
                        Forgot password ?{" "}
                        <Link to="/reset-password">click here</Link> to reset
                        your password
                    </p>
                    <Link to="/"> Back </Link>
                </div>
            </div>
        </>
    );
}
