#!/usr/bin/env python3
from __future__ import annotations

import json
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://cruiseplay-dyt.pages.dev"
NS = "http://www.sitemaps.org/schemas/sitemap/0.9"


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def read_text(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def url_to_repo_path(url: str) -> Path:
    parsed = urlsplit(url)
    if parsed.scheme != "https" or parsed.netloc != "cruiseplay-dyt.pages.dev":
        fail(f"non-canonical host in sitemap: {url}")
    if parsed.query or parsed.fragment:
        fail(f"query/fragment is not allowed in canonical sitemap URL: {url}")
    path = parsed.path
    if not path.startswith("/"):
        fail(f"invalid absolute path: {url}")
    if path.endswith("/"):
        relative = path.lstrip("/") + "index.html"
    else:
        relative = path.lstrip("/")
    return ROOT / relative


def validate_xml_sitemap() -> list[str]:
    path = ROOT / "sitemap.xml"
    try:
        tree = ET.parse(path)
    except ET.ParseError as exc:
        fail(f"sitemap.xml is not well-formed XML: {exc}")
    root = tree.getroot()
    if root.tag != f"{{{NS}}}urlset":
        fail(f"sitemap.xml root must be urlset in sitemap namespace, got {root.tag}")

    urls: list[str] = []
    for node in root.findall(f"{{{NS}}}url"):
        loc = node.find(f"{{{NS}}}loc")
        if loc is None or not (loc.text or "").strip():
            fail("sitemap.xml contains a url without loc")
        urls.append((loc.text or "").strip())

    if not urls:
        fail("sitemap.xml has no URLs")
    if len(urls) != len(set(urls)):
        fail("sitemap.xml contains duplicate URLs")

    for url in urls:
        repo_path = url_to_repo_path(url)
        if not repo_path.exists():
            fail(f"sitemap URL has no matching static file: {url} -> {repo_path.relative_to(ROOT)}")

    return urls


def validate_text_sitemap(xml_urls: list[str]) -> None:
    lines = [line.strip() for line in read_text("sitemap.txt").splitlines() if line.strip()]
    if lines != xml_urls:
        missing = [u for u in xml_urls if u not in lines]
        extra = [u for u in lines if u not in xml_urls]
        fail(f"sitemap.txt must exactly mirror sitemap.xml; missing={missing}, extra={extra}")


def validate_legacy_index() -> None:
    try:
        tree = ET.parse(ROOT / "sitemap-google.xml")
    except ET.ParseError as exc:
        fail(f"sitemap-google.xml is not well-formed XML: {exc}")
    root = tree.getroot()
    if root.tag != f"{{{NS}}}sitemapindex":
        fail("sitemap-google.xml must be a sitemapindex")
    locs = [
        (node.text or "").strip()
        for node in root.findall(f"{{{NS}}}sitemap/{{{NS}}}loc")
    ]
    expected = [f"{BASE}/sitemap.xml"]
    if locs != expected:
        fail(f"sitemap-google.xml must point only to {expected[0]}, got {locs}")


def validate_robots() -> None:
    robots = read_text("robots.txt")
    required = [
        f"Sitemap: {BASE}/sitemap.xml",
        f"Sitemap: {BASE}/sitemap.txt",
    ]
    for directive in required:
        if directive not in robots:
            fail(f"robots.txt missing directive: {directive}")
    if f"Sitemap: {BASE}/sitemap-google.xml" in robots:
        fail("robots.txt must not advertise the legacy sitemap-google.xml")


def validate_routes() -> None:
    data = json.loads(read_text("_routes.json"))
    excluded = set(data.get("exclude", []))
    required = {"/sitemap.xml", "/sitemap-google.xml", "/sitemap.txt", "/robots.txt"}
    missing = required - excluded
    if missing:
        fail(f"_routes.json must bypass Pages Functions for: {sorted(missing)}")


def validate_headers() -> None:
    headers = read_text("_headers")
    required_tokens = [
        "/sitemap.xml\n  Content-Type: application/xml; charset=UTF-8",
        "/sitemap-google.xml\n  Content-Type: application/xml; charset=UTF-8",
        "/sitemap.txt\n  Content-Type: text/plain; charset=UTF-8",
    ]
    for token in required_tokens:
        if token not in headers:
            fail(f"_headers missing crawler-safe sitemap rule: {token.splitlines()[0]}")


def main() -> None:
    urls = validate_xml_sitemap()
    validate_text_sitemap(urls)
    validate_legacy_index()
    validate_robots()
    validate_routes()
    validate_headers()
    print(f"OK: validated {len(urls)} canonical URLs across XML and text sitemaps")


if __name__ == "__main__":
    main()
