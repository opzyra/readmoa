import client from "../client";

const getPosts = async (platform: string, skip: number) => {
  return await client.get(`/posts/${platform}?skip=${skip}`);
};

export default { getPosts };
