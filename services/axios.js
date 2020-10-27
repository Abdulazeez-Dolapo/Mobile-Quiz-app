import axios from "axios"

export const axiosInstance = axios.create({
	timeout: 25000,
})

export const setAuthorizationHeaders = token => {
	axiosInstance.defaults.headers.common["Authorization"] = token
}
export const clearAuthorizationHeaders = () => {
	delete axiosInstance.defaults.headers.common["Authorization"]
}
