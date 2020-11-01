import React from "react"
import PropTypes from "prop-types"
import { Text, View } from "react-native"

const CorrectAnswerCard = props => {
	const {
		quiz: { question, correctAnswer },
		index,
	} = props

	return (
		<View>
			<Text>{index + 1}.</Text>

			<Text>{question}</Text>

			<Text>{correctAnswer}</Text>
		</View>
	)
}

CorrectAnswerCard.propTypes = {
	quiz: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
}

export default CorrectAnswerCard
