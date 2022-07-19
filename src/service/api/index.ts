import { httpJson } from "../request/index";

export const testApi = (
  params?: Object
): Promise<{
  msg: string;
}> => httpJson("get", "/test/aa", params);
