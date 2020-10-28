import React, { Component } from "react"
import { View, Text } from "react-native"

export default class Timer extends Component {
	state = {
		minutes: 0,
		seconds: 10,
	}

	componentDidMount() {
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
		clearInterval(this.timer)
	}

	render() {
		const { minutes, seconds } = this.state

		return (
			<View>
				<Text>
					{minutes || 0} : {seconds < 10 ? `0${seconds}` : seconds}
				</Text>
			</View>
		)
	}
}
