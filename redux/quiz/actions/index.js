// This library helps to convert html entities in the questions and answers to utf-8 characters
import he from "he"

import { fetchQuestions } from "../../../services/quiz"
import {
	SET_QUESTIONS,
	SET_LOADING,
	SET_ERRORS,
	CLEAR_ERRORS,
	SET_DIFFICULTY,
	SET_CATEGORY,
	SET_NUMBER_OF_QUESTIONS,
	SELECT_ANSWER,
	COMPILE_RESULTS,
	QUIT_QUIZ,
} from "../types"

export const getQuestions = (
	numberOfQuestions,
	category,
	difficulty
) => async dispatch => {
	try {
		dispatch(setLoading())
		const { data } = await fetchQuestions(
			numberOfQuestions,
			category,
			difficulty
		)

		const questions = data.results.map(question => {
			const index = Math.floor(Math.random() * (3 - 0 + 1))
			const formattedQuestion = {
				id: Math.random().toString(16).slice(2, -1),
				correctAnswer: he.decode(question.correct_answer),
				chosenAnswer: "",
				question: he.decode(question.question),
				options: question.incorrect_answers.map(option =>
					he.decode(option)
				),
			}

			formattedQuestion.options.splice(
				index,
				0,
				formattedQuestion.correctAnswer
			)

			return formattedQuestion
		})

		dispatch({
			type: SET_QUESTIONS,
			payload: questions,
		})
	} catch (error) {
		dispatch(setErrors(error.response))
	}
}

const getNumberOfQuestions = difficulty => {
	if (difficulty === "easy") return 10
	if (difficulty === "medium") return 15
	if (difficulty === "hard") return 25
}

export const setDifficulty = difficulty => dispatch => {
	const numberOfQuestions = getNumberOfQuestions(difficulty)
	dispatch({ type: SET_NUMBER_OF_QUESTIONS, payload: numberOfQuestions })

	dispatch({ type: SET_DIFFICULTY, payload: difficulty })
}

export const setCategory = category => dispatch => {
	dispatch({ type: SET_CATEGORY, payload: category })
}

export const selectAnswer = (chosenAnswer, questionId) => dispatch => {
	dispatch({ type: SELECT_ANSWER, payload: { chosenAnswer, questionId } })
}

export const clearErrors = () => dispatch => {
	dispatch({ type: CLEAR_ERRORS })
}

export const setErrors = errors => dispatch => {
	dispatch({ type: SET_ERRORS, payload: errors })
}

export const setLoading = () => dispatch => {
	dispatch({ type: SET_LOADING })
}

export const compileResults = () => dispatch => {
	dispatch({ type: COMPILE_RESULTS })
}

export const quitQuiz = () => dispatch => {
	dispatch({ type: QUIT_QUIZ })
}
