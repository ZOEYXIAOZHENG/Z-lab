// import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import News from "./news.js";

export default function Welcome() {
    return (
        <>
            {/* <BrowserRouter> */}
            <div id="base-text">
                <h1>Z-LAB</h1>
                <h2>Professional AI Model Searching Engine</h2>
            </div>
            <img id="Video" src="./img/video.gif" />
            <div className="arrow-down">
                <img src="./img/arrow-down.gif" />
            </div>
            <Link className="welcome" to="/login">
                Login
            </Link>
            <div id="board">
                <div className="about-us">
                    <h1>About us</h1>
                    <h4>
                        With our professional AI model searching engine you will
                        find the ideal model for your next advertising campaign.
                        We help you with the search as a tech casting agency, as
                        well as with the quick selection of models. Fashion,
                        Advertising, Casting, Trade Show and Magazine. We
                        guarantee your shootings / your productions quality on a
                        high level – day by day. With Z-Lab, the model
                        management, you always get fast, carefree and
                        uncomplicated your model selection. Write us your wishes
                        at any time.
                    </h4>
                    <h3>
                        “ Z-Lab unveils key facial features through machine
                        learning on a database of models. ”
                    </h3>
                    <div className="ai-img">
                        <img
                            src="./img/ai-face.gif"
                            alt="ai-tech picture"
                        ></img>
                    </div>

                    <h1>Technology</h1>
                    <h4>
                        Z-Lab optimizes conversion and click through rate by
                        leveraging data and machine learning on a global
                        database of models. With computer vision, Z-Lab unveils
                        key facial features and identifies the ideal model,
                        matching client to the perfect fit via their global
                        marketplace for models. Z-Lab is the ultimate system to
                        build smartness scaleanddiversity into e-commerce,
                        advertising, and brand communication. Our mission is to
                        deliver outstanding technology that helps customers to
                        find models in an effective way saving them time and
                        increasing revenues.
                    </h4>

                    <div className="lab-img">
                        <img src="./img/3.jpeg"></img>
                    </div>
                </div>
                <div className="news">
                    <header></header>
                    <h2>NEWS</h2>

                    <News />

                    <div id="contact">
                        <img
                            src="./img/media.png"
                            alt="Twiiter/Instagram/Youtube"
                        ></img>
                    </div>
                    <footer>Zheng Xiao Copyright reserved 2021</footer>
                </div>
            </div>
            {/* </BrowserRouter> */}
        </>
    );
}
