import { useContext, useState } from 'react';
import {CustomContext} from "../Context";

export function CancelTicket(props) {
    const {user} = useContext(CustomContext);

    const confirmHandler = async (event) => {
        await fetch(`http://localhost:3001/api/tickets/${props.data.id}?cancel=true`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then(response => {
            return response.json();
        })
        .then((data) => {
            props.onCancel(data)
        })
    }

    return (
        <>
            <div
                className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                <button type="button" className="px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal"
                    onClick={props.onClose}
                    >
                    Отмена
                </button>
                <button type="button" className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                    onClick={confirmHandler}
                    >
                    Подтвердить
                </button>
            </div>
        </>
    )
} 