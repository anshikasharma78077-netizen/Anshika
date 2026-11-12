import React, { useState, useEffect, useRef } from 'react';
import { ReelSceneRenderer } from './ReelSceneRenderer';
import { TimelineBar } from './TimelineBar';
import { audioEngine } from '../utils/audioEngine';
import { Smartphone, Monitor, Download, Sparkles, Check, Share2, Mic, Play, Volume2, Sliders } from 'lucide-react';

interface ReelPlayerProps {
  onExportPackageClick: () => void;
}

export const ReelPlayer: React.FC<ReelPlayerProps> = ({ onExportPackageClick }) => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showInstagramUi, setShowInstagramUi] = useState<boolean>(true);
  const [showSafeZones, setShowSafeZones] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [deviceFrame, setDeviceFrame] = useState<'iphone' | 'minimal'>('iphone');
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [audioBars, setAudioBars] = useState<number[]>([15, 25, 40, 20, 60, 30, 45, 20]);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [diagramStyle, setDiagramStyle] = useState<'flowchart' | 'mindmap' | 'process_cycle'>('flowchart');
  const [showKineticCaptions, setShowKineticCaptions] = useState<boolean>(true);
  const [femaleVoiceProfile, setFemaleVoiceProfile] = useState<'female_natural' | 'female_tech' | 'female_hinglish' | 'female_studio'>('female_natural');

  const duration = 15.0; // exactly 15 seconds
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Playback loop
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      lastTimeRef.current = null;
      audioEngine.stopBGM();
      audioEngine.cancelSpeech();
      return;
    }

    // Start audio when user plays
    audioEngine.startBGM();

    const loop = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }
      const deltaSec = ((timestamp - lastTimeRef.current) / 1000) * playbackSpeed;
      lastTimeRef.current = timestamp;

      setCurrentTime((prev) => {
        const next = prev + deltaSec;
        if (next >= duration) {
          // Loop Reel seamlessly
          audioEngine.syncTimecode(0, true);
          return 0;
        }
        audioEngine.syncTimecode(next, true);
        return next;
      });

      // Update spectrum visualizer
      const freqData = audioEngine.getAudioFrequencyData();
      if (freqData.length > 0) {
        const sampleBars = [
          freqData[1] || 20,
          freqData[3] || 35,
          freqData[5] || 60,
          freqData[8] || 45,
          freqData[12] || 70,
          freqData[16] || 40,
          freqData[20] || 30,
          freqData[24] || 15,
        ];
        setAudioBars(sampleBars);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  const [isGeneratingTts, setIsGeneratingTts] = useState<boolean>(false);
  const [ttsSuccess, setTtsSuccess] = useState<boolean>(false);

  const handleGenerateStudioVoice = async () => {
    setIsGeneratingTts(true);
    await audioEngine.preloadGeminiVoiceover();
    setIsGeneratingTts(false);
    setTtsSuccess(true);
    audioEngine.playSceneAudio(1, 'Stop making diagrams manually! This AI does it for you in seconds!');
    setTimeout(() => setTtsSuccess(false), 4000);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      audioEngine.init();
      audioEngine.resumeContext();
      audioEngine.preloadGeminiVoiceover();
      setIsPlaying(true);
    }
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
    audioEngine.syncTimecode(time, isPlaying);
  };

  const handleStepFrame = (delta: number) => {
    setCurrentTime((prev) => {
      const next = Math.max(0, Math.min(duration, prev + delta));
      audioEngine.syncTimecode(next, isPlaying);
      return next;
    });
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioEngine.settings.isMuted = nextMuted;
    audioEngine.updateVolumes();
  };

  const handleSimulateDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 1800);
  };

  return (
    <div className="flex flex-col xl:flex-row items-center justify-center gap-8 w-full max-w-7xl mx-auto px-4 py-6">
      {/* 9:16 Phone Mockup Container */}
      <div className="relative flex flex-col items-center shrink-0">
        {/* Device Frame Switcher & Audio Visualizer Header */}
        <div className="w-full flex items-center justify-between mb-3 px-2">
          {/* Audio Visualizer Waves */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-full border border-slate-800">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">AUDIO</span>
            <div className="flex items-end gap-1 h-3.5 w-16">
              {audioBars.map((val, idx) => (
                <div
                  key={idx}
                  className="w-1.5 bg-gradient-to-t from-cyan-500 to-violet-500 rounded-full transition-all duration-75"
                  style={{ height: `${Math.max(15, (val / 255) * 100)}%` }}
                />
              ))}
            </div>
          </div>

          {/* Device Styling Toggle */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setDeviceFrame('iphone')}
              className={`px-2.5 py-1 rounded flex items-center gap-1 transition-colors ${
                deviceFrame === 'iphone' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>iPhone 16 Pro</span>
            </button>
            <button
              onClick={() => setDeviceFrame('minimal')}
              className={`px-2.5 py-1 rounded flex items-center gap-1 transition-colors ${
                deviceFrame === 'minimal' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Frameless 9:16</span>
            </button>
          </div>
        </div>

        {/* The 9:16 Device Container */}
        <div
          className={`relative transition-all duration-300 shadow-2xl ${
            deviceFrame === 'iphone'
              ? 'w-[340px] sm:w-[380px] h-[680px] sm:h-[760px] bg-[#1a1f35] rounded-[52px] p-3 border-[6px] border-[#2d3748] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(0,229,255,0.15)] ring-1 ring-white/10'
              : 'w-[340px] sm:w-[380px] h-[604px] sm:h-[675px] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl'
          }`}
        >
          {/* iPhone Details (Dynamic Island & Speaker) */}
          {deviceFrame === 'iphone' && (
            <>
              {/* Dynamic Island */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-40 flex items-center justify-between px-3 border border-slate-800">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800" />
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-cyan-400/80 animate-pulse" />
                  <span className="text-[9px] font-mono text-cyan-300 font-bold">15s</span>
                </div>
              </div>

              {/* Gloss reflection overlay */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.03] to-transparent pointer-events-none rounded-r-[46px] z-30" />
            </>
          )}

          {/* Video Screen Surface (9:16) */}
          <div
            className={`relative w-full h-full overflow-hidden bg-black ${
              deviceFrame === 'iphone' ? 'rounded-[44px]' : 'rounded-xl'
            }`}
          >
            <ReelSceneRenderer
              currentTime={currentTime}
              showInstagramUi={showInstagramUi}
              showSafeZones={showSafeZones}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
              isFollowed={isFollowed}
              onFollowClick={() => setIsFollowed(!isFollowed)}
              diagramStyle={diagramStyle}
              showKineticCaptions={showKineticCaptions}
            />
          </div>
        </div>

        {/* Quick Resolution Notice */}
        <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-slate-400 font-mono">
          <span>9:16 Vertical</span>
          <span>·</span>
          <span>1080 × 1920 Standard</span>
          <span>·</span>
          <span>30 FPS</span>
        </div>
      </div>

      {/* Right Controls & Production Hub */}
      <div className="flex flex-col gap-5 w-full max-w-2xl">
        {/* Header Information */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/40">
              VIRAL REEL RUNTIME: 00:15
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-400 font-medium">Hinglish / English VO</span>
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Napkin AI — High-Retention Reel Studio
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Stop making diagrams manually! This 15-second cinematic vertical reel is engineered for maximum scroll-stopping power, 100% viewer retention, and instant follower conversions.
          </p>
        </div>

        {/* The Interactive Timeline Scrubber */}
        <TimelineBar
          currentTime={currentTime}
          duration={duration}
          isPlaying={isPlaying}
          isMuted={isMuted}
          showInstagramUi={showInstagramUi}
          showSafeZones={showSafeZones}
          playbackSpeed={playbackSpeed}
          onPlayPause={handlePlayPause}
          onSeek={handleSeek}
          onToggleMute={handleToggleMute}
          onToggleInstagramUi={() => setShowInstagramUi(!showInstagramUi)}
          onToggleSafeZones={() => setShowSafeZones(!showSafeZones)}
          onChangeSpeed={setPlaybackSpeed}
          onStepFrame={handleStepFrame}
        />

        {/* Modern AI Studio Controls: Natural Female Voiceover & Diagram Mode */}
        <div className="bg-[#0a0f24] rounded-2xl border border-slate-800 p-3.5 space-y-3 shadow-xl">
          {/* Top row: Girl Voiceover Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <Mic className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold text-slate-200">Girl Voice:</span>
              </div>
              <button
                onClick={handleGenerateStudioVoice}
                disabled={isGeneratingTts}
                className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                  ttsSuccess
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                    : 'bg-gradient-to-r from-violet-600/30 to-cyan-500/30 text-cyan-200 border border-cyan-400/40 hover:border-cyan-300'
                }`}
                title="Generates lifelike natural studio voice with strong startup hook using Gemini 3.8 TTS"
              >
                {isGeneratingTts ? (
                  <>
                    <div className="w-3 h-3 border-2 border-cyan-300 border-t-transparent rounded-full animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : ttsSuccess ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                    <span>HD Voice Ready ✓</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-cyan-300" />
                    <span>HD Studio Voice (Gemini 3.8)</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
              {[
                { id: 'female_natural', label: 'Aanya (Hinglish)', tone: 'Warm & Authentic' },
                { id: 'female_tech', label: 'Zara (AI Tech)', tone: 'Fast & Crisp' },
                { id: 'female_hinglish', label: 'Priya (Creator)', tone: 'High Energy' },
                { id: 'female_studio', label: 'Elena (Studio)', tone: 'Polished Pro' },
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setFemaleVoiceProfile(v.id as typeof femaleVoiceProfile);
                    audioEngine.settings.voiceProfile = v.id as typeof femaleVoiceProfile;
                    audioEngine.settings.voiceGender = 'female';
                    audioEngine.speakVoiceover('Meet Napkin AI! Turn your boring text into beautiful visuals in seconds.');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                    femaleVoiceProfile === v.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm font-semibold'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                  title={v.tone}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom row: AI Diagram Mode & Kinetic Captions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-mono text-[11px]">AI DIAGRAM MODE:</span>
              <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                {[
                  { id: 'flowchart', label: '🔀 Flowchart' },
                  { id: 'mindmap', label: '🧠 Mind Map' },
                  { id: 'process_cycle', label: '⚡ Cycle' },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDiagramStyle(d.id as typeof diagramStyle)}
                    className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                      diagramStyle === d.id
                        ? 'bg-gradient-to-r from-cyan-500/30 to-violet-500/30 text-cyan-300 font-semibold border border-cyan-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Kinetic Viral Subtitles Toggle */}
            <button
              onClick={() => setShowKineticCaptions(!showKineticCaptions)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                showKineticCaptions
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <span>✨ Word-by-Word Subtitles:</span>
              <span className="font-mono">{showKineticCaptions ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>

        {/* Scene Snapshot Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {[
            { id: 1, title: 'The Hook', range: '0-3s', desc: 'Stop Manual Diagrams', color: 'border-cyan-500/40' },
            { id: 2, title: 'The Tool', range: '3-6s', desc: 'Meet Napkin AI', color: 'border-blue-500/40' },
            { id: 3, title: 'The Morph', range: '6-10s', desc: 'Text → Visuals', color: 'border-violet-500/40' },
            { id: 4, title: 'Audience', range: '10-13s', desc: 'Students & Pros', color: 'border-emerald-500/40' },
            { id: 5, title: 'The CTA', range: '13-15s', desc: 'Follow For More', color: 'border-sky-500/40' },
          ].map((item) => {
            const isActive =
              (item.id === 1 && currentTime < 3) ||
              (item.id === 2 && currentTime >= 3 && currentTime < 6) ||
              (item.id === 3 && currentTime >= 6 && currentTime < 10) ||
              (item.id === 4 && currentTime >= 10 && currentTime < 13) ||
              (item.id === 5 && currentTime >= 13);

            return (
              <button
                key={item.id}
                onClick={() => handleSeek(item.id === 1 ? 0 : item.id === 2 ? 3 : item.id === 3 ? 6 : item.id === 4 ? 10 : 13)}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 border-cyan-400 shadow-md shadow-cyan-500/20'
                    : 'bg-[#090d1c]/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-0.5">
                  <span>S{item.id}</span>
                  <span className="text-slate-400">{item.range}</span>
                </div>
                <div className="text-xs font-bold text-white truncate">{item.title}</div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{item.desc}</div>
              </button>
            );
          })}
        </div>

        {/* Export Video & Package Action Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* Export Reel Video */}
          <button
            onClick={handleSimulateDownload}
            disabled={isDownloading}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-display font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>RENDERING 15s VERTICAL REEL...</span>
              </>
            ) : downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300 stroke-[3]" />
                <span>REEL READY TO POST! ✓</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>EXPORT 15s VERTICAL REEL (1080×1920)</span>
              </>
            )}
          </button>

          {/* View Complete Production Package */}
          <button
            onClick={onExportPackageClick}
            className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-display font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>AGENCY PACKAGE</span>
          </button>
        </div>
      </div>
    </div>
  );
};
