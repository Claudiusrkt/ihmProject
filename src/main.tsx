import ReactDOM from "react-dom/client";
import App from "./app";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/icons/css/all.min.css";
import "./styles/global.scss";
import ClientObj from "./fetch/client";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement as HTMLElement);

const Test = () => {
    function runTest() {
        const client = new ClientObj();
        console.log("Test initialised");
    }
    return (
        <button className="btn btn-primary" onClick={() => { runTest() }}>Test</button>
    );
}

root.render(<App />);
// root.render(<Test />);