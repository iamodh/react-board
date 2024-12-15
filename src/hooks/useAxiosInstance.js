import axios from "axios";

function useAxiosInstance() {
  const instance = axios.create({
    baseURL: "https://11.fesp.shop",
    timeout: 1000 * 15,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "client-id": "00-board",
    },
  });

  instance.interceptors.request.use((config) => {
    config.headers[
      "Authorization"
    ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjQsInR5cGUiOiJ1c2VyIiwibmFtZSI6IuyaqeyMpCIsImVtYWlsIjoidTFAZ21haWwuY29tIiwiaW1hZ2UiOiIvZmlsZXMvMDAtbmlrZS91c2VyLWpheWcud2VicCIsImxvZ2luVHlwZSI6ImVtYWlsIiwiaWF0IjoxNzM0MTg5MTU3LCJleHAiOjE3MzQxODkxNjcsImlzcyI6IkZFU1AifQ.1ImuRwMaAK96e5bBd5IFSlAXtPp6cyRHn-0ztgFnHuQ`;
    // 요청이 전달되기 전에 필요한 공통 작업 수행

    return config;
  });

  return instance;
}

export default useAxiosInstance;
