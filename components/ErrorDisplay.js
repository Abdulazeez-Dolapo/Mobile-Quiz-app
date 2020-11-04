import React from "react"
import { View, Text, Image, StyleSheet } from "react-native"
import PropTypes from "prop-types"

import Images from "~assets/images"

export default function ErrorDisplay({ cancelQuiz }) {
	return (
		<View>
			<Image source={Images.error} style={styles.image} />
			<Text style={{ color: "white", fontSize: 18 }}>
				There are no questions found for this quiz configuration, click{" "}
				<Text
					style={{
						textDecorationStyle: "solid",
						textDecorationLine: "underline",
						color: "red",
					}}
					onPress={() => cancelQuiz()}
				>
					HERE
				</Text>{" "}
				to go back or pull down the screen to refresh and try again.
			</Text>
		</View>
	)
}

ErrorDisplay.propTypes = {
	cancelQuiz: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
	image: {
		width: "100%",
		height: 180,
		marginBottom: 20,
	},
})
