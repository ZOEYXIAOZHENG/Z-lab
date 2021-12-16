import ReactDOM from "react-dom";
import App from "./app.js";
import reducer from "../redux/reducer.js";
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

console.log("Cookies GET💡 then render main");
const app = (
    <Provider store={store}>
        <App />
    </Provider>
);
ReactDOM.render(app, document.querySelector("main"));
