import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import LinearProgress from "@material-ui/core/LinearProgress";
import './reset.css'
export const App = (props) => {
    const {token,login,logout,userId, ready} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);
    if(!ready){
        return <LinearProgress color="secondary" />
    }

    return(
        <AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated}}>
            <Router>
                {isAuthenticated && <Navbar/>}
                {routes}
            </Router>
        </AuthContext.Provider>
    )
}


