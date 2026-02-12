import axios from "axios";
import type { ApiError } from "../types";

export function getErrorMessage(error: unknown): string {
	if (axios.isAxiosError<ApiError>(error)) {
		// Optional Chaining Axios Error Object
		return error.response?.data?.error || "Request failed";
	}

	return "An unexpected error occured.";
}
