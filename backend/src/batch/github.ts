import cheerio from "cheerio";
import moment from "moment";
import Parser from "rss-parser";
import { EntityManager } from "typeorm";

import { txfn } from "../core/txManager";
import { ellipsisString, removeHtml } from "../lib/utils";

import PostGithub from "../model/PostGithub";
import RssPlatform from "../model/RssPlatform";
import RssError from "../model/RssError";
import ReportParsing from "../model/ReportParsing";

const platform = "github";

const parsing = async (em: EntityManager, browser: any, tbd: string) => {
  const page = await browser.newPage();

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

          await page.goto(url);
          const html = await page.$eval(
            "head",
            (e: { innerHTML: any }) => e.innerHTML
          );
          const $ = cheerio.load(html);

          const description = removeHtml(
            feedItem.content || feedItem.description
          );
          let post = new PostGithub();
          post.name = name;
          post.title = $('meta[property="og:title"]')
            .attr("content")
            .trim();
          post.description = ellipsisString(description, 180).trim();
          post.url = url;
          post.writed_at = moment(feedDate).toDate();

          await em.save(post);
          count++;
        }
      }
    } catch (error) {
      await em.delete(RssPlatform, { platform, rss: domain });
      let rssError = new RssError();
      rssError.rss = domain;
      await em.save(rssError);
    }
  }

  await browser.close();

  return count;
};

const github = txfn(async (em: EntityManager, browser: any) => {
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
  count += await parsing(em, browser, tbd);

  let reportParsing = new ReportParsing();
  reportParsing.platform = platform;
  reportParsing.row = count;
  reportParsing.standard_date = tbd;

  await em.save(reportParsing);
});

export default github;
