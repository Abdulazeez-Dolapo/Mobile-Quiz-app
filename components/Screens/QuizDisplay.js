import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import {
	View,
	ScrollView,
	Text,
	ActivityIndicator,
	RefreshControl,
	BackHandler,
	StyleSheet,
} from "react-native"

import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"

import { Button, Subheading, Title } from "react-native-paper"

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
		<ActivityIndicator animating={loading} color="red" size={200} />
	) : questions.length > 0 ? (
		<>
			<View>
				<View style={{ ...styles.row, ...styles.timer }}>
					<Timer submit={handleQuizSubmit} minutes={100} seconds={0} />

					<Button
						mode="text"
						uppercase={false}
						onPress={() => openCancelModal()}
					>
						<Subheading style={{ color: "white" }}>Quit Quiz</Subheading>
						<FontAwesome5 name="power-off" size={15} color="white" />
					</Button>
				</View>

				<Subheading style={{ ...styles.gray }}>
					{category.name} Quiz
				</Subheading>

				<Title style={{ ...styles.white }}>
					Question {index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}
					<Title style={{ ...styles.gray }}>/{numberOfQuestions}</Title>
				</Title>

				<QuizCard quiz={currentQuiz} />

				<View style={styles.controls}>
					<Button
						disabled={index < 1}
						mode="contained"
						style={styles.buttons}
						uppercase={false}
						color="#3DD3F6"
						onPress={() => previous()}
					>
						<FontAwesome5
							name="angle-double-left"
							size={15}
							color="white"
						/>
						<Subheading style={{ ...styles.white }}>Previous</Subheading>
					</Button>

					<Button
						disabled={index === questions.length - 1}
						mode="contained"
						style={styles.buttons}
						color="#3DD3F6"
						uppercase={false}
						onPress={() => next()}
					>
						<Subheading style={{ ...styles.white }}>Next</Subheading>
						<FontAwesome5
							name="angle-double-right"
							size={15}
							color="white"
						/>
					</Button>
				</View>

				<View style={{ ...styles.row, paddingTop: 20 }}>
					<Button
						color="green"
						mode="contained"
						style={styles.buttons}
						uppercase={false}
						onPress={() => openSubmitModal()}
					>
						<Subheading style={{ ...styles.white }}>Submit</Subheading>
						<FontAwesome5 name="check-double" size={15} color="white" />
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
			style={styles.container}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>
			{markup}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#141A33",
		flex: 1,
		paddingVertical: 5,
		paddingHorizontal: 12,
	},
	row: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
		justifyContent: "space-evenly",
	},
	timer: {
		justifyContent: "space-between",
	},
	gray: {
		color: "gray",
	},
	white: {
		color: "white",
	},
	controls: {
		flexDirection: "row",
		paddingTop: 20,
		paddingHorizontal: 4,
		flexWrap: "wrap",
		alignItems: "center",
		justifyContent: "space-between",
	},
	buttons: {
		width: 140,
		height: 45,
		borderRadius: 15,
	},
})

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
