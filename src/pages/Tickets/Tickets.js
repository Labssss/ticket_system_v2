import { useState, useContext, useEffect } from "react"
import { Ticket } from "../../components/Ticket";
import { CustomContext } from "../../Context";

const Tickets = (props) => {
    const [error, setError] = useState('');
    const [tickets, setTickets] = useState([]);
    const {user} = useContext(CustomContext);

    useEffect(() => {
       getTickets();
    }, []);

    const cancelHandler = (ticket, newTicket) => {
        setTickets(prev => prev.map(e => e === ticket ? newTicket : e))
    }

    const getTickets = async (data) => {
        await fetch('http://localhost:3001/api/tickets', {
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
                {tickets.length ? tickets.map((ticket) => <Ticket key={ticket.id} data={ticket} onCancel={cancelHandler}></Ticket>) : <h2 className='text-4xl mt-4 mb-2 text-black-600'>Список ваших заявок пуст</h2>}
            </div>    
    )
}

export default Tickets