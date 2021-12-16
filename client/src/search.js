import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navibar from "./navibar.js";

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setFile = this.setFile.bind(this);
        this.upload = this.upload.bind(this);
    }

    setFile(e) {
        this.setState(
            {
                file: e.target.files[0],
            },
            () => console.log("setFile state:", this.state)
        );
    }
    upload() {
        console.log(this.state.file);
        console.log("🟡 upload state 🟡:", this.state);
        const formData = new FormData();
        formData.append("file", this.state.file);

        this.setState({ uploading: true });

        fetch("/search", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                if (!resp.success) {
                    this.setState({ error: true, match: null, url: resp.url });
                } else {
                    this.setState({
                        error: false,
                        match: resp.data,
                        url: resp.url,
                    });
                }
            })
            .then(() => {
                if (this.state.match) {
                    fetch("/getModel", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(this.state.match),
                    })
                        .then((res) => {
                            return res.json();
                        })
                        .then((respx) => {
                            this.setState({ models: respx });
                            console.log("state after:", this.state);
                        })
                        .catch((err) => {
                            console.log(
                                "ERR in fetching pictures from server:",
                                err
                            );
                        });
                }
            })
            .catch((err) => {
                console.log("ERR in fetching pictures from server:", err);
            });
    }

    render() {
        return (
            <>
                <Navibar />
                <div id="ai-page">
                    <div className="uploader-box">
                        <h2 onClick={this.props.toggleUploader}>
                            upload here the face you are looking for?
                        </h2>
                        <input
                            id="button"
                            name="file"
                            type="file"
                            accept="image/*"
                            onChange={this.setFile}
                        />
                        <button onClick={this.upload}>Upload</button>

                        {/* <div
                            onClick={this.props.toggleUploader}
                            className="close"
                        ></div> */}

                        {this.state && this.state.error && (
                            <h4>
                                Sorry, cannot match a result, please try another
                                picture. Notice: file limit 2MB.{" "}
                            </h4>
                        )}
                        {!this.state.url && this.state.uploading && (
                            <img src="./img/loading.gif" />
                        )}
                        <img src={this.state.url} className="uploaded_image" />
                    </div>
                    <div className="match-board">
                        {this.state &&
                            !this.state.error &&
                            this.state.models &&
                            this.state.models.map((each) => (
                                <div key={each.id} className="match-result">
                                    <Link
                                        to={"models/" + each.id}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="match_models">
                                            <img src={each.match_picture} />
                                        </div>
                                    </Link>
                                    <a
                                        href={each.agency_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {" "}
                                        Agency Link{" "}
                                    </a>
                                </div>
                            ))}
                    </div>
                </div>
            </>
        );
    }
}
