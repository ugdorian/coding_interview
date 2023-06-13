import { createBrowserRouter } from "react-router-dom";
import Hello from "./screens/Hello";
import AddUser from "./screens/AddUser";
import Posts from "./screens/Posts"

const routes = createBrowserRouter([
    { path: "/", element: <Hello /> },
    { path: "/add_user", element: <AddUser /> },
    { path: "/posts", element: <Posts /> },
]);

export default routes;