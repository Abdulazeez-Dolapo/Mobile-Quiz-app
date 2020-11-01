import DifficultyMode from "../components/Screens/DifficultyMode"
import { connect } from "react-redux"
import { setDifficulty } from "../redux/quiz/actions"

const mapDispatchToProps = dispatch => ({
	setDifficulty: difficulty => dispatch(setDifficulty(difficulty)),
})

export default connect(null, mapDispatchToProps)(DifficultyMode)
