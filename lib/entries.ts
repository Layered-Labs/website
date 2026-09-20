export type Group = "datasets" | "tooling" | "products" | "research";

export type Entry = {
  group: Group;
  /** Only set when it says something the section does not: Coming soon, In progress, Accepted. */
  status?: string;
  /** Yellow tag for work that is not finished; a status without it gets the section's colour. */
  pending?: boolean;
  title: string;
  description: string;
  href?: string;
};

export const GROUPS: {
  key: Group;
  title: string;
  blurb: string;
  color: "green" | "blue" | "orange" | "purple";
}[] = [
  {
    key: "datasets",
    title: "Datasets",
    blurb: "Datasets for clinical AI research, published on Hugging Face.",
    color: "green",
  },
  {
    key: "tooling",
    title: "Open-source tooling",
    blurb: "Tools for testing medical AI the same way every time.",
    color: "blue",
  },
  {
    key: "products",
    title: "Products",
    blurb: "Applications built on open-source models.",
    color: "orange",
  },
  {
    key: "research",
    title: "Research",
    blurb: "Papers and experiments on fairness, accuracy and access in clinical AI.",
    color: "purple",
  },
];

export const ENTRIES: Entry[] = [
  {
    group: "datasets",
    title: "ClearWrist: Pediatric Wrist X-Ray",
    description:
      "20,327 labeled pediatric wrist radiographs, rebuilt from GRAZPEDWRI-DX with clean patient-level splits, verified fracture labels, and bounding boxes.",
    href: "https://huggingface.co/datasets/Layered-Labs/clearwrist-pediatric-wrist-xray",
  },
  {
    group: "datasets",
    title: "NEISS Injury Data",
    description:
      "7.3 million emergency department injury records from 2005 to 2024, consolidated into a single query-ready file.",
    href: "https://huggingface.co/datasets/Layered-Labs/neiss-injury-data",
  },
  {
    group: "datasets",
    title: "NYC Clinic AI Infrastructure",
    description:
      "A dataset and interactive map of AI deployment readiness across 637 NYC community health clinic records, spanning 21 languages.",
    href: "https://huggingface.co/spaces/Layered-Labs/nyc-clinic-ai-infra-map?logs=container",
  },
  {
    group: "datasets",
    title: "ACNE04",
    description:
      "1,457 facial photographs with 4-level severity grades and 18,983 lesion bounding boxes, rebuilt from the original ACNE04 release.",
    href: "https://huggingface.co/datasets/Layered-Labs/ACNE04",
  },
  {
    group: "datasets",
    title: "Claude Fable Derm",
    description:
      "Patient dermatology questions, each framed with one of six basic emotions, with the model's raw, unprompted answers.",
    href: "https://huggingface.co/datasets/Layered-Labs/claude-fable-derm",
  },
  {
    group: "datasets",
    title: "BenchBase MedQA",
    description:
      "USMLE-style four-option questions, in the BenchBase format.",
    href: "https://huggingface.co/datasets/Layered-Labs/benchbase-medqa",
  },
  {
    group: "datasets",
    title: "BenchBase MedMCQA",
    description:
      "187,005 questions from Indian medical entrance exams, in the BenchBase format.",
    href: "https://huggingface.co/datasets/Layered-Labs/benchbase-medmcqa",
  },
  {
    group: "datasets",
    title: "BenchBase PubMedQA",
    description:
      "1,000 yes, no or maybe questions with the abstract as context, in the BenchBase format.",
    href: "https://huggingface.co/datasets/Layered-Labs/benchbase-pubmedqa",
  },
  {
    group: "datasets",
    title: "BenchBase MMLU Medical",
    description:
      "1,242 questions across six medical and biology subjects, in the BenchBase format.",
    href: "https://huggingface.co/datasets/Layered-Labs/benchbase-mmlu-medical",
  },
  {
    group: "datasets",
    title: "BenchBase TRIAGE",
    description:
      "86 mass-casualty scenarios: which triage zone, Red, Yellow, Green or Black.",
    href: "https://huggingface.co/datasets/Layered-Labs/benchbase-triage",
  },
  {
    group: "datasets",
    status: "Coming soon",
    pending: true,
    title: "NYS Health Flyer Repository",
    description: "A centralized collection of public health materials, organized by language.",
  },
  {
    group: "tooling",
    title: "BenchBase",
    description:
      "Medical multiple-choice benchmarks in one format. Every model gets the same prompt, every answer is saved, and reports and paired model comparisons are built for you.",
    href: "https://benchbase-med-website.vercel.app",
  },
  {
    group: "products",
    title: "Wellspring",
    description:
      "Bank your voice while you still have it. Record a few sentences now, and later generate speech in your own voice from typed text. It runs on your own device.",
  },
  {
    group: "products",
    title: "GroveAI",
    description: "Free, private AI for everyone.",
    href: "https://groveai.space",
  },
  {
    group: "products",
    title: "Hue",
    description: "Quantify and track facial skin texture and redness over time.",
    href: "https://hue.skin",
  },
  {
    group: "research",
    status: "Accepted, ICLR AIMS Workshop",
    title: "When Education Shouldn't Matter: Counterfactual Bias in LLM-Based Emergency Triage",
    description:
      "We tested Qwen-2.5-72B and GPT-4o-mini on 87 clinical vignettes with education-level cues added, holding all medical information constant and measuring how often the decision flipped.",
  },
  {
    group: "research",
    status: "In progress",
    pending: true,
    title: "Lost in Dialect: Bengali Translation Gaps in NYC Public Health Flyers",
    description:
      "Does the Bengali in NYC public health flyers match the dialect its residents understand? We are cataloging flyers by language and using AI to assess dialect accuracy.",
  },
  {
    group: "research",
    title: "Does Structure Affect Accuracy? Pydantic vs. Unstructured Output on Clinical QA",
    description:
      "We compared Pydantic-enforced and unstructured output across GPT-4o-mini, Gemini, and Claude on MedQA questions.",
  },
  {
    group: "research",
    title: "Simplifying Orthopedic Patient Education with Open-Source LLMs",
    description:
      "We evaluated open and closed-source models on rewriting OrthoInfo content to an 8th-grade reading level, scored with BERTScore and Flesch-Kincaid grade.",
  },
];
