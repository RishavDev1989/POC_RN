const initState = {
    pinValues:[],
}
const rootReducer = (state=initState,action)=>{
 if(action.type === 'ADDVALUE'){
    let newids = [...state.pinValues,action.id]
    return {
        ...state,
        pinValues:newids,

    }
}
else  if(action.type === 'DELETEVALUE'){
    let newids = [...state.pinValues];
    var index = newids.indexOf(action.id);
    newids.splice(index,1);
    return {
        ...state,
        pinValues:newids
    }
}
  return state;  
}
export default rootReducer;