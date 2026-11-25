import type { CSSProperties, ReactNode } from "react";
import { mix, tween, useTime } from "@/components/writeup/anim/kit";

// The app in use, in Grove's own colours: it gets ready once, it is saved on
// the device, then a typed question is sent and answered word by word.

const G = { ink: "#0B0B0D", body: "#3D3A36", muted: "#66625C", line: "#ECE8E2", card: "#F7F4EC", green: "#0B6B43", soft: "#E4F2E8", track: "#E3DDD0" };

const QUESTION = "Explain compound interest as if I am new to it.";
const REPLY =
  "Compound interest means you earn interest on your interest. Put in $100 at 5% and after a year you have $105. The next year you earn 5% on $105, not on $100.";

// Timeline, in seconds.
const WELCOME = { in: 0.3, load: 1.0, ready: 3.4, out: 4.6 };
const SAVED = { in: 4.8, out: 6.4 };
const CHAT = { in: 6.6, type: 7.0, typeFor: 1.8, send: 9.1, answer: 9.6, answerFor: 3.6 };

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
        gap: 16,
        padding: "0 32px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Arches({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="12 8.5 232 232" fill="none" stroke={color} strokeWidth="22" aria-hidden="true">
      <path d="M40 228V120A88 88 0 0 1 216 120V228" />
      <path d="M74 228V120A54 54 0 0 1 182 120V228" />
      <path d="M108 228V120A20 20 0 0 1 148 120V228" />
    </svg>
  );
}

/** Bars that move while it thinks: deterministic, so every frame and loop match. */
function Bars({ t, level }: { t: number; level: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3, height: 14 }} aria-hidden="true">
      {[0, 1, 2, 3].map((i) => {
        const s = Math.max(0.25, (0.3 + 0.7 * Math.abs(Math.sin(t * 6 + i * 0.9))) * level);
        return <span key={i} style={{ width: 4, height: "100%", borderRadius: 999, background: G.green, transform: `scaleY(${s})` }} />;
      })}
    </span>
  );
}

export default function How() {
  const t = useTime();

  const step = t < SAVED.in ? 0 : t < CHAT.in ? 1 : 2;
  const welcome = scene(t, WELCOME.in, WELCOME.out);
  const saved = scene(t, SAVED.in, SAVED.out + 0.2);
  const chat = scene(t, CHAT.in, HOW_SECONDS + 1);

  // Welcome scene: the strip fills, then turns into a check.
  const pct = Math.round(100 * tween(t, WELCOME.load, WELCOME.ready - WELCOME.load, (x) => x));
  const isReady = t >= WELCOME.ready;
  const pulse = isReady ? 1 + 0.03 * Math.sin(Math.max(0, t - WELCOME.ready) * 5) * (1 - tween(t, WELCOME.ready + 0.8, 0.4)) : 1;

  // Chat scene
  const typed = Math.round(QUESTION.length * tween(t, CHAT.type, CHAT.typeFor, (x) => x));
  const sent = t >= CHAT.send;
  const rise = tween(t, CHAT.send, 0.4);
  const answering = t >= CHAT.answer;
  const shown = answering ? Math.round(REPLY.length * tween(t, CHAT.answer, CHAT.answerFor, (x) => x)) : 0;
  const done = shown >= REPLY.length;
  const press = sent ? 1 - 0.08 * Math.sin(Math.min(1, (t - CHAT.send) / 0.25) * Math.PI) : 1;

  return (
    <div data-anim-stage="" style={{ position: "absolute", top: 0, left: 0, right: 0, background: "#FFFFFF", color: G.ink, fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.5 }}>
      {/* Steps */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 28px", marginBottom: 16 }}>
        {STEPS.map((label, i) => {
          const on = i === step;
          return (
            <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 16, fontWeight: 500, color: on ? G.ink : "#A8A39C" }}>
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
                  color: on ? "#FFFFFF" : i < step ? G.green : "#A8A39C",
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
          <Arches size={52} color={G.green} />
          <div style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: 40, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, textAlign: "center" }}>
            Ask anything.
            <br />
            Privately.
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              height: 44,
              padding: "0 16px",
              borderRadius: 12,
              background: isReady ? G.soft : G.card,
              color: isReady ? G.green : G.body,
              fontSize: 15,
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
                <span style={{ flex: 1, height: 8, borderRadius: 999, background: G.track, overflow: "hidden" }}>
                  <span style={{ display: "block", height: "100%", width: `${pct}%`, background: G.green, borderRadius: 999 }} />
                </span>
                <span style={{ fontVariantNumeric: "tabular-nums", minWidth: 36, textAlign: "right" }}>{pct}%</span>
              </>
            )}
          </div>
          <div style={{ minWidth: 260, height: 52, borderRadius: 12, background: G.green, color: "#FFFFFF", display: "grid", placeItems: "center", fontSize: 18, fontWeight: 700, transform: `scale(${pulse})` }}>
            Start chatting
          </div>
        </Layer>

        {/* 2. Saved */}
        <Layer opacity={saved}>
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
        <Layer opacity={chat} style={{ alignItems: "stretch", justifyContent: "flex-end", gap: 14, padding: "0 20px 18px" }}>
          {sent && (
            <div style={{ alignSelf: "flex-end", maxWidth: "78%", padding: "12px 16px", borderRadius: "14px 14px 4px 14px", background: G.soft, color: G.ink, fontSize: 17, lineHeight: 1.4, opacity: rise, transform: `translateY(${(1 - rise) * 24}px)` }}>
              {QUESTION}
            </div>
          )}
          {sent && (
            <div style={{ fontSize: 17, lineHeight: 1.5, color: G.ink, maxWidth: "92%", minHeight: 52 }}>
              {answering ? (
                <>
                  {REPLY.slice(0, shown)}
                  {!done && <span style={{ display: "inline-block", width: 2, height: 18, background: G.green, marginLeft: 2, verticalAlign: "text-bottom" }} />}
                </>
              ) : (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 10, color: G.green, fontWeight: 700, fontSize: 15 }}>
                  <Bars t={t} level={1} />
                  Thinking
                </span>
              )}
            </div>
          )}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginTop: 6 }}>
            <div style={{ flex: 1, minHeight: 52, display: "flex", alignItems: "center", padding: "0 16px", border: `1.5px solid ${typed > 0 && !sent ? G.green : "#D6D2CB"}`, borderRadius: 12, fontSize: 17, color: typed > 0 && !sent ? G.ink : G.muted }}>
              {sent || typed === 0 ? "Ask anything..." : QUESTION.slice(0, typed)}
              {!sent && typed > 0 && typed < QUESTION.length && <span style={{ width: 2, height: 22, background: G.green, marginLeft: 2, display: "inline-block" }} />}
            </div>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: G.green, display: "grid", placeItems: "center", transform: `scale(${press})`, flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 19V5" />
                <path d="m5 12 7-7 7 7" />
              </svg>
            </div>
          </div>
        </Layer>
      </div>
    </div>
  );
}
