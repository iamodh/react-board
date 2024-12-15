import useUserStore from "@zustand/userStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function useAxiosInstance() {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const instance = axios.create({
    baseURL: "https://11.fesp.shop",
    timeout: 10000 * 15,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "client-id": "00-board",
    },
  });

  instance.interceptors.request.use((config) => {
    console.log(config);

    // user 전역 상태가 존재하고,
    // 토큰 갱신 요청이 필요하지 않은 상황
    if (user && config.url !== "/auth/refresh") {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    // 리프레시 토큰이 존재, access 토큰 갱신이 필요한 상황에서는 자동으로 처리된다?

    return config;
  });

  instance.interceptors.response.use(
    // 정상 응답 (2xx)
    (response) => {
      console.log("response interceptor", response);
      return response;
    },

    async (error) => {
      console.error("response interceptor error", error);
      const { config, response } = error;

      // 401 에러 (Authentication)
      if (response?.status === 401) {
        // 리프레시 토큰 조차 만료되었을 떄
        if (config.url === "/auth/refresh") {
          // 다시 로그인
          navigateLogin();
        } else if (user) {
          // user가 존재하는데 access token이 만료된 상황

          // refresh token으로 access token 갱신신
          const {
            data: { accessToken },
          } = await instance.get("/auth/refresh", {
            headers: {
              Authorization: `Bearer ${user.refreshToken}`,
            },
          });

          setUser({ ...user, accessToken });
          config.headers.Authorization = `Bearer ${accessToken}`;

          return axios(config);
        } else {
          navigateLogin();
        }
      }
      return Promise.reject(error);
    }
  );

  function navigateLogin() {
    const gotoLogin = confirm(
      "로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?"
    );
    gotoLogin &&
      navigate("/users/login", { state: { from: location.pathname } });
  }

  return instance;
}

export default useAxiosInstance;
