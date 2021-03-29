import React, { useEffect } from 'react'
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {Card, Text as TextElement, Button as ButtonElement } from "react-native-elements";
import {connect} from "react-redux";
import { getStacks } from '../utils/helper'
import { addNewStack } from '../actions'


const EmptyStack = () => {
	return(
		<View style={styles.center}>
			<TextElement h3>
				No Stack Found!!!
			</TextElement>

		</View>
	)
}

const Home = (props) => {

	useEffect(() => {
		getStacks().then(
			stack => {props.fetchStacks(stack)}
		);
		}
	, [])

	const renderItem = ({ item }) => {
		const stack = props.stacks[item];
		return (
			<Card>
				<Card.Title>{stack.title}</Card.Title>
				<Card.Divider/>
				<View style={styles.center}>
					<Text style={{ marginBottom: 10 }}>
						Cards Count: {stack.question.length}
					</Text>
					<ButtonElement
						type="outline"
						title="See Details"
					 	onPress={() => props.navigation.navigate('StackDetail', { stackId: item })}/>
				</View>
			</Card>
		);
	};

  return (
    <View style={styles.container}>
			<FlatList
				data={Object.keys(props.stacks)}
        renderItem={renderItem}
				keyExtractor={(item) => item}
				ListEmptyComponent={EmptyStack } />
			<TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate('NewStack')}>
				<Text style={{ color: '#ffffff', fontSize: 30 }}>+</Text>
			</TouchableOpacity>
    </View>
	);
};

const styles = StyleSheet.create({
	center: {
		flex: 1,
		alignItems: 'center',
    justifyContent: 'center',
	},
  container: {
		flex: 1,
		backgroundColor: '#dce3de',
    padding: 10
  },
  btn: {
		right: 30,
		width: 55,
		height: 55,
		bottom: 30,
		borderRadius: 50,
		position: 'absolute',
		alignItems: 'center',
   	justifyContent: 'center',
		backgroundColor: '#ee6e73',
  },
});

function mapDispatchToProps(dispatch) {
  return {
    fetchStacks: (stack) => {
      dispatch(addNewStack(stack))
    }
  }
}


function mapStateToProps(stack) {
  return {
    stacks: stack,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
