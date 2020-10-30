import { createSelector } from "reselect"

const getQuestions = state => state.quiz.questions

export const getCorrectAnswerArray = questions => {
	return questions.filter(
		question => question.correctAnswer == question.chosenAnswer
	)
}

export const getCorrectSelectedAnswersArray = createSelector(
	[getQuestions],
	getCorrectAnswerArray
)
