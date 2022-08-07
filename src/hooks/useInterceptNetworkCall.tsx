import { constants } from "appConstants";
import axios from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";

const useInterceptNetworkCall = () => {
	const { UNAUTHORIZED } = constants;

	const interceptNetworkCall = useCallback(
		(logoutUser: () => void) => {
			axios.interceptors.response.use(
				(response: any) => response,
				(error: any) => {
					const responseStatus = error?.response?.status,
						responseMessage = error?.response?.data?.message;
					if (responseStatus === UNAUTHORIZED) {
						toast.error("Session expired. Please login again.");
						return logoutUser();
					}
					responseMessage && toast.error(responseMessage);
					return Promise.reject(error);
				}
			);
		},
		[UNAUTHORIZED]
	);
	return { interceptNetworkCall };
};

export { useInterceptNetworkCall };
