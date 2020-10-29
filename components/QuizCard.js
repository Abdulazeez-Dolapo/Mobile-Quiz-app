import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Text, FlatList, View } from "react-native"
import { RadioButton } from "react-native-paper"

const QuizCard = props => {
	const {
		quiz: { question, options, chosenAnswer, id },
		selectAnswer,
	} = props

	const [selectedAnswer, setSelectedAnswer] = useState(chosenAnswer)

	useEffect(() => {
		selectAnswer(selectedAnswer, id)
	}, [selectedAnswer])

	useEffect(() => {
		setSelectedAnswer(chosenAnswer)
	}, [props.quiz])

	return (
		<View>
			<Text>{question}</Text>

			<RadioButton.Group
				onValueChange={value => setSelectedAnswer(value)}
				value={selectedAnswer}
			>
				<FlatList
					data={options}
					renderItem={({ item }) => (
						<RadioButton.Item color="blue" label={item} value={item} />
					)}
					keyExtractor={item => item}
				/>
			</RadioButton.Group>
		</View>
	)
}

QuizCard.propTypes = {
	quiz: PropTypes.object.isRequired,
	selectAnswer: PropTypes.func.isRequired,
}

export default QuizCard
