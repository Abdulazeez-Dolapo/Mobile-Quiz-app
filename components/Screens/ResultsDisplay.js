import React, { useEffect } from "react"
import { View, BackHandler, StyleSheet, Image, Text } from "react-native"
import PropTypes from "prop-types"

import { Button, Title, Paragraph } from "react-native-paper"

import Images from "~assets/images"
import { generalStyles } from "../../utils/styling"

const ResultsDisplay = props => {
	const {
		numberOfQuestions,
		score,
		category,
		difficulty,
		quitQuiz,
		navigation,
	} = props

	const backAction = () => {
		return true
	}

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", backAction)

		return () =>
			BackHandler.removeEventListener("hardwareBackPress", backAction)
	}, [])

	const reset = async () => {
		await quitQuiz()
		navigation.navigate("Mode")
	}

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Title style={styles.whiteText}>Quiz Result</Title>
			</View>

			<View style={{ ...styles.row, paddingVertical: 30 }}>
				<Image source={Images.trophy} style={styles.image} />
			</View>

			<View style={styles.row}>
				<Title style={styles.whiteText}>Congratulations!</Title>
			</View>

			<View style={styles.row}>
				<Paragraph style={{ ...styles.whiteText, textAlign: "center" }}>
					You have successfully completed the {category.name} quiz on{" "}
					{difficulty} difficulty mode.
				</Paragraph>
			</View>

			<View style={{ ...styles.row, paddingVertical: 10 }}>
				<Paragraph style={{ color: "grey" }}>Your Score</Paragraph>
			</View>

			<View
				style={{
					...styles.row,
					paddingBottom: 20,
				}}
			>
				<Text style={{ color: "green", fontSize: 30, fontWeight: "bold" }}>
					{score}
				</Text>
				<Text
					style={{ ...styles.whiteText, fontSize: 30, fontWeight: "bold" }}
				>
					/{numberOfQuestions}
				</Text>
			</View>

			<View style={styles.row}>
				<Button
					uppercase={false}
					mode="contained"
					style={styles.buttons}
					color="#3DD3F6"
					onPress={() => reset()}
				>
					<Paragraph style={styles.whiteText}>Start New Quiz</Paragraph>
				</Button>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	...generalStyles,
	container: {
		...generalStyles.container,
		paddingVertical: 5,
		paddingHorizontal: 12,
	},
	row: {
		...generalStyles.row,
		justifyContent: "center",
		width: "100%",
	},
	image: {
		height: 170,
		width: 128,
	},
	buttons: {
		width: 140,
		height: 45,
		borderRadius: 10,
	},
})

ResultsDisplay.propTypes = {
	numberOfQuestions: PropTypes.number.isRequired,
	score: PropTypes.number.isRequired,
	category: PropTypes.object.isRequired,
	difficulty: PropTypes.string.isRequired,
	quitQuiz: PropTypes.func.isRequired,
}

export default ResultsDisplay
