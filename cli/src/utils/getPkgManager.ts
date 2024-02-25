export type PackageManager = "npm" | "yarn" | "pnpm";

export const getPkgManager = (): PackageManager => {
  try {
    // ENV VARIABLE IS SET BY NPM, YARN, OR PNPM (LESS CONSISTENT WITH PNPM)
    const userAgent = process.env.npm_config_user_agent;

    if (userAgent) {
      if (userAgent.startsWith("yarn")) {
        return "yarn";
      } else if (userAgent.startsWith("pnpm")) {
        return "pnpm";
      } else {
        return "npm";
      }
    } else {
      // IF NO USER AGENT IS FOUND, DEFAULT TO NPM
      return "npm";
    }
  } catch (error) {
    throw new Error("Failed to get package manager");
  }
};
