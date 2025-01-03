import { refreshAccessToken } from 'api';
import { API } from 'contants';
import axios, { AxiosError, AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: API,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// 요청 인터셉터 : 요청 할때마다 인증 토큰 추가
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('요청시작');
    console.log(config);
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },

  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    const errorCode = response.data.errorCode;
    const errorMessage = response.data.errorMessage;

    if (errorCode === 'TOKEN_002') {
      try {
        console.log('토큰이 만료됨 refresh 시작');
        const newToken = await refreshAccessToken();
        console.log('토큰 리프레시 완료');
        console.log(newToken);
        response.config.headers['Authorization'] = `Bearer ${newToken}`;
        return axiosInstance.request(response.config);
      } catch (refreshError) {
        console.log(refreshError);
        return Promise.reject(refreshError);
      }
    }

    if (
      errorCode === 'TOKEN_005' ||
      errorCode === 'TOKEN_004' ||
      errorCode === 'TOKEN_003' ||
      errorCode === 'TOKEN_001'
    ) {
      console.log(errorMessage);
      alert(errorMessage + ' 로그아웃 됩니다.');
      //로그아웃 기능 넣기
      localStorage.removeItem('authToken');
    }

    return response;
  },
  (error) => {
    // 이 부분은 실제 HTTP 에러(401, 403 등) 처리
    console.error('HTTP error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
