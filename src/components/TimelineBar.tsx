import React from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Eye, ShieldAlert, SkipBack, SkipForward } from 'lucide-react';
import { SCENES } from '../data/productionData';

interface TimelineBarProps {
  currentTime: number;
  duration: number; // 15
  isPlaying: boolean;
  isMuted: boolean;
  showInstagramUi: boolean;
  showSafeZones: boolean;
  playbackSpeed: number;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onToggleMute: () => void;
  onToggleInstagramUi: () => void;
  onToggleSafeZones: () => void;
  onChangeSpeed: (speed: number) => void;
  onStepFrame: (delta: number) => void;
}

export const TimelineBar: React.FC<TimelineBarProps> = ({
  currentTime,
  duration,
  isPlaying,
  isMuted,
  showInstagramUi,
  showSafeZones,
  playbackSpeed,
  onPlayPause,
  onSeek,
  onToggleMute,
  onToggleInstagramUi,
  onToggleSafeZones,
  onChangeSpeed,
  onStepFrame,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  const currentScene = SCENES.find(
    (s) => currentTime >= s.timeRange[0] && currentTime < s.timeRange[1]
  ) || SCENES[SCENES.length - 1];

  return (
    <div className="w-full bg-[#090d1c] border border-slate-800 rounded-2xl p-4 shadow-2xl flex flex-col gap-3">
      {/* Top Bar: Timecode, Active Scene, Speed & Viewport Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Timecode & Scene Name */}
        <div className="flex items-center gap-3">
          <div className="font-mono text-base font-bold text-cyan-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 tabular-nums">
            {formatTime(currentTime)} <span className="text-slate-500 font-normal">/ 00:15.00</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Scene:</span>
            <span className="font-semibold text-slate-200 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
              {currentScene.name}
            </span>
          </div>
        </div>

        {/* Viewport & Audio Toggles */}
        <div className="flex items-center gap-2">
          {/* Instagram UI Toggle */}
          <button
            onClick={onToggleInstagramUi}
            className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors ${
              showInstagramUi
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
            title="Toggle Instagram Reels UI Simulator"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Reels UI</span>
          </button>

          {/* Safe Zones Toggle */}
          <button
            onClick={onToggleSafeZones}
            className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors ${
              showSafeZones
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
            title="Toggle Safe Area Guidelines (1080x1920)"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Safe Zones</span>
          </button>

          {/* Speed Selector */}
          <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800">
            {[0.5, 1, 1.5].map((speed) => (
              <button
                key={speed}
                onClick={() => onChangeSpeed(speed)}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                  playbackSpeed === speed
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Mute Toggle */}
          <button
            onClick={onToggleMute}
            className={`p-1.5 rounded-lg border transition-colors ${
              isMuted
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-slate-900 text-cyan-400 border-slate-800 hover:text-cyan-300'
            }`}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Scrubber Track with Scene Markers */}
      <div className="relative w-full">
        {/* Scene Labels above track */}
        <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-1">
          {SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => onSeek(scene.timeRange[0])}
              className="hover:text-cyan-400 transition-colors cursor-pointer text-left truncate"
              style={{ width: `${((scene.timeRange[1] - scene.timeRange[0]) / duration) * 100}%` }}
            >
              {scene.timeRange[0]}s · S{scene.id}
            </button>
          ))}
          <span>15s</span>
        </div>

        {/* The Track Container */}
        <div
          className="relative h-7 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden cursor-pointer group flex items-center"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            onSeek(Math.max(0, Math.min(duration, clickPos * duration)));
          }}
        >
          {/* Scene color segments */}
          {SCENES.map((scene, i) => {
            const leftPct = (scene.timeRange[0] / duration) * 100;
            const widthPct = ((scene.timeRange[1] - scene.timeRange[0]) / duration) * 100;
            const isSceneActive = currentTime >= scene.timeRange[0] && currentTime < scene.timeRange[1];

            return (
              <div
                key={scene.id}
                className={`absolute top-0 bottom-0 border-r border-slate-800 transition-colors ${
                  isSceneActive ? 'bg-cyan-950/40' : i % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-900/20'
                }`}
                style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
              >
                <span className="absolute left-1.5 top-1 text-[9px] font-mono text-slate-500 pointer-events-none">
                  {scene.name.split(':')[0]}
                </span>
              </div>
            );
          })}

          {/* Played progress fill */}
          <div
            className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-cyan-500/40 via-sky-500/40 to-violet-500/40 border-r-2 border-cyan-400 pointer-events-none"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />

          {/* Scrubber Playhead Thumb */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_10px_#00e5ff] pointer-events-none z-10"
            style={{ left: `calc(${(currentTime / duration) * 100}% - 2px)` }}
          >
            <div className="w-3 h-3 rounded-full bg-cyan-400 -translate-x-1 -translate-y-1 shadow-md" />
          </div>
        </div>
      </div>

      {/* Bottom Transport Controls: Rewind, Step Back, Play/Pause, Step Forward, Scene Jumper */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1.5">
          {/* Rewind to 0s */}
          <button
            onClick={() => onSeek(0)}
            className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Restart Reel (0.0s)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Step Back -0.5s */}
          <button
            onClick={() => onStepFrame(-0.5)}
            className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-xs font-mono"
            title="Step back 0.5s"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          {/* Main Play / Pause */}
          <button
            onClick={onPlayPause}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-display font-bold text-xs tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>PLAY REEL</span>
              </>
            )}
          </button>

          {/* Step Forward +0.5s */}
          <button
            onClick={() => onStepFrame(0.5)}
            className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-xs font-mono"
            title="Step forward 0.5s"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Scene Jump Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto py-1">
          {SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => onSeek(scene.timeRange[0])}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                currentTime >= scene.timeRange[0] && currentTime < scene.timeRange[1]
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              S{scene.id}: {scene.timeRange[0]}s
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
