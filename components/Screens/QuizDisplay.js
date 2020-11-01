import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import {
	View,
	ScrollView,
	Text,
	ActivityIndicator,
	RefreshControl,
	BackHandler,
} from "react-native"

import { Button } from "react-native-paper"

import QuizCard from "../../containers/QuizCard"
import Timer from "../Utils/Timer"
import Modal from "../Utils/Modal"

const QuizDisplay = props => {
	// Disable back button
	const backAction = () => {
		return true
	}

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", backAction)

		return () =>
			BackHandler.removeEventListener("hardwareBackPress", backAction)
	}, [])

	const {
		loading,
		getQuestions,
		numberOfQuestions,
		questions,
		category,
		difficulty,
		navigation,
		compileResults,
		quitQuiz,
	} = props

	const [currentQuiz, setCurrentQuiz] = useState({})
	const [index, setIndex] = useState(0)
	const [refreshing, setRefreshing] = useState(false)

	// Modal props
	const [modalStatus, setModalStatus] = useState(false)
	const [modalText, setModalText] = useState("")
	const [
		handleModalConfirmation,
		setHandleModalConfirmation,
	] = useState(() => {})

	useEffect(() => {
		getQuestions(numberOfQuestions, category.value, difficulty)
	}, [])

	useEffect(() => {
		// check if quiz questions exist
		if (questions.length < 1) return
		setCurrentQuiz(questions[index])
	}, [questions, index])

	// Helper functions
	const onRefresh = async () => {
		// Do not refresh if there are quiz questions already available
		if (questions.length > 0) return

		setRefreshing(true)
		await getQuestions(numberOfQuestions, category.value, difficulty)
		setRefreshing(false)
	}

	const hideModal = () => {
		setModalStatus(false)
	}

	const cancelQuiz = async () => {
		hideModal()
		await quitQuiz()
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

	const openSubmitModal = () => {
		setModalStatus(true)
		setModalText(
			"This quiz will end and cannot be continued. Are you sure you want to submit?"
		)
		setHandleModalConfirmation(() => handleQuizSubmit)
	}

	const openCancelModal = () => {
		setHandleModalConfirmation(() => cancelQuiz)
		setModalStatus(true)
		setModalText(
			"You have not submitted this quiz and cannot continue. Are you sure you want to cancel?"
		)
	}

	const handleQuizSubmit = async () => {
		console.log(questions)
		hideModal()
		await compileResults()
		navigation.navigate("Results")
	}

	const markup = loading ? (
		<ActivityIndicator animating={loading} color="red" />
	) : questions.length > 0 ? (
		<>
			<View>
				<View>
					<Timer submit={handleQuizSubmit} minutes={10} seconds={0} />

					<Text>
						{index + 1}/{numberOfQuestions}
					</Text>
				</View>

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
						onPress={() => openCancelModal()}
					>
						Quit Quiz
					</Button>

					<Button
						color="green"
						mode="contained"
						onPress={() => openSubmitModal()}
					>
						Submit
					</Button>
				</View>
			</View>

			<Modal
				modalStatus={modalStatus}
				handleConfirmation={handleModalConfirmation}
				modalText={modalText}
				setModalStatus={setModalStatus}
			/>
		</>
	) : (
		<Text>
			There are no questions found for this quiz configuration, click{" "}
			<Button mode="outlined" onPress={() => cancelQuiz()}>
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
	compileResults: PropTypes.func.isRequired,
	quitQuiz: PropTypes.func.isRequired,
}

export default QuizDisplay
