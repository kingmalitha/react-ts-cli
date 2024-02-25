import ora from "ora";
import path from "path";
import { exec } from "child_process";

export async function cloneRepo(name: string) {
  const spinner = ora("Creating project structure").start();

  const destinationPath = path.join(process.cwd(), name);

  const cmd = `npx degit https://github.com/kingmalitha/react-ts-cli/template/base ${destinationPath}`;

  return new Promise((resolve, reject) => {
    exec(cmd, { encoding: "utf-8" }, (err) => {
      if (err) {
        spinner.fail("Project structure creation failed");
        reject(err);
      } else {
        spinner.succeed("Project structure created");
        resolve(null);
      }
    });
  });
}
