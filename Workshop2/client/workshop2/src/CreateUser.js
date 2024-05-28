import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3001/api/user', { nombre, apellido });
           
            setResponse(res.data.respuesta);
        } catch (error) {
            console.error(error);
            setResponse('Error al crear el usuario');
        }
    };

    return (
        <div>
            <h2>Crear Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                </div>
                <button type="submit">Crear</button>
            </form>
            {response && <p>{response}</p>}
        </div>
    );
};

export default CreateUser;