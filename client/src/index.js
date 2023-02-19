import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="152812959243-qfv61rga5qkv70r8oov32lee1t1qmn60.apps.googleusercontent.com">
    <BrowserRouter>
      <App />{" "}
      {/* The various pages will be displayed by the `Main` component. */}
    </BrowserRouter>
  </GoogleOAuthProvider>
);
