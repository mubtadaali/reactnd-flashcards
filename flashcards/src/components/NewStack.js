import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Button as ButtonElement} from "react-native-elements";
import {saveNewStack} from "../utils/helper";
import {addNewStack} from "../actions";
import {connect} from "react-redux";

const NewStack = (props) => {
	const [title, setTitle] = useState('');

	const handleNewStack = () => {
		saveNewStack(title)
			.then((newStack) => {
				setTitle('')
				props.saveStack(newStack);
        props.navigation.navigate('StackDetail', { stackId: Object.keys(newStack)[0] });
      });
	};

  return (
    <View style={styles.container}>
			<Text style={{ fontWeight: 'bold', fontSize: 20 }}>
				Add Text for Stack Title
			</Text>
			<TextInput
        style={styles.input}
        placeholder="Add title here..."
        onChangeText={t => setTitle(t)}
        defaultValue={title}
      />
			<ButtonElement
				type="outline"
				title="Add Stack"
				onPress={() => handleNewStack()}/>

    </View>
	);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
		padding: 30,
		paddingTop: 150,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
	input: {
  	height: 40,
		width: 300,
		marginTop: 10,
		marginBottom: 15,
		borderWidth: 1,
		borderColor: '#000000',
	}
});

function mapDispatchToProps(dispatch) {
  return {
    saveStack: (newStack) => {
      dispatch(addNewStack(newStack))
    }
  }
}

export default connect(null, mapDispatchToProps)(NewStack);
