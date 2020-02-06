import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,Image} from 'react-native';
import {connect} from 'react-redux'
import Pin from '../components/pin'
import numberGenerate from '../components/createPins'
class GeneratePins extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        oneNumber:'',
        twoNumber: '',
        threeNumber:'',
        fourNumber: '',
        fiveNumber:'',
      };
      this.numbers=[];

    }
    render() {
      
    return (
    <View style={{flexDirection:'column',flex:1}}>
      <View style={{flexDirection:'row',height:40,width:'100%',backgroundColor:'transparent',borderRadius: 2,borderWidth: 2,borderColor: 'black'}}>
       <TouchableOpacity style={styles.savedBtnStyles} onPress={() => this.props.navigation.navigate('Saved')}>
         <Text style={{fontSize:18,fontWeight:'bold'}}>Saved</Text>
       </TouchableOpacity>
       <Image source={require('../assets/rightArrow.png')} style={{width:30,height:30}}/>
       </View>
    <View style={styles.superContainer}>
        <View style={styles.pinsContainer}>
          <Pin text={this.state.oneNumber}/>
          <Pin text={this.state.twoNumber}/>
          <Pin text={this.state.threeNumber}/>
          <Pin text={this.state.fourNumber}/>
          <Pin text={this.state.fiveNumber}/>
        </View>
        <View style={styles.buttonContainer}>
           <TouchableOpacity style={styles.btnStyles} onPress={() => this.generatePIN()}>
             <Text>GENERATE</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.btnStyles} onPress={() => this.numberSave()} > 
             <Text>SAVE</Text>
           </TouchableOpacity>
       </View>
    </View>
    </View>
  );
  }
  numberSave(){
      var valuePins = 'Name#'+this.state.oneNumber+this.state.twoNumber+this.state.threeNumber+this.state.fourNumber+this.state.fiveNumber;
      if(valuePins.length<=5){
      alert("Empty pins are not allowed to saved");
      }else{
       var savedPin=[];
       for(i=0;i<this.props.pinValues.length;i++){
       var arrayPinNameStr = this.props.pinValues[i].split("#",2);
       savedPin.push(arrayPinNameStr[1]);
      }
      var arrayNewPinNameStr = valuePins.split("#",2);
      var index = savedPin.indexOf(arrayNewPinNameStr[1]);
      if(index==-1){
      this.props.addValue(valuePins);
      }
      else{
      alert("Same PINS not allow for re-save");
      }
 }}
  generatePIN(){
       this.numbers=[];
       var arrDev= numberGenerate(5);
       this.setState({ oneNumber:arrDev[0]});
       this.setState({ twoNumber:arrDev[1]});
       this.setState({ threeNumber:arrDev[2]});
       this.setState({ fourNumber:arrDev[3]});
       this.setState({ fiveNumber:arrDev[4]});
  }

  }

const styles = StyleSheet.create({
  superContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column'

  },
  pinsContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection:'row',
  },
  buttonContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection:'row',
    marginTop:20
  },
  textFieldStyle: {
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 2,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    borderColor: 'black',
    height: 40,
    marginLeft:5,
    width:"17%"

  },
  btnStyles: {
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 2,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    borderColor: 'blue',
    height: 40,
    marginLeft:5,
    width:"40%"
  },
  savedBtnStyles: {
    alignItems: 'center',
    borderRadius: 0,
    borderWidth: 0,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    borderColor: 'transparent',
    height: 40,
    marginLeft:5,
    width:"90%"
  },
});
const mapStateToProps = (state) =>{
  return {
    pinValues:state.pinValues
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    addValue:(id)=>{
      dispatch({type:'ADDVALUE' ,id:id})
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(GeneratePins)