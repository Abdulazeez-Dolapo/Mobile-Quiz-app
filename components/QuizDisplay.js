import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import {
	View,
	ScrollView,
	Text,
	ActivityIndicator,
	RefreshControl,
	Alert,
} from "react-native"

import { Button } from "react-native-paper"

import QuizCard from "../containers/QuizCard"
import Timer from "./Timer"

const QuizDisplay = props => {
	const {
		loading,
		getQuestions,
		numberOfQuestions,
		questions,
		category,
		difficulty,
		navigation,
	} = props

	const [currentQuiz, setCurrentQuiz] = useState({})
	const [index, setIndex] = useState(0)
	const [refreshing, setRefreshing] = useState(false)

	useEffect(() => {
		getQuestions(numberOfQuestions, category.value, difficulty)
	}, [])

	useEffect(() => {
		// check if quiz questions exist
		if (questions.length < 1) return
		setCurrentQuiz(questions[index])
	}, [questions, index])

	const onRefresh = async () => {
		// Do not refresh if there are quiz questions already available
		if (questions.length > 0) return

		setRefreshing(true)
		await getQuestions(numberOfQuestions, category.value, difficulty)
		setRefreshing(false)
	}

	const navigateToHome = () => {
		navigation.navigate("Mode")
	}

	const previous = () => {
		if (index < 1) return
		const newIndex = index - 1
		setIndex(newIndex)
	}

	const next = () => {
		if (index === questions.length - 1) return
		const newIndex = index + 1
		setIndex(newIndex)
	}

	const submit = () => {
		// Alert.alert("Hello there")
	}

	const markup = loading ? (
		<ActivityIndicator animating={loading} color="red" />
	) : questions.length > 0 ? (
		<View>
			<Timer submit={submit} minutes={10} seconds={0} />

			<QuizCard quiz={currentQuiz} index={index} />

			<View>
				<Button
					disabled={index < 1}
					mode="contained"
					onPress={() => previous()}
				>
					Previous
				</Button>

				<Button
					disabled={index === questions.length - 1}
					mode="contained"
					onPress={() => next()}
				>
					Next
				</Button>
			</View>

			<View>
				<Button
					color="red"
					mode="contained"
					onPress={() => navigateToHome()}
				>
					Cancel
				</Button>

				<Button color="green" mode="contained" onPress={() => submit()}>
					Submit
				</Button>
			</View>
		</View>
	) : (
		<Text>
			There are no questions found for this quiz configuration, click{" "}
			<Button mode="outlined" onPress={() => navigateToHome()}>
				Here
			</Button>{" "}
			to go back or pull down the screen to try again
		</Text>
	)

	return (
		<ScrollView
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>
			{markup}
		</ScrollView>
	)
}

QuizDisplay.propTypes = {
	numberOfQuestions: PropTypes.number.isRequired,
	questions: PropTypes.array.isRequired,
	category: PropTypes.object.isRequired,
	difficulty: PropTypes.string.isRequired,
	getQuestions: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
}

export default QuizDisplay
