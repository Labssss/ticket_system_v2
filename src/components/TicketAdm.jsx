import { useState } from "react";
import { Modal } from "./Modal";
import { BrowseTicket } from "./browseTicket";

export function TicketAdm(props) {
    const [modalBrowseStatus, setModalBrowseStatus] = useState(false);
    const date = new Date(props.data.created_at)

    const confirmHandler = (newTicket) => {
        setModalBrowseStatus(false)
        props.onConfirm(props.data, newTicket)
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
            { modalBrowseStatus && 
            <Modal title={`Заявка #${props.data.id}`} onClose={ () => setModalBrowseStatus(false)}>
                <BrowseTicket data={props.data} onConfirm={confirmHandler} onClose={() => setModalBrowseStatus(false)}></BrowseTicket>
            </Modal>
            }
            <tr className="bg-white border-b text-left transition duration-300 ease-in-out hover:bg-gray-100" onClick={() => setModalBrowseStatus(true)}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{props.data.id}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{props.data.title}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{props.data.firstname}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{props.data.lastname}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{`${formatDate(date)}`}</td>
                <td className={`text-sm font-semibold px-6 py-4 whitespace-nowrap ${props.data.status === 'ОТКРЫТА' ? 'text-orange-300' : props.data.status === 'ОТМЕНЕНА' ? 'text-gray-400': props.data.status === 'РЕШЕНА' ? 'text-green-600' : ''}`}>{props.data.status}</td>
            </tr>
        </>
    )
}