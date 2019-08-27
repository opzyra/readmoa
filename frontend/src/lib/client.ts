import axios from "axios";

const domain = "http://localhost:3000";

export default {
  get: async (path: string) => {
    return await axios.get(domain + path);
  },
  post: async (path: string, body: any) => {
    return await axios.post(domain + path, body);
  },
  put: async (path: string, body: any) => {
    return await axios.put(domain + path, body);
  },
  delete: async (path: string) => {
    return await axios.delete(domain + path);
  }
};
