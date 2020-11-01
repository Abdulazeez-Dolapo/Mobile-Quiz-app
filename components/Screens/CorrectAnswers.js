import React, { useEffect } from "react"
import { View, Text, BackHandler, FlatList } from "react-native"
import PropTypes from "prop-types"

import { Button } from "react-native-paper"

import CorrectAnswerCard from "../Cards/CorrectAnswerCard"

const CorrectAnswers = props => {
	const { numberOfQuestions, score, quitQuiz, navigation, questions } = props

	const backAction = () => {
		return true
	}

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", backAction)

		return () =>
			BackHandler.removeEventListener("hardwareBackPress", backAction)
	}, [])

	const reset = async () => {
		await quitQuiz()
		navigation.navigate("Mode")
	}

	return (
		<View>
			<Text>
				{score}/{numberOfQuestions}
			</Text>

			<FlatList
				data={questions}
				renderItem={({ item }) => <CorrectAnswerCard quiz={item} />}
				keyExtractor={item => item.id}
			/>

			<View>
				<Button color="green" mode="contained" onPress={() => reset()}>
					Take new quiz
				</Button>
			</View>
		</View>
	)
}

CorrectAnswers.propTypes = {
	numberOfQuestions: PropTypes.number.isRequired,
	score: PropTypes.number.isRequired,
	quitQuiz: PropTypes.func.isRequired,
	questions: PropTypes.array.isRequired,
}

export default CorrectAnswers