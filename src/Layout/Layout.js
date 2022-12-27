import React, {useContext} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Header from "./Header/Header";
import Home from '../pages/Home/Home';
import Tickets from '../pages/Tickets/Tickets';
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import {CustomContext} from "../Context";

const Layout = () => {
    const location = useLocation();
    const {user, role, isLogged} = useContext(CustomContext);
    return (
        <div>

            {
                location.pathname !== '/login' && location.pathname !== '/registration' ? <Header/> : ''
            }

            <Routes>
                <Route path='/' element={<Home/>}/>
                {!isLogged && <Route path='/login' element={<Login/>}/>}
                {!isLogged && <Route path='/registration' element={<Registration/>}/>}
                {isLogged && role === 'USER' && <Route path='/tickets' element={<Tickets/>}/>}
                <Route path='/*' element={<NotFound/>}/>
            </Routes>
        </div>
    );
};

export default Layout;