import React, { useMemo } from 'react';
import { Sparkles, Layers, Cpu, ArrowRight, Check, Heart, MessageCircle, Send, Music, ShieldCheck, Volume2, VolumeX } from 'lucide-react';
import { PRODUCTION_IMAGES } from '../data/productionData';

interface ReelSceneRendererProps {
  currentTime: number; // 0.00 to 15.00
  showInstagramUi: boolean;
  showSafeZones: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  onFollowClick?: () => void;
  isFollowed?: boolean;
  diagramStyle?: 'flowchart' | 'mindmap' | 'process_cycle';
  colorTheme?: 'cyber_cyan' | 'neon_violet' | 'hologram_emerald';
  showKineticCaptions?: boolean;
}

export const ReelSceneRenderer: React.FC<ReelSceneRendererProps> = ({
  currentTime,
  showInstagramUi,
  showSafeZones,
  isMuted,
  onToggleMute,
  onFollowClick,
  isFollowed = false,
  diagramStyle = 'flowchart',
  colorTheme = 'cyber_cyan',
  showKineticCaptions = true,
}) => {
  // Determine current active scene
  const activeSceneId = useMemo(() => {
    if (currentTime < 3.0) return 1;
    if (currentTime < 6.0) return 2;
    if (currentTime < 10.0) return 3;
    if (currentTime < 13.0) return 4;
    return 5;
  }, [currentTime]);

  // Scene 1 Progress: 0 - 3s
  const s1Progress = Math.min(1, Math.max(0, currentTime / 3.0));
  // Scene 2 Progress: 3 - 6s
  const s2Progress = Math.min(1, Math.max(0, (currentTime - 3.0) / 3.0));
  // Scene 3 Progress: 6 - 10s
  const s3Progress = Math.min(1, Math.max(0, (currentTime - 6.0) / 4.0));
  // Scene 4 Progress: 10 - 13s
  const s4Progress = Math.min(1, Math.max(0, (currentTime - 10.0) / 3.0));
  // Scene 5 Progress: 13 - 15s
  const s5Progress = Math.min(1, Math.max(0, (currentTime - 13.0) / 2.0));

  // Typing simulation for Scene 2
  const fullText = "Project Alpha Workflow:\n1. Input raw customer feedback\n2. AI analyzes sentiment & core topics\n3. Generate interactive flowchart\n4. Share visual report with team";
  const typedLength = Math.floor(s2Progress * fullText.length * 1.3);
  const currentTypedText = fullText.slice(0, Math.min(fullText.length, typedLength));

  // Kinetic Viral Caption Words by Scene (CapCut/TikTok style)
  const currentCaptionData = useMemo(() => {
    if (currentTime < 3.0) {
      const words = ['STOP', 'MAKING', 'DIAGRAMS', 'MANUALLY!', 'THIS', 'AI', 'DOES', 'IT', 'FOR', 'YOU!'];
      const index = Math.min(words.length - 1, Math.floor((currentTime / 3.0) * words.length));
      return { words, index };
    }
    if (currentTime < 6.0) {
      const words = ['MEET', 'NAPKIN', 'AI!'];
      const index = Math.min(words.length - 1, Math.floor(((currentTime - 3.0) / 3.0) * words.length));
      return { words, index };
    }
    if (currentTime < 10.0) {
      const words = ['TURN', 'BORING', 'TEXT', 'INTO', 'VISUALS!'];
      const index = Math.min(words.length - 1, Math.floor(((currentTime - 6.0) / 4.0) * words.length));
      return { words, index };
    }
    if (currentTime < 13.0) {
      const words = ['PERFECT', 'FOR', 'STUDENTS', '&', 'CREATORS!'];
      const index = Math.min(words.length - 1, Math.floor(((currentTime - 10.0) / 3.0) * words.length));
      return { words, index };
    }
    const words = ['FOLLOW', '@ANVORA.SMARTER', '🚀'];
    const index = Math.min(words.length - 1, Math.floor(((currentTime - 13.0) / 2.0) * words.length));
    return { words, index };
  }, [currentTime]);

  return (
    <div className="relative w-full h-full bg-[#05070e] text-white overflow-hidden select-none font-sans">
      {/* =========================================================================
          SCENE 1: 0.0s - 3.0s (THE HOOK)
         ========================================================================= */}
      {activeSceneId === 1 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          {/* Background with dynamic push-in */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform ease-out"
            style={{
              backgroundImage: `url(${PRODUCTION_IMAGES.heroWorkspace})`,
              transform: `scale(${1 + s1Progress * 0.12})`,
              filter: 'brightness(0.45) contrast(1.15)',
            }}
          />

          {/* Vignette and futuristic electric radial glows */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#05070e]/70 to-[#05070e]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Floating Cyber Particle Beams */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 rounded-full bg-cyan-400"
                style={{
                  height: `${20 + (i % 5) * 15}px`,
                  left: `${8 + (i * 8)}%`,
                  bottom: `${(s1Progress * 150 + i * 15) % 120}%`,
                  opacity: 0.35 + (i % 3) * 0.25,
                  boxShadow: '0 0 12px #00e5ff',
                }}
              />
            ))}
          </div>

          {/* Kinetic Typography */}
          <div className="relative z-10 max-w-sm flex flex-col items-center">
            {/* Urgency Kicker */}
            <div
              className="text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase mb-3 px-3 py-1 bg-cyan-950/60 rounded-full border border-cyan-500/40"
              style={{
                opacity: s1Progress > 0.05 ? 1 : 0,
                transform: `translateY(${Math.max(0, 15 - s1Progress * 60)}px)`,
              }}
            >
              ⚡ STOP WASTING HOURS
            </div>

            {/* Giant Main Hook */}
            <h1
              className="font-display font-black text-3xl sm:text-4xl leading-[1.05] tracking-tight uppercase text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
              style={{
                transform: `scale(${s1Progress < 0.2 ? 0.85 + s1Progress * 0.75 : 1})`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              STOP MAKING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 glow-text-cyan">
                DIAGRAMS
              </span>{' '}
              <br />
              MANUALLY!
            </h1>

            {/* Secondary Punch Hook */}
            <div
              className="mt-6 p-3.5 bg-[#0b1021]/80 backdrop-blur-md rounded-2xl border border-violet-500/40 shadow-xl max-w-xs transition-all duration-300"
              style={{
                opacity: s1Progress > 0.3 ? 1 : 0,
                transform: `translateY(${Math.max(0, 20 - (s1Progress - 0.3) * 50)}px)`,
              }}
            >
              <p className="font-display font-bold text-base sm:text-lg text-violet-300 tracking-wide">
                THIS AI DOES IT FOR YOU 🤯
              </p>
              <p className="text-xs text-slate-400 mt-1">
                From raw text to ready-to-share visuals in 5 seconds
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCENE 2: 3.0s - 6.0s (INTRODUCING NAPKIN AI & TEXT INPUT)
         ========================================================================= */}
      {activeSceneId === 2 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
          {/* Subtle dark ambient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070b16] via-[#090d1c] to-[#04060d]" />
          <div className="absolute top-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 w-full max-w-xs flex flex-col items-center">
            {/* Top Reveal Title */}
            <div
              className="flex items-center gap-2 mb-3"
              style={{
                opacity: Math.min(1, s2Progress * 3),
                transform: `translateY(${Math.max(0, 10 - s2Progress * 30)}px)`,
              }}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h2 className="font-display font-black text-2xl tracking-tight text-white">
                MEET <span className="text-cyan-400">NAPKIN AI</span>
              </h2>
            </div>

            <p className="text-xs text-slate-400 mb-4 max-w-[240px]">
              Type or paste your messy notes and watch the magic happen
            </p>

            {/* Simulated Glass Browser Interface */}
            <div
              className="w-full bg-[#0d1326]/90 backdrop-blur-xl rounded-2xl border border-slate-700/60 shadow-2xl overflow-hidden transition-all text-left"
              style={{
                transform: `scale(${0.92 + s2Progress * 0.08})`,
              }}
            >
              {/* Browser Header Bar */}
              <div className="px-3 py-2 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="px-2.5 py-0.5 rounded-md bg-slate-950/70 text-slate-300 text-[10px] border border-slate-800">
                  napkin.ai/doc/new
                </div>
                <div className="w-4" />
              </div>

              {/* Document Editor Area */}
              <div className="p-4 space-y-3">
                {/* AI Style Selectors Bar */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[9px] font-mono">
                  <span className={`px-2 py-0.5 rounded-md transition-colors ${diagramStyle === 'flowchart' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-900 text-slate-400'}`}>
                    🔀 Flowchart
                  </span>
                  <span className={`px-2 py-0.5 rounded-md transition-colors ${diagramStyle === 'mindmap' ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40' : 'bg-slate-900 text-slate-400'}`}>
                    🧠 Mind Map
                  </span>
                  <span className={`px-2 py-0.5 rounded-md transition-colors ${diagramStyle === 'process_cycle' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-900 text-slate-400'}`}>
                    ⚡ Cycle
                  </span>
                </div>

                {/* Simulated Typing Box with AI Laser Scanner */}
                <div className="h-28 p-2.5 rounded-xl bg-slate-950/90 border border-slate-800/80 font-mono text-[11px] text-slate-200 leading-relaxed overflow-hidden relative">
                  {/* Modern AI Scanner Laser */}
                  {s2Progress > 0.4 && (
                    <div
                      className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none shadow-[0_0_8px_#00e5ff]"
                      style={{
                        top: `${((s2Progress - 0.4) / 0.6) * 100}%`,
                      }}
                    />
                  )}
                  <pre className="font-sans whitespace-pre-wrap">{currentTypedText}</pre>
                  {s2Progress < 0.9 && (
                    <span className="inline-block w-1.5 h-3.5 bg-cyan-400 align-middle ml-0.5 animate-pulse" />
                  )}
                </div>

                {/* Simulated Spark Action Button & AI Metric */}
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">
                    {s2Progress > 0.6 ? '✨ 4 Steps Auto-Detected' : 'Typing...'}
                  </span>
                  <div
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                      s2Progress > 0.75
                        ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-lg shadow-cyan-500/40 scale-105'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Auto-Generate</span>
                    <ArrowRight className="w-3 h-3 ml-0.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCENE 3: 6.0s - 10.0s (THE HERO TRANSFORMATION: TEXT -> VISUALS)
         ========================================================================= */}
      {activeSceneId === 3 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
          {/* High-res generated diagram background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${PRODUCTION_IMAGES.flowchartMorph})`,
              transform: `scale(${1 + s3Progress * 0.08})`,
              filter: 'brightness(0.38) contrast(1.1)',
            }}
          />

          {/* Vignette */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#05070e]/60 to-[#05070e]" />
          <div className="absolute top-1/4 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Kinetic On-Screen Hero Text */}
          <div className="relative z-10 w-full max-w-xs flex flex-col items-center">
            <div
              className="text-xs font-mono font-semibold tracking-wider text-violet-400 uppercase mb-2 px-3 py-1 bg-violet-950/70 rounded-full border border-violet-500/40"
              style={{
                opacity: Math.min(1, s3Progress * 4),
              }}
            >
              ✨ INSTANT MORPH ENGINE
            </div>

            <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white uppercase drop-shadow-lg mb-4">
              TEXT <span className="text-cyan-400">→</span> VISUALS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 glow-text-cyan">
                IN SECONDS
              </span>
            </h2>

            {/* Interactive Morphing Flowchart Nodes with Glowing Energy Beams */}
            <div className="w-full bg-[#0a0f22]/85 backdrop-blur-xl rounded-2xl border border-cyan-500/30 p-4 shadow-2xl relative overflow-hidden">
              {/* Dynamic Energy Line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                style={{
                  transform: `translateX(${(s3Progress * 200 - 50)}%)`,
                }}
              />

              <div className="flex flex-col gap-2.5 text-left">
                {/* Node 1 */}
                <div
                  className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-between transition-all duration-300"
                  style={{
                    opacity: s3Progress > 0.1 ? 1 : 0.2,
                    transform: `translateY(${Math.max(0, 15 - s3Progress * 40)}px)`,
                    borderColor: s3Progress > 0.2 ? '#00e5ff' : '#334155',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 text-xs font-mono font-bold">
                      01
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-100">Raw Feedback Input</div>
                      <div className="text-[10px] text-slate-400">Customer survey data</div>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                </div>

                {/* Animated Connector Arrow */}
                <div className="flex justify-center -my-1">
                  <div className="h-3 w-0.5 bg-gradient-to-b from-cyan-400 to-violet-500" />
                </div>

                {/* Node 2 */}
                <div
                  className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-between transition-all duration-300"
                  style={{
                    opacity: s3Progress > 0.35 ? 1 : 0.2,
                    transform: `translateY(${Math.max(0, 15 - (s3Progress - 0.25) * 40)}px)`,
                    borderColor: s3Progress > 0.45 ? '#a855f7' : '#334155',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-violet-950 border border-violet-500/40 flex items-center justify-center text-violet-400 text-xs font-mono font-bold">
                      02
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-100">Sentiment Analysis</div>
                      <div className="text-[10px] text-slate-400">92% Core Topics Mapped</div>
                    </div>
                  </div>
                  <Cpu className="w-3.5 h-3.5 text-violet-400" />
                </div>

                {/* Animated Connector Arrow */}
                <div className="flex justify-center -my-1">
                  <div className="h-3 w-0.5 bg-gradient-to-b from-violet-500 to-emerald-400" />
                </div>

                {/* Node 3 */}
                <div
                  className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-950/70 to-violet-950/70 border border-cyan-400/50 flex items-center justify-between transition-all duration-300"
                  style={{
                    opacity: s3Progress > 0.6 ? 1 : 0.2,
                    transform: `translateY(${Math.max(0, 15 - (s3Progress - 0.5) * 40)}px)`,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center text-slate-950 text-xs font-bold">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Visual Infographic Ready</div>
                      <div className="text-[10px] text-cyan-300">Generated in 1.4 seconds</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-400 text-slate-950 font-bold">
                    SVG / PNG
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCENE 4: 10.0s - 13.0s (FINISHED LAPTOP SHOWCASE & 3 BADGES)
         ========================================================================= */}
      {activeSceneId === 4 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
          {/* Laptop Showcase background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${PRODUCTION_IMAGES.laptopShowcase})`,
              transform: `scale(${1.08 - s4Progress * 0.05}) translate(${s4Progress * 3}px, ${-s4Progress * 5}px)`,
              filter: 'brightness(0.48) contrast(1.15)',
            }}
          />

          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070e] via-[#05070e]/40 to-[#05070e]/80" />

          {/* Scene Content */}
          <div className="relative z-10 w-full max-w-xs flex flex-col items-center">
            <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight mb-2">
              PERFECT FOR
            </h2>
            <p className="text-xs text-slate-300 mb-5">
              Students, creators and professionals
            </p>

            {/* Three Sequential Floating Tags */}
            <div className="w-full flex flex-col gap-2.5">
              {/* Badge 1: FLOWCHARTS (10.2s = s4Progress > 0.07) */}
              <div
                className="p-3 bg-[#0d142b]/90 backdrop-blur-xl rounded-xl border border-cyan-500/50 flex items-center gap-3 shadow-lg shadow-cyan-500/20 transition-all duration-300"
                style={{
                  opacity: s4Progress >= 0.07 ? 1 : 0,
                  transform: `translateX(${Math.max(0, 30 - (s4Progress - 0.07) * 150)}px)`,
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-display font-bold text-sm tracking-wide text-white">FLOWCHARTS</div>
                  <div className="text-[10px] text-cyan-300">Clean process flows & decision trees</div>
                </div>
              </div>

              {/* Badge 2: INFOGRAPHICS (11.1s = s4Progress > 0.37) */}
              <div
                className="p-3 bg-[#0d142b]/90 backdrop-blur-xl rounded-xl border border-violet-500/50 flex items-center gap-3 shadow-lg shadow-violet-500/20 transition-all duration-300"
                style={{
                  opacity: s4Progress >= 0.37 ? 1 : 0,
                  transform: `translateX(${Math.max(0, 30 - (s4Progress - 0.37) * 150)}px)`,
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-400 flex items-center justify-center text-violet-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-display font-bold text-sm tracking-wide text-white">INFOGRAPHICS</div>
                  <div className="text-[10px] text-violet-300">Pitch decks, carousels & blogs</div>
                </div>
              </div>

              {/* Badge 3: VISUAL IDEAS (12.0s = s4Progress > 0.67) */}
              <div
                className="p-3 bg-[#0d142b]/90 backdrop-blur-xl rounded-xl border border-emerald-500/50 flex items-center gap-3 shadow-lg shadow-emerald-500/20 transition-all duration-300"
                style={{
                  opacity: s4Progress >= 0.67 ? 1 : 0,
                  transform: `translateX(${Math.max(0, 30 - (s4Progress - 0.67) * 150)}px)`,
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-display font-bold text-sm tracking-wide text-white">VISUAL IDEAS</div>
                  <div className="text-[10px] text-emerald-300">Brainstorms, Venn & mind maps</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCENE 5: 13.0s - 15.0s (CALL TO ACTION / FOLLOW OUTRO)
         ========================================================================= */}
      {activeSceneId === 5 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          {/* Futuristic dark cosmic background with expanding energy rings */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060914] via-[#090d20] to-[#04060b]" />

          {/* Animated concentric rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-72 h-72 rounded-full border border-cyan-500/25 animate-ping"
              style={{ animationDuration: '3s' }}
            />
            <div
              className="w-96 h-96 rounded-full border border-violet-500/20 animate-ping"
              style={{ animationDuration: '4s' }}
            />
          </div>

          <div className="relative z-10 w-full max-w-xs flex flex-col items-center">
            {/* Brand Logo Avatar Space */}
            <div
              className="relative mb-3"
              style={{
                transform: `scale(${0.9 + s5Progress * 0.1})`,
              }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 via-sky-500 to-violet-600 p-0.5 shadow-xl shadow-cyan-500/30">
                <div className="w-full h-full bg-[#080d1e] rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center border-2 border-[#05070e]">
                <ShieldCheck className="w-3 h-3 text-white" />
              </div>
            </div>

            <div className="text-xs font-mono font-bold text-cyan-400 tracking-widest mb-2 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
              @ANVORA.SMARTER
            </div>

            {/* Giant Outro Hook */}
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase mb-2">
              FOLLOW FOR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 glow-text-cyan">
                HIDDEN AI TOOLS
              </span>{' '}
              🚀
            </h2>

            <p className="text-xs text-slate-300 mb-6 max-w-[250px]">
              Daily secret AI workflows you won't find anywhere else
            </p>

            {/* Glowing Follow Button */}
            <button
              onClick={onFollowClick}
              className={`w-full py-3.5 px-6 rounded-2xl font-display font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                isFollowed
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-lg shadow-emerald-500/20'
                  : 'bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-600 text-white shadow-xl shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isFollowed ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>FOLLOWING (SAVED)</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-100" />
                  <span>FOLLOW FOR DAILY AI GEMS</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODERN AI VIRAL KINETIC CAPTIONS (CAPCUT / TIKTOK REEL SUBTITLES)
         ========================================================================= */}
      {showKineticCaptions && (
        <div className="absolute bottom-[21%] left-4 right-4 z-20 pointer-events-none flex justify-center text-center">
          <div className="bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-2xl flex items-center justify-center gap-1.5 flex-wrap max-w-[280px]">
            {currentCaptionData.words.map((word, idx) => {
              const isWordActive = idx === currentCaptionData.index;
              return (
                <span
                  key={idx}
                  className={`font-display font-black text-xs tracking-wider uppercase transition-all duration-75 ${
                    isWordActive
                      ? 'text-yellow-300 scale-110 drop-shadow-[0_0_12px_rgba(253,224,71,0.9)] underline decoration-cyan-400 decoration-2 underline-offset-2'
                      : 'text-slate-300 opacity-75'
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          INSTAGRAM REEL UI OVERLAY SIMULATOR
         ========================================================================= */}
      {showInstagramUi && (
        <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4">
          {/* Top Instagram Header */}
          <div className="flex items-center justify-between text-white/90 text-sm font-semibold pt-2">
            <span className="tracking-wide">Reels</span>
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleMute}
                className="pointer-events-auto p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors"
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              </button>
            </div>
          </div>

          {/* Right Interaction Sidebar */}
          <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4 text-white text-xs pointer-events-auto">
            {/* Like Button */}
            <div className="flex flex-col items-center gap-1">
              <button className="p-2.5 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition-transform active:scale-125">
                <Heart className="w-6 h-6 text-white hover:text-rose-500 transition-colors" />
              </button>
              <span className="font-mono text-[11px] font-semibold">142K</span>
            </div>

            {/* Comment Button */}
            <div className="flex flex-col items-center gap-1">
              <button className="p-2.5 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition-transform active:scale-125">
                <MessageCircle className="w-6 h-6 text-white" />
              </button>
              <span className="font-mono text-[11px] font-semibold">1,842</span>
            </div>

            {/* Share Button */}
            <div className="flex flex-col items-center gap-1">
              <button className="p-2.5 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition-transform active:scale-125">
                <Send className="w-5 h-5 text-white" />
              </button>
              <span className="font-mono text-[11px] font-semibold">34.9K</span>
            </div>

            {/* Spinning Audio Wheel */}
            <div className="mt-2 w-8 h-8 rounded-full border-2 border-white/60 bg-black/80 flex items-center justify-center animate-spin" style={{ animationDuration: '6s' }}>
              <Music className="w-4 h-4 text-cyan-400" />
            </div>
          </div>

          {/* Bottom Caption & Audio Info */}
          <div className="w-[82%] pb-2 space-y-1.5 text-left pointer-events-auto">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 via-sky-500 to-violet-600 p-0.5 shadow-md shadow-cyan-500/30">
                <div className="w-full h-full rounded-full bg-[#070b18] flex items-center justify-center text-[10px] font-bold text-cyan-300 font-mono">
                  AS
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-white tracking-tight">anvora.smarter</span>
                <span className="w-3.5 h-3.5 rounded-full bg-sky-500 flex items-center justify-center text-[8px] text-white font-bold" title="Verified Creator">✓</span>
              </div>
              <span className="text-[10px] text-cyan-300 font-semibold bg-cyan-950/80 border border-cyan-400/50 rounded px-2 py-0.5 shadow-sm">Follow</span>
            </div>

            <p className="text-[11px] text-slate-200 line-clamp-2 leading-relaxed">
              Stop making diagrams manually! Meet <span className="text-cyan-300 font-semibold">Napkin AI</span> — transforms boring text into instant infographics. Follow <span className="text-cyan-300 font-medium">@anvora.smarter</span> for daily AI workflows... <span className="text-slate-400 font-medium">more</span>
            </p>

            <div className="flex items-center gap-1.5 text-[10px] text-slate-300">
              <Music className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="truncate">Original Audio · anvora.smarter</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAFE ZONES OVERLAY (For creators to verify Instagram viewport safety)
         ========================================================================= */}
      {showSafeZones && (
        <div className="absolute inset-0 pointer-events-none z-30">
          {/* Top Danger Zone (Instagram header) */}
          <div className="absolute top-0 left-0 right-0 h-[11%] bg-rose-500/15 border-b border-rose-500/50 flex items-center justify-center">
            <span className="text-[10px] font-mono font-bold text-rose-300 bg-black/80 px-2 py-0.5 rounded">
              TOP BAR DANGER ZONE (Clearance: 220px)
            </span>
          </div>

          {/* Bottom Danger Zone (Captions & Audio tag) */}
          <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-rose-500/15 border-t border-rose-500/50 flex items-center justify-center">
            <span className="text-[10px] font-mono font-bold text-rose-300 bg-black/80 px-2 py-0.5 rounded">
              BOTTOM CAPTION ZONE (Clearance: 280px)
            </span>
          </div>

          {/* Right Danger Zone (Like, Comment, Share buttons) */}
          <div className="absolute top-[11%] bottom-[15%] right-0 w-[18%] bg-amber-500/15 border-l border-amber-500/50 flex items-center justify-center">
            <span className="text-[9px] font-mono font-bold text-amber-300 bg-black/80 px-1 py-0.5 rounded rotate-90 whitespace-nowrap">
              SIDE ACTIONS
            </span>
          </div>

          {/* Safe Center Box */}
          <div className="absolute top-[11%] bottom-[15%] left-[5%] right-[18%] border-2 border-dashed border-emerald-400/60 flex items-start justify-start p-2">
            <span className="text-[9px] font-mono font-bold text-emerald-300 bg-black/80 px-1.5 py-0.5 rounded">
              OPTIMAL VIEWING SAFE AREA (1080 × 1420)
            </span>
          </div>
        </div>
      )}

      {/* Top 15s Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-40">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 transition-all duration-75"
          style={{ width: `${(currentTime / 15.0) * 100}%` }}
        />
      </div>
    </div>
  );
};
