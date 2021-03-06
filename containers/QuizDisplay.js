import QuizDisplay from "../components/Screens/QuizDisplay"
import { connect } from "react-redux"
import { getQuestions, compileResults, quitQuiz } from "../redux/quiz/actions"

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
	compileResults: () => dispatch(compileResults()),
	quitQuiz: () => dispatch(quitQuiz()),
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizDisplay)
