---
title: "The Case for Open-Source Models in Clinical Deployment"
description: "Why proprietary frontier models are the wrong choice for longitudinal patient AI, and what open-source alternatives make possible."
date: "2026-01-28"
tag: "Blog Post"
---

## The Frontier Model Trap

GPT-4 and its successors are impressive. They also require sending patient data to a third-party server, charge per token at a rate that is prohibitive for low-volume clinical use, and can change behavior or be deprecated with limited notice.

For a health companion that maintains sensitive longitudinal state, these are not minor inconveniences. They are disqualifying properties.

## What Open-Source Makes Possible

The past two years have produced a generation of open-source models that are genuinely capable for clinical reasoning tasks: the Qwen family, Mistral, Llama 3, Phi-3, and others. At the 1-7B parameter range, these models can run on consumer hardware with acceptable latency.

For our use case, the relevant properties are:

- **Deployable locally**: no API calls, no data leaving the device
- **Auditable**: weights are public, behavior can be studied
- **Fine-tunable**: can be adapted to specific clinical domains without negotiating an enterprise contract
- **Stable**: a model you have downloaded does not get deprecated

## The Research Question

We are not arguing that open-source models are better than frontier models on benchmark scores. On most evaluations, they are not.

The question we are asking is narrower: for the specific task of reasoning over structured longitudinal patient state, how much does model capability matter, and what is the minimum capability threshold for clinically useful output?

If a quantized 3B model can produce accurate, non-hallucinated summaries of a structured state object 95% of the time, then frontier model performance is irrelevant for this use case. That is an empirical question, and answering it is part of what we are here to do.
