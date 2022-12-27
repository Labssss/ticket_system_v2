
import { useState } from "react";
import { Modal } from "./Modal";
import { CancelTicket } from "./cancelTicket";

export function Ticket(props) {
    const [modalEditStatus, setModalEditStatus] = useState(false);
    const date = new Date(props.data.created_at)
    const cancelHandler = (newTicket) => {
        setModalEditStatus(false)
        props.onCancel(props.data, newTicket)
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
        { modalEditStatus && 
        <Modal title={`Отменить заявку №${props.data.id}?`} onClose={ () => setModalEditStatus(false)}>
            <CancelTicket data={props.data} onCancel={cancelHandler} onClose={() => setModalEditStatus(false)}></CancelTicket>
        </Modal>
        }
            <div className="container  text-gray-800 mb-10 px-4 md:px-12">
                <div className="relative rounded-lg shadow-lg bg-gray-100 py-4">
                    <div className="flex flex-wrap justify-center text-center lg:text-left w-full">
                        <div className="grow-1 shrink-0 basis-auto w-full pl-10 pr-4">
                            <div className="grid grid-cols-5 items-center">
                                <div className="mb-10 lg:mb-0 col-span-4">
                                    <h2 className="text-2xl font-bold">{props.data.title}</h2>
                                    <span className="text-sm">{props.data.message}</span>
                                </div>

                                <div className="mb-10 lg:mb-0 col-span-1 justify-items-center pl-7">
                                    <div className="flex-1 absolute top-0 left-0 ml-2 mt-2 text-gray-400 hover:text-gray-600">#{props.data.id}</div>
                                    <p className="text-sm">
                                    <span className="text-sm">{`${formatDate(date)}`}</span>
                                    <br/>
                                    <span className="text-sm">{`${props.data.firstname} ${props.data.lastname}`}</span>
                                    <br/>
                                    <span className="text-sm">{props.data.email}</span>
                                    <br/>
                                    <span className="text-sm">{props.data.phone}</span>
                                    </p>
                                    <div className="mt-2">
                                        <span className={`text-lg font-semibold ${props.data.status === 'ОТКРЫТА' ? 'text-orange-300' : props.data.status === 'ОТМЕНЕНА' ? 'text-gray-400': props.data.status === 'РЕШЕНА' ? 'text-green-600' : ''}`}>{props.data.status}</span>
                                    </div>
                                    {props.data.status === 'ОТКРЫТА'
                                    ?
                                    <button className="flex-1 absolute top-0 right-0 mr-2 mt-2 text-gray-400 hover:text-gray-600" onClick={() => setModalEditStatus(true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                        </svg>
                                    </button>
                                    : ''}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
}