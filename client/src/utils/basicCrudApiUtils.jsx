import axiosInstance from "../api/axiosInstance";

export const handleApiRequest = async ({ endpoint, method = "GET", data = {}, params = {}, onSuccess, onError }) => {
  try {
    const config = { method, url: endpoint, data, params };
    const response = await axiosInstance(config);

    if (onSuccess) onSuccess(response.data);
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message;
    if (onError) onError(errorMessage);
  }
};
