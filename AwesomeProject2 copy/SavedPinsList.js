import React from 'react';
import { FlatList, StyleSheet, Text, View ,TouchableOpacity,TextInput} from 'react-native';
import {connect} from 'react-redux'
import Pin from './Pin'

class SavedPinsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        text: '',
    };
  }
FlatListItemSeparator = () => {
  return (
    <View
      style={{ height: 0.5, width: '100%', backgroundColor: 'grey', marginTop: 5 }}
    />
  );
};
deleteRecord(item){
  this.props.deleteValue(item);
}
handleNameUpdate(item){
//alert("handleNameUpdate");
}
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.pinValues}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={ ({item}) =>
       <View style={styles.container2}>
     <TextInput
      style={{ height:40,width:'12%',borderColor:'red',borderWidth:1}}
      onEndEditing={this.handleNameUpdate}
      placeholder={'Name'}
    />                 
                 <Pin text={item.substr(0,4)}/>
                 <Pin text={item.substr(4,4)}/>
                 <Pin text={item.substr(8,4)}/>
                 <Pin text={item.substr(12,4)}/>
                 <Pin text={item.substr(16,4)}/>
                <TouchableOpacity style={{
                 backgroundColor:'red',marginLeft:5,borderRadius: 2,borderWidth: 2,borderColor:'red',
                 }} onPress={() => this.deleteRecord(item)}>
                 <Text style={{color:'white',fontWeight:'bold'}}>DELETE</Text>
                </TouchableOpacity>
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
    pinValues:state.pinValues
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    deleteValue:(id)=>{
      dispatch({type:'DELETEVALUE' ,id:id})
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SavedPinsList)
