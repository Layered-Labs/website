---
title: "Constraints"
description: "Evaluating how well open-source and closed-source LLMs perform on tasks with real-world constraints."
date: "2025-03-28"
tag: "Blog Post"
---

## The Problem

Real-world decisions involve juggling multiple constraints simultaneously: budgets, availability, preferences, regulations. It's unclear how well current LLMs handle this kind of multi-constraint reasoning compared to human decision-making.

When you ask a model to plan a meal within a budget, schedule a trip with layover limits, or recommend a treatment plan respecting drug interactions and patient allergies, you're asking it to satisfy multiple constraints at once. This is fundamentally different from open-ended generation.

## Our Evaluation

We designed a benchmark to systematically evaluate constraint-following capabilities across both open-source and closed-source LLMs. The benchmark covers several categories:

### Constraint Types

- **Numerical constraints**: Budget limits, quantity restrictions, time windows
- **Logical constraints**: Mutual exclusions, conditional requirements, ordering rules
- **Domain constraints**: Medical protocols, regulatory requirements, safety guidelines
- **Preference constraints**: Soft preferences that should be satisfied when possible

### Models Evaluated

We tested a range of models across the size spectrum:

- Large closed-source models (GPT-4, Claude)
- Medium open-source models (Llama 3, Mistral)
- Small specialized models (our fine-tuned healthcare models)

## Key Findings

1. **Constraint count matters**: All models show degraded performance as the number of simultaneous constraints increases, but the rate of degradation varies significantly
2. **Domain specialization helps**: Small models fine-tuned on constraint-heavy domains outperform larger general-purpose models on domain-specific constraint tasks
3. **Implicit vs. explicit**: Models handle explicitly stated constraints much better than constraints that must be inferred from context
4. **Conflict resolution**: When constraints conflict, models rarely acknowledge the conflict. They silently drop constraints instead.

## Why It Matters for Healthcare

Understanding constraint-following capabilities is critical for deploying LLMs in domains like healthcare, where decisions must respect strict protocols, resource limitations, and patient-specific requirements.

A model that silently drops a drug interaction constraint or ignores a dosage limit is not just unhelpful, it's dangerous. Our work helps identify where current models fall short so we can build targeted improvements.

## What's Next

We're extending this work in two directions:

- **Constraint-aware fine-tuning**: Training models to explicitly track and verify constraints during generation
- **Benchmark expansion**: Adding more healthcare-specific constraint scenarios based on real clinical decision-making workflows
