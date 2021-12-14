import React from "react";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    submit() {
        fetch("/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                    });
                }
            });
    }

    render() {
        return (
            <>
                <div id="login-container">
                    <div id="login-right">
                        <img src="./img/1.jpeg"></img>

                        {/* <img src="./img/2.jpeg"></img> */}
                    </div>
                    <div id="login-box">
                        <h2>Z-lab</h2>
                        {this.state.error && (
                            <div className="error">
                                Oops!Somenthing wrong, please try again
                            </div>
                        )}

                        <input
                            type="email"
                            name="email"
                            onChange={(e) => this.handleChange(e)}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            name="password"
                            onChange={(e) => this.handleChange(e)}
                            placeholder="Password"
                        />
                        <button onClick={() => this.submit()}>log in</button>

                        <p>
                            Forgot password ?{" "}
                            <Link to="/reset-password">click here</Link> to
                            reset your password
                        </p>
                    </div>
                </div>
            </>
        );
    }
}
