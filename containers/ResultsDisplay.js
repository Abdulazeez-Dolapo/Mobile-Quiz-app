import ResultsDisplay from "../components/Screens/ResultsDisplay"
import { connect } from "react-redux"
import { quitQuiz } from "../redux/quiz/actions"

const mapStateToProps = state => ({
	score: state.quiz.score,
	numberOfQuestions: state.quiz.numberOfQuestions,
	category: state.quiz.category,
	difficulty: state.quiz.difficulty,
})

const mapDispatchToProps = dispatch => ({
	quitQuiz: () => dispatch(quitQuiz()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ResultsDisplay)
