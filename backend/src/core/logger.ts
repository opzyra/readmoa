import winston from "winston";
import moment from "moment";
import DailyRotateFile from "winston-daily-rotate-file";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV == "production" || "test" ? "alert" : "debug",
      format: winston.format.printf(
        info =>
          `${moment().format(
            "YYYY-MM-DD HH:mm:ss.SSS"
          )} [${info.level.toUpperCase()}] - ${info.message}`
      )
    }),
    new DailyRotateFile({
      level: process.env.NODE_ENV == "test" ? "alert" : "debug",
      filename: "logs/error.log",
      zippedArchive: false,
      format: winston.format.printf(
        info =>
          `${moment().format(
            "YYYY-MM-DD HH:mm:ss.SSS"
          )} [${info.level.toUpperCase()}] - ${info.message}`
      )
    })
  ]
});

export default logger;
