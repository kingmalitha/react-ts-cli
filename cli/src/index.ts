#!/usr/bin/env node

import * as clack from "@clack/prompts";
import pc from "picocolors";
import { sleep } from "./utils/sleeper.js";
import { cloneRepo } from "./helpers/cloneRepo.js";
import { nameExists } from "./utils/nameExists.js";
import { updatePackageName } from "./utils/updatePackageJSON.js";
import { installDependencies } from "./helpers/installDependencies.js";
import { generateFinalNote } from "./utils/generateFinalNote.js";

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
            // SANITIZE INPUT
            if (/[^a-zA-Z0-9-_]/.test(input)) {
              return "Project name can only include alphanumeric characters, hyphens and underscores";
            }
            // CHECK IF NAME EXISTS
            if (nameExists(input.toLowerCase())) {
              return "A directory with this name already exists, please choose another name";
            }
          },
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
        clack.cancel(
          "User cancelled the installation process. Exiting..."
        );
        process.exit(0);
      },
    }
  );

  clack.intro(
    pc.bgGreen(
      pc.white(
        "\n\nAwesome! Please wait until we set up your project.\n\n"
      )
    )
  );

  // CLONE REPO
  await cloneRepo(project.name.toLowerCase());

  // UPDATE PACKAGE.JSON
  updatePackageName(project.name.toLowerCase());

  // INSTALL DEPENDENCIES
  if (project.install)
    await installDependencies(project.name.toLowerCase());

  // FINAL NOTE
  generateFinalNote(project);
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
