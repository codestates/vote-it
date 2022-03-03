import { inspect } from 'util';

export const printVars = (obj: Record<string, unknown>) => {
  const RESET = '\x1b[0m';
  const FG_CYAN = '\x1b[36m';
  Object.entries(obj).forEach(([varName, varValue]) => {
    const coloredExplanation = `${FG_CYAN}[${varName} (${typeof varValue})]${RESET}`;
    const coloredVarValue = inspect(varValue, {
      colors: true,
      depth: Infinity,
    });
    console.log(`${coloredExplanation} ${coloredVarValue}`);
  });
  console.log();
};
