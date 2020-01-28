import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,Image} from 'react-native';
import {connect} from 'react-redux'
import Pin from '../components/pin'
import AsyncStorage from '@react-native-community/async-storage';

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
           <TouchableOpacity style={styles.btnStyles} onPress={() => this.numberGenerate()}>
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

    numberSave = async () => {
      var valuePins = this.state.oneNumber+this.state.twoNumber+this.state.threeNumber+this.state.fourNumber+this.state.fiveNumber;
      if(valuePins.length==0){
        alert("Empty pins are not allowed to saved");

      }else{
      var index = this.props.pinValues.indexOf(valuePins);
       if(index==-1){
       this.props.addValue(valuePins);
       try {
        await AsyncStorage.setItem(valuePins,'Name')
      } catch (e) {
      }
       }
       else{
         alert("Duplicate PINS not allow for re-save");
       }
    }}
     numberGenerate(){
       this.numbers=[];
       for(i=0;i<5;i++){
        this.random4Digit();
       }
        this.setState({ oneNumber:this.numbers[0]});
        this.setState({ twoNumber:this.numbers[1]});
        this.setState({ threeNumber:this.numbers[2]});
        this.setState({ fourNumber:this.numbers[3]});
        this.setState({ fiveNumber:this.numbers[4]});
      
     }
     random4Digit(){
       var number= this.shuffle( "0123456789".split('') ).join('').substring(0,4);
      if(this.checkSequence(number)==true){
       this.random4Digit();
      }
      else{
      this.numbers.push(number);
      }
    }
    
     shuffle(o){
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }
    checkSequence  (num) {
      var arr_num = ('' + num).split('');
     for (var i = 0; i < arr_num.length - 1; i++) {
       if (((parseInt(arr_num[i]) >= parseInt(arr_num[i + 1])) &&
       ((parseInt(arr_num[i+1]) >= parseInt(arr_num[i + 2])))) ||
       ((parseInt(arr_num[i]) <= parseInt(arr_num[i + 1])) &&((parseInt(arr_num[i+1]) <= parseInt(arr_num[i + 2]))))
       || (parseInt(arr_num[i]) == parseInt(arr_num[i + 1])))
         return true;
     }
     return false;
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