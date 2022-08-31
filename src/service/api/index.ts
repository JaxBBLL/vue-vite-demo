import { httpJson } from '../request/index';
import type { HttpResponse } from '../request/index';

export const testApi = (
  params?: object
): Promise<
  HttpResponse<{
    msg: string;
  }>
> => httpJson('get', '/test/aa', params);

export const fetchDataApi = (): Promise<
  HttpResponse<
    {
      name: string;
      age: number;
    }[]
  >
> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: 'success',
        data: [
          {
            name: 'Peter',
            age: 23,
          },
          {
            name: 'Jack',
            age: 24,
          },
          {
            name: 'Lucy',
            age: 27,
          },
        ],
      });
    }, 300);
  });
};
