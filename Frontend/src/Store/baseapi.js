import axios from "axios";
import { frontendLogger, generateActionId } from "../utils/logger.js";

// const API_BASE_URL = "https://library-siesgst.onrender.com/api/v1"; // old url
const API_BASE_URL = "https://libray-website-vasp.onrender.com/api/v1"; // new url
// const API_BASE_URL = "http://localhost:8000/api/v1";

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
});

const logApiStart = ({ actionId, method, endpoint }) => {
	frontendLogger.info({
		screenOrStore: "baseapi",
		action: "API_REQUEST",
		step: "REQUEST_SENT",
		status: "STARTED",
		actionId,
		message: `[API_REQUEST] REQUEST_SENT STARTED`,
		endpoint,
		method,
	});
};

const logApiSuccess = ({ actionId, method, endpoint, durationMs, statusCode }) => {
	frontendLogger.info({
		screenOrStore: "baseapi",
		action: "API_REQUEST",
		step: "RESPONSE_RECEIVED",
		status: "SUCCESS",
		actionId,
		message: `[API_REQUEST] RESPONSE_RECEIVED SUCCESS`,
		endpoint,
		method,
		durationMs,
		statusCode,
	});
};

const logApiFailure = ({ actionId, method, endpoint, durationMs, error }) => {
	frontendLogger.error({
		screenOrStore: "baseapi",
		action: "API_REQUEST",
		step: "RESPONSE_RECEIVED",
		status: "FAILURE",
		actionId,
		message: `[API_REQUEST] RESPONSE_RECEIVED FAILURE`,
		endpoint,
		method,
		durationMs,
		statusCode: error?.response?.status,
		errorCode: error?.code || "NETWORK_ERROR",
		errorMessage: error?.response?.data?.message || error?.message || "Request failed",
	});
};

const apiGet = async (endpoint, config = {}, context = {}) => {
	const actionId = context.actionId || generateActionId("api_get");
	const start = Date.now();
	logApiStart({ actionId, method: "GET", endpoint });
	try {
		const response = await apiClient.get(endpoint, config);
		logApiSuccess({
			actionId,
			method: "GET",
			endpoint,
			durationMs: Date.now() - start,
			statusCode: response.status,
		});
		return response;
	} catch (error) {
		logApiFailure({
			actionId,
			method: "GET",
			endpoint,
			durationMs: Date.now() - start,
			error,
		});
		throw error;
	}
};

const apiPost = async (endpoint, data = {}, config = {}, context = {}) => {
	const actionId = context.actionId || generateActionId("api_post");
	const start = Date.now();
	logApiStart({ actionId, method: "POST", endpoint });
	try {
		const response = await apiClient.post(endpoint, data, config);
		logApiSuccess({
			actionId,
			method: "POST",
			endpoint,
			durationMs: Date.now() - start,
			statusCode: response.status,
		});
		return response;
	} catch (error) {
		logApiFailure({
			actionId,
			method: "POST",
			endpoint,
			durationMs: Date.now() - start,
			error,
		});
		throw error;
	}
};

const apiPut = async (endpoint, data = {}, config = {}, context = {}) => {
	const actionId = context.actionId || generateActionId("api_put");
	const start = Date.now();
	logApiStart({ actionId, method: "PUT", endpoint });
	try {
		const response = await apiClient.put(endpoint, data, config);
		logApiSuccess({
			actionId,
			method: "PUT",
			endpoint,
			durationMs: Date.now() - start,
			statusCode: response.status,
		});
		return response;
	} catch (error) {
		logApiFailure({
			actionId,
			method: "PUT",
			endpoint,
			durationMs: Date.now() - start,
			error,
		});
		throw error;
	}
};

const apiDelete = async (endpoint, config = {}, context = {}) => {
	const actionId = context.actionId || generateActionId("api_delete");
	const start = Date.now();
	logApiStart({ actionId, method: "DELETE", endpoint });
	try {
		const response = await apiClient.delete(endpoint, config);
		logApiSuccess({
			actionId,
			method: "DELETE",
			endpoint,
			durationMs: Date.now() - start,
			statusCode: response.status,
		});
		return response;
	} catch (error) {
		logApiFailure({
			actionId,
			method: "DELETE",
			endpoint,
			durationMs: Date.now() - start,
			error,
		});
		throw error;
	}
};

export { API_BASE_URL, apiClient, apiGet, apiPost, apiPut, apiDelete };