import React, { useEffect } from "react"
import { View, Text, BackHandler } from "react-native"
import PropTypes from "prop-types"

import { Button } from "react-native-paper"

const ResultsDisplay = props => {
	const {
		numberOfQuestions,
		score,
		category,
		difficulty,
		quitQuiz,
		navigation,
	} = props

	const backAction = () => {
		return true
	}

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", backAction)

		return () =>
			BackHandler.removeEventListener("hardwareBackPress", backAction)
	}, [])

	const viewCorrectAnswers = () => {
		navigation.navigate("Correct-Answers")
	}

	const reset = async () => {
		await quitQuiz()
		navigation.navigate("Mode")
	}

	return (
		<View>
			<Text>Congratulations! You completed the quiz</Text>

			<Text>Category: {category.name}</Text>

			<Text>Difficulty: {difficulty}</Text>

			<Text>
				{score}/{numberOfQuestions}
			</Text>

			<View>
				<Button
					color="blue"
					mode="contained"
					onPress={() => viewCorrectAnswers()}
				>
					View answers
				</Button>

				<Button color="green" mode="contained" onPress={() => reset()}>
					Take new quiz
				</Button>
			</View>
		</View>
	)
}

ResultsDisplay.propTypes = {
	numberOfQuestions: PropTypes.number.isRequired,
	score: PropTypes.number.isRequired,
	category: PropTypes.object.isRequired,
	difficulty: PropTypes.string.isRequired,
	quitQuiz: PropTypes.func.isRequired,
}

export default ResultsDisplay
