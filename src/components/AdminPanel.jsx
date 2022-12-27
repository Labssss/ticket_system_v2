import { useState, useContext, useEffect } from "react"
import { CustomContext } from "../Context";
import { TicketAdm} from "./TicketAdm";

const AdminPanel = () => {
    const [error, setError] = useState('');
    const [tickets, setTickets] = useState([]);
    const {user} = useContext(CustomContext);

    useEffect(() => {
       getAllTickets();
    }, []);

    const confirmHandler = (ticket, newTicket) => {
        setTickets(prev => prev.map(e => e === ticket ? newTicket : e))
    }

    const changeOpenInputHandler = (event) => {
        event.target.checked ? getOpenTickets() : getAllTickets()
    }

    const getAllTickets = async (data) => {
        await fetch('http://localhost:3001/api/tickets/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(data),
        })
        .then(async (response) => {
            if (response.status < 200 || response.status >= 300) {
                const {message} = await response.json()
                setError(message)
                setTimeout( () => setError(''), 5000)
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            setTickets(data)
        });
    };

    const getOpenTickets = async (data) => {
        await fetch('http://localhost:3001/api/tickets/all?order=open', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(data),
        })
        .then(async (response) => {
            if (response.status < 200 || response.status >= 300) {
                const {message} = await response.json()
                setError(message)
                setTimeout( () => setError(''), 5000)
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            setTickets(data)
        });
    };

    return (
            <div className="container w-3/4 my-10 px-6 mx-auto">
                {tickets.length 
                ?
                <div className="flex flex-col">
                    <div class="flex justify-start items-center">
                        <div className="flex h-5 jystify-items-center">
                          <input
                            id="openOnly"
                            name="open"
                            type="checkbox"
                            className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            onChange={(e) => changeOpenInputHandler(e)}
                          />
                        </div>
                        <div className="ml-3 text-lg">
                          <label htmlFor="openOnly" className="font-medium text-gray-700">
                            Только открытые
                          </label>
                        </div>
                    </div>
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                            <thead className="bg-white border-b">
                                <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        #
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Тема
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Имя
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Фамилия
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Дата
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Статус
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {tickets.map((ticket) => <TicketAdm key={ticket.id} data={ticket} onConfirm={confirmHandler}></TicketAdm>)}
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
                : <h2 className='text-4xl mt-4 mb-2 text-black-600'>Список заявок пуст</h2>}
            </div>    
            
    )
};

export default AdminPanel;