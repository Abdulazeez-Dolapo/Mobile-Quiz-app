import CorrectAnswers from "../components/CorrectAnswers"
import { connect } from "react-redux"
import { quitQuiz } from "../redux/quiz/actions"

const mapStateToProps = state => ({
	score: state.quiz.score,
	questions: state.quiz.questions,
	numberOfQuestions: state.quiz.numberOfQuestions,
	questions: state.quiz.questions,
})

const mapDispatchToProps = dispatch => ({
	quitQuiz: () => dispatch(quitQuiz()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CorrectAnswers)
