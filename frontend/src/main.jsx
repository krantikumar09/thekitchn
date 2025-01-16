import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./output.css";
import App from "./App.jsx";
import StoreContextProvided from "./context/StoreContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContextProvided>
      <App />
    </StoreContextProvided>
  </BrowserRouter>
);
