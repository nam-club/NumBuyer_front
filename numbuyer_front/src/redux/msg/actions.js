export const SET_LANG = "SET_LANG";

export const setLangAction = (state) => {
    return {
        type: "SET_LANG",
        payload: {
            lang: state
        }
    }
}

export const SET_VALID = "SET_VALID";

export const setValidAction = (state) => {
    return {
        type: "SET_VALID",
        payload: {
            validFlg: state.validFlg
        }
    }
}

export const SET_ERR_MSG = "SET_ERR_MSG";

export const setErrMsgAction = (state) => {
    return {
        type: "SET_ERR_MSG",
        payload: {
            errMsg: state.errMsg
        }
    }
}

export const SET_ERR_MSG_VARS = "SET_ERR_MSG_VARS";

export const setErrMsgVarsAction = (state) => {
    return {
        type: "SET_ERR_MSG_VARS",
        payload: {
            errMsgVars: state
        }
    }
}

export const SET_ABL_ERR_MSG = "SET_ABL_ERR_MSG";

export const setAblErrMsgAction = (state) => {
    return {
        type: "SET_ABL_ERR_MSG",
        payload: {
            ablErrMsg: state
        }
    }
}

export const SET_T_PAGE = "SET_T_PAGE";

export const setTPageAction = (state) => {
    return {
        type: "SET_T_PAGE",
        payload: {
            tPage: state
        }
    }
}

export const SET_TL_COLOR = "SET_TL_COLOR";

export const setTLColorAction = (state) => {
    return {
        type: "SET_TL_COLOR",
        payload: {
            tlColor: state
        }
    }
}