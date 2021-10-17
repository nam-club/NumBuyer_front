export const SET_ROOM = "SET_ROOM";

export const setRoomAction = (roomState) => {
    return {
        type: "SET_ROOM",
        payload: {
            roomId: roomState
        }
    }
};