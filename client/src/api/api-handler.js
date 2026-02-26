import { toast } from "react-toastify";

export const handleApiErrors = (error, toastId = null) => {

    let message = "";

    if (error?.response?.data?.message === "Validation failed") {

        message = error.response.data?.validation?.body?.message

    }
    else if (error.response) {
        // Server responded with a status other than 2xx

        message = error.response.data?.message || error.response.data?.desc || `Error: ${error.response.status}`

    } else if (error.request) {
        message = "No response from server. Please try again later.";
    } else {
        message = error.message || "An unexpected error occurred.";
        // Other errors (e.g., setting up the request)
    }

    if (toastId) {
        toast.error(message, { id: toastId })
    }
    else {
        toast.error(message)
    }
};