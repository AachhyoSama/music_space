import React from "react";
import { render } from "react-dom";
import HomePage from "./Home";

function App() {
    return (
        <div className="center">
            <HomePage />
        </div>
    );
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);

export default App;
