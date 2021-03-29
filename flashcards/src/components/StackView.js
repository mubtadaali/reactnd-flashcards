import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button as ButtonElement, Card, Text} from "react-native-elements";
import {connect} from "react-redux";

const StackView = ({ navigation, stack, stackId }) => {
	const handleQuizPressed = () => {
		if (stack.question.length === 0) {
			alert('Deck has no cards, add Card first!!!')
		} else {
			navigation.navigate('Quiz', { stackId })
		}
	};

  return (
    <View style={styles.container}>
			<Card containerStyle={{ height: '75%', width: '85%', paddingTop: 50}}>
				<Card.Title h3>{stack.title} </Card.Title>
				<Card.Divider/>
				<View style={{ height: '85%', justifyContent: "space-between"}}>
					<View style={styles.center}>
						<Text h4> Cards Count: {stack.question.length} </Text>
					</View>
					<View>
						<ButtonElement
							type="solid"
							title="Start a Quiz"
							containerStyle={styles.btn}
							onPress={() => handleQuizPressed()}/>
						<ButtonElement
							type="outline"
							title="Add Card"
							buttonStyle={{ borderColor: '#000000'}}
							containerStyle={styles.btn}
							onPress={() => navigation.navigate('NewCard', { stackId })}/>

					</View>
				</View>
			</Card>
    </View>
	);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#dce3de',
		justifyContent: 'space-around'
  },
	btn: {
  	margin: 10
	},
	center: {
		alignItems: 'center',
    justifyContent: 'center',
	},
});

function mapStateToProps(state, { route }) {
  const { stackId } = route.params;
  return {
    stackId,
    stack: state[stackId],
  };
}
export default connect(mapStateToProps)(StackView);
