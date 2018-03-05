import React, { Component } from 'react';
import { db } from '../firebase';
import { connect } from 'react-redux'; 
import { getRoomList } from '../actions';

class Lobby extends Component{
constructor(props){
    super(props);

    this.state = {
        roomName: ''
    }
}

componentDidMount(){
    db.ref('/chat-rooms').on('value', (snapshot)=>{
        console.log('Snapshot: ', snapshot.val());
        this.props.getRoomList(snapshot.val());
    });
}

handleCreateRoom(e){
    e.preventDefault();

    console.log('Room Name: ', this.state.roomName);

    const newRoom = {
        name: this.state.roomName,
        chatLog: [`Room: ${this.state.roomName} - Created`]
    };

    db.ref('/chat-rooms').push(newRoom).then(resp=>{
        console.log('Add Room Response: ', resp);
    });

    this.setState({
        roomName: ''
    });
}

    render(){
        const { roomName } = this.state;
        const { roomList } = this.props;

        const rooms = Object.keys(roomList).map((key, index)=>{
            return <li key={index} className="collection-item">{roomList[key].name}</li>
        });

        console.log('Lobby Props: ', this.props);

        return(
            <div>
                <h3>Chat Lobby</h3>
                <form onSubmit={this.handleCreateRoom.bind(this)}>
                    <label>Chat Room Name</label>
                    <input type="text" onChange={(e)=>{this.setState({roomName: e.target.value})}} value={roomName} />
                    <button>Create Room</button>
                </form>
                <ul className="collection">
                    {rooms}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        roomList: state.chat.roomList
    }
}

export default connect(mapStateToProps, {getRoomList})(Lobby);