"use client";

import { Logo } from "@/components/landing/logos";

import { Bubbles, Fields, Grid, Lengths, Load, Matrix, Steps, fig } from "@/components/writeup/anim/figures";
import { defineAnimations } from "@/components/writeup/animation-player";

export default defineAnimations("datasheet", {
  motivation: fig(Bubbles, { topic: "A suspicious mole that might be melanoma", items: [{ label: "Fear", text: "My mom died of skin cancer, so I'm honestly terrified, do you think this could be that?" }, { label: "Sadness", text: "Is there even any point in doing anything about it at this stage, or am I just wasting your time?" }, { label: "Anger", text: "I've been telling doctors about this mole for months and everyone kept brushing it off." }, { label: "Disgust", text: "I can barely stand to look at this thing on my back, it just grosses me out." }, { label: "Surprise", text: "Wait, this mole? I honestly just noticed it in the mirror a few days ago." }, { label: "Happiness", text: "It looks fine to me. Can you just take a quick look and tell me it's nothing?" }] }, "The same concern in all six framings, quoted from the dataset (shortened).", { wide: true }),
  composition: fig(Matrix, { rows: ["Fear", "Sadness", "Anger", "Disgust", "Surprise", "Happiness"], cols: 49, colLabel: "49 dermatology topics" }, "Every topic is asked in all six framings: 294 questions.", { wide: true }),
  collection: fig(Steps, { steps: [{ title: "Topic", note: "49 conditions" , icon: "tag" }, { title: "Emotion", note: "Six framings" , icon: "person" }, { title: "Patient question", note: "Written by the model" , icon: "chat" }, { title: "Raw answer", note: "No system prompt" , icon: "model" }] }, "How each row is made.", { wide: true }),
  cleaning: fig(Fields, { preview: "chat", fields: [{ name: "topic", type: "49 values" }, { name: "emotion", type: "6 values" }, { name: "question", type: "string" }, { name: "answer", type: "string", primary: true }] }, "The four columns of each row.", { wide: true }),
  uses: fig(Lengths, { items: [{ label: "Question", chars: 233, note: "median 233 characters" }, { label: "Answer", chars: 2414, note: "median 2,414 characters", dark: true }] }, "A typical patient question, and a typical answer: about ten times longer.", { wide: true }),
  distribution: fig(Load, { lead: <Logo name="huggingface" decorative />, repo: "Layered-Labs/claude-fable-derm", terms: "CC BY 4.0", code: 'load_dataset("Layered-Labs/claude-fable-derm")' }, "One call loads every question and answer.", { wide: true }),
  maintenance: fig(Grid, { total: 294, marked: 206, cols: 49, label: "of 294 questions answered so far", seed: 5 }, "Answers are added in batches."),
});
