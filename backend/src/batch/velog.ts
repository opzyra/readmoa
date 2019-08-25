import puppeteer from "puppeteer";
import cheerio from "cheerio";
import moment from "moment";
import axios from "axios";
import { EntityManager } from "typeorm";

import PostVelog from "../model/PostVelog";
import { txfn } from "../core/txManager";
import markdownParser from "../lib/markdownParser";

const parsing = async (em: EntityManager) => {
  const tbd = moment()
    .subtract(1, "day")
    .format("YYYYMMDD");
  const domain = "https://velog.io";
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(domain + "/recent");
  await page.setViewport({
    width: 1920,
    height: 1200
  });
  let height = 0;

  while (height <= 3000) {
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
      post.description = markdownParser(data.body);
      post.url = `https://velog.io${encodeURI(list[i])}`;
      post.writed_at = moment(data.created_at)
        .subtract("9", "hour")
        .toDate();

      await em.save(post);
    }
  }

  await browser.close();
};

const velog = txfn(async (em: EntityManager) => {
  await parsing(em);
});

export default velog;
