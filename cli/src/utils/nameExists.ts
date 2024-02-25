import path from "path";
import fs from "fs";

export function nameExists(name: string) {
  const destinationPath = path.join(process.cwd(), name);

  if (fs.existsSync(destinationPath)) {
    return true;
  }
  return false;
}
