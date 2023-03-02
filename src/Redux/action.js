import * as types from "./actionTypes"

export const getDataRequest=()=>{
 return {type:types.GET_DATA_REQUEST}
}

export const getDataSuccess=(payload)=>{

    return {type:types.GET_DATA_SUCCESS,payload}
}

export const getDataError=()=>{

    return {type:types.GET_DATA_ERROR}
}
