import types from '../actions/types';

const DEFAULT_STATE = {
    roomList: {},
    chatLog: [],
    currentRoom: {}
};

export default (state = DEFAULT_STATE, action)=>{
    switch(action.type){
        case types.GET_ROOM_LIST:
            return {...state, roomList: action.payload};
            break;
        case types.GET_ROOM_DATA:
            return {...state, currentRoom: action.payload};
            break;
        default:
            return state;
    }
};