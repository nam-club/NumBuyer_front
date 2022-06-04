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

export const SET_ERR_MSG_VARS = "SET_ERR_MSG_VARS";

export const setErrMsgVarsAction = (errMsgVarsState) => {
    return {
        type: "SET_ERR_MSG_VARS",
        payload: {
            errMsgVars: errMsgVarsState
        }
    }
}

export const SET_ABL_ERR_MSG = "SET_ABL_ERR_MSG";

export const setAblErrMsgAction = (ablErrMsgState) => {
    return {
        type: "SET_ABL_ERR_MSG",
        payload: {
            ablErrMsg: ablErrMsgState
        }
    }
}

export const SET_T_PAGE = "SET_T_PAGE";

export const setTPageAction = (tPageState) => {
    return {
        type: "SET_T_PAGE",
        payload: {
            tPage: tPageState
        }
    }
}

export const SET_TL_COLOR = "SET_TL_COLOR";

export const setTLColorAction = (tlColorState) => {
    return {
        type: "SET_TL_COLOR",
        payload: {
            tlColor: tlColorState
        }
    }
}