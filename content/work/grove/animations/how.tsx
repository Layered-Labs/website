import type { CSSProperties, ReactNode } from "react";
import { C, Stage, mix, tween, useTime } from "@/components/writeup/anim/kit";

// The app in use, in Grove's own colours: it opens and gets ready once, it is
// saved on the device, then a typed question is sent and answered word by
// word, with the connection off.

// Neutrals come from the shared kit; green and soft are Grove's own accent.
const G = { ink: C.ink, body: C.text, muted: C.soft, line: C.rule, card: C.track, green: "#0B6B43", soft: "#E4F2E8" };

const TAG = "qwen2.5:0.5b-instruct-q4f16_1";
const QUESTION = "Explain compound interest as if I am new to it.";
const REPLY =
  "Compound interest means you earn interest on your interest. Put in $100 at 5% and after a year you have $105. The next year you earn 5% on $105, not on $100.";

// Timeline, in seconds.
const WELCOME = { in: 0.3, load: 1.0, ready: 3.4, press: 4.0, out: 4.9 };
const SAVED = { in: 5.1, out: 6.7 };
const CHAT = { in: 6.9, type: 7.3, typeFor: 1.8, send: 9.4, answer: 9.9, answerFor: 3.4, offline: 11.4 };

export const HOW_SECONDS = 14;

const STEPS = ["Open Grove", "It gets ready once", "Ask, and it answers here"];

/** 0 to 1 while the scene is on screen, fading in and out over 0.35s. */
function scene(t: number, start: number, end: number) {
  return tween(t, start, 0.35) * (1 - tween(t, end - 0.35, 0.35));
}

