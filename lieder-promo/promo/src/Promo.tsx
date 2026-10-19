import React from "react";
import { AbsoluteFill, Audio, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { CalendarDays, LayoutList, Users, Plane } from "lucide-react";

const fontFamily = "Segoe UI, Arial, sans-serif";

const C = { navy: "#0E0830", deep: "#1A1250", jade: "#2BB58A", coral: "#F4786A", violet: "#7C6CF0", white: "#FFFFFF", mute: "#B9B3DB" };
const T = 15;
const SCENES = [150, 190, 190, 190, 240];
export const DURATION = SCENES.reduce((a, b) => a + b, 0) - (SCENES.length - 1) * T; // 900 = 30s

const useLayout = () => {
  const { width, height } = useVideoConfig();
  return { width, height, portrait: height > width };
};

const pop = (frame: number, fps: number, delay = 0) =>
  spring({ frame: frame - delay, fps, config: { damping: 16, mass: 0.8, stiffness: 120 } });

const Background: React.FC = () => {
  const f = useCurrentFrame();
  const shift = interpolate(f, [0, DURATION], [0, 40]);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at ${30 + shift}% 20%, ${C.deep} 0%, ${C.navy} 65%)` }}>
      <div style={{ position: "absolute", width: 900, height: 900, borderRadius: "50%", left: -250 + shift * 4, bottom: -450, background: `radial-gradient(circle, ${C.jade}33, transparent 70%)` }} />
      <div style={{ position: "absolute", width: 800, height: 800, borderRadius: "50%", right: -250 - shift * 3, top: -400, background: `radial-gradient(circle, ${C.coral}2E, transparent 70%)` }} />
    </AbsoluteFill>
  );
};

const Logo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = pop(frame, fps, 10);
  return (
    <div style={{ position: "absolute", top: 56, left: 64, display: "flex", alignItems: "center", gap: 18, opacity: s, transform: `translateY(${(1 - s) * -20}px)` }}>
      <Img src={staticFile("logo.png")} style={{ width: 80, height: 80, borderRadius: 20, boxShadow: `0 8px 30px ${C.jade}55` }} />
      <div style={{ fontFamily, color: C.white, lineHeight: 1 }}>
        <div style={{ fontSize: 38, fontWeight: 800 }}>הטיול שלנו</div>
        <div style={{ fontSize: 22, color: C.mute, marginTop: 6, fontWeight: 600 }}>Our Trip</div>
      </div>
    </div>
  );
};

const Intro: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { portrait, width } = useLayout();
  const a = pop(f, fps, 6), b = pop(f, fps, 22), c = pop(f, fps, 40);
  const plane = interpolate(f, [0, 150], [-200, width + 200]);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", fontFamily, textAlign: "center", padding: 100 }}>
      <Plane size={72} color={C.coral} style={{ position: "absolute", top: portrait ? 420 : 250, left: plane, opacity: 0.8, transform: "rotate(20deg)" }} />
      <div style={{ fontSize: portrait ? 56 : 64, color: C.jade, fontWeight: 800, letterSpacing: 6, opacity: a, transform: `translateY(${(1 - a) * 40}px)` }}>THAILAND · VIETNAM</div>
      <div style={{ fontSize: portrait ? 110 : 136, color: C.white, fontWeight: 800, lineHeight: 1.05, marginTop: 20, opacity: b, transform: `translateY(${(1 - b) * 60}px)` }}>
        Your family trip,<br />beautifully organized
      </div>
      <div style={{ fontSize: 46, color: C.mute, marginTop: 36, opacity: c }}>One shared place to plan the whole adventure.</div>
    </AbsoluteFill>
  );
};

type Svc = { n: string; title: string; text: string; Icon: typeof Users; color: string };
const SERVICES: Svc[] = [
  { n: "01", title: "Plan Together", text: "Build the itinerary for Thailand and Vietnam in one shared space.", Icon: CalendarDays, color: C.jade },
  { n: "02", title: "Manage Every Detail", text: "Keep the whole trip organized, from first idea to the last day.", Icon: LayoutList, color: C.violet },
  { n: "03", title: "Invite the Family", text: "Share the trip by invitation, so everyone sees the same plan.", Icon: Users, color: C.coral },
];

const Service: React.FC<{ s: Svc }> = ({ s }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { portrait } = useLayout();
  const card = pop(f, fps, 4), t1 = pop(f, fps, 14), t2 = pop(f, fps, 36);
  const words = s.title.split(" ");
  const ring = interpolate(f, [0, 190], [0, 360]);
  const box = portrait ? 400 : 460;
  return (
    <AbsoluteFill style={{ fontFamily, justifyContent: "center", alignItems: "center", padding: portrait ? 80 : 140 }}>
      <div style={{ display: "flex", flexDirection: portrait ? "column" : "row", alignItems: "center", gap: portrait ? 80 : 120 }}>
        <div style={{ position: "relative", width: box, height: box, flexShrink: 0, transform: `perspective(1200px) rotateY(${interpolate(f, [0, 190], [-8, 8])}deg) scale(${card})` }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 90, background: `linear-gradient(145deg, ${s.color}, ${s.color}88)`, boxShadow: `0 40px 100px ${s.color}55` }} />
          <div style={{ position: "absolute", inset: -26, borderRadius: 110, border: `3px dashed ${s.color}88`, transform: `rotate(${ring}deg)` }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <s.Icon size={220} color="#fff" strokeWidth={1.6} />
          </div>
        </div>
        <div style={{ textAlign: portrait ? "center" : "left", maxWidth: 900 }}>
          <div style={{ fontSize: 40, fontWeight: 800, color: s.color, letterSpacing: 4, opacity: t1 }}>SERVICE {s.n}</div>
          <div style={{ fontSize: portrait ? 104 : 120, fontWeight: 800, color: C.white, lineHeight: 1.05, marginTop: 10 }}>
            {words.map((w, i) => {
              const p = pop(f, fps, 14 + i * 7);
              return <span key={i} style={{ display: "inline-block", marginRight: 28, opacity: p, transform: `translateY(${(1 - p) * 50}px)` }}>{w}</span>;
            })}
          </div>
          <div style={{ fontSize: 44, color: C.mute, marginTop: 30, lineHeight: 1.35, opacity: t2, transform: `translateY(${(1 - t2) * 30}px)` }}>{s.text}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const CTA: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { portrait } = useLayout();
  const a = pop(f, fps, 6), b = pop(f, fps, 26), c = pop(f, fps, 50);
  const glow = 0.5 + 0.5 * Math.sin(f / 10);
  return (
    <AbsoluteFill style={{ fontFamily, justifyContent: "center", alignItems: "center", textAlign: "center", padding: 80 }}>
      <Img src={staticFile("logo.png")} style={{ width: 180, height: 180, borderRadius: 44, opacity: a, transform: `scale(${a})`, boxShadow: `0 20px 80px ${C.jade}66` }} />
      <div style={{ fontSize: portrait ? 84 : 96, color: C.white, fontWeight: 800, marginTop: 44, opacity: b, transform: `translateY(${(1 - b) * 40}px)` }}>Ready for the adventure?</div>
      <div style={{ marginTop: 56, padding: portrait ? "40px 60px" : "40px 110px", borderRadius: 999, background: `linear-gradient(90deg, ${C.coral}, #FF9A6A)`, fontSize: portrait ? 60 : 76, fontWeight: 800, color: C.white, opacity: c, transform: `scale(${0.8 + 0.2 * c})`, boxShadow: `0 20px ${60 + glow * 40}px ${C.coral}77` }}>
        Book a Free Consultation
      </div>
      <div style={{ fontSize: 44, color: C.mute, marginTop: 44, opacity: c }}>lieder-trips.netlify.app</div>
    </AbsoluteFill>
  );
};

export const Promo: React.FC = () => {
  const { portrait } = useLayout();
  const timing = linearTiming({ durationInFrames: T });
  const dir = portrait ? "from-bottom" : "from-right";
  return (
    <AbsoluteFill style={{ backgroundColor: C.navy }}>
      <Audio src={staticFile("music.mp3")} volume={(f) => interpolate(f, [0, 45, DURATION - 75, DURATION], [0, 0.3, 0.3, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      <Background />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENES[0]}><Intro /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={SCENES[1]}><Service s={SERVICES[0]} /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: dir })} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={SCENES[2]}><Service s={SERVICES[1]} /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: dir })} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={SCENES[3]}><Service s={SERVICES[2]} /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={SCENES[4]}><CTA /></TransitionSeries.Sequence>
      </TransitionSeries>
      <Logo />
    </AbsoluteFill>
  );
};
