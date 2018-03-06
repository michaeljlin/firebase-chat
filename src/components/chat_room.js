import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRoomData, getChatLog, sendNewMessage } from '../actions';
import { db } from '../firebase';

class ChatRoom extends Component{
    constructor(props){
        super(props);
        this.state = {
            message:''
        }
    }

    componentDidMount(){
        const { roomId, logId } = this.props.match.params;
        this.props.getRoomData(roomId, logId);
    }

    componentWillReceiveProps(nextProps){
        if(!this.props.roomInfo.chatLogId && nextProps.roomInfo.chatLogId){
            console.log('We now have chat log ID');
            db.ref(`/chat-logs/${nextProps.roomInfo.chatLogId}`).on('value', (snapshot)=>{
                // console.log('Chat log snapshot: ', snapshot.val());
                this.props.getChatLog(snapshot.val());
            });
        }
    }

    sendMessage(e){
        console.log('Sending Message');
        e.preventDefault();

        this.props.sendNewMessage(
            this.props.roomInfo.chatLogId,
            this.state.message
        );

        this.setState({message: ''});
    }

    render(){
        console.log('Chat Info: ', this.props);
        const { chatLog } = this.props;        
        const { name } = this.props.roomInfo;

        const messages = Object.keys(chatLog).map((key)=>{
            return (
                <li key={key} className="collection-item">{chatLog[key]}</li>
            )
        });

        return(
            <div className="center-align">
                <h3>{name ? name : "Loading..."}</h3>
                <form onSubmit={this.sendMessage.bind(this)}>
                    <label>Enter Message:</label>
                    <input type="text" value={this.state.message} onChange={(e)=>{this.setState({message: e.target.value})}}/>
                    <button className="btn">Send Message</button>
                </form>
                <ul className="collection">
                    {messages}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        roomInfo: state.chat.currentRoom,
        chatLog: state.chat.chatLog
    }
}

export default connect(mapStateToProps, {getRoomData, getChatLog, sendNewMessage})(ChatRoom);