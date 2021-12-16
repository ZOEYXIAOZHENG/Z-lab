export default function usersReducer(loggedInUser = null, action) {
    if (action.type == "users/login") {
        loggedInUser = action.payload.loggedInUser;
    }
    return loggedInUser;
}

export function login() {
    return {
        type: "users/login",
        payload: { loggedInUser: true },
    };
}
