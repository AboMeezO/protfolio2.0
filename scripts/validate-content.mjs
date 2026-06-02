import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";

const root = process.cwd();
const sourceDirs = ["src", "public"];
const projectDir = path.join(root, "src", "content", "projects");
const blogDir = path.join(root, "src", "content", "blogs");
const problems = [];

const mojibakePattern = /(?:\u00d8|\u00d9|\u00c2|\u00c3|\u00d0|\u00d1|\u00de|\u00df|\ufffd|\?{4,})/;

const walk = (dir) => {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return fullPath;
  });
};

const relative = (file) => path.relative(root, file).replaceAll("\\", "/");

const getFrontmatter = (file) => {
  const text = fs.readFileSync(file, "utf8");
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? parse(match[1]) || {} : {};
};

const addProblem = (file, message) => {
  problems.push(`${relative(file)}: ${message}`);
};

for (const dir of sourceDirs) {
  for (const file of walk(path.join(root, dir))) {
    if (!/\.(js|jsx|md|mdx|json|html|css|txt)$/.test(file)) continue;
    const text = fs.readFileSync(file, "utf8");
    if (mojibakePattern.test(text)) {
      addProblem(file, "contains likely mojibake/corrupted text");
    }
  }
}

const validateCollection = (dir, type) => {
  const files = walk(dir).filter((file) => file.endsWith(".mdx"));
  const slugs = new Set();

  for (const file of files) {
    const slug = path.basename(file, ".mdx");
    const data = getFrontmatter(file);

    if (slugs.has(slug)) addProblem(file, `duplicate ${type} slug "${slug}"`);
    slugs.add(slug);

    for (const field of ["title", "description", "date", "cover"]) {
      if (!data[field]) addProblem(file, `missing required frontmatter "${field}"`);
    }

    if (data.date && Number.isNaN(Date.parse(data.date))) {
      addProblem(file, `invalid frontmatter date "${data.date}"`);
    }

    if (data.gallery && !Array.isArray(data.gallery)) {
      addProblem(file, "frontmatter gallery must be an array");
    }

    if (data.links && !Array.isArray(data.links)) {
      addProblem(file, "frontmatter links must be an array");
    }
  }

  return files.length;
};

const projectCount = validateCollection(projectDir, "project");
validateCollection(blogDir, "blog");

if (projectCount === 0) {
  problems.push("src/content/projects: no project MDX files found");
}

if (problems.length > 0) {
  console.error("Content validation failed:");
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}

console.log("Content validation passed.");
