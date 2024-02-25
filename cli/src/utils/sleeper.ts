// Sleeper function to simulate a delay around 2 seconds

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
