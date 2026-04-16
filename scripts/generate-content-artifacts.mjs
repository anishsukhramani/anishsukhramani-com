import { promises as fs } from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "content", "posts");
const SEARCH_INDEX_PATH = path.join(ROOT, "public", "search-index.json");
const ARTIFACT_CACHE_PATH = path.join(ROOT, ".cache", "content-artifacts.json");

async function main() {
  await fs.mkdir(path.dirname(SEARCH_INDEX_PATH), { recursive: true });
  await fs.mkdir(path.dirname(ARTIFACT_CACHE_PATH), { recursive: true });

  const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });
  const mdxFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name)
    .sort();

  const searchIndex = [];
  const artifacts = {};

  for (const fileName of mdxFiles) {
    const filePath = path.join(POSTS_DIR, fileName);
    const raw = await fs.readFile(filePath, "utf8");
    const checksum = sha256(raw);
    const parsed = matter(raw);
    const fm = parsed.data ?? {};
    const body = String(parsed.content ?? "");
    const plainText = markdownToPlainText(body);
    const headings = extractHeadings(body);
    const wordCount = countWords(plainText);

    const slug = String(fm.slug ?? path.basename(fileName, ".mdx"));
    const title = String(fm.title ?? slug);
    const description = fm.description ? String(fm.description) : "";
    const excerpt = fm.excerpt ? String(fm.excerpt) : null;
    const coverImage = fm.coverImage ? String(fm.coverImage) : null;
    const publishedAt = normalizeDateValue(fm.publishedAt);
    const tags = Array.isArray(fm.tags) ? fm.tags.map((tag) => String(tag)) : [];
    const coverImageAlt = fm.coverImageAlt ? String(fm.coverImageAlt) : "";

    validateRequired({
      fileName,
      slug,
      title,
      description,
      publishedAt,
      coverImage,
      coverImageAlt,
    });

    searchIndex.push({
      id: slug,
      slug,
      title,
      excerpt,
      published_at: publishedAt,
      cover_image_url: coverImage,
      featured: Boolean(fm.featured),
      word_count: wordCount,
      tags,
      searchableText: [
        title,
        description,
        excerpt ?? "",
        tags.join(" "),
        plainText.slice(0, 7000),
      ]
        .join(" ")
        .toLowerCase(),
    });

    artifacts[slug] = {
      checksum,
      word_count: wordCount,
      headings,
      searchableText: plainText,
    };
  }

  await fs.writeFile(
    SEARCH_INDEX_PATH,
    `${JSON.stringify(searchIndex, null, 2)}\n`,
    "utf8"
  );
  await fs.writeFile(
    ARTIFACT_CACHE_PATH,
    `${JSON.stringify({ generatedAt: new Date().toISOString(), artifacts }, null, 2)}\n`,
    "utf8"
  );

  console.log(
    `Generated content artifacts for ${searchIndex.length} post(s): ${path.relative(
      ROOT,
      SEARCH_INDEX_PATH
    )}`
  );
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function extractHeadings(markdown) {
  const lines = markdown.split(/\r?\n/);
  const slugger = new GithubSlugger();
  const out = [];

  for (const line of lines) {
    const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const level = match[1].length;
    const text = stripMarkdownInline(match[2]);
    if (!text) continue;
    out.push({ id: slugger.slug(text), text, level });
  }

  return out;
}

function markdownToPlainText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[>*_~|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripMarkdownInline(value) {
  return value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .trim();
}

void main();

function validateRequired({
  fileName,
  slug,
  title,
  description,
  publishedAt,
  coverImage,
  coverImageAlt,
}) {
  const failures = [];
  if (!slug) failures.push("slug");
  if (!title) failures.push("title");
  if (!description) failures.push("description");
  if (!publishedAt || !/\d{4}-\d{2}-\d{2}T/.test(publishedAt)) {
    failures.push("publishedAt (ISO datetime)");
  }
  if (coverImage && !coverImageAlt) {
    failures.push("coverImageAlt (required when coverImage is present)");
  }

  if (failures.length > 0) {
    throw new Error(
      `Invalid frontmatter in ${fileName}. Missing/invalid: ${failures.join(", ")}`
    );
  }
}

function normalizeDateValue(value) {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return date.toISOString();
  }
  return "";
}
