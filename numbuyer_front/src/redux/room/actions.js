export const SET_ROOM = "SET_ROOM";

export const setRoomAction = (state) => {
    return {
        type: "SET_ROOM",
        payload: {
            roomId: state
        },
    }
};

export const SET_CPU = "SET_CPU";

export const setCpuAction = (state) => {
    return {
        type: "SET_CPU",
        payload: {
            isCpuMatch: state
        },
    }
};

export const SET_QUICK = "SET_QUICK";

export const setQuickAction = (state) => {
    return {
        type: "SET_QUICK",
        payload: {
            isQuickMatch: state
        },
    }
};

export const SET_TOTAL_ROOM_COUNT = "SET_TOTAL_ROOM_COUNT";

export const setTotalRoomCountAction = (state) => {
    return {
        type: "SET_TOTAL_ROOM_COUNT",
        payload: {
            totalRoomCount: state
        },
    }
};

export const SET_AVAILABLE_QM_COUNT = "SET_AVAILABLE_QM_COUNT";

export const setAvailableQMCountAction = (state) => {
    return {
        type: "SET_AVAILABLE_QM_COUNT",
        payload: {
            availableQMCount: state
        },
    }
};