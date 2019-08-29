import puppeteer from "puppeteer";
import cheerio from "cheerio";
import moment from "moment";
import { EntityManager } from "typeorm";

import { txfn } from "../core/txManager";
import { ellipsisString } from "../lib/utils";

import PostOkky from "../model/PostOkky";
import ReportParsing from "../model/ReportParsing";

const parsing = async (em: EntityManager, category: string, tbd: string) => {
  const domain = "https://okky.kr";
  const target = `${domain}/articles/${category}?offset=0&max=100&sort=id&order=desc`;

  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();
  await page.goto(target);
  const html = await page.$eval(
    "#list-article > .panel > .list-group",
    e => e.innerHTML
  );

  let list: Array<string> = [];

  const $ = cheerio.load(html);
  $(".list-group-item").each((_key, val) => {
    const time = $(val)
      .find(".timeago")
      .attr("title");
    const rd = moment(time).format("YYYYMMDD");
    if (tbd == rd) {
      list.push(
        $(val)
          .find(".list-group-item-heading > a")
          .attr("href")
      );
    }
  });

  for (let i = 0; i < list.length; i++) {
    const link = domain + list[i];
    await page.goto(link);
    const html = await page.$eval("head", e => e.innerHTML);
    const $ = cheerio.load(html);
    const time = $('meta[property="article:published_time"]').attr("content");
    const description = $('meta[property="og:description"]')
      .attr("content")
      .replace(/ +/g, " ")
      .trim();
    let post = new PostOkky();
    post.name = $('meta[property="dable:author"]').attr("content");
    post.title = $('meta[property="og:title"]')
      .attr("content")
      .replace("OKKY | ", "")
      .trim();
    post.description = ellipsisString(description, 180);
    post.url = $('meta[property="og:url"]').attr("content");
    post.writed_at = moment(time)
      .subtract("9", "hour")
      .toDate();

    await em.save(post);
  }

  await browser.close();

  return list.length;
};

const okky = txfn(async (em: EntityManager) => {
  const tbd = moment()
    .subtract(1, "day")
    .format("YYYYMMDD");

  const isParsed = await em
    .createQueryBuilder()
    .from(ReportParsing, "report_parsing")
    .where(`standard_date=:standard_date AND platform = 'okky'`, {
      standard_date: tbd
    })
    .getRawOne();

  if (isParsed) {
    return;
  }

  let count = 0;
  count += await parsing(em, "community", tbd);
  count += await parsing(em, "questions", tbd);

  let reportParsing = new ReportParsing();
  reportParsing.platform = "okky";
  reportParsing.row = count;
  reportParsing.standard_date = tbd;

  await em.save(reportParsing);
});

export default okky;
