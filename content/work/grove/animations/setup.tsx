import type { CSSProperties } from "react";
import { mix, tween, useTime } from "@/components/writeup/anim/kit";

// The idea of the experiment as a diagram, not an app tour: the model files
// cross the connection once, the connection is switched off, and the device
// still answers because the model is running there.

const G = { ink: "#0B0B0D", body: "#3D3A36", muted: "#66625C", line: "#E4E4E4", card: "#F7F4EC", green: "#0B6B43", soft: "#E4F2E8", track: "#E3DDD0" };

const QUESTION = "Make this politely: send me the report now.";
const REPLY = "Could you please send me the report when you have a moment? Thank you.";

// Timeline, in seconds.
const DL = { start: 0.7, end: 4.0 };
const OFF = 4.7;
const ASK = { type: 5.5, typeFor: 1.5, send: 7.2, answer: 7.9, answerFor: 3.4 };

export const SETUP_SECONDS = 12.6;

const panel: CSSProperties = { borderRadius: 16, border: `1.5px solid ${G.line}`, padding: 18, display: "flex", flexDirection: "column", gap: 12, background: "#FFFFFF" };
const mono: CSSProperties = { fontFamily: "var(--font-mono), ui-monospace, monospace", fontSize: 13 };

function Wifi({ off, color }: { off: boolean; color: string }) {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5a10 10 0 0 1 14 0" />
      <path d="M8.5 16a5 5 0 0 1 7 0" />
      <circle cx="12" cy="19.5" r="0.6" />
      {off && <path d="M4 4l16 16" stroke="#B42318" strokeWidth="2" />}
    </svg>
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

export default function Setup() {
  const t = useTime();

  const dl = tween(t, DL.start + 0.3, DL.end - DL.start - 0.3, (x) => x);
  const ready = dl >= 1;
  const off = t >= OFF;
  const flowing = t >= DL.start && t < DL.end;
  const showChat = tween(t, OFF - 0.2, 0.4);

  const typed = Math.round(QUESTION.length * tween(t, ASK.type, ASK.typeFor, (x) => x));
  const sent = t >= ASK.send;
  const rise = tween(t, ASK.send, 0.4);
  const answering = t >= ASK.answer;
  const shown = answering ? Math.round(REPLY.length * tween(t, ASK.answer, ASK.answerFor, (x) => x)) : 0;
  const done = shown >= REPLY.length;
  const press = sent ? 1 - 0.08 * Math.sin(Math.min(1, (t - ASK.send) / 0.25) * Math.PI) : 1;

  const linkLabel = off ? "No connection" : t < DL.start ? "Connected" : flowing ? "Downloading, once" : "Download finished";

  return (
    <div data-anim-stage="" style={{ position: "absolute", top: 0, left: 0, right: 0, background: "#FFFFFF", color: G.ink, fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.45 }}>
      <div style={{ display: "flex", alignItems: "stretch", height: 400 }}>
        {/* The internet */}
        <div style={{ ...panel, width: "24%", alignItems: "center", justifyContent: "center", textAlign: "center", background: G.card, border: "1.5px solid transparent" }}>
          <Wifi off={off} color={off ? "#B42318" : G.green} />
          <div style={{ fontWeight: 600, fontSize: 18 }}>The internet</div>
          <div style={{ fontSize: 14, color: G.muted }}>Hugging Face and GitHub hold the model files</div>
        </div>

        {/* The connection */}
        <div style={{ flex: 1, position: "relative", minWidth: 60 }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 0, borderTop: off ? `2px dashed ${G.line}` : `2px solid ${G.line}` }} />
          {flowing &&
            [0, 1, 2, 3, 4, 5].map((i) => {
              const p = Math.min(1, Math.max(0, ((t - DL.start) / (DL.end - DL.start)) * 1.4 - i * 0.14));
              return (
                <span
                  key={i}
                  style={{ position: "absolute", top: "calc(50% - 6px)", left: `calc(${p * 100}% - 6px)`, width: 12, height: 12, borderRadius: 3, background: G.green, opacity: p > 0 && p < 1 ? 1 : 0 }}
                />
              );
            })}
          <div style={{ position: "absolute", left: 0, right: 0, top: "calc(50% + 20px)", textAlign: "center", fontSize: 14, fontWeight: 500, color: off ? "#B42318" : G.body }}>{linkLabel}</div>
        </div>

        {/* The device */}
        <div style={{ ...panel, width: "52%", border: `1.5px solid ${G.green}`, gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Arches size={24} color={G.green} />
            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>Grove</span>
            <span style={{ marginLeft: "auto", fontSize: 13, color: G.muted }}>This device</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, minHeight: 40, padding: "0 12px", borderRadius: 10, background: ready ? G.soft : G.card, color: ready ? G.green : G.body }}>
            <span style={{ ...mono, fontWeight: ready ? 700 : 400 }}>qwen2.5:0.5b</span>
            {ready ? (
              <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 700 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G.green} strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Ready
              </span>
            ) : (
              <>
                <span style={{ flex: 1, height: 8, borderRadius: 999, background: G.track, overflow: "hidden" }}>
                  <span style={{ display: "block", height: "100%", width: `${dl * 100}%`, background: G.green, borderRadius: 999 }} />
                </span>
                <span style={{ fontSize: 13, fontVariantNumeric: "tabular-nums", minWidth: 34, textAlign: "right" }}>{Math.round(dl * 100)}%</span>
              </>
            )}
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 12, opacity: showChat }}>
            {sent && (
              <div style={{ alignSelf: "flex-end", maxWidth: "86%", padding: "10px 14px", borderRadius: "14px 14px 4px 14px", background: G.soft, fontSize: 15, opacity: rise, transform: `translateY(${(1 - rise) * 20}px)` }}>{QUESTION}</div>
            )}
            {sent && (
              <div style={{ fontSize: 15, lineHeight: 1.5, maxWidth: "94%", minHeight: 44 }}>
                {answering ? (
                  <>
                    {REPLY.slice(0, shown)}
                    {!done && <span style={{ display: "inline-block", width: 2, height: 16, background: G.green, marginLeft: 2, verticalAlign: "text-bottom" }} />}
                  </>
                ) : (
                  <span style={{ color: G.green, fontWeight: 700, fontSize: 14 }}>Thinking</span>
                )}
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, minHeight: 44, display: "flex", alignItems: "center", padding: "0 12px", border: `1.5px solid ${typed > 0 && !sent ? G.green : "#D6D2CB"}`, borderRadius: 10, fontSize: 15, color: typed > 0 && !sent ? G.ink : G.muted, overflow: "hidden", whiteSpace: "nowrap" }}>
                {sent || typed === 0 ? "Ask anything..." : QUESTION.slice(0, typed)}
              </div>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: G.green, display: "grid", placeItems: "center", transform: `scale(${press})`, flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 19V5" />
                  <path d="m5 12 7-7 7 7" />
                </svg>
              </div>
            </div>
            <div style={{ fontSize: 13, color: G.muted, textAlign: "center", opacity: mix(0, 1, tween(t, OFF, 0.4)) }}>Offline, and still working</div>
          </div>
        </div>
      </div>
    </div>
  );
}
