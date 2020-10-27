import React from "react"
import PropTypes from "prop-types"
import { View, Text, FlatList } from "react-native"

const QuizCard = props => {
	const {
		quiz: { question, options },
	} = props

	return (
		<View>
			<Text>{question}</Text>

			<FlatList
				data={options}
				renderItem={({ item }) => <Text>{item}</Text>}
				keyExtractor={item => item}
			/>
		</View>
	)
}

QuizCard.propTypes = {
	quiz: PropTypes.object.isRequired,
}

export default QuizCard
