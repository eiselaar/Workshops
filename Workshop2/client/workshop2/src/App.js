import React from 'react';
import './App.css';
import CreateUser from './CreateUser';
import HelloMessage from './HelloMessage';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Mi Aplicación</h1>
                <CreateUser />
                <HelloMessage />
            </header>
        </div>
    );
}

export default App;