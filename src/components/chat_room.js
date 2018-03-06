import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRoomData } from '../actions';
import { db } from '../firebase';

class ChatRoom extends Component{
    componentDidMount(){
        const { roomId, logId } = this.props.match.params;
        this.props.getRoomData(roomId, logId);
    }

    componentWillReceiveProps(nextProps){
        if(!this.props.roomInfo.chatLogId && nextProps.roomInfo.chatLogId){
            console.log('We now have chat log ID');
            db.ref(`/chat-logs/${nextProps.roomInfo.chatLogId}`).on('value', (snapshot)=>{
                console.log('Chat log snapshot: ', snapshot.val());
            });
        }
    }

    render(){
        console.log('Chat Info: ', this.props);

        
        const { name } = this.props.roomInfo;

        return(
            <div className="center-align">
                <h3>{name ? name : "Loading..."}</h3>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        roomInfo: state.chat.currentRoom
    }
}

export default connect(mapStateToProps, {getRoomData})(ChatRoom);