import React, {useContext} from 'react';
import {CustomContext} from "../../Context";
import {Link} from "react-router-dom"
import { CreateTicket } from '../../components/createTicket';


const Home = () => {
    const {isLogged, user} = useContext(CustomContext);

    return (
        <>
            {!isLogged
            ?
            <div className="text-center bg-gray-50 text-gray-800 py-20 px-6">
                <h1 className="text-5xl font-bold mt-0 mb-6">Желаете обратиться с службу поддержи?</h1>
                <h3 className="text-3xl font-bold mb-8">Войдите в систему, чтобы оставить заявку</h3>
                <Link to='/login' className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>Войти</Link>
            </div>
            :
            <>
            <div className="text-center bg-gray-50 text-gray-800 py-20 px-6">
                <h1 className="text-5xl font-bold mt-0 mb-6">Добро пожаловать в техническую поддержку</h1>
            </div>
            <CreateTicket/>
            </>
            }
        </> 
    );
};

export default Home;