function Layer({ opacity, children, style }: { opacity: number; children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        transform: `translateY(${(1 - opacity) * 10}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "0 32px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** The mark: three arches, each its own path, dropping in from the top arch down. */
function Arches({ size, t, start }: { size: number; t: number; start: number }) {
  const parts = ["M40 228V120A88 88 0 0 1 216 120V228", "M74 228V120A54 54 0 0 1 182 120V228", "M108 228V120A20 20 0 0 1 148 120V228"];
  return (
    <svg width={size} height={size} viewBox="12 8.5 232 232" fill="none" stroke={G.green} strokeWidth="22" aria-hidden="true">
      {parts.map((d, i) => {
        const p = tween(t, start + i * 0.2, 0.6);
        return <path key={d} d={d} style={{ opacity: p, transform: `translateY(${(1 - p) * -24}px)` }} />;
      })}
    </svg>
  );
}

/** Bars that move while it thinks: deterministic, so every frame and loop match. */
function Bars({ t }: { t: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3, height: 14 }} aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} style={{ width: 4, height: "100%", borderRadius: 999, background: G.green, transform: `scaleY(${0.25 + 0.75 * Math.abs(Math.sin(t * 6 + i * 0.9))})` }} />
      ))}
    </span>
  );
}

/** The model tag, as the app shows it next to the chat box. */
function Chip() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 30, padding: "0 10px", border: `1px solid ${G.line}`, borderRadius: 8, fontSize: 12.5, color: G.body, background: "#FFFFFF" }}>
      <span style={{ fontFamily: "var(--font-mono), ui-monospace, monospace" }}>{TAG}</span>
      <span style={{ color: G.green, fontWeight: 500, fontSize: 13 }}>Details</span>
    </span>
  );
}

export default function How() {
  const t = useTime();

  const step = t < WELCOME.ready ? 0 : t < CHAT.in ? 1 : 2;
  const welcome = scene(t, WELCOME.in, WELCOME.out);
  const saved = scene(t, SAVED.in, SAVED.out + 0.2);
  const chat = scene(t, CHAT.in, HOW_SECONDS + 1);

  // Welcome scene: the strip fills, then turns into a check, then the button is pressed.
  const pct = Math.round(100 * tween(t, WELCOME.load, WELCOME.ready - WELCOME.load - 0.2, (x) => x));
  const isReady = t >= WELCOME.ready;
  const press = t >= WELCOME.press ? 1 - 0.06 * Math.sin(Math.min(1, (t - WELCOME.press) / 0.3) * Math.PI) : 1;

  // Chat scene
  const typed = Math.round(QUESTION.length * tween(t, CHAT.type, CHAT.typeFor, (x) => x));
  const sent = t >= CHAT.send;
  const rise = tween(t, CHAT.send, 0.4);
  const answering = t >= CHAT.answer;
  const shown = answering ? Math.round(REPLY.length * tween(t, CHAT.answer, CHAT.answerFor, (x) => x)) : 0;
  const done = shown >= REPLY.length;
  const sendPress = sent ? 1 - 0.08 * Math.sin(Math.min(1, (t - CHAT.send) / 0.25) * Math.PI) : 1;
  const offline = t >= CHAT.offline;

  return (
    <Stage style={{ fontSize: 17, lineHeight: 1.5 }}>
      {/* Steps */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 28px", marginBottom: 16 }}>
        {STEPS.map((label, i) => {
          const on = i === step;
          return (
            <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 16, fontWeight: 500, color: on ? G.ink : C.grey }}>
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 14,
                  fontWeight: 600,
                  background: on ? G.green : i < step ? G.soft : G.card,
                  color: on ? "#FFFFFF" : i < step ? G.green : C.grey,
                }}
              >
                {i + 1}
              </span>
              {label}
            </span>
          );
        })}
      </div>

      {/* The app screen */}
      <div style={{ position: "relative", height: 380, borderRadius: 20, background: "#FFFFFF", border: `1.5px solid ${G.line}`, overflow: "hidden" }}>
        {/* 1. Welcome */}
        <Layer opacity={welcome}>
          <Arches size={44} t={t} start={WELCOME.in + 0.2} />
          <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 34, lineHeight: 1.05, letterSpacing: "-0.02em", textAlign: "center" }}>
            Ask anything.
            <br />
            Privately.
          </div>
          <div style={{ fontSize: 15, color: G.muted }}>Free. Runs on this device.</div>
          <Chip />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              height: 40,
              padding: "0 14px",
              borderRadius: 10,
              background: isReady ? G.soft : G.card,
              color: isReady ? G.green : G.body,
              fontSize: 14,
              fontWeight: isReady ? 700 : 400,
              minWidth: 300,
            }}
          >
            {isReady ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={G.green} strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Ready on this device
              </>
            ) : (
              <>
                <span>Getting Grove ready</span>
                <span style={{ flex: 1, height: 8, borderRadius: 999, background: C.rule, overflow: "hidden" }}>
                  <span style={{ display: "block", height: "100%", width: `${pct}%`, background: G.green, borderRadius: 999 }} />
                </span>
                <span style={{ fontVariantNumeric: "tabular-nums", minWidth: 34, textAlign: "right" }}>{pct}%</span>
              </>
            )}
          </div>
          <div style={{ minWidth: 260, height: 48, borderRadius: 10, background: G.green, color: "#FFFFFF", display: "grid", placeItems: "center", fontSize: 17, fontWeight: 700, transform: `scale(${press})` }}>
            Start chatting
          </div>
        </Layer>

        {/* 2. Saved */}
        <Layer opacity={saved} style={{ gap: 16 }}>
          <div style={{ width: 96, height: 96, borderRadius: "50%", display: "grid", placeItems: "center", background: G.soft, transform: `scale(${mix(0.85, 1, tween(t, SAVED.in, 0.4))})` }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={G.green} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em" }}>Grove is ready</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 999, background: G.card, fontSize: 15, color: G.body }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G.body} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            Saved on this device. Works with no internet.
          </div>
        </Layer>

        {/* 3. Chat */}
        <Layer opacity={chat} style={{ alignItems: "stretch", justifyContent: "flex-end", gap: 12, padding: "0 20px 14px" }}>
          {sent && (
            <div style={{ alignSelf: "flex-end", maxWidth: "78%", padding: "11px 15px", borderRadius: "14px 14px 4px 14px", background: G.soft, color: G.ink, fontSize: 16, lineHeight: 1.4, opacity: rise, transform: `translateY(${(1 - rise) * 24}px)` }}>
              {QUESTION}
            </div>
          )}
          {sent && (
            <div style={{ fontSize: 16, lineHeight: 1.5, color: G.ink, maxWidth: "94%", minHeight: 48 }}>
              {answering ? (
                <>
                  {REPLY.slice(0, shown)}
                  {!done && <span style={{ display: "inline-block", width: 2, height: 17, background: G.green, marginLeft: 2, verticalAlign: "text-bottom" }} />}
                </>
              ) : (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 10, color: G.green, fontWeight: 700, fontSize: 15 }}>
                  <Bars t={t} />
                  Thinking
                </span>
              )}
            </div>
          )}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
            <div style={{ flex: 1, minHeight: 50, display: "flex", alignItems: "center", padding: "0 14px", border: `1.5px solid ${typed > 0 && !sent ? G.green : C.grey}`, borderRadius: 10, fontSize: 16, color: typed > 0 && !sent ? G.ink : G.muted, overflow: "hidden", whiteSpace: "nowrap" }}>
              {sent || typed === 0 ? "Ask anything..." : QUESTION.slice(0, typed)}
              {!sent && typed > 0 && typed < QUESTION.length && <span style={{ width: 2, height: 20, background: G.green, marginLeft: 2, display: "inline-block" }} />}
            </div>
            <div style={{ width: 50, height: 50, borderRadius: "50%", background: G.green, display: "grid", placeItems: "center", transform: `scale(${sendPress})`, flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 19V5" />
                <path d="m5 12 7-7 7 7" />
              </svg>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, fontSize: 13, color: offline ? "#B42318" : G.muted }}>
            <Chip />
            {offline ? "You are offline. Grove is still working." : "Runs on this device. Nothing is sent anywhere."}
          </div>
        </Layer>
      </div>
    </Stage>
  );
}
