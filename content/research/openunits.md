---
title: "OpenUnits"
description: "A unified API for accessing multiple small, specialized language models through a single endpoint."
date: "2025-04-10"
tag: "Blog Post"
---

## The Problem

Researchers working with small models face friction when switching between different model APIs, configurations, and hosting setups. There's no simple way to experiment with and compare multiple small models efficiently.

Every model provider has its own SDK, authentication flow, and request format. For researchers who need to rapidly iterate across multiple small, specialized models, comparing outputs, benchmarking latency, and evaluating quality, this fragmentation creates significant overhead that slows down experimentation.

## What is OpenUnits?

OpenUnits is a unified API that gives you access to multiple small, specialized language models through a single endpoint. One API key, one request format, multiple models, all optimized for healthcare applications.

Instead of integrating with each model provider individually, researchers can:

- **Switch between models** with a single parameter change
- **Compare outputs** across models using consistent request/response formats
- **Benchmark performance** with built-in latency and quality metrics
- **Deploy pipelines** that route to the best model for each task

## Architecture

OpenUnits sits between your application and the underlying model providers:

1. **Unified Request Layer**: Accepts a standardized request format and translates it to each provider's native API
2. **Model Registry**: Maintains metadata about available models, their capabilities, and optimal use cases
3. **Response Normalization**: Ensures consistent output formatting regardless of the underlying model
4. **Metrics Collection**: Tracks latency, token usage, and quality signals across all requests

## Why It Matters for Healthcare

By lowering the barrier to working with small models, OpenUnits accelerates healthcare AI research, enabling researchers to rapidly test and compare specialized models without infrastructure overhead.

Healthcare applications often benefit from using different models for different subtasks:

- A model fine-tuned on clinical notes for extraction
- A model trained on medical literature for question answering
- A model optimized for patient-facing language for communication

OpenUnits makes it trivial to compose these specialized models into a single workflow.

## Getting Started

OpenUnits is open-source and available on our GitHub. The API is designed to be familiar to anyone who has used the OpenAI SDK. Just swap out the base URL and you're ready to go.
