import puppeteer from "puppeteer";
import cheerio from "cheerio";
import moment from "moment";
import axios from "axios";
import { EntityManager } from "typeorm";

import { txfn } from "../core/txManager";
import { ellipsisString, markdownParser } from "../lib/utils";

import PostVelog from "../model/PostVelog";
import ReportParsing from "../model/ReportParsing";

const parsing = async (em: EntityManager, tbd: string) => {
  const domain = "https://velog.io";
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(domain + "/recent");
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

  const html = await page.$eval(".PostCardList", e => e.innerHTML);

  let list: Array<string> = [];

  const $ = cheerio.load(html);
  $(".PostCard")
    .not(".FakePostCard")
    .each((_key, val) => {
      const href = $(val)
        .find(".content-head > h3 a")
        .attr("href");
      list.push(href);
    });

  let count = 0;
  for (let i = 0; i < list.length; i++) {
    const api = `https://api.velog.io/posts${encodeURI(list[i])}`;
    const { data } = await axios.get(api);
    const rd = moment(data.created_at)
      .utc()
      .format("YYYYMMDD");
    if (tbd == rd) {
      let post = new PostVelog();
      post.name = data.user.display_name;
      post.title = data.title;
      post.description = ellipsisString(markdownParser(data.body), 180);
      post.url = `https://velog.io${encodeURI(list[i])}`;
      post.writed_at = moment(data.created_at)
        .subtract("9", "hour")
        .toDate();

      await em.save(post);
      count++;
    }
  }

  await browser.close();

  return count;
};

const velog = txfn(async (em: EntityManager) => {
  const tbd = moment()
    .subtract(1, "day")
    .format("YYYYMMDD");

  const isParsed = await em
    .createQueryBuilder()
    .from(ReportParsing, "report_parsing")
    .where(`standard_date=:standard_date AND platform = 'velog'`, {
      standard_date: tbd
    })
    .getRawOne();

  if (isParsed) {
    return;
  }
  let count = 0;
  count = await parsing(em, tbd);

  let reportParsing = new ReportParsing();
  reportParsing.platform = "velog";
  reportParsing.row = count;
  reportParsing.standard_date = tbd;

  await em.save(reportParsing);
});

export default velog;
