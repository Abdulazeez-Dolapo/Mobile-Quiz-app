import React from "react"
import PropTypes from "prop-types"
import { Text, FlatList } from "react-native"

const QuizCard = props => {
	const {
		quiz: { question, options },
	} = props

	return (
		<FlatList
			ListHeaderComponent={<Text>{question}</Text>}
			data={options}
			renderItem={({ item }) => <Text>{item}</Text>}
			keyExtractor={item => item}
		/>
	)
}

QuizCard.propTypes = {
	quiz: PropTypes.object.isRequired,
}

export default QuizCard
