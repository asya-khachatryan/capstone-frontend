export type DocsList = Array<{ name: string; url: string }>

export interface PageableRequest {
  size: number
  page: number
  sort: string
}

export interface PageableResponse<T> {
  number: number
  numberOfElements: number
  totalElements: number
  totalPages: number
  content: Array<T>
  nextPage?: Function
  size: number
  first: boolean
  last: boolean
  empty: boolean
  sort: Sort
}

export type Sort = {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export function loadOptions<T>(pageableResponse: PageableResponse<T>) {
  return {
    options: pageableResponse.content,
    hasMore:
      pageableResponse.content.length < pageableResponse.numberOfElements,
  }
}

export interface LoadOptionsResult<T> {
  options: T[]
  hasMore: boolean
}
