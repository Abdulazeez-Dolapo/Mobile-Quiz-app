import { axiosInstance } from "./axios"

const BASE_URL = `https://opentdb.com/api.php`

export const fetchQuestions = (numberOfQuestions, category, difficulty) => {
	const URL = `${BASE_URL}?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`

	return axiosInstance.get(URL)
}
