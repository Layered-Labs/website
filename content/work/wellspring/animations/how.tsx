import type { CSSProperties, ReactNode } from "react";
import { mix, tween, useTime } from "@/components/writeup/anim/kit";

// The app in use, in Wellspring's own colours: record ten seconds, the voice is
// saved on the device, then a typed message is sent and spoken in that voice.

const W = { ink: "#0B0B0D", body: "#3D3A36", muted: "#66625C", line: "#ECE8E2", card: "#F5F4F1", cobalt: "#2340D6", soft: "#E9EDFD" };

const PROMPT = "I like to start my mornings with a cup of coffee and a short walk.";
const MESSAGE = "Hi Sam, it's Grandma. I'll be there by six.";

// Timeline, in seconds.
const REC = { in: 0.3, start: 1.0, end: 3.6 };
const SAVED = { in: 3.9, out: 5.2 };
const CHAT = { in: 5.4, type: 5.8, typeFor: 1.8, send: 7.9, speak: 8.3, end: 11.2 };

export const HOW_SECONDS = 11.6;

const STEPS = ["Record ten seconds", "Your voice is saved on the device", "Type, and hear it in your voice"];

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
        gap: 18,
        padding: "0 32px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Bars that move like a voice: deterministic, so every frame and loop match. */
function Wave({ t, bars, height, level, color }: { t: number; bars: number; height: number; level: number; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, height }} aria-hidden="true">
      {Array.from({ length: bars }, (_, i) => {
        const v = Math.abs(Math.sin(i * 0.71 + t * 9.3) * Math.sin(i * 0.29 + t * 5.1));
        const s = Math.max(0.08, (0.2 + 0.8 * v) * level);
        return <span key={i} style={{ width: 5, height: "100%", borderRadius: 999, background: color, transform: `scaleY(${s})` }} />;
      })}
    </div>
  );
}

function Bubble({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ alignSelf: "flex-end", maxWidth: "78%", padding: "12px 16px", borderRadius: "14px 14px 4px 14px", background: W.soft, color: W.ink, fontSize: 18, lineHeight: 1.4, ...style }}>
      {children}
    </div>
  );
}

export default function How() {
  const t = useTime();

  const step = t < SAVED.in ? 0 : t < CHAT.in ? 1 : 2;
  const rec = scene(t, REC.in, SAVED.in);
  const saved = scene(t, SAVED.in, SAVED.out + 0.2);
  const chat = scene(t, CHAT.in, HOW_SECONDS + 1);

  // Record scene
  const recording = t >= REC.start && t < REC.end;
  const recSecs = Math.max(0, Math.min(REC.end, t) - REC.start);
  const recLevel = recording ? tween(t, REC.start, 0.3) : 0;

  // Chat scene
  const typed = Math.round(MESSAGE.length * tween(t, CHAT.type, CHAT.typeFor, (x) => x));
  const sent = t >= CHAT.send;
  const rise = tween(t, CHAT.send, 0.4);
  const speaking = t >= CHAT.speak && t < CHAT.end;
  const speakLevel = speaking ? tween(t, CHAT.speak, 0.25) * (1 - tween(t, CHAT.end - 0.3, 0.3)) : 0;
  const press = sent ? 1 - 0.08 * Math.sin(Math.min(1, (t - CHAT.send) / 0.25) * Math.PI) : 1;

  return (
    <div data-anim-stage="" style={{ position: "absolute", top: 0, left: 0, right: 0, background: "#FFFFFF", color: W.ink, fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.5 }}>
      {/* Steps */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 28px", marginBottom: 16 }}>
        {STEPS.map((label, i) => {
          const on = i === step;
          return (
            <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 16, fontWeight: 500, color: on ? W.ink : "#A8A39C", transition: "none" }}>
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 14,
                  fontWeight: 600,
                  background: on ? W.cobalt : i < step ? W.soft : W.card,
                  color: on ? "#FFFFFF" : i < step ? W.cobalt : "#A8A39C",
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
      <div style={{ position: "relative", height: 380, borderRadius: 20, background: "#FFFFFF", border: `1.5px solid ${W.line}`, overflow: "hidden" }}>
        {/* 1. Record */}
        <Layer opacity={rec}>
          <div style={{ maxWidth: 520, padding: "16px 20px", borderRadius: 14, background: W.card, fontSize: 20, lineHeight: 1.45, textAlign: "left" }}>{PROMPT}</div>
          <div style={{ height: 56, display: "flex", alignItems: "center", opacity: recording ? 1 : 0 }}>
            <Wave t={t} bars={34} height={56} level={recLevel} color={W.cobalt} />
          </div>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              background: recording ? "#FFFFFF" : W.cobalt,
              border: recording ? `4px solid ${W.cobalt}` : "4px solid transparent",
              boxSizing: "border-box",
            }}
          >
            {recording ? (
              <span style={{ width: 30, height: 30, borderRadius: 7, background: W.cobalt }} />
            ) : (
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="9" y="2" width="6" height="12" rx="3" />
                <path d="M5 10a7 7 0 0 0 14 0" />
                <path d="M12 17v4" />
              </svg>
            )}
          </div>
          <div style={{ fontSize: 17, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
            {recording ? `Tap to stop · ${Math.floor(recSecs)}s` : t >= REC.end ? "Voice recorded" : "Tap to record"}
          </div>
        </Layer>

        {/* 2. Saved */}
        <Layer opacity={saved}>
          <div style={{ width: 96, height: 96, borderRadius: "50%", display: "grid", placeItems: "center", background: W.soft, transform: `scale(${mix(0.85, 1, tween(t, SAVED.in, 0.4))})` }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={W.cobalt} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em" }}>Your voice is ready</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 999, background: W.card, fontSize: 15, color: W.body }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={W.body} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            Saved on this device. Nothing is uploaded.
          </div>
        </Layer>

        {/* 3. Chat */}
        <Layer opacity={chat} style={{ alignItems: "stretch", justifyContent: "flex-end", gap: 14, padding: "0 20px 18px" }}>
          <Bubble>Good morning, Sam!</Bubble>
          {sent && (
            <div style={{ alignSelf: "flex-end", maxWidth: "78%", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, opacity: rise, transform: `translateY(${(1 - rise) * 24}px)` }}>
              <Bubble style={{ maxWidth: "100%" }}>{MESSAGE}</Bubble>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: speaking ? W.cobalt : W.muted, height: 22 }}>
                {speaking ? (
                  <>
                    <Wave t={t} bars={5} height={14} level={speakLevel} color={W.cobalt} />
                    Speaking in your voice
                  </>
                ) : t >= CHAT.end ? (
                  "Spoken"
                ) : (
                  "Getting ready to speak..."
                )}
              </span>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginTop: 6 }}>
            <div style={{ flex: 1, minHeight: 52, display: "flex", alignItems: "center", padding: "0 16px", border: `1.5px solid ${typed > 0 && !sent ? W.cobalt : "#D6D2CB"}`, borderRadius: 12, fontSize: 18, color: typed > 0 && !sent ? W.ink : W.muted }}>
              {sent || typed === 0 ? "Type to speak..." : MESSAGE.slice(0, typed)}
              {!sent && typed > 0 && typed < MESSAGE.length && <span style={{ width: 2, height: 22, background: W.cobalt, marginLeft: 2, display: "inline-block" }} />}
            </div>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: W.cobalt, display: "grid", placeItems: "center", transform: `scale(${press})`, flexShrink: 0 }}>
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
