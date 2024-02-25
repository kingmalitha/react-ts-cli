import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import { execa } from "execa";
import * as clack from "@clack/prompts";

// CHECK WHETHER GIT IS INSTALLED
const isGitInstalled = (dir: string) => {
  try {
    execSync("git --version", { cwd: dir });
    return true;
  } catch (error) {
    return false;
  }
};

// GET GIT VERSION
const getGitVersion = () => {
  const stdout = execSync("git --version")
    .toString()
    .trim();
  const gitVersionTag = stdout.split(" ")[2];
  const major = gitVersionTag?.split(".")[0];
  const minor = gitVersionTag?.split(".")[1];
  return { major: Number(major), minor: Number(minor) };
};

// CHECK WHETHER PROVIDED DIRECTORY HAS A `.git` SUBDIRECTORY IN IT.
export const isRootGitRepo = (dir: string): boolean => {
  return fs.existsSync(path.join(dir, ".git"));
};

// CHECK WHETHER THIS DIRECTORY OR A PARENT DIRECTORY IS A GIT REPO
export const isInsideGitRepo = async (
  dir: string
): Promise<boolean> => {
  try {
    // If this command succeeds, we're inside a git repo
    await execa(
      "git",
      ["rev-parse", "--is-inside-work-tree"],
      {
        cwd: dir,
        stdout: "ignore",
      }
    );
    return true;
  } catch (_e) {
    // Else, it will throw a git-error and we return false
    return false;
  }
};

// INITIALIZE GIT REPO FOR THE PROJECT
export const initGit = async (dir: string) => {
  const sp = clack.spinner();
  sp.start("Initializing git repository");
};
