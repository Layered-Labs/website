---
title: "Mapping AI Deployment Readiness Across NYC Community Clinics"
description: "A dataset and interactive map evaluating broadband and electricity infrastructure across all 311 NYC ZIP codes to identify where on-premise clinical AI can be deployed today."
date: "2026-02-19"
tag: "Technical Report"
---

## Overview

Deploying AI in clinical settings is not just a software problem. Before a model can run on-premise at a community health clinic, the underlying infrastructure must support it: reliable broadband for data access and model updates, and stable electricity for continuous operation.

This dataset addresses a question that precedes most AI deployment conversations: where can on-premise clinical AI actually run today?

## Dataset

We assembled infrastructure data across all 311 NYC ZIP codes, combining:

- FCC broadband availability records (Form 477)
- EIA electricity reliability data
- NYC DOHMH community health center locations

The result is a per-ZIP-code profile of deployment readiness, published as an open dataset on HuggingFace and visualized in an interactive Gradio map.

## Key Findings

- Broadband availability is near-universal across NYC ZIP codes at the provider level, but reported speeds vary significantly in historically underserved neighborhoods.
- Electricity reliability metrics show meaningful variation across boroughs, with implications for always-on inference workloads.
- 74 ZIP codes contain at least one FQHC or community health center, forming the core deployment target population.

## Access

Dataset and interactive map are publicly available:

- HuggingFace Dataset: [Layered-Labs/nyc-clinic-ai-infrastructure](https://huggingface.co/datasets/Layered-Labs/nyc-clinic-ai-infrastructure)
- Interactive Map: [Layered-Labs/nyc-clinic-ai-infra-map](https://huggingface.co/spaces/Layered-Labs/nyc-clinic-ai-infra-map)
- GitHub: [Layered-Labs/nyc-clinic-ai-infrastructure](https://github.com/Layered-Labs/nyc-clinic-ai-infrastructure)
