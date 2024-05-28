// src/HelloMessage.js
import React, { useState } from 'react';
import axios from 'axios';

const HelloMessage = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`http://localhost:3001/api/hello?message=${message}`);
             alert(res.data.respuesta);
             console.log(res.data)
            //setResponse(res.data.respuesta);
        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <div>
            <h2>Mensaje de Saludo</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Mensaje:</label>
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
                <button type="submit">Enviar</button>
            </form>
            {response && <p>{response}</p>}
        </div>
    );
};

export default HelloMessage;
