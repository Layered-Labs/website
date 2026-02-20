---
title: "Toward Benchmarks for Longitudinal Patient Summarization"
description: "A research agenda for evaluating how open-source language models reason over structured patient state across extended time horizons."
date: "2026-02-10"
tag: "Preprint"
---

## Motivation

Existing clinical NLP benchmarks evaluate models on static, single-turn tasks: answer this medical question, extract this named entity, classify this note. None of them evaluate how a model handles evolving patient state across time.

This gap matters. A model that correctly answers a clinical question about a patient's current medication may fail entirely when asked to reason about how that medication history changed over six months, what patterns emerged, or how to reconcile conflicting entries.

## Proposed Benchmark Dimensions

We are developing evaluation criteria across four dimensions:

**1. Temporal Consistency**
Does the model correctly track changes in patient state over time? Does it correctly identify what changed versus what remained stable across a series of updates?

**2. Hallucination Rate in Longitudinal Context**
Models are known to hallucinate more as context grows. We measure hallucination specifically in the longitudinal setting: invented values, fabricated trends, incorrect attributions of when an event occurred.

**3. Summarization Fidelity**
Given a structured state object, does the model produce a summary that accurately reflects the data without omission or embellishment? We evaluate both precision (no invented facts) and recall (no key facts omitted).

**4. State Update Accuracy**
Given a prior state and a new event, does the model correctly identify which fields should update and how? This evaluates the model as a state-update operator, not just a reader.

## Synthetic Data Pipeline

Because real patient data cannot be used, we are developing a synthetic trajectory generator: a system that produces realistic longitudinal patient histories with ground-truth state at each timestep. This dataset will be released publicly for community evaluation.

## Status

This benchmark is in active development. Synthetic data pipeline is being designed. Evaluation harness forthcoming.
