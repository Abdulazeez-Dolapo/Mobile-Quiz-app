import React from "react"
import { Provider as PaperProvider } from "react-native-paper"

import { theme } from "./utils/theme"

export default function App() {
	return <PaperProvider theme={theme}></PaperProvider>
}
