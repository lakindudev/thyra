import color from "picocolors";
import { colorize, printCommandTable } from "~/color-logs";
import type { ConfigStore } from "~/configStore";

export function runFavorites(store: ConfigStore) {
  const all = store.all();
  
  const favoriteKeys = Object.keys(all).filter((key) => all[key].favorite);
  
  if (favoriteKeys.length === 0) {
    console.log("No favorite projects found.\n");
    console.log("Add one using:\n");
    console.log(colorize("thyra favorite <alias>"));
    return;
  }

  favoriteKeys.sort((a, b) => {
    const aliasA = all[a].alias || a;
    const aliasB = all[b].alias || b;
    return aliasA.localeCompare(aliasB);
  });

  console.log("\n" + color.bold("Favorite Projects\n"));

  const rows = favoriteKeys.map((key) => {
    const entry = all[key];
    return {
      Command: "⭐ " + color.cyan(entry.alias || key),
      Description: color.dim(entry.path),
    };
  });

  printCommandTable(rows, {
    header: {
      Command: "Name",
      Description: "Path",
    },
  });
}
