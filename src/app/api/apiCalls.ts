import api from "./apiConfig";
import { CreateURLRequest, CreateURLResponse } from "./apiTypes";

export const createUrl = (urlRequest: CreateURLRequest)=> {
  return api.post<CreateURLResponse>(`/api`,urlRequest).then(({ data }) => data);
};
