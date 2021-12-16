import { useState, useEffect } from "react";
import { shallowEqual } from "react-redux";
import { useParams } from "react-router-dom";
import Navibar from "./navibar.js";

export default function ModelProfile() {
    const [models, setModels] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`/models/${id}.json`)
            .then((res) => res.json())
            .then((results) => {
                setModels(results);
            });
    }, []);

    return (
        <>
            <Navibar />
            <div id="profile-page">
                <div className="profile-text">
                    <h1>
                        {models.first_name} {models.last_name}
                    </h1>
                    <h4>Gender:{models.gender}</h4>
                    <h4>Height: {models.height}</h4>
                    <h4>Eye color: {models.eye_color}</h4>
                    <h4>Hair color:{models.hair_color}</h4>
                    <h4>Waist:{models.waist}</h4>
                    <h4>Bust: {models.bust}</h4>
                    <h4>Hips:{models.hips}</h4>
                </div>

                <div className="model-profile">
                    {models.images &&
                        models.images
                            .split(",")
                            .map((img) => (
                                <img
                                    key={img}
                                    className="picture"
                                    src={img.slice(1)}
                                />
                            ))}
                </div>
            </div>
        </>
    );
}
