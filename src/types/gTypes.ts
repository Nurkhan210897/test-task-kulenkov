export interface IPosts {
  id: number
  title: string
  body: string
  userId: number
}

export interface IGetPostsParams {
  _page: number
  _limit: number
}

export type INewPost = Pick<IPosts, 'title' | 'body' | 'userId'>

export interface ISortItem {
  name: string
  sort: number
}