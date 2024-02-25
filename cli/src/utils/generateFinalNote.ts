import { getPkgManager } from "./getPkgManager.js";
import * as clack from "@clack/prompts";
import pc from "picocolors";

type Project = {
  name: string;
  install: boolean;
};

export function generateFinalNote(project: Project) {
  let message = `cd ${project.name.toLowerCase()}\n`;
  const pkgManager = getPkgManager();

  if (!project.install) {
    message += `${pkgManager} install\n`;
  }

  message += `${pkgManager} run dev\n`;

  clack.note(
    pc.bgGreen(
      pc.white(
        "Your project is ready! Here are the final steps:"
      )
    ) +
      "\n\n" +
      pc.cyan(message)
  );
}
