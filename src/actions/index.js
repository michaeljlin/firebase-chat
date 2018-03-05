import types from './types';

export function getRoomList(rooms){
    return {
        type: types.GET_ROOM_LIST,
        payload: rooms
    }
}