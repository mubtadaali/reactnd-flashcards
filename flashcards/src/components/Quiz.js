import {connect} from "react-redux";
import React, { useEffect, useState } from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Button as ButtonElement, Card, Text} from "react-native-elements";

import { addNewStack } from '../actions';
import { clearNotifications, getStacks, scheduleLocalNotification } from '../utils/helper';

const Quiz = ({ navigation, stack, fetchStacks }) => {
	const [correctCount, setCorrectCount] = useState(0);
	const [wrongCount, setWrongCount] = useState(0);
	const [questionIdx, setQuestionIdx] = useState(0);
	const [showAnswer, setShowAnswer] = useState(false);
	const [showScore, setShowScore] = useState(false);

	useEffect(() => {
		getStacks().then(
			stack => {fetchStacks(stack)}
		);
		}
	, [])

	const resetQuiz = () => {
		setWrongCount(0);
		setQuestionIdx(0);
		setCorrectCount(0);
		setShowScore(false);
		setShowAnswer(false);
	}

	const handleAnswer = () => {
		if ((questionIdx + 1) === stack.question.length) {
			setShowScore(true)
		} else {
			setQuestionIdx(questionIdx + 1);
			setShowAnswer(false);
		}
	}

	const handleCorrectAnswer = () => {
		setCorrectCount(correctCount + 1)
		handleAnswer();
	};

	const handleWrongAnswer = () => {
		setWrongCount(wrongCount + 1)
		handleAnswer();
	};

	const renderScoreSection = () => {
		clearNotifications()
		.then(scheduleLocalNotification());

		return(
			<View style={styles.answerSection}>
				<Text h4>TOTAL QUESTION: { stack.question.length } </Text>

				<View style={{ marginTop: 15, marginBottom: 15 }}>
					<Text h4>CORRECT ANSWER: { correctCount } </Text>
					<Text h4>WRONG ANSWER: { wrongCount } </Text>
				</View>

				<Text h3 style={{ color: '#689156' }}>
					SCORE: { (correctCount / stack.question.length * 100).toFixed() }%
				</Text>

				<View>
					<ButtonElement
						type="outline"
						title="Reset Quiz"
						containerStyle={{ marginTop: 10, marginBottom: 5}}
						onPress={() => resetQuiz() }/>

					<ButtonElement
						type="solid"
						title="Back To Deck"
						containerStyle={{ marginTop: 10, marginBottom: 5}}
						onPress={() => navigation.navigate('Home')}/>
				</View>


			</View>
		)
	}
	const renderAnswerSection = () => {
		return (
			<View style={styles.answerSection}>
				<Text h3 style={{ color: '#689156' }}>
					{ stack.question[questionIdx].answer }
				</Text>

				<TouchableOpacity style={[styles.optBtn, {backgroundColor: '#3a5e3a'}]} onPress={() => handleCorrectAnswer()}>
					<Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>CORRECT</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.optBtn, {backgroundColor: '#ed4747'}]} onPress={() => handleWrongAnswer()}>
					<Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>WRONG</Text>
				</TouchableOpacity>

			</View>
		)
	}

	if (!stack) {
		return (
			<Text h3 style={styles.center}>
				LOADING!!!
			</Text>
		)
	}
  return (
    <View style={styles.container}>
			<Card containerStyle={{ height: '75%', width: '85%', paddingTop: 50}}>
				<Card.Title h3> Quiz - {stack.title} </Card.Title>
				<Card.Divider/>
				{
					showScore?
						renderScoreSection():
						<View style={{ height: '85%', justifyContent: "flex-start"}}>
							<View style={styles.questionCount}>
								<Text style={{ fontSize: 16, color: 'grey'}}>
									Cards: {questionIdx + 1}/{stack.question.length}
								</Text>
							</View>

							{/* Question Section */}
							<View style={styles.question}>
								<Text h4> {stack.question[questionIdx] && stack.question[questionIdx].title} </Text>
							</View>

							{
								showAnswer?
									renderAnswerSection():
									<TouchableOpacity style={[styles.btn, styles.center]} onPress={() => setShowAnswer(true)}>
										<Text style={{ color: '#dce3de', fontSize: 18, fontWeight: 'bold' }}>Show Answer</Text>
									</TouchableOpacity>
							}
						</View>
					}

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
  answerSection: {
  	margin: 10,
		paddingTop: 20,
    alignItems: 'center',
  },
	btn: {
  	backgroundColor: '#599440',
		margin: 10,
  	padding: 10
	},
	optBtn: {
		alignItems: 'center',
    justifyContent: 'center',
		margin: 10,
		width: '95%',
  	padding: 10
	},
	questionCount: {
		alignItems: 'flex-end',
    justifyContent: 'flex-end',
	},
	center: {
		alignItems: 'center',
    justifyContent: 'center',
	},
	question: {
  	paddingTop: 20,
		alignItems: 'center',
    justifyContent: 'center',
	},
});

// function mapStateToProps(state, { route }) {
//   const { stack } = route.params;
//   return {
//     stack
//   };
// }

function mapDispatchToProps(dispatch) {
  return {
    fetchStacks: (stack) => {
      dispatch(addNewStack(stack))
    }
  }
}


function mapStateToProps(stack, {route}) {
  const { stackId } = route.params;
  return {
    stack: stack[stackId],
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
