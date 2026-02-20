---
title: "Research Agenda: Evaluating Open-Source Models on Longitudinal State Reasoning"
description: "The questions we are working to answer about how open-source models perform on structured longitudinal patient data."
date: "2025-12-20"
tag: "Blog Post"
---

Our research agenda centers on a set of empirical questions that existing clinical NLP benchmarks do not answer.

**Can open-source models reason accurately over structured longitudinal patient state?**
We are building synthetic trajectory datasets to evaluate this directly, across multiple model families and parameter sizes.

**How do base models compare to instruction-tuned models on state summarization?**
Instruction tuning optimizes for conversational fluency, which may not align with the precision required for clinical summarization. We will evaluate both.

**What is the minimum model size for clinically acceptable longitudinal summarization?**
Smaller models can run on-device. If a 1-3B parameter model meets a quality threshold for structured state summarization, local deployment becomes tractable without expensive hardware.

**How does hallucination rate change as state complexity grows?**
A patient with two medications and one symptom is easy. A patient with twelve medications, multiple comorbidities, and two years of logs is harder. We want to know where models break.

**Can fine-tuning on synthetic longitudinal trajectories improve performance?**
We plan to fine-tune small open-source models on our synthetic dataset and measure the delta. This is the path toward a purpose-built longitudinal summarizer.

Results and datasets will be published openly as work progresses.
