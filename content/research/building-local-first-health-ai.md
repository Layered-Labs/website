---
title: "Building Local-First Health AI: Architecture and Tradeoffs"
description: "Why we chose a local-first architecture for the health companion, and what that means for privacy, model choice, and research design."
date: "2026-02-05"
tag: "Blog Post"
---

## The Local-First Premise

Most health apps send your data to a server. This is convenient for the developer and creates risk for the user. Health data is among the most sensitive information a person generates, and centralized storage creates a liability that is difficult to justify for a research prototype.

We chose a different architecture: patient state lives on the device. The structured state object is generated locally, updated locally, and never transmitted without explicit consent. There is no server that accumulates your health history.

This has real consequences for what we can and cannot do.

## What Local-First Enables

- **Privacy by default**: no data breach can expose what was never stored centrally
- **Offline operation**: the app works without internet access, which matters in low-connectivity environments
- **Patient ownership**: the state file belongs to the patient and can be exported, shared with a clinician, or deleted entirely
- **Trust**: patients in underserved communities have well-documented reasons to distrust data collection by health institutions

## What Local-First Constrains

Running a language model locally is non-trivial. On-device inference for even a small model (1-3B parameters) requires careful memory management and acceptable latency. Phase 1 of our system avoids this problem entirely: summaries are generated deterministically from structured state, with no model required.

The AI reasoning layer is a Phase 2 feature, at which point we will evaluate quantized open-source models for on-device inference versus a locally-hosted model on a home server. The tradeoffs between latency, quality, and hardware requirements are themselves a research question.

## Research Implications

Local-first means we cannot collect user data for research. Our research pipeline therefore relies on synthetic patient trajectories that we generate and control. This is a limitation we are transparent about: synthetic data is not the same as real longitudinal behavior. But it allows us to move fast, publish benchmarks, and study model behavior before a real deployment is mature enough to generate usable data.
