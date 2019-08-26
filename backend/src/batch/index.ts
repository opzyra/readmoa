import cron from "node-cron";

import okky from "./okky";
import velog from "./velog";
import brunch from "./brunch";

const parsing = () => {
  cron.schedule("0 1 0,1,2 * * *", okky);
  cron.schedule("0 6 0,1,2 * * *", velog);
  cron.schedule("0 11 0,1,2 * * *", brunch);
};

export default parsing;
