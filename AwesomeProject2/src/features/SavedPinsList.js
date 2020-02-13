import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import Pin from '../components/pin';
import DialogInput from '../components/dialogInput';

class SavedPinsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateNameAlertVisible: false,
      selectUpdateValue: '',
      selectedPinValue: '',
      savedPinsList: [],
    };
  }
  flatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: 'grey',
          marginTop: 5,
        }}
      />
    );
  };
  deleteRecord(item) {
    this.props.deleteValue(item['PIN_KEY']);
  }
  updateName(item) {
    this.setState({selectUpdateValue: item['NAME_KEY']});
    this.setState({selectedPinValue: item['PIN_KEY']});
    this.setState({updateNameAlertVisible: true});
  }

  sendInput(inputText) {
    this.props.UpdateNameValue(this.state.selectedPinValue, inputText);
    this.reloadName(this.props);
    this.render();
    this.setState({updateNameAlertVisible: false});
  }

  showDialog = () => {
    this.setState({updateNameAlertVisible: false});
  };
  componentDidMount() {
    this.reloadName(this.props);
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
    this.reloadName(nextProps);
  }
  reloadName(nextProps) {
    var localPinsArray = [];
    //console.log("reloadName",nextProps.pinValues);

    for (i = 0; i < nextProps.pinValues.length; i++) {
      var array = nextProps.pinValues[i].split('#', 2);
      localPinsArray.push({NAME_KEY: array[0], PIN_KEY: array[1]});
    }
    this.setState({savedPinsList: localPinsArray});
  }
  render() {
    return (
      <View style={styles.superView}>
        <Modal
          animationType="slide"
          visible={this.state.updateNameAlertVisible}
          transparent={true}
          onRequestClose={() => {
            this.props.hideModal(false);
          }}>
          <DialogInput
            isDialogVisible={this.state.isDialogVisible}
            title={'Update the value'}
            message={''}
            hintInput={this.state.selectUpdateValue}
            submitInput={inputText => {
              this.sendInput(inputText);
            }}
            submitText="Update"
            closeDialog={() => {
              this.showDialog();
            }}
          />
        </Modal>
        {this.props.pinValues.length > 0 ? (
          <FlatList
            data={this.state.savedPinsList}
            ItemSeparatorComponent={this.flatListItemSeparator}
            renderItem={({item}) => (
              <View style={styles.listView}>
                {item['PIN_KEY'] ? (
                  <TouchableOpacity
                    style={{
                      height: 40,
                      width: '12%',
                      borderColor: 'gray',
                      borderWidth: 1,
                    }}
                    onPress={() => this.updateName(item)}>
                    <Text>{item['NAME_KEY']}</Text>
                  </TouchableOpacity>
                ) : null}

                {item['PIN_KEY'] ? (
                  <Pin text={item['PIN_KEY'].substr(0, 4)} />
                ) : null}
                {item['PIN_KEY'] ? (
                  <Pin text={item['PIN_KEY'].substr(4, 4)} />
                ) : null}
                {item['PIN_KEY'] ? (
                  <Pin text={item['PIN_KEY'].substr(8, 4)} />
                ) : null}
                {item['PIN_KEY'] ? (
                  <Pin text={item['PIN_KEY'].substr(12, 4)} />
                ) : null}
                {item['PIN_KEY'] ? (
                  <Pin text={item['PIN_KEY'].substr(16, 4)} />
                ) : null}
                {item['PIN_KEY'] ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'red',
                      marginLeft: 5,
                      borderRadius: 2,
                      borderWidth: 2,
                      borderColor: 'red',
                    }}
                    onPress={() => this.deleteRecord(item)}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      DELETE
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={{fontSize: 25}}>No pin Saved</Text>
                )}
              </View>
            )}
          />
        ) : (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 25}}>No pin Saved</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  superView: {
    flex: 1,
    paddingTop: 2,
  },
  item: {
    paddingLeft: 0,
    fontSize: 18,
  },
  listView: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

const mapStateToProps = state => {
  return {
    pinValues: state.pinValues,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteValue: id => {
      dispatch({type: 'DELETEVALUE', id: id});
    },
    UpdateNameValue: (id, newName) => {
      dispatch({type: 'UPDATENAME', id: id, Name: newName});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedPinsList);
