import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import propTypes from 'prop-types';

export default class Pin extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.pinBox}>
          <Text>{this.props.text}</Text>
        </View>
      </View>
    );
  }
}
Pin.propTypes = {text: propTypes.string.isRequired};
const styles = StyleSheet.create({
  pinBox: {
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 2,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 10,
    paddingTop: 5,
    borderColor: 'gray',
    height: 40,
    marginLeft: 5,
  },
});
