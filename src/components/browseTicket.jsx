import { useContext, useState } from 'react';
import {CustomContext} from "../Context";

export function BrowseTicket(props) {
    const {user} = useContext(CustomContext);

    const confirmHandler = async (event) => {
        await fetch(`http://localhost:3001/api/tickets/all/${props.data.id}?confirm=true`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then(response => {
            return response.json();
        })
        .then((data) => {
            props.onConfirm(data)
        })
    }

    function formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            minutes = d.getMinutes(),
            hours = d.getHours()
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        if (minutes.length < 2) 
            minutes = '0' + minutes;
    
        return [day, month, year].join('/') + ' ' +[hours, minutes].join(':');
    }

    return (
        <>
            <div className="modal-body text-start p-4">
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{`Тема: ${props.data.title}`}</h5>
                <p className="text-gray-700 text-base mb-2 font-medium">Имя Фамилия: {<span className='font-normal'>{props.data.firstname} {props.data.lastname}</span>}</p>
                <p className="text-gray-700 text-base mb-2 font-medium">Сообщение: {<span className='font-normal'>{props.data.message}</span>}</p>
                <p className="text-gray-700 text-base mb-2 font-medium">Дата обращения: {<span className='font-normal'>{formatDate(props.data.created_at)}</span>}</p>
                <p className="text-gray-700 text-base mb-2 font-medium">Email: {<span className='font-normal'>{props.data.email}</span>}</p>
                <p className="text-gray-700 text-base mb-2 font-medium">Номер телефона: {<span className='font-normal'>{props.data.phone}</span>}</p>
                <p className="text-gray-700 text-base mb-2 font-medium flex">Обратная связь:
                {
                props.data.feedbacktype === "email" ? 
                <a href="" className='pl-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="w-5 h-5 text-[#ea4335]"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
                </a>
                : props.data.feedbacktype === "whatsapp" ?
                <a href='' className='pl-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-7 h-7 text-[#128c7e]"><path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                </a>
                : 
                <a className='pl-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                </a>
                }
                </p>
                <p className="text-gray-700 text-base mb-2 font-medium">Статус: {<span className={`font-normal ${props.data.status === 'ОТКРЫТА' ? 'text-orange-300' : props.data.status === 'ОТМЕНЕНА' ? 'text-gray-400': props.data.status === 'РЕШЕНА' ? 'text-green-600' : ''}`}>{props.data.status}</span>}</p>

            </div>
            <div
                className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                <button type="button" className="px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={props.onClose}
                    >
                    Назад
                </button>
                {props.data.status !== 'ОТМЕНЕНА' && props.data.status !== 'РЕШЕНА' ?
                <button type="button" className="px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                    onClick={confirmHandler}
                    >
                    Закрыть заявку
                </button>
                : ''}
            </div>
        </>
    )
} 