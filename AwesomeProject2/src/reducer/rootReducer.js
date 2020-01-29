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
            let newPins=[];
            for(i=0;i<newids.length;i++){
             var array = newids[i].split("#",2);
             console.log('reducerArray',array);
             newPins.push(array[1]);
            }

             var index = newPins.indexOf(action.id);
             console.log('index',index);
             newids.splice(index,1);
             return {
                    ...state,
                     pinValues:newids,
                 }
            break;
            }
            case  'UPDATENAME': {
                let newids = [...state.pinValues];
                var index=-1;
                for(i=0;i<newids.length;i++){
                 var array = newids[i].split("#",2);
                 if(array[1]==action.id){
                  index=i;
                  break;
                 }
                }
                if(index!=-1){

                   newids[index]=action.Name+'#'+action.id; 
                }
                 return {
                        ...state,
                         pinValues:newids,
                     }
                break;
                }
        default:
          return state;
      }
}
export default rootReducer;