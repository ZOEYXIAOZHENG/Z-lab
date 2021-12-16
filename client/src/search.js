import { Component } from "react";
import { Link } from "react-router-dom";

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {}; // avoid copying props into state! This is a common mistake.this.setFile = this.setFile.bind(this);
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

        fetch("/search", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                this.setState({ match: resp });
            })
            .then(() => {
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
            })
            .catch((err) => {
                console.log("ERR in fetching pictures from server:", err);
            });
    }

    render() {
        return (
            <>
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

                    <div
                        onClick={this.props.toggleUploader}
                        className="close"
                    ></div>
                </div>
                {this.state &&
                    this.state.models &&
                    this.state.models.map((each) => (
                        <div key={each.id}>
                            <Link
                                to={"models/" + each.id}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="match_result">
                                    <img src={each.match_picture} />
                                </div>
                            </Link>
                            <a href={each.agency_url}> Agency Link </a>
                        </div>
                    ))}
            </>
        );
    }
}
