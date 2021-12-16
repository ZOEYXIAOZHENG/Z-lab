import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Login from "./login.js";
import Welcome from "./welcome.js";

import ResetPassword from "./reset.js";
import Models from "./models.js";
import ModelProfile from "./model_profile.js";
import Search from "./search.js";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Route exact path="/">
                    <Welcome />
                </Route>
                <Route exact path="/reset-password">
                    <ResetPassword />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                {/* /* <Route>
                    <Navibar />
                </Route> */}
                <Route exact path="/models">
                    <Models />
                </Route>
                <Route path="/models/:id">
                    <ModelProfile />
                </Route>
                <Route exact path="/search">
                    <Search />
                </Route>
            </BrowserRouter>
        </>
    );
}
