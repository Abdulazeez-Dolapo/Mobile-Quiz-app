import {
	SET_CATEGORY,
	SET_DIFFICULTY,
	SET_QUESTIONS,
	SET_NUMBER_OF_QUESTIONS,
	SET_LOADING,
	SET_ERRORS,
	CLEAR_ERRORS,
	SELECT_ANSWER,
	COMPILE_RESULTS,
	QUIT_QUIZ,
} from "../types"

import Images from "~assets/images"

const initialState = {
	questions: [],
	difficulty: "",
	numberOfQuestions: 0,
	category: {},
	categories: [
		{
			value: 9,
			name: "General Knowledge",
			icon: Images.general,
		},
		{
			value: 15,
			name: "Video Games",
			icon: Images.video,
		},
		{
			value: 26,
			name: "Celebrities",
			icon: Images.celebrity,
		},
		{
			value: 12,
			name: "Music",
			icon: Images.music,
		},
		{
			value: 22,
			name: "Geography",
			icon: Images.geography,
		},
		{
			value: 10,
			name: "Books",
			icon: Images.books,
		},
		{
			value: 31,
			name: "Japanese Anime and Manga",
			icon: Images.anime,
		},
		{
			value: 14,
			name: "Television",
			icon: Images.television,
		},
		{
			value: 16,
			name: "Board Games",
			icon: Images.board,
		},
		{
			value: 21,
			name: "Sports",
			icon: Images.sport,
		},
		{
			value: 28,
			name: "Vehicles",
			icon: Images.vehicle,
		},
		{
			value: 17,
			name: "Science and Nature",
			icon: Images.science,
		},
		{
			value: 20,
			name: "Mythology",
			icon: Images.mythology,
		},
		{
			value: 23,
			name: "History",
			icon: Images.history,
		},
		{
			value: 27,
			name: "Animals",
			icon: Images.animal,
		},
		{
			value: 11,
			name: "Films",
			icon: Images.films,
		},
		{
			value: 29,
			name: "Comics",
			icon: Images.comic,
		},
		{
			value: 32,
			name: "Cartoons and Animations",
			icon: Images.cartoon,
		},
		{
			value: 18,
			name: "Computers",
			icon: Images.computer,
		},
		// { value: 19, name: "Science: Mathematics" },
		// { value: 24, name: "Politics" },
		// { value: 25, name: "Arts" },
		// { value: 13, name: "Musicals and Theatres" },
		// { value: 30, name: "Science: Gadgets" },
	],
	errors: [],
	loading: false,
	score: 0,
}

export default (state = initialState, { payload, type }) => {
	switch (type) {
		case SET_CATEGORY:
			return {
				...state,
				category: state.categories.find(
					category => category.value == payload
				),
			}

		case SET_DIFFICULTY:
			return {
				...state,
				difficulty: payload,
			}

		case SET_NUMBER_OF_QUESTIONS:
			return {
				...state,
				numberOfQuestions: payload,
			}

		case SET_QUESTIONS:
			return {
				...state,
				questions: payload,
				loading: false,
			}

		case SET_LOADING:
			return {
				...state,
				loading: true,
			}

		case SELECT_ANSWER:
			return {
				...state,
				questions: state.questions.map(question => {
					if (question.id === payload.questionId) {
						question.chosenAnswer = payload.chosenAnswer
					}

					return question
				}),
			}

		case SET_ERRORS:
			return {
				...state,
				errors: payload,
				loading: false,
			}

		case CLEAR_ERRORS:
			return {
				...state,
				errors: [],
			}

		case COMPILE_RESULTS:
			const correctAnswersArray = state.questions.filter(
				question => question.correctAnswer == question.chosenAnswer
			)

			return {
				...state,
				score: correctAnswersArray.length,
			}

		case QUIT_QUIZ:
		default:
			return state
	}
}
