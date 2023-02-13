const { readFile, writeFile } = require("node:fs/promises");
const path = require("node:path");

const changeLogPath = path.resolve(__dirname, "./CHANGELOG.md");
const versionPath = path.resolve(__dirname, "./version.txt");

const main = async () => {
  const content = await readFile(changeLogPath, "utf-8");
  const version = await readFile(versionPath, "utf-8");

  const contentVersion = content
    .split("##")
    .filter((line) => !!line.trim())
    .find((paragraph) => {
      const firstLine = paragraph
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => !!line)
        .at(0);
      return firstLine === version.trim();
    });

  const contentWithoutVersion = contentVersion
    .split("\n")
    .filter((line) => line.trim() !== version.trim())
    .join("\n")
    .trimStart();

  const contentVersionResolve = `CHANGELOG<<EOF\n\t${contentWithoutVersion}\nEOF`;

  const { GITHUB_ENV: githubEnv } = process.env;

  await writeFile(githubEnv, contentVersionResolve, "utf-8");
};

main();
