import {
	SET_CATEGORY,
	SET_DIFFICULTY,
	SET_QUESTIONS,
	SET_NUMBER_OF_QUESTIONS,
	SET_LOADING,
	SET_ERRORS,
	CLEAR_ERRORS,
} from "../types"

const initialState = {
	questions: [],
	difficulty: "",
	numberOfQuestions: 0,
	category: {},
	categories: [
		{ value: 9, name: "General Knowledge" },
		{ value: 10, name: "Entertainment: Books" },
		{ value: 11, name: "Entertainment: Films" },
		{ value: 12, name: "Entertainment: Music" },
		{ value: 13, name: "Entertainment: Musicals and Theatres" },
		{ value: 14, name: "Entertainment: Television" },
		{ value: 15, name: "Entertainment: Video Games" },
		{ value: 16, name: "Entertainment: Board Games" },
		{ value: 17, name: "Science and Nature" },
		{ value: 18, name: "Science: Computers" },
		{ value: 19, name: "Science: Mathematics" },
		{ value: 20, name: "Mythology" },
		{ value: 21, name: "Sports" },
		{ value: 22, name: "Geography" },
		{ value: 23, name: "History" },
		{ value: 24, name: "Politics" },
		{ value: 25, name: "Arts" },
		{ value: 26, name: "Celebrities" },
		{ value: 27, name: "Animals" },
		{ value: 28, name: "Vehicles" },
		{ value: 29, name: "Entertainment: Comics" },
		{ value: 30, name: "Science: Gadgets" },
		{ value: 31, name: "Entertainment: Japanese Anime and Manga" },
		{ value: 32, name: "Entertainment: Cartoons and Animations" },
	],
	errors: [],
	loading: false,
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

		default:
			return state
	}
}
