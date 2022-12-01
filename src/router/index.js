import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import App from "../App";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/home",
		element: <HomePage />,
	},
	{
		path: "/login",
		element: <AuthPage />,
	},
]);

export default router;
