import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/Auth/AuthPage";
import SignUpPage from "../pages/Auth/SignUpPage";
import MyPage from "../pages/Auth/MyPage";
import App from "../App";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/home/*",
		element: <HomePage />,
	},
	{
		path: "/login",
		element: <AuthPage />,
	},
	{
		path: "/sign_up",
		element: <SignUpPage />,
	},
]);

export default router;
