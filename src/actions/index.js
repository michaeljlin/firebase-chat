import types from './types';
import { db } from '../firebase';

export function getRoomList(rooms){
    return {
        type: types.GET_ROOM_LIST,
        payload: rooms
    }
}

export function createRoom(name){
    console.log('Create Room: ', name);

    const newLog = [`Chat Bot: Created new room ${name}`];

    db.ref('/chat-logs').push(newLog).then((resp)=>{
        // console.log('Resp from new log: ', resp.key);
        const newRoom = {
            name,
            chatLogId: resp.key
        }

        db.ref('/chat-rooms').push(newRoom);
    });

    return {
        type: types.CREATE_ROOM
    };
}

export function getRoomData(roomId, logId){
    return (dispatch)=>{
        db.ref(`/chat-rooms/${roomId}`).once('value').then((snapshot)=>{
            console.log('Room Snapshot: ', snapshot.val());
            dispatch({
                type: types.GET_ROOM_DATA,
                payload: snapshot.val()
            });
        });
    };
}

export function getChatLog(log){
    return {
        type: types.GET_CHAT_LOG,
        payload: log
    }
}

export function sendNewMessage(logId, message){
    db.ref(`/chat-logs/${logId}`).push(message);

    return{
        type: types.SEND_MESSAGE
    }
}