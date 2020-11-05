import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { View, StyleSheet } from "react-native"

import { Modal, Portal, Subheading, Button, Provider } from "react-native-paper"
import { generalStyles } from "../../utils/styling"

const QuizModal = props => {
	const { modalText, handleConfirmation, modalStatus, setModalStatus } = props

	useEffect(() => {
		setModalStatus(modalStatus)
	}, [modalStatus, handleConfirmation])

	const hideModal = () => {
		setModalStatus(false)
	}

	const containerStyle = {
		backgroundColor: "white",
		padding: 20,
	}

	return (
		<Provider>
			<Portal>
				<Modal
					visible={modalStatus}
					dismissable={false}
					onDismiss={hideModal}
					contentContainerStyle={containerStyle}
				>
					<Subheading style={{ textAlign: "center" }}>
						{modalText}
					</Subheading>

					<View style={styles.row}>
						<Button
							mode="contained"
							color="red"
							style={{ marginTop: 30 }}
							onPress={() => hideModal()}
						>
							No
						</Button>

						<Button
							mode="contained"
							color="green"
							style={{ marginTop: 30 }}
							onPress={() => handleConfirmation()}
						>
							Yes
						</Button>
					</View>
				</Modal>
			</Portal>
		</Provider>
	)
}

const styles = StyleSheet.create({
	...generalStyles,
	row: {
		...generalStyles.row,
		justifyContent: "space-evenly",
	},
	buttons: {
		width: 140,
		height: 45,
		borderRadius: 15,
	},
})

QuizModal.propTypes = {
	modalStatus: PropTypes.bool.isRequired,
	modalText: PropTypes.string.isRequired,
	handleConfirmation: PropTypes.func,
	setModalStatus: PropTypes.func.isRequired,
}

export default QuizModal
