import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.jsx";
import ReduxProvider from "./redux/ReduxProvider.jsx";

createRoot(document.getElementById("root")).render(
  <ReduxProvider>
    <RouterProvider router={router} />
  </ReduxProvider>
);
