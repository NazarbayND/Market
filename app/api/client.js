import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.1.8:9000/api",
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  return response;
};

export default apiClient;
