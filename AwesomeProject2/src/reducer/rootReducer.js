const initState = {
    pinValues:[],
}
const rootReducer = (state=initState,action)=>{

    switch (action.type) {
        case  'ADDVALUE':{
            let newids = [...state.pinValues,action.id]
            return {
                ...state,
                pinValues:newids,
        
            }

        break;
        }
        case  'DELETEVALUE': {
            let newids = [...state.pinValues];
             var index = newids.indexOf(action.id);
             newids.splice(index,1);
             return {
                    ...state,
                     pinValues:newids
                 }
            break;
            }
        default:
          return state;
      }
}
export default rootReducer;