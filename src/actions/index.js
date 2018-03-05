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