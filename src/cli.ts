import { runConfig } from "~/commands/config";
import { runVersion } from "~/commands/version";
import { runOpen } from "~/commands/open";
import { runList } from "~/commands/list";
import { runHelp } from "~/commands/help";
import { runReset } from "~/commands/reset";
import { runUpdate as runUpdateCmd } from "~/commands/update";
import { runImport } from "~/commands/import";
import { runRecent } from "~/commands/recent";

import { getConfigFilePath, ConfigStore } from "~/configStore";

(function run() {
  const [, , command, ...rest] = process.argv;

  const store = new ConfigStore(getConfigFilePath());

  if (
    !command ||
    command === "help" ||
    command === "--help" ||
    command === "-h"
  ) {
    runHelp(0);
    return;
  }
  if (command === "version" || command === "--version" || command === "-v") {
    runVersion(store);
    return;
  }

  switch (command) {
    case "config":
      runConfig(store, rest);
      break;
    case "open":
      runOpen(store, rest);
      break;
    case "recent":
      runRecent(store, rest);
      break;
    case "reset":
      runReset(store, rest);
      break;
    case "update":
      runUpdateCmd(store, rest);
      break;
    case "list":
      runList(store);
      break;
    case "import":
      runImport(store, rest);
      break;
    default:
      console.error(`Unknown command: ${command}`);
      runHelp(1);
  }
})();
