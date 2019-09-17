import axios from "axios";
import moment from "moment";
import Parser from "rss-parser";
import { EntityManager } from "typeorm";

import { txfn } from "../core/txManager";
import { ellipsisString } from "../lib/utils";

import PostBrunch from "../model/PostBrunch";
import ReportParsing from "../model/ReportParsing";
import RssPlatform from "../model/RssPlatform";

const platform = "brunch";

const parsingTrend = async (em: EntityManager, browser: any, tbd: string) => {
  const domain = "https://brunch.co.kr/keyword/IT_트렌드?q=g";
  const page = await browser.newPage();

  await page.goto(domain);
  await page.setViewport({
    width: 1920,
    height: 1200
  });

  const B: any = await page.evaluate(() => B);
  let articleList: Array<any> = B.Keyword.articleList.map((e: any) => {
    let userName = e.profile.userName;
    e.article.userName = userName;
    return e.article;
  });
  let publishTime = articleList[articleList.length - 1].publishTime;

  for (let i = 0; i < 3; i++) {
    const api = `https://api.brunch.co.kr/v1/top/keyword/group/33?publishTime=${publishTime}&pickContentId=`;
    const { data } = await axios.get(api);
    let list = data.data.articleList.map((e: any) => {
      let userName = e.profile.userName;
      e.article.userName = userName;
      return e.article;
    });
    articleList.push(...list);
    publishTime = list[list.length - 1].publishTime;
  }

  let count = 0;
  for (let i = 0; i < articleList.length; i++) {
    let item = articleList[i];
    const rd = moment(item.publishTime).format("YYYYMMDD");

    if (tbd == rd) {
      let post = new PostBrunch();
      post.name = item.userName;
      post.title = item.title;
      post.description = ellipsisString(item.contentSummary, 180);
      post.url = `https://brunch.co.kr/@@${item.userId}/${item.no}`;
      post.writed_at = moment(item.publishTime).toDate();

      await em.save(post);
      count++;
    }
  }

  return count;
};

const parsing = async (em: EntityManager, tbd: string) => {
  let parser = new Parser();
  let rss = await em.find(RssPlatform, { platform });

  let count = 0;
  for (let i = 0; i < rss.length; i++) {
    let domain: string = rss[i].rss;
    let feed!: any;

    try {
      feed = await parser.parseURL(domain);

      let item = feed.items;
      let name = feed.title;
      for (let j = 0; j < item.length; j++) {
        let feedItem = item[j];
        let feedDate = moment(feedItem.pubDate).format("YYYYMMDD");
        if (feedDate == tbd) {
          let url = feedItem.url || feedItem.link;
          let post = new PostBrunch();
          post.name = name;
          post.title = feedItem.title;
          post.description = ellipsisString(feedItem.description, 180);
          post.url = url;
          post.writed_at = moment(feedDate).toDate();

          await em.save(post);
          count++;
        }
      }
    } catch (error) {
      await em.delete(RssPlatform, { platform, rss: domain });
    }
  }

  return count;
};

const brunch = txfn(async (em: EntityManager, browser: any) => {
  const tbd = moment()
    .subtract(1, "day")
    .format("YYYYMMDD");

  const isParsed = await em
    .createQueryBuilder()
    .from(ReportParsing, "report_parsing")
    .where(`standard_date=:standard_date AND platform = '${platform}'`, {
      standard_date: tbd
    })
    .getRawOne();

  if (isParsed) {
    return;
  }

  let count = 0;
  count += await parsingTrend(em, browser, tbd);
  count += await parsing(em, tbd);

  let reportParsing = new ReportParsing();
  reportParsing.platform = platform;
  reportParsing.row = count;
  reportParsing.standard_date = tbd;

  await em.save(reportParsing);
});

export default brunch;
