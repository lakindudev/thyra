import color from "picocolors";
import type { ConfigStore } from "~/configStore";

export function runFavorite(store: ConfigStore, args: string[]) {
  const alias = args[0];

  if (!alias) {
    console.error(color.red("Please provide a project alias."));
    console.log("Usage: thyra favorite <alias>");
    return;
  }

  const entry = store.get(alias);

  if (!entry) {
    console.error(color.red(`Project "${alias}" not found.`));
    return;
  }

  if (entry.favorite) {
    console.log(`"${alias}" is already a favorite.`);
    return;
  }

  entry.favorite = true;
  store.set(alias, entry);

  console.log(`⭐ Added "${alias}" to favorites.`);
}
