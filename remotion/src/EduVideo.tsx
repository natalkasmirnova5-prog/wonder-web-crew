import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Video,
  staticFile,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Nunito";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "800", "900"],
  subsets: ["cyrillic", "latin"],
});

export type EduProps = {
  title: string;
  subtitle: string;
  steps: { label: string; value: string }[];
  finaleText: string;
  video: string;
  bgFrom: string;
  bgTo: string;
};

const INTRO = 60;
const STEP = 60;
const FINALE = 150;

export const EduVideo: React.FC<EduProps> = ({
  title,
  subtitle,
  steps,
  finaleText,
  video,
  bgFrom,
  bgTo,
}) => {
  return (
    <AbsoluteFill style={{ fontFamily, background: `linear-gradient(135deg, ${bgFrom}, ${bgTo})` }}>
      {/* soft floating circles */}
      <Bubbles />

      <Sequence from={0} durationInFrames={INTRO}>
        <Intro title={title} subtitle={subtitle} />
      </Sequence>

      {steps.map((s, i) => (
        <Sequence key={i} from={INTRO + i * STEP} durationInFrames={STEP}>
          <StepCard index={i} total={steps.length} label={s.label} value={s.value} />
        </Sequence>
      ))}

      <Sequence from={INTRO + steps.length * STEP} durationInFrames={FINALE}>
        <Finale text={finaleText} video={video} steps={steps} />
      </Sequence>
    </AbsoluteFill>
  );
};

const Bubbles: React.FC = () => {
  const frame = useCurrentFrame();
  const circles = [
    { x: 100, y: 120, r: 80, c: "rgba(255,255,255,0.25)", s: 0.6 },
    { x: 1100, y: 200, r: 60, c: "rgba(255,255,255,0.3)", s: 0.8 },
    { x: 200, y: 800, r: 100, c: "rgba(255,255,255,0.2)", s: 0.5 },
    { x: 1050, y: 780, r: 70, c: "rgba(255,255,255,0.25)", s: 0.7 },
  ];
  return (
    <AbsoluteFill>
      {circles.map((c, i) => {
        const dy = Math.sin((frame + i * 30) * 0.05) * 20;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: c.x,
              top: c.y + dy,
              width: c.r * 2,
              height: c.r * 2,
              borderRadius: "50%",
              background: c.c,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const Intro: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 14 } });
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 80, textAlign: "center" }}>
      <div
        style={{
          transform: `scale(${0.8 + s * 0.2})`,
          opacity,
          background: "white",
          borderRadius: 40,
          padding: "60px 80px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          maxWidth: 1000,
        }}
      >
        <div style={{ fontSize: 84, fontWeight: 900, color: "#1f2937", lineHeight: 1.1 }}>{title}</div>
        <div style={{ fontSize: 40, fontWeight: 700, color: "#4b5563", marginTop: 24 }}>{subtitle}</div>
      </div>
    </AbsoluteFill>
  );
};

const STEP_COLORS = ["#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EF4444"];

const StepCard: React.FC<{ index: number; total: number; label: string; value: string }> = ({
  index,
  total,
  label,
  value,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 12 } });
  const x = interpolate(s, [0, 1], [-200, 0]);
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const color = STEP_COLORS[index % STEP_COLORS.length];
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 80 }}>
      {/* progress dots */}
      <div style={{ position: "absolute", top: 60, display: "flex", gap: 16 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              width: i === index ? 50 : 24,
              height: 24,
              borderRadius: 12,
              background: i <= index ? color : "rgba(255,255,255,0.6)",
              transition: "none",
            }}
          />
        ))}
      </div>

      <div
        style={{
          transform: `translateX(${x}px)`,
          opacity,
          background: "white",
          borderRadius: 48,
          padding: "70px 90px",
          boxShadow: "0 25px 70px rgba(0,0,0,0.18)",
          maxWidth: 1050,
          textAlign: "center",
          border: `8px solid ${color}`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: color,
            color: "white",
            fontSize: 56,
            fontWeight: 900,
            padding: "12px 48px",
            borderRadius: 24,
            marginBottom: 32,
            letterSpacing: 2,
          }}
        >
          {label}
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, color: "#1f2937", lineHeight: 1.2 }}>{value}</div>
      </div>
    </AbsoluteFill>
  );
};

const Finale: React.FC<{ text: string; video: string; steps: { label: string; value: string }[] }> = ({
  text,
  video,
  steps,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 10 } });
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 60 }}>
      <div style={{ opacity, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, width: "100%" }}>
        <div
          style={{
            transform: `scale(${0.7 + s * 0.3})`,
            fontSize: 80,
            fontWeight: 900,
            color: "white",
            textShadow: "0 6px 20px rgba(0,0,0,0.3)",
          }}
        >
          {text}
        </div>
        <div
          style={{
            width: 720,
            height: 540,
            borderRadius: 36,
            overflow: "hidden",
            boxShadow: "0 30px 80px rgba(0,0,0,0.3)",
            border: "8px solid white",
            background: "black",
          }}
        >
          <Video src={staticFile(video)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        {/* mini recap of 5 step labels */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
          {steps.map((st, i) => (
            <div
              key={i}
              style={{
                background: STEP_COLORS[i % STEP_COLORS.length],
                color: "white",
                padding: "10px 20px",
                borderRadius: 999,
                fontSize: 26,
                fontWeight: 800,
              }}
            >
              {st.label}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};