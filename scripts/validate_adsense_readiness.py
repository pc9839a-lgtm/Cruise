#!/usr/bin/env python3
from __future__ import annotations

import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUB_ID = "ca-pub-1906196934401001"
ADS_TXT_ID = "pub-1906196934401001"
NS = "http://www.sitemaps.org/schemas/sitemap/0.9"
TRUST_PAGES = ["about/index.html", "contact/index.html", "privacy/index.html", "terms/index.html"]
COMMERCIAL_PREFIXES = ("/partner/", "/membership/", "/academy/")


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def read(path: str) -> str:
    target = ROOT / path
    if not target.exists():
        fail(f"missing required file: {path}")
    return target.read_text(encoding="utf-8")


def check_adsense_identity() -> None:
    ads = read("ads.txt").strip()
    expected = f"google.com, {ADS_TXT_ID}, DIRECT, f08c47fec0942fa0"
    if expected not in ads:
        fail("ads.txt publisher declaration is missing or mismatched")

    home = read("index.html")
    marker = f'<meta name="google-adsense-account" content="{PUB_ID}">'
    if marker not in home:
        fail("homepage is missing google-adsense-account publisher meta")


def check_trust_pages() -> None:
    for page in TRUST_PAGES:
        html = read(page)
        if '<meta name="robots" content="index,follow' not in html:
            fail(f"trust page must be indexable: {page}")
        if '<link rel="canonical" href="https://cruiseplay-dyt.pages.dev/' not in html:
            fail(f"trust page missing canonical URL: {page}")

    privacy = read("privacy/index.html")
    for token in ("Google AdSense", "쿠키", "제3자"):
        if token not in privacy:
            fail(f"privacy policy missing advertising/privacy disclosure token: {token}")


def check_editorial_sitemap_scope() -> None:
    try:
        tree = ET.parse(ROOT / "sitemap.xml")
    except ET.ParseError as exc:
        fail(f"sitemap.xml parse failure: {exc}")

    urls = []
    for loc in tree.findall(f".//{{{NS}}}loc"):
        if loc.text:
            urls.append(loc.text.strip())

    for url in urls:
        path = url.removeprefix("https://cruiseplay-dyt.pages.dev")
        if path.startswith(COMMERCIAL_PREFIXES):
            fail(f"commercial route leaked into editorial sitemap: {url}")

    text_urls = [line.strip() for line in read("sitemap.txt").splitlines() if line.strip()]
    if text_urls != urls:
        fail("sitemap.txt and sitemap.xml do not match")


def check_middleware_separation() -> None:
    js = read("functions/_middleware.js")
    required = [
        "const includeAdsense = isHomepage || isBlog;",
        "const includePartnerLink = isMembership;",
        "headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');",
        ".on('.blog-nav', new BlogNavInjector())",
        ".on('.blog-footer-inner', new BlogFooterInjector())",
        ".on('.post-header-actions', new RemoveElement())",
        ".on('.post-bottom-cta', new RemoveElement())",
        ".on('a.cta', new RemoveElement())",
    ]
    for token in required:
        if token not in js:
            fail(f"editorial/commercial separation guard missing from middleware: {token}")


def check_static_noindex_guards() -> None:
    headers = read("_headers")
    for prefix in ("/partner/*", "/membership/*", "/academy/*"):
        block_pattern = re.escape(prefix) + r"\s+X-Robots-Tag: noindex, nofollow, noarchive"
        if not re.search(block_pattern, headers):
            fail(f"static noindex guard missing: {prefix}")


def check_blog_templates() -> None:
    for path in ("blog/templates/index.template.html", "blog/templates/post.template.html"):
        html = read(path)
        forbidden = [
            'href="/partner/"',
            'href="/#schedule"',
            'href="/#reviews"',
            'class="blog-nav-cta"',
        ]
        for token in forbidden:
            if token in html:
                fail(f"commercial/lead-generation link leaked into editorial template {path}: {token}")

    post = read("blog/templates/post.template.html")
    for token in ("post-bottom-cta", "__CTA_PRIMARY_URL__", "__CTA_PRIMARY_LABEL__"):
        if token in post:
            fail(f"lead-generation CTA remains in post template: {token}")


def check_about_transparency() -> None:
    about = read("about/index.html")
    required = ["공식 홈페이지가 아니며", "Google AdSense", "광고", "문의"]
    for token in required:
        if token not in about:
            fail(f"about page missing transparency statement: {token}")


def main() -> None:
    check_adsense_identity()
    check_trust_pages()
    check_editorial_sitemap_scope()
    check_middleware_separation()
    check_static_noindex_guards()
    check_blog_templates()
    check_about_transparency()
    print("OK: AdSense readiness guards passed (identity, trust, editorial scope, navigation, commercial isolation)")


if __name__ == "__main__":
    main()
