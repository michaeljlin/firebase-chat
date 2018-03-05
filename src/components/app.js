import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import Chat from './chat';
import Lobby from './lobby';

const App = () => (
    <div>
        <div className="container">
            <h1 className="center-align">Firechat 🔥</h1>
            <Lobby />
        </div>
    </div>
);

export default App;
