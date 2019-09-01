import cron from "node-cron";

import okky from "./okky";
import velog from "./velog";
import brunch from "./brunch";
import medium from "./medium";
import tistory from "./tistory";
import github from "./github";

const parsing = () => {
  cron.schedule("0 5 1 * * *", okky);
  cron.schedule("0 10 1 * * *", velog);
  cron.schedule("0 15 1 * * *", brunch);
  cron.schedule("0 20 1 * * *", github);
  cron.schedule("0 25 1 * * *", tistory);
  cron.schedule("0 30 1 * * *", medium);
};

export default parsing;
