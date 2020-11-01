import React from "react"
import { View } from "react-native"
import { List } from "react-native-paper"

export default function DifficultyMode({ navigation, setDifficulty }) {
	const difficulties = [
		{ name: "Easy", value: "easy", icon: "amazon" },
		{ name: "Medium", value: "medium", icon: "amazon-alexa" },
		{ name: "Hard", value: "hard", icon: "amazon-drive" },
	]

	const handlePress = value => {
		setDifficulty(value)
		navigation.navigate("Category")
	}

	const list = difficulties.map(difficulty => (
		<List.Item
			title={difficulty.name}
			key={difficulty.value}
			left={props => <List.Icon {...props} icon={difficulty.icon} />}
			onPress={() => handlePress(difficulty.value)}
		/>
	))
	return <View>{list}</View>
}
