---
title: "Structured State as a Constraint on Model Behavior"
description: "How structured patient state reduces the hallucination surface and makes longitudinal clinical AI more auditable."
date: "2026-01-10"
tag: "Blog Post"
---

One of the consistent failure modes of large language models in clinical settings is hallucination: the generation of plausible but false information. In a longitudinal context, this is especially dangerous because false information can compound. A hallucinated medication in one summary becomes a background assumption in the next.

Structured state addresses this by separating the source of truth from the model. The state object contains verified facts. The model reads the state and generates natural language, but cannot modify the state. If the model hallucinates a medication that is not in the state object, that hallucination does not persist.

This is a meaningful architectural constraint, not a complete solution. Models can still misread or misrepresent state contents. But the attack surface is smaller, and outputs are auditable against a ground truth that exists independently of the model.

Measuring how much structured state reduces hallucination relative to free-text context is one of the core empirical questions in our research agenda.
