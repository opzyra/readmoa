import cron from "node-cron";

import okky from "./okky";
import velog from "./velog";
import brunch from "./brunch";
import medium from "./medium";
import tistory from "./tistory";
import github from "./github";

const parsing = () => {
  cron.schedule("0 5 0,1,2 * * *", okky);
  cron.schedule("0 10 0,1,2 * * *", velog);
  cron.schedule("0 15 0,1,2 * * *", brunch);
  cron.schedule("0 20 0,1,2 * * *", github);
  cron.schedule("0 25 0,1,2 * * *", tistory);
  cron.schedule("0 30 0,1,2 * * *", medium);
};

export default parsing;
