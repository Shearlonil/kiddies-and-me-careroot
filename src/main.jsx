import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./Styles/GlobalStyles.js";
import { AuthProvider } from "./app-context/auth-user-context.js";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <GlobalStyle />
                <App />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);
