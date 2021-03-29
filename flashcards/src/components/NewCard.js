import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Button as ButtonElement} from "react-native-elements";
import React, {useState} from 'react';
import {connect} from "react-redux";

import { addNewCard } from '../actions'
import { saveNewCard } from '../utils/helper'

const NewCard = (props) => {
	const [title, setTitle] = useState('');
	const [answer, setAnswer] = useState('');

	const handleNewCard = () => {
		saveNewCard(props.stackId, {title, answer})
			.then((newStack) => {
				setTitle('');
				setAnswer('');
				props.saveCard(props.stackId, newStack);
        props.navigation.navigate('StackDetail', { stackId: props.stackId });
      });
	};

  return (
    <View style={styles.container}>
			<Text style={{ fontWeight: 'bold', fontSize: 20 }}>
				Add Text for Card Title
			</Text>
			<TextInput
        style={styles.input}
        placeholder="Add title here..."
        onChangeText={t => setTitle(t)}
        defaultValue={title}
      />

			<Text style={{ fontWeight: 'bold', fontSize: 20 }}>
				Add Text for Answer
			</Text>
			<TextInput
        style={styles.input}
        placeholder="Add answer here..."
        onChangeText={t => setAnswer(t)}
        defaultValue={answer}
      />

			<ButtonElement
				type="solid"
				title="Add Card"
				onPress={() => handleNewCard()}/>

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

function mapStateToProps(state, { route }) {
  const { stackId } = route.params;
  return {
    stackId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveCard: (stackID, newCard) => {
      dispatch(addNewCard(stackID, newCard))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCard);
