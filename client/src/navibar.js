import { Link } from "react-router-dom";

const Navibar = () => {
    return (
        <div className="navibar">
            <Link to="/"> Z-LAB </Link>

            <Link to="/search">AI SEARCH</Link>

            <Link to="/models">MODELS</Link>

            <a href="/logout">LOGOUT</a>

            <Link to="/join">JOIN</Link>
        </div>
    );
};
export default Navibar;
