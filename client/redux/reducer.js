import { combineReducers } from "redux";
import usersReducer from "./users/slice.js";

const rootReducer = combineReducers({
    loggedInUser: usersReducer,
});

export default rootReducer;
