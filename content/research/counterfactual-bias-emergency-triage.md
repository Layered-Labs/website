---
title: "When Education Shouldn't Matter: Counterfactual Bias in LLM-Based Emergency Triage"
description: "We evaluate open-source and closed-source LLMs on mass casualty triage and find that while overall accuracy is comparable, models exhibit systematic counterfactual bias: triage decisions shift based on patient education level, a factor that should be clinically irrelevant."
date: "2026-02-01"
tag: "Paper"
image: "https://images.unsplash.com/photo-1619966420068-0148ee892900?q=80&w=1932&auto=format&fit=crop"
---

## Abstract

Emergency triage protocols such as START are designed to be purely physiological: airway, breathing, circulation, and mental status. Patient demographics, including education level, are and should be irrelevant to triage priority. We ask whether large language models, when used to assist with mass casualty triage decisions, respect this constraint.

We evaluate both open-source (Qwen) and closed-source (GPT-4o-mini) models on structured triage scenarios, varying patient education level as a counterfactual while holding all clinical variables constant. We find that overall accuracy is comparable across model families, but both exhibit systematic triage bias correlated with education: Qwen tends to under-triage patients with lower reported education, and GPT-4o-mini exhibits a similar directional bias.

## Why This Matters

The finding that open-source and closed-source models achieve similar accuracy is often cited as justification for open-source deployment in clinical settings. Our results complicate this picture. Aggregate accuracy can mask systematic failure modes that are invisible in standard benchmarks but clinically dangerous in deployment.

In a mass casualty event, under-triage means a critically injured patient is assigned a lower priority than their physiology warrants. If that decision correlates with a patient's education level, the model is encoding a socioeconomic bias into a life-critical workflow.

## Connection to Current Research

This work is part of what motivates our focus on structured patient state. When a model reasons over free text that includes demographic details, implicit biases can influence outputs in ways that are hard to detect or audit. Structured state, by contrast, makes explicit exactly what information the model is given. Demographic fields can be excluded by design. Outputs are traceable to specific inputs.

The question of which biases persist even in structured, controlled inputs is one we intend to study as the longitudinal summarization research matures.

## Publication

Submitted to the ICLR AIMS Workshop (AI for Medicine and Science).
