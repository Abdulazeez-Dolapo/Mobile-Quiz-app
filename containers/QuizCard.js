import QuizCard from "../components/QuizCard"
import { connect } from "react-redux"
import { selectAnswer } from "../redux/quiz/actions"

const mapDispatchToProps = dispatch => ({
	selectAnswer: (chosenAnswer, questionId) =>
		dispatch(selectAnswer(chosenAnswer, questionId)),
})

export default connect(null, mapDispatchToProps)(QuizCard)
