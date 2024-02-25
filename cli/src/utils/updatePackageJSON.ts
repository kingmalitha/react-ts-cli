import fs from "fs";
import path from "path";

export function updatePackageName(name: string) {
  try {
    const packageJsonPath = path.join(
      process.cwd(),
      name,
      "package.json"
    );

    if (fs.existsSync(packageJsonPath)) {
      // Read the file and parse it to a JavaScript object
      const packageJson = JSON.parse(
        fs.readFileSync(packageJsonPath, "utf-8")
      );

      // Change the name property
      packageJson.name = name;

      // Write the updated object back to the file
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2)
      );
    } else {
      console.error("package.json not found");
    }
  } catch (error) {
    throw error;
  }
}
