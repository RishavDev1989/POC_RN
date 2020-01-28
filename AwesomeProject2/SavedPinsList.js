import React from 'react';
import { FlatList, StyleSheet, Text, View ,TouchableOpacity,Modal} from 'react-native';
import {connect} from 'react-redux'
import Pin from './Pin'
import DialogInput from 'react-native-dialog-input'
import AsyncStorage from '@react-native-community/async-storage';

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
updateName = async (item) => {
  this.setState({selectPinValue:item});
    try {
    const value = await AsyncStorage.getItem(item);
    this.setState({modalVisible:true});
    this.setState({selectUpdateValue:value});
    }catch (error){
    }
 }
 sendInput= async (inputText) => { 
  await AsyncStorage.removeItem(this.state.selectPinValue);
  await AsyncStorage.setItem(this.state.selectPinValue,inputText);
  this.reloadName(); 
  this.render();
  this.setState({modalVisible:false});

}
 showDialog=()=>{
  this.setState({modalVisible:false});
}
componentDidMount(){
  this.reloadName();
}
componentWillReceiveProps(nextProps){
 this.reloadName(); 
}
reloadName=async()=>{
 var dummyarray=[];
  for (i=0;i<this.props.pinValues.length;i++){
    try {
      const value = await AsyncStorage.getItem(this.props.pinValues[i]);
      dummyarray.push({"NAME_KEY":value,"PIN_KEY":this.props.pinValues[i]});
      }catch (error){
      }    
  this.setState({mainData:dummyarray});
}
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
            hintInput ={this.state.selectPinValue}
            submitInput={(inputText)=>{this.sendInput(inputText)}}
            cancelText='Cancel'
            submitText='Update'
            closeDialog={()=>{this.showDialog()}}/>
      </Modal>
        <FlatList
          data={this.state.mainData}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({item}) =>
         <View style={styles.container2}>   
        {item['PIN_KEY'] ? <TouchableOpacity
           style={{ height:40,width:'12%',borderColor:'red',borderWidth:1}}
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
        </TouchableOpacity>:null}
        </View>
      }/>
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
    pinNames:state.pinNames
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    deleteValue:(id)=>{
      dispatch({type:'DELETEVALUE',id:id})
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SavedPinsList)
