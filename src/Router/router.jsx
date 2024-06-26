import { createBrowserRouter } from "react-router-dom";
import Home from "../Page/Home";
import Login from "../Page/Login";
import Signup from "../Page/Signup";
import About from "../Page/About";
import Message from "../Page/Message";
import MainLayout from "../Layout/MainLayout";
import ThumbleDetails from "../Page/ThumbleDetails";
import Media from "../Page/Media";
import PrivateRoute from "./PrivateRoute";
import LoginSuccess from "../Page/LoginSuccess";
import LoginFailed from "../Page/LoginFailed";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/home",
                element: <Home />
            },                           
            {
                path: "/photo/:id",
                element: <PrivateRoute> <ThumbleDetails /></PrivateRoute>
            },                           
            {
                path: "/login",
                element: <Login />
            },         
            {
                path: "/login/success",
                element: <LoginSuccess />
            },         
            {
                path: "/login/failed",
                element: <LoginFailed />
            },         
            {
                path: "/signup",
                element: <Signup />
            },         
            {
                path: "/about",
                element: <About />
            },         
            {
                path: "/media",
                element: <Media />
            },         
            {
                path: "/message",
                element: <Message />
            },         
        ]
    }
    
])

export default router