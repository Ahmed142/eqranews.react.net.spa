﻿using AngleSharp;
using System;
using System.Collections.Generic;
using System.Text;
using System.Xml;

namespace eqranews.crawling.Models.CrawlSteps
{
    public class CrawlStepGetRssLinks: CrawlStep
    {
        public CrawlStepGetRssLinks() : base()
        {
        }

        public CrawlStepGetRssLinks(int Id, CrawlSetpType crawlSetpType, Url url, string Selector) : base(Id, crawlSetpType, url, Selector) { }

        public override List<CrawlResult> Process(List<CrawlResult> results)
        {
            XmlDocument doc = new XmlDocument();
            doc.Load(this.Url.Href);
            var Links = doc.SelectNodes(this.Selector);
            foreach (XmlNode lnk in Links)
            {
                results.Add(new CrawlResult
                {
                    Url = new AngleSharp.Url(this.Url, lnk.Value)
                });
            }
            return base.Process(results);
        }
    }
}
