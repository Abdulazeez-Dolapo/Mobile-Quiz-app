import QuizDisplay from "../components/QuizDisplay"
import { connect } from "react-redux"
import { getQuestions } from "../redux/quiz/actions"

const mapStateToProps = state => ({
	questions: state.quiz.questions,
	numberOfQuestions: state.quiz.numberOfQuestions,
	category: state.quiz.category,
	difficulty: state.quiz.difficulty,
	loading: state.quiz.loading,
})

const mapDispatchToProps = dispatch => ({
	getQuestions: (numberOfQuestions, category, difficulty) =>
		dispatch(getQuestions(numberOfQuestions, category, difficulty)),
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizDisplay)
