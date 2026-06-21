import color from "picocolors";
import type { ConfigStore } from "~/configStore";
import { getRelativeTime } from "~/utils/time";

export function runRecent(store: ConfigStore, args: string[]): void {
  const isAll = args.includes("--all");
  const limitIndex = args.indexOf("--limit");
  let limit = 10;

  if (limitIndex !== -1 && args[limitIndex + 1]) {
    const parsed = parseInt(args[limitIndex + 1], 10);
    if (!isNaN(parsed) && parsed > 0) {
      limit = parsed;
    } else {
      console.error(color.red("Invalid limit value. It must be a positive integer."));
      process.exit(1);
    }
  }

  const allEntries = Object.values(store.all());
  const openedEntries = allEntries.filter(
    (entry) => entry.lastOpenedAt && entry.lastOpenedAt.length > 0
  );

  if (openedEntries.length === 0) {
    console.log("No recently opened projects found.\n");
    console.log("Open a project first:");
    console.log(`  thyra open ${color.cyan("<alias>")}`);
    return;
  }

  // Sort by lastOpenedAt descending
  openedEntries.sort((a, b) => {
    return new Date(b.lastOpenedAt!).getTime() - new Date(a.lastOpenedAt!).getTime();
  });

  const entriesToShow = isAll ? openedEntries : openedEntries.slice(0, limit);

  console.log(color.bold("Recently Opened Projects\n"));

  const maxAliasLength = Math.max(
    ...entriesToShow.map((e) => e.alias.length),
    20
  );

  entriesToShow.forEach((entry, index) => {
    const num = `${index + 1}.`;
    const relativeTime = getRelativeTime(entry.lastOpenedAt!);
    const paddedAlias = entry.alias.padEnd(maxAliasLength + 2, " ");
    
    console.log(
      `${num.padEnd(3)} ${color.cyan(paddedAlias)} ${color.dim(`(opened ${relativeTime})`)}`
    );
  });
}
