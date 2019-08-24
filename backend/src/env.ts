import dotenv from "dotenv";
import path from "path";

const { NODE_ENV } = process.env;

const env = () => {
  switch (NODE_ENV) {
    case "production":
      return ".env";
    case "test":
      return ".env.test";
    default:
      return ".env.dev";
  }
};

dotenv.config({
  path: path.resolve(process.cwd(), env())
});
