import React from 'react';
import { Route } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import ChatRoom from './chat_room';
import Lobby from './lobby';

const App = () => (
    <div>
        <div className="container">
            <h1 className="center-align">Firechat 🔥</h1>
            <Route exact path ="/" component={Lobby}/>
            <Route path="/room/:roomId/log/:logId" component={ChatRoom}/>
        </div>
    </div>
);

export default App;
