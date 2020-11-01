import React from "react"
import { ScrollView, StyleSheet, FlatList } from "react-native"
import PropTypes from "prop-types"
import CategoryCard from "../Cards/CategoryCard"

const SelectCategory = props => {
	const { navigation, setCategory, categories } = props

	const handlePress = async value => {
		await setCategory(value)
		navigation.navigate("Quiz")
	}

	const list = categories.map(category => (
		<CategoryCard
			category={category}
			key={category.value}
			onPress={() => handlePress(category.value)}
		/>
	))

	return <ScrollView style={styles.container}>{list}</ScrollView>
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#141A33",
		flex: 1,
	},
})

SelectCategory.propTypes = {
	categories: PropTypes.array.isRequired,
	category: PropTypes.object.isRequired,
	setCategory: PropTypes.func.isRequired,
}

export default SelectCategory
