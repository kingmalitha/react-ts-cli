#!/usr/bin/env node

import * as clack from "@clack/prompts";
import pc from "picocolors";
import { sleep } from "./utils/sleeper.js";
import ora from "ora";
import { getPkgManager } from "./utils/getPkgManager.js";
import { cloneRepo } from "./helpers/cloneRepo.js";

async function main() {
  console.clear();

  await sleep(1000);

  clack.intro(
    `${pc.bgCyan(pc.white("React-TypeSafe : react-ts"))}`
  );

  const project = await clack.group(
    {
      name: () =>
        clack.text({
          message: "What will your project be called?",
          placeholder: "my-project",
          validate: (input) => {
            if (!input)
              return "Please enter a project name";
          },
        }),
      tools: () =>
        clack.multiselect({
          message: "Which additi tools do you want to use?",
          initialValues: ["eslint", "prettier"],
          options: [
            { value: "eslint", label: "ESLint" },
            { value: "prettier", label: "Prettier" },
            { value: "typescript", label: "TypeScript" },
            { value: "jest", label: "Jest" },
            { value: "lint-staged", label: "Lint-staged" },
          ],
        }),
      git: () =>
        clack.confirm({
          message:
            "Do you want to initialize a git repository?",
          initialValue: true,
        }),
      install: () =>
        clack.confirm({
          message:
            "Do you want to install the dependencies?",
          initialValue: true,
        }),
    },

    {
      onCancel: () => {
        clack.cancel("Operation cancelled");
        process.exit(1);
      },
    }
  );

  clack.intro(
    pc.bgGreen(
      pc.black(
        "\n\nAwesome! Please wait until we set up your project.\n\n"
      )
    )
  );

  await cloneRepo(project.name, "javascript");

  if (project.git) {
    const s = clack.spinner();
    s.start("Initializing git repository");
    await sleep(2000);
    s.stop("Git repository initialized");
  } else {
    clack.outro(
      `Run ${pc.green(
        "git init"
      )} to initialize a git repository.`
    );
  }

  if (project.install) {
    const s = clack.spinner();
    s.start("Installing dependencies");
    await sleep(2000);
    s.stop("Dependencies installed");
  } else {
    const pkgManager = getPkgManager();
    clack.outro(
      `Run ${pc.green(
        `${pkgManager} install`
      )} to install the dependencies.`
    );
  }
}

main().catch((error) => {
  clack.note(
    pc.bgRed(pc.black("Aborting installation..."))
  );

  if (error instanceof Error) {
    console.log(
      pc.bgRed(
        pc.black(
          "An unkown error has occured. Please open an issue on Github with the following error message:"
        )
      )
    );
    console.log(error.message);
  }
  process.exit(1);
});
