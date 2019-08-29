import moment from "moment";
import axios from "axios";
import xmljs from "xml-js";
import { EntityManager } from "typeorm";

import { txfn } from "../core/txManager";
import { ellipsisString, removeHtml, sleep } from "../lib/utils";

import PostMedium from "../model/PostMedium";
import RssPlatform from "../model/RssPlatform";
import RssError from "../model/RssError";
import ReportParsing from "../model/ReportParsing";

const platform = "medium";

const parsing = async (em: EntityManager, tbd: string) => {
  let rss = await em.find(RssPlatform, { platform });

  let count = 0;
  for (let i = 0; i < rss.length; i++) {
    let domain: string = rss[i].rss;
    let feed!: any;

    try {
      let { data } = await axios.get(domain);
      sleep(1000);

      feed = JSON.parse(
        xmljs.xml2json(data, { compact: true, ignoreCdata: false })
      );

      let item = feed.rss.channel.item;
      let name = feed.rss.channel.webMaster._cdata.replace("@medium.com", "");

      for (let j = 0; j < item.length; j++) {
        let feedItem = item[j];
        let feedDate = moment(feedItem["atom:updated"]._text).format(
          "YYYYMMDD"
        );

        if (feedDate == tbd) {
          let url = feedItem.link._text;
          const description = removeHtml(feedItem["content:encoded"]._cdata);

          let post = new PostMedium();
          post.name = name;
          post.title = feedItem.title._cdata;
          post.description = ellipsisString(description, 180);
          post.url = url;
          post.writed_at = moment(feedItem["atom:updated"]._text).toDate();

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

  return count;
};

const medium = txfn(async (em: EntityManager) => {
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
  count += await parsing(em, tbd);

  let reportParsing = new ReportParsing();
  reportParsing.platform = platform;
  reportParsing.row = count;
  reportParsing.standard_date = tbd;

  await em.save(reportParsing);
});

export default medium;
