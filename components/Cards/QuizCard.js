import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Text, FlatList, View, StyleSheet } from "react-native"
import { RadioButton, Subheading } from "react-native-paper"

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
		console.log(props.quiz)
		setSelectedAnswer(chosenAnswer)
	}, [props.quiz])

	return (
		<View style={styles.card}>
			<Subheading style={{ ...styles.white, marginBottom: 20 }}>
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
										? { ...styles.green, ...styles.option }
										: { ...styles.white, ...styles.option }
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
	card: {
		paddingTop: 20,
	},
	white: {
		color: "white",
	},
	green: {
		color: "green",
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
