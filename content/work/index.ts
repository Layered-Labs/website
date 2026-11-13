// Every work item is a folder here. Order is the order the site lists them:
// Applied, then Tools, then Datasets.

import type { WorkItem } from "@/lib/content/types";
import fastSlowOrtho from "./fast-slow-ortho";
import triageBias from "./triage-bias";
import noJailbreakRequired from "./no-jailbreak-required";
import benchbase from "./benchbase";
import acne04 from "./acne04";
import fableDerm from "./fable-derm";
import clearwrist from "./clearwrist";
import neiss from "./neiss";
import nycClinicAi from "./nyc-clinic-ai";

export const WORK_ITEMS: WorkItem[] = [
  fastSlowOrtho,
  triageBias,
  noJailbreakRequired,
  benchbase,
  acne04,
  fableDerm,
  clearwrist,
  neiss,
  nycClinicAi,
];
