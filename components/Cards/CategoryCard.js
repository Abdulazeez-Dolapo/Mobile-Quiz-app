import React from "react"
import PropTypes from "prop-types"
import { Text, View, Image, StyleSheet } from "react-native"

const CategoryCard = props => {
	const { name, icon } = props.category

	return (
		<View style={styles.container}>
			<Image source={icon} />
			<Text> {name} </Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
	},
})

CategoryCard.propTypes = {
	category: PropTypes.object.isRequired,
}

export default CategoryCard
