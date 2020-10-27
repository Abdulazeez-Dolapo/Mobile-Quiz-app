import React from "react"
import { ScrollView } from "react-native"
import PropTypes from "prop-types"
import { List } from "react-native-paper"

const SelectCategory = props => {
	const { navigation, setCategory, categories } = props

	const handlePress = async value => {
		await setCategory(value)
		navigation.navigate("Quiz")
	}

	const list = categories.map(category => (
		<List.Item
			title={category.name}
			key={category.value}
			onPress={() => handlePress(category.value)}
		/>
	))

	return <ScrollView>{list}</ScrollView>
}

SelectCategory.propTypes = {
	categories: PropTypes.array.isRequired,
	category: PropTypes.object.isRequired,
	setCategory: PropTypes.func.isRequired,
}

export default SelectCategory
