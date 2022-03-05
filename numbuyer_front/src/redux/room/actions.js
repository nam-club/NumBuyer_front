export const SET_ROOM = "SET_ROOM";

export const setRoomAction = (roomState) => {
    return {
        type: "SET_ROOM",
        payload: {
            roomId: roomState
        },
    }
};

export const SET_QUICK = "SET_QUICK";

export const setQuickAction = (quickState) => {
    return {
        type: "SET_QUICK",
        payload: {
            isQuickMatch: quickState
        },
    }
};