---
title: "What We Mean by Longitudinal Patient State"
description: "A precise definition of the structured state object at the center of the health companion and our research agenda."
date: "2026-01-05"
tag: "Blog Post"
---

The term longitudinal patient state gets used loosely. Here is what we mean precisely.

A longitudinal patient state object is a structured, time-stamped record of clinically relevant events and derived summaries for a single patient. It is not a transcript. It is not a medical record in the traditional sense. It is a living data structure that updates with each new event and supports deterministic querying.

At minimum, a state object contains:

- **Medications**: name, dose, frequency, start date, adherence log
- **Symptoms**: name, severity scale, first logged date, trend over last N days
- **Events**: visit dates, notable changes, free-text notes (bounded length)
- **Metadata**: last updated timestamp, data version, patient-set privacy flags

This structure is intentionally narrow. It does not try to represent everything in a full EHR. It represents what a patient can self-report on a daily basis and what a clinician needs to contextualize a follow-up visit.

The state schema is open and will be published as part of the health companion release. We invite feedback from clinicians and researchers on what fields are missing or miscalibrated.
