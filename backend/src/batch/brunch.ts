import puppeteer from "puppeteer";
import cheerio from "cheerio";
import moment from "moment";
import { EntityManager } from "typeorm";

import PostBrunch from "../model/PostBrunch";
import { txfn } from "../core/txManager";
import ParsingReport from "../model/ParsingReport";

const parsing = async (em: EntityManager, tbd: string) => {
  const domain = "https://brunch.co.kr/keyword/IT_트렌드?q=g";
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(domain);
  await page.setViewport({
    width: 1920,
    height: 1200
  });
  let height = 0;

  while (height <= 5000) {
    height = await page.evaluate("document.body.scrollHeight");
    await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
    await page.waitForFunction(`document.body.scrollHeight > ${height}`);
  }

  const html = await page.$eval(".list_article", e => e.innerHTML);

  let list: Array<string> = [];

  const $ = cheerio.load(html);
  $("li > a").each((_key, val) => {
    const href = $(val).attr("href");
    list.push(href);
  });
  let count = 0;
  for (let i = 0; i < list.length; i++) {
    const link = "https://brunch.co.kr" + list[i];
    await page.goto(link);
    const html = await page.$eval("head", e => e.innerHTML);
    const $ = cheerio.load(html);
    const time = $('meta[property="article:published_time"]').attr("content");

    const rd = moment(time)
      .utc()
      .format("YYYYMMDD");

    if (tbd == rd) {
      let post = new PostBrunch();
      post.name = $('meta[name="byl"]').attr("content");
      post.title = $('meta[property="og:title"]')
        .attr("content")
        .trim();
      post.description = $('meta[property="og:description"]')
        .attr("content")
        .replace(/ +/g, " ")
        .trim();
      post.url = $('meta[property="og:url"]').attr("content");
      post.writed_at = moment(time)
        .subtract("9", "hour")
        .toDate();

      await em.save(post);
      count++;
    }
  }

  await browser.close();

  return count;
};

const brunch = txfn(async (em: EntityManager) => {
  const tbd = moment()
    .subtract(1, "day")
    .format("YYYYMMDD");

  const pr = await em
    .createQueryBuilder()
    .from(ParsingReport, "parsing_report")
    .where(`standard_date=:standard_date AND platform = 'BRUNCH'`, {
      standard_date: tbd
    })
    .getOne();

  if (pr) {
    return;
  }

  let count = 0;
  count = await parsing(em, tbd);
  let parsingReport = new ParsingReport();
  parsingReport.platform = "BRUNCH";
  parsingReport.row = count;
  parsingReport.standard_date = tbd;

  await em.save(parsingReport);
});

export default brunch;
