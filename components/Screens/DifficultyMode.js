import React from "react"
import { View, StyleSheet, Image } from "react-native"

import { List, Title } from "react-native-paper"

import Images from "~assets/images"
import { generalStyles } from "../../utils/styling"

export default function DifficultyMode({ navigation, setDifficulty }) {
	const difficulties = [
		{ name: "Easy", value: "easy" },
		{ name: "Medium", value: "medium" },
		{ name: "Hard", value: "hard" },
	]

	const handlePress = value => {
		setDifficulty(value)
		navigation.navigate("Categories")
	}

	const list = difficulties.map(difficulty => (
		<List.Item
			title={difficulty.name}
			key={difficulty.value}
			titleStyle={{ color: "white", fontWeight: "bold" }}
			onPress={() => handlePress(difficulty.value)}
		/>
	))
	return (
		<>
			<Image source={Images.welcome} style={styles.image} />
			<View style={styles.container}>
				<Title
					style={{
						color: "grey",
						textAlign: "center",
						fontStyle: "italic",
					}}
				>
					Choose difficulty mode
				</Title>
				{list}
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	...generalStyles,
	image: {
		width: "100%",
		height: 200,
	},
})
