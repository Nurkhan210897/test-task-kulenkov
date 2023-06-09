import axios from 'axios'
import type { IGetPostsParams, IPosts, INewPost } from '@/types/gTypes'
import type { AxiosResponse } from 'axios'

const url = 'https://jsonplaceholder.typicode.com/posts'
export default class Http {
  static get<T, P>(params: P) {
    return axios.get(url, { params }).then((response: AxiosResponse<T>) => response.data)
  }

  static put<T, P>(params: P) {
    return axios
      .put(`${url}/${params.id}`, params)
      .then((response: AxiosResponse<T>) => response.data)
  }

  static delete<T>(id: number) {
    return axios.delete(`${url}/${id}`).then((response: AxiosResponse<T>) => response.data)
  }

  static post<T, P>(params: P) {
    return axios.post(`${url}`, params).then((response: AxiosResponse<T>) => response.data)
  }
}
