import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navibar from "./navibar.js";
import { useSelector } from "react-redux";

export default function Models() {
    const [models, setModels] = useState([]);
    const loggedInUser = useSelector((state) => {
        return state.loggedInUser;
    });

    useEffect(() => {
        console.log("💛FindPeople component mounted!!");
        fetch(`/models.json`, { method: "GET" })
            .then((response) => response.json())
            .then((results) => {
                setModels(results);
            });
    }, []);
    if (loggedInUser) {
        return (
            <>
                <Navibar />
                <h2> News faces:</h2>
                <div id="models-base">
                    {models.map((each) => (
                        <div key={each.id} className="models">
                            <Link to={`/models/${each.id}`}>
                                <h4>
                                    ▼ {each.first_name} {each.last_name}
                                </h4>
                                <img
                                    className="profile_picture"
                                    src={each.profile_picture}
                                    alt={`${each.first_name} ${each.last_name}`}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </>
        );
    } else {
        return (
            <>
                <h1> PLEASE LOG IN </h1>
                <Link to="/login">login</Link>
            </>
        );
    }
}
