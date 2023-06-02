import { createBrowserRouter } from "react-router-dom";
import Hello from "./screens/Hello";

const routes = createBrowserRouter([{ path: "/", element: <Hello /> }]);

export default routes;
