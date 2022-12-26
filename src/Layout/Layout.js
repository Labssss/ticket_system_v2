import React, {useContext} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Header from "./Header/Header";
import Home from '../pages/Home/Home';
// import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";
import AdminPanel from "../pages/AdminPanel/AdminPanel";
import Registration from "../pages/Registration/Registration";
// import Profile from "../pages/Profile/Profile"
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
                {isLogged && role === 'ADMIN' && <Route path='/adminpanel' element={<AdminPanel/>}/>}
                {/* <Route path='/login' element={<Login/>}/> */}
                {/* {user.email !== 'admin@mail.ru' ? <Route path='/' element={<Home/>}/> : ''}
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/profile' element={<Profile/>}/>
                {user.email === 'admin@mail.ru' ? <Route path='/*' element={<AdminPanel/>}/> : ''}
                <Route path='/*' element={<NotFound/>}/> */}
            </Routes>
        </div>
    );
};

export default Layout;