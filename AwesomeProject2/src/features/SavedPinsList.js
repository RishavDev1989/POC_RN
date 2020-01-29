import React from 'react';
import { FlatList, StyleSheet, Text, View ,TouchableOpacity,Modal} from 'react-native';
import {connect} from 'react-redux'
import Pin from '../components/pin'
import DialogInput from '../components/dialogInput'

class SavedPinsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        modalVisible:false,
        selectUpdateValue:'',
        selectPinValue:'',
        mainData:[],
    };
  }
FlatListItemSeparator = () => {
  return (
    <View  style={{height: 0.5, width: '100%', backgroundColor: 'grey', marginTop:5}}/>
  );
};
deleteRecord(item){
  this.props.deleteValue(item);
}
updateName(item) {
  console.log("updateName");
  this.setState({selectPinValue:item});
  this.setState({modalVisible:true});

    
 }

 sendInput(inputText){ 
  console.log("sendInput",inputText);
  this.props.UpdateNameValue(this.state.selectPinValue,inputText);
  this.reloadName(this.props); 
  this.render();
  this.setState({modalVisible:false});

}

 showDialog=()=>{
  this.setState({modalVisible:false});
}
componentDidMount(){
  this.reloadName(this.props);
}
componentWillReceiveProps(nextProps){
  console.log("componentWillReceiveProps",nextProps);
 this.reloadName(nextProps); 
}
reloadName(nextProps){
  var dummyarray=[];
  console.log("reloadName",nextProps.pinValues);

   for (i=0;i<nextProps.pinValues.length;i++){
      var array = nextProps.pinValues[i].split("#",2);
      dummyarray.push({"NAME_KEY":array[0],"PIN_KEY":array[1]});
      } 
   this.setState({mainData:dummyarray});
 }
  render() {
    return (
      <View style={styles.container}>
      <Modal
        animationType='slide'
        visible={this.state.modalVisible}
        transparent={true}
        onRequestClose={() => {this.props.hideModal(false)}}
      >
        <DialogInput isDialogVisible={this.state.isDialogVisible}
            title={"Update the value"}
            message={""}
            hintInput ={this.state.selectUpdateValue}
            submitInput={(inputText)=>{this.sendInput(inputText)}}
            //cancelText='Cancel'
            submitText='Update'
            closeDialog={()=>{this.showDialog()}}/>
      </Modal>
      {this.props.pinValues.length>0?
        <FlatList
          data={this.state.mainData}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({item}) =>
         <View style={styles.container2}>   
        {item['PIN_KEY'] ? <TouchableOpacity
           style={{ height:40,width:'12%',borderColor:'gray',borderWidth:1}}
           onPress={() => this.updateName(item['PIN_KEY'])}
         >
        <Text>{item['NAME_KEY']}</Text>
        </TouchableOpacity>:null}

        {item['PIN_KEY'] ? <Pin text = {item ['PIN_KEY'].substr(0,4)}/> : null }
        {item['PIN_KEY'] ? <Pin text = {item ['PIN_KEY'].substr(4,4)}/> : null }
        {item['PIN_KEY'] ? <Pin text = {item ['PIN_KEY'].substr(8,4)}/> : null }
        {item['PIN_KEY'] ? <Pin text = {item ['PIN_KEY'].substr(12,4)}/> : null }
        {item['PIN_KEY'] ? <Pin text = {item ['PIN_KEY'].substr(16,4)}/> : null }
        {item['PIN_KEY'] ?
        <TouchableOpacity style={{backgroundColor:'red',marginLeft:5,borderRadius: 2,borderWidth: 2,borderColor:'red',
         }} onPress={() => this.deleteRecord(item['PIN_KEY'])}>
        <Text style={{color:'white',fontWeight:'bold'}}>DELETE</Text>
        </TouchableOpacity>:<Text style={{fontSize:25}}>No pin Saved</Text>}
        </View>
      }/>:<View style={{alignItems: 'center',justifyContent: 'center'}}><Text style={{fontSize:25}}>No pin Saved</Text></View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop:2
  },
  item: {
    paddingLeft: 0,
    fontSize: 18,
  },
  container2: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
  },
});

const mapStateToProps = (state) =>{
  return {
    pinValues:state.pinValues,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    deleteValue:(id)=>{
      dispatch({type:'DELETEVALUE',id:id})
    },
    UpdateNameValue:(id,newName)=>{
      dispatch({type:'UPDATENAME',id:id,Name:newName})
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SavedPinsList)
