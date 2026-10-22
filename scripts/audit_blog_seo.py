#!/usr/bin/env python3
"""Static SEO consistency audit; no dependencies, no writes."""
from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
import re
import sys
import xml.etree.ElementTree as ET
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
HOST = "cruiseplay-dyt.pages.dev"
class Meta(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.in_title = False
        self.h1 = 0
        self.meta = {}
        self.canonical = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "title":
            self.in_title = True
        if tag == "h1":
            self.h1 += 1
        if tag == "meta":
            name = attrs.get("name") or attrs.get("property")
            if name:
                self.meta.setdefault(name.lower(), []).append(attrs.get("content", ""))
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical.append(attrs.get("href", ""))
    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
    def handle_data(self, data):
        if self.in_title:
            self.title += data

def main():
    errors, warnings, urls, titles, descriptions = [], [], [], [], []
    listing = (ROOT / "blog/index.html").read_text(encoding="utf-8")
    slugs = re.findall(r'<article class="blog-card".*?<a href="(/blog/[^"]+/)"', listing, re.S)
    if len(slugs) != len(set(slugs)):
        errors.append("Duplicate blog listing URLs")
    sitemap_file = ROOT / "sitemap.xml"
    ns = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
    sitemap = [x.text for x in ET.parse(sitemap_file).iter(ns + "loc") if x.text]
    if len(sitemap) != len(set(sitemap)):
        errors.append("Duplicate sitemap URLs")
    sitemap_paths = {urlparse(x).path for x in sitemap}
    for slug in slugs:
        path = ROOT / slug.lstrip("/") / "index.html"
        if not path.exists():
            errors.append(f"{slug}: missing HTML file")
            continue
        p = Meta()
        source = path.read_text(encoding="utf-8")
        p.feed(source)
        expected = f"https://{HOST}{slug}"
        if not p.title.strip():
            errors.append(f"{slug}: missing title")
        if not p.meta.get("description", [""])[0].strip():
            errors.append(f"{slug}: missing meta description")
        if p.canonical != [expected]:
            errors.append(f"{slug}: canonical mismatch: {p.canonical}")
        if p.h1 != 1:
            warnings.append(f"{slug}: H1 count = {p.h1}")
        if slug not in sitemap_paths:
            errors.append(f"{slug}: absent from sitemap")
        if not p.meta.get("og:image", [""])[0]:
            errors.append(f"{slug}: missing og:image")
        if 'application/ld+json' not in source:
            warnings.append(f"{slug}: no JSON-LD")
        for field in ("og:image", "twitter:image"):
            for src in p.meta.get(field, []):
                if not src.startswith(("https://", "http://")):
                    warnings.append(f"{slug}: {field} is not an absolute URL")
        titles.append((p.title.strip(), slug))
        descriptions.append((p.meta.get("description", [""])[0].strip(), slug))
        urls.append(slug)
    for label, entries in (("title", titles), ("description", descriptions)):
        count = Counter(k for k, _ in entries if k)
        for val, n in count.items():
            if n > 1:
                warnings.append(f"Duplicate {label} ({n}): {val[:90]}")
    print(f"SEO AUDIT: {len(urls)} files, {len(sitemap)} sitemap URLs, {len(errors)} errors, {len(warnings)} warnings")
    for x in errors:
        print("ERROR:", x)
    for x in warnings:
        print("WARNING:", x)
    return 1 if errors else 0

if __name__ == "__main__":
    sys.exit(main())
