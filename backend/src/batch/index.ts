import cron from "node-cron";

import okky from "./okky";
import velog from "./velog";
import brunch from "./brunch";
import medium from "./medium";
import github from "./github";

const parsing = () => {
  cron.schedule("0 1 0 * * *", okky);
  cron.schedule("0 3 0 * * *", velog);
  cron.schedule("0 5 0 * * *", brunch);
  cron.schedule("0 7 0 * * *", github);
  cron.schedule("0 9 0 * * *", medium);
};

export default parsing;
