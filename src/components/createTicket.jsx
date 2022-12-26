import { useContext, useState } from 'react';
import InputMask from 'react-input-mask';
import {useForm} from "react-hook-form";
import {CustomContext} from "../Context";

export function CreateTicket (props) {

    const {user, setUser, setIsLogged} = useContext(CustomContext);
    const [error, setError] = useState('');
    const [succesfull, setSuccesfull] = useState('');

    const createTicket = async (data) => {
        await fetch('http://localhost:3001/api/tickets', {
            method: 'POST',
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
            console.log(data)
            setSuccesfull(data.message)
            setTimeout( () => setSuccesfull(''), 5000)
        });
    };

    const {
        register,
        handleSubmit,
        setError: {
            errors
        },
        reset
    } = useForm();

    return (
        <div className="grid py-20 justify-items-center">
                <div className="block p-6 rounded-lg shadow-2xl bg-white max-w-md">
                    <h3 className='text-3xl font-bold mb-8'>Оставить заявку</h3>
                    <form onSubmit={handleSubmit(createTicket)}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-group mb-6">
                                <input type="text" className="form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput123"
                                placeholder="First name"
                                {...register('firstName')}
                                />
                            </div>

                            <div className="form-group mb-6">
                                <input type="text" className="form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput124"
                                placeholder="Last name"
                                {...register('lastName')}
                                required
                                />
                            </div>
                        </div>

                        <div className="form-group mb-6">
                            <input type="email" className="form-control block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
                                placeholder="Email address"
                                {...register('email')}
                                required
                                />
                        </div>

                        <div className="form-group mb-6">
                            <InputMask type="tel" className="form-control block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput126"
                                placeholder="Phone number"
                                mask={`+\\7\\(999)999-99-99`}
                                {...register('phone')}
                                minLength="16"
                                required
                                />
                        </div>

                        <div className="form-group mb-6">
                            <input type="text" className="form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput124"
                            placeholder="Title"
                            {...register('title')}
                            required
                            />
                        </div>

                        <div className="form-group mb-6">
                            <textarea className="
                                form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                "
                                id="exampleFormControlTextarea1"
                                rows="3"
                                placeholder="Your message"
                                {...register('message')}
                                required
                                >
                            </textarea>
                        </div>

                        <div className="form-group mb-3 relative">
                            <select className="form-select appearance-none
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding bg-no-repeat
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"
                                {...register('feedbackType')}
                                required>
                                <option value="">Выберите вариант связи с вами</option>
                                <option value="email">По электронной почте</option>
                                <option value="phone">Звонок на телефон</option>
                                <option value="whatsapp">Сообщение в WhatsApp</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>

                        <p className={`${succesfull ? `block` : `hidden`} text-start text-green-600`}>{succesfull}</p>
                        <p className={`${error ? `block` : `hidden`} text-start text-red-600`}>{error}</p>
                        <button type="submit" className="
                        mt-3
                        w-full
                        px-6
                        py-2.5
                        bg-blue-600
                        text-white
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        rounded
                        shadow-md
                        hover:bg-blue-700 hover:shadow-lg
                        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                        active:bg-blue-800 active:shadow-lg
                        transition
                        duration-150
                        ease-in-out">Отправить</button>
                    </form>
                </div>
            </div>
    )
}