import React from "react"
import { ScrollView, StyleSheet, View, Pressable } from "react-native"
import PropTypes from "prop-types"

import CategoryCard from "../Cards/CategoryCard"
import { generalStyles } from "../../utils/styling"

const SelectCategory = props => {
	const { navigation, setCategory, categories } = props

	const handlePress = async value => {
		await setCategory(value)
		navigation.navigate("Quiz")
	}

	const list = categories.map(category => (
		<Pressable
			style={styles.cardContainer}
			onPress={() => handlePress(category.value)}
			key={category.value}
		>
			<CategoryCard category={category} />
		</Pressable>
	))

	return (
		<ScrollView style={styles.container}>
			<View style={styles.row}>{list}</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	...generalStyles,
	row: {
		...generalStyles.row,
		justifyContent: "space-evenly",
	},
	cardContainer: {
		backgroundColor: "white",
		borderRadius: 10,
		width: "42%",
		justifyContent: "center",
		height: 135,
		padding: 10,
		marginVertical: 10,
	},
})

SelectCategory.propTypes = {
	categories: PropTypes.array.isRequired,
	category: PropTypes.object.isRequired,
	setCategory: PropTypes.func.isRequired,
}

export default SelectCategory
