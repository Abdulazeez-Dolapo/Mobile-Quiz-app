import SelectCategory from "../components/SelectCategory"
import { connect } from "react-redux"
import { setCategory } from "../redux/quiz/actions"

const mapStateToProps = state => ({
	category: state.quiz.category,
	categories: state.quiz.categories,
})

const mapDispatchToProps = dispatch => ({
	setCategory: category => dispatch(setCategory(category)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectCategory)
