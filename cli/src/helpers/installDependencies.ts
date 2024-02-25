import { exec } from "child_process";
import { getPkgManager } from "../utils/getPkgManager.js";
import ora from "ora";

export async function installDependencies(name: string) {
  const pkgManager = getPkgManager();
  const spinner = ora(
    `Installing Dependencies with ${pkgManager}`
  ).start();

  try {
    const installCommand = `cd ${name} && ${pkgManager} install`;

    return new Promise((resolve, reject) => {
      exec(installCommand, { encoding: "utf-8" }, (err) => {
        if (err) {
          spinner.fail("Failed to install dependencies");
          reject(err);
        } else {
          spinner.succeed("Dependencies installed");
          resolve(null);
        }
      });
    });
  } catch (error) {
    spinner.fail("Failed to install dependencies");
    throw error;
  }
}
