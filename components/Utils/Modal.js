import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Modal, Portal, Text, Button, Provider } from "react-native-paper"

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
					<Text>{modalText}</Text>

					<Button
						color="red"
						style={{ marginTop: 30 }}
						onPress={() => hideModal()}
					>
						No
					</Button>

					<Button
						color="green"
						style={{ marginTop: 30 }}
						onPress={() => handleConfirmation()}
					>
						Yes
					</Button>
				</Modal>
			</Portal>
		</Provider>
	)
}

QuizModal.propTypes = {
	modalStatus: PropTypes.bool.isRequired,
	modalText: PropTypes.string.isRequired,
	handleConfirmation: PropTypes.func,
	setModalStatus: PropTypes.func.isRequired,
}

export default QuizModal
