import ora from "ora";
import { exec } from "child_process";

type templateType = "javascript" | "typescript";

export async function cloneRepo(
  name: string,
  template: templateType
) {
  const spinner = ora("Creating project structure").start();

  console.log("name", name);
  console.log("template", template);

  const cmd = `npx degit https://`;

  return new Promise((resolve, reject) => {
    exec(cmd, (err) => {
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
