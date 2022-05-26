import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./models";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App store={store} />
	</React.StrictMode>
);
