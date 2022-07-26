import { httpJson } from '../request/index'
import type { HttpResponse } from '../request/index'

export const testApi = (
  params?: object
): Promise<
  HttpResponse<{
    msg: string
  }>
> => httpJson('get', '/test/aa', params)
