import cron from "node-cron";
import okky from "./okky";
import velog from "./velog";

cron.schedule("0 1 0 * * *", okky);
cron.schedule("0 3 0 * * *", velog);
