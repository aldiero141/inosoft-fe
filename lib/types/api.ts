export interface ApiResponseInterface<T> {
  data: T
  message: string
  status: number
  errors?: ApiError[]
//   meta?: MetaApiResponseInterface
//   pagination?: PaginationApiResponseInterface
}

export interface MetaApiResponseInterface {
  total: number
  limit?: number
  page: number
  total_page: number
  offset?: number
  total_all_data?: number
  total_child?: number
  current_page?: number
  last_page?: number
}

export interface PaginationApiResponseInterface {
  total: number
  limit: number
  current_page: number
  last_page: number
  offset?: number
  total_page?: number
  total_all_data?: number
  page?: number
}

export interface ApiError {
  code: string // used this to map api code to localization key
  message: string
  field: string
  values?: string[]
}