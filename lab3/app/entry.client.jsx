import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import App from "./root";
import "./firebase";

const router = createBrowserRouter([
    {
        path: "*",
        element: <App />,
    },
]);

hydrateRoot(
    document,
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
); 