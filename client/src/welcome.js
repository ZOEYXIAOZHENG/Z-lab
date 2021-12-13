import { Route } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import Login from "./login.js";

export default function Welcome() {
    return (
        <>
            <div id="base-text">
                <h1>Z-LAB</h1>
                <h2>Professional Model Searching Engine</h2>
            </div>
            {/* <video playsInline autoPlay muted loop id="Video">
                <source src="./home-base.mp4" type="video/mp4" />
            </video> */}
            <img id="Video" src="./video.gif" />
            <div className="arrow-down">
                <img src="./arrow-down.gif" />
            </div>

            <BrowserRouter>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Link className="welcome" to="/login">Login</Link>
            </BrowserRouter>
        </>
    );
}
