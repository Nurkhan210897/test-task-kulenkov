import type { IGetPostsParams, IPosts } from '@/types/gTypes'
import axios from 'axios'
import type { AxiosPromise } from 'axios'

const url = 'https://jsonplaceholder.typicode.com/posts'
export default class Http {
  static get<T>(params: IGetPostsParams): AxiosPromise<T>   {
    return axios.get(url, { params }).then((response) => response.data)
  }

  static put<T>(params: IPosts):  AxiosPromise<T>  {
    return axios.put(`${url}/${params.id}`, params).then((response) => response.data)
  }

  static delete(id: number): AxiosPromise<T> {
    return axios.delete(`${url}/${id}`).then((response) => response.data)
  }

  static post<T>(params: IPosts): AxiosPromise<T> {
    return axios.post(`${url}`, params).then((response) => response.data)
  }
}
