import React from "react"
import { Provider as PaperProvider } from "react-native-paper"

import { Provider } from "react-redux"
import store from "./redux/store"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import SelectCategoryScreen from "./containers/SelectCategory"
import ModeScreen from "./containers/DifficultyMode"
import QuizDisplayScreen from "./containers/QuizDisplay"
import ResultsDisplayScreen from "./containers/ResultsDisplay"
import CorrectAnswersScreen from "./containers/CorrectAnswers"

import { theme } from "./utils/theme"

const Stack = createStackNavigator()

export default function App() {
	return (
		<Provider store={store}>
			<PaperProvider theme={theme}>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Mode">
						<Stack.Screen name="Mode" component={ModeScreen} />
						<Stack.Screen
							name="Quiz"
							component={QuizDisplayScreen}
							options={{
								headerLeft: null,
							}}
						/>
						<Stack.Screen
							name="Category"
							component={SelectCategoryScreen}
						/>
						<Stack.Screen
							name="Results"
							component={ResultsDisplayScreen}
							options={{
								headerLeft: null,
							}}
						/>
						<Stack.Screen
							name="Correct-Answers"
							component={CorrectAnswersScreen}
							options={{
								headerLeft: null,
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</PaperProvider>
		</Provider>
	)
}
