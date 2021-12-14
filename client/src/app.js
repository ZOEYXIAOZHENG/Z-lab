import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Login from "./login.js";
import Welcome from "./welcome.js";
import ResetPassword from "./reset.js";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/">
                    <Welcome />
                </Route>
                <Route exact path="/reset-password">
                    <ResetPassword />
                </Route>
            </BrowserRouter>
        </>
    );
}
