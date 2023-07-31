import { dynamicRoutes } from '@/mock/index';

export const getRoutesApi = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(dynamicRoutes);
    }, 300);
  });
};

export const fetchDataApi = () => {
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
