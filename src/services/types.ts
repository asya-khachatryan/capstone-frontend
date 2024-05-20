export type DocsList = Array<{ name: string; url: string }>

export interface PageableRequest {
  size: number
  page: number
  sort: string | null
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

export type SortCol = {
  name: string
  directionAsc: boolean
}

export function sortColToString(sortCol: SortCol | null) {
  return sortCol === null
    ? null
    : `${sortCol?.name},${sortCol?.directionAsc ? 'ASC' : 'DESC'}`
}

export function stringToSortCol(sort: string | null): SortCol | null {
  if (sort === null) {
    return null
  }
  return {
    name: sort.split(',')[0],
    directionAsc: sort.split(',')[1] === 'ASC',
  }
}
