import React from "react"
import PropTypes from "prop-types"
import { View, Image, StyleSheet } from "react-native"

import { Subheading } from "react-native-paper"

const CategoryCard = props => {
	const { name, icon } = props.category

	return (
		<View style={styles.column}>
			<Image source={icon} style={styles.image} />
			<Subheading style={styles.text}> {name} </Subheading>
		</View>
	)
}

const styles = StyleSheet.create({
	image: {
		height: 80,
		width: 100,
	},
	column: {
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		textAlign: "center",
		fontWeight: "700",
	},
})

CategoryCard.propTypes = {
	category: PropTypes.object.isRequired,
}

export default CategoryCard
