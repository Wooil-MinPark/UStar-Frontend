import { API } from 'contants';
import axiosInstance from './axiosInstance';

interface AccessToken {
  data: any;
}

interface Category {
  categoryName: string;
  categoryColor: string;
}

// 쿠키 삭제는 axios.post('/auth/logout') 요런식으로 쿠키 삭제가 되도록 구현
export const refreshAccessToken = async () => {
  try {
    const res = await axios.post<AccessToken>(API + 'auth/refresh', null, {
      withCredentials: true,
    });
    const accessToken = res.data.data.accessToken;
    localStorage.setItem('authToken', accessToken);
    return accessToken;
  } catch (error) {
    console.log('토큰 재발급 실패', error);
  }
};

export const getCategories = async () => {
  try {
    const res = await axiosInstance.get<AccessToken>('categories', {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    });
    console.log(res);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async (categoryName: string, categoryColor: string) => {
  const token = localStorage.getItem('authToken');
  try {
    const res = await axiosInstance.post(
      'categories/create',
      { categoryName, categoryColor },
      {
        headers: { Authorization: `Bearer ${token})}` },
      }
    );
    // 생성 됐는지 확인
    console.log(res);
  } catch (error) {
    console.log('카테고리 생성 실패', error);
  }
};

export const deleteCategory = async (categoryUid: number) => {
  const token = localStorage.getItem('authToken');
  console.log(categoryUid);
  try {
    const res = await axiosInstance.delete(`categories/delete/${categoryUid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // 생성 됐는지 확인
    console.log(res);
  } catch (error) {
    console.log('카테고리 삭제 실패', error);
  }
};
