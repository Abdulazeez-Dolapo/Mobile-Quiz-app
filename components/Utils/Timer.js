import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import PropTypes from "prop-types"

import { Subheading } from "react-native-paper"

export default class Timer extends Component {
	state = {
		minutes: 0,
		seconds: 0,
	}

	componentDidMount() {
		this.setState({
			minutes: this.props.minutes,
			seconds: this.props.seconds,
		})

		this.timer = setInterval(() => {
			const { seconds, minutes } = this.state

			if (seconds > 0) {
				this.setState(({ seconds }) => ({
					seconds: seconds - 1,
				}))
			}

			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(this.timer)
					this.props.submit()
				} else {
					this.setState(({ minutes }) => ({
						minutes: minutes - 1,
						seconds: 59,
					}))
				}
			}
		}, 1000)
	}

	componentWillUnmount() {
		this.setState({
			minutes: 0,
			seconds: 0,
		})
		clearInterval(this.timer)
	}

	render() {
		const { minutes, seconds } = this.state

		return (
			<Subheading style={minutes >= 5 ? styles.timer : styles.timeout}>
				{minutes < 10 ? `0${minutes}` : minutes} :{" "}
				{seconds < 10 ? `0${seconds}` : seconds}
			</Subheading>
		)
	}
}

const styles = StyleSheet.create({
	timer: {
		color: "white",
		fontWeight: "700",
	},
	timeout: {
		color: "red",
		fontWeight: "700",
	},
})

Timer.propTypes = {
	minutes: PropTypes.number.isRequired,
	seconds: PropTypes.number.isRequired,
}
