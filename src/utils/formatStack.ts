export const formatStack = (stack?: string) => {
  if (!stack) return null;

  const appLine = stack
    .split("\n")
    .find((line) => line.includes("/src/"));

  if (!appLine) return null;

  // Example line:
  // at <anonymous> (/src/app/user/user.route.ts:105:36)

  const match = appLine.match(/\((.*):(\d+):(\d+)\)/);

  if (!match) return appLine.trim();

  const [, filePath, line, column] = match;

  return {
    file: filePath.split("/src/")[1], // cleaner path
    line: Number(line),
    column: Number(column),
  };
};
