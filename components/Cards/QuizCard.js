import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { FlatList, View, StyleSheet } from "react-native"

import { RadioButton, Subheading } from "react-native-paper"

import { generalStyles } from "../../utils/styling"

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
		<View style={styles.card}>
			<Subheading style={{ ...styles.whiteText, marginBottom: 20 }}>
				{question}
			</Subheading>

			<RadioButton.Group
				onValueChange={value => setSelectedAnswer(value)}
				value={selectedAnswer}
			>
				<FlatList
					data={options}
					renderItem={({ item }) => (
						<View
							style={
								selectedAnswer === item
									? { ...styles.optionContainer, borderColor: "green" }
									: { ...styles.optionContainer }
							}
						>
							<RadioButton.Item
								color="green"
								label={item}
								value={item}
								labelStyle={
									selectedAnswer === item
										? { ...styles.greenText, ...styles.option }
										: { ...styles.whiteText, ...styles.option }
								}
							/>
						</View>
					)}
					keyExtractor={item => item}
				/>
			</RadioButton.Group>
		</View>
	)
}

const styles = StyleSheet.create({
	...generalStyles,
	card: {
		paddingTop: 20,
	},
	optionContainer: {
		backgroundColor: "#181D36",
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 20,
		marginBottom: 10,
	},
	option: {
		fontWeight: "100",
		fontSize: 14,
	},
})

QuizCard.propTypes = {
	quiz: PropTypes.object.isRequired,
	selectAnswer: PropTypes.func.isRequired,
}

export default QuizCard
