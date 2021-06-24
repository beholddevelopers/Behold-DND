import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

document.addEventListener("keydown", (e) => { if(e.key == "F5") location.reload(); });

ReactDOM.render(<App name="test" />, document.getElementById("root"));