export const SET_LANG = "SET_LANG";

export const setLangAction = (langState) => {
    return {
        type: "SET_LANG",
        payload: {
            lang: langState
        }
    }
}

export const SET_VALID = "SET_VALID";

export const setValidAction = (validState) => {
    return {
        type: "SET_VALID",
        payload: {
            validFlg: validState.validFlg
        }
    }
}

export const SET_ERR_MSG = "SET_ERR_MSG";

export const setErrMsgAction = (errMsgState) => {
    return {
        type: "SET_ERR_MSG",
        payload: {
            errMsg: errMsgState.errMsg
        }
    }
}