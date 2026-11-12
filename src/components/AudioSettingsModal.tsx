import React, { useState } from 'react';
import { audioEngine } from '../utils/audioEngine';
import { AudioSettings } from '../types/reel';
import { Volume2, Mic, Play, X, Sliders, Check } from 'lucide-react';

interface AudioSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AudioSettingsModal: React.FC<AudioSettingsModalProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState<AudioSettings>({ ...audioEngine.settings });
  const [isPlayingTest, setIsPlayingTest] = useState(false);

  if (!isOpen) return null;

  const handleChange = <K extends keyof AudioSettings>(key: K, val: AudioSettings[K]) => {
    const updated = { ...settings, [key]: val };
    setSettings(updated);
    audioEngine.settings = updated;
    audioEngine.updateVolumes();
  };

  const handleTestVoice = (sampleText: string) => {
    setIsPlayingTest(true);
    audioEngine.init();
    audioEngine.resumeContext();
    audioEngine.speakVoiceover(sampleText);
    setTimeout(() => setIsPlayingTest(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-md bg-[#090d1c] border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h3 className="font-display font-bold text-lg text-white">Audio & Voiceover Mixer</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sliders */}
        <div className="space-y-4 text-xs">
          {/* BGM Volume */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                Cyberpunk BGM Synthesizer
              </span>
              <span className="font-mono text-cyan-400">{Math.round(settings.bgmVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.bgmVolume}
              onChange={(e) => handleChange('bgmVolume', parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* SFX Volume */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-violet-400" />
                Cinematic SFX (Bass Drop, Chimes, Pops)
              </span>
              <span className="font-mono text-violet-400">{Math.round(settings.sfxVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.sfxVolume}
              onChange={(e) => handleChange('sfxVolume', parseFloat(e.target.value))}
              className="w-full accent-violet-400 cursor-pointer"
            />
          </div>

          {/* Voiceover Volume */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-emerald-400" />
                Voiceover Narration
              </span>
              <span className="font-mono text-emerald-400">{Math.round(settings.voiceoverVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.voiceoverVolume}
              onChange={(e) => handleChange('voiceoverVolume', parseFloat(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          {/* Voiceover Profile & Tone */}
          <div className="space-y-1.5 pt-1 border-t border-slate-800">
            <div className="flex justify-between text-slate-300 font-medium">
              <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                <Mic className="w-3.5 h-3.5 text-cyan-400" />
                Natural Girl Voiceover Persona
              </span>
              <span className="font-mono text-cyan-400 text-[11px] capitalize">
                {settings.voiceProfile.replace('female_', '')}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'female_natural', name: 'Aanya', desc: 'Natural Hinglish' },
                { id: 'female_tech', name: 'Zara', desc: 'Modern AI Tech' },
                { id: 'female_hinglish', name: 'Priya', desc: 'High-Energy Creator' },
                { id: 'female_studio', name: 'Elena', desc: 'Studio Presenter' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleChange('voiceProfile', p.id as AudioSettings['voiceProfile'])}
                  className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                    settings.voiceProfile === p.id
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-bold text-xs">{p.name}</div>
                  <div className="text-[10px] text-slate-400">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Voiceover Pitch / Resonance */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-300 font-medium">
              <span>Natural Female Pitch</span>
              <span className="font-mono text-cyan-400">{settings.voiceoverPitch.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="1.5"
              step="0.02"
              value={settings.voiceoverPitch}
              onChange={(e) => handleChange('voiceoverPitch', parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Voiceover Speed */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-300 font-medium">
              <span>Voiceover Pace / Speed</span>
              <span className="font-mono text-slate-300">{settings.voiceoverSpeed.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.8"
              max="1.3"
              step="0.05"
              value={settings.voiceoverSpeed}
              onChange={(e) => handleChange('voiceoverSpeed', parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Test Speech Sample */}
        <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Girl Voice Preview:</span>
            <button
              onClick={() => handleTestVoice('Meet Napkin AI! Turn your boring text into beautiful visuals in seconds. Follow anvora dot smarter for hidden AI tools!')}
              disabled={isPlayingTest}
              className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[11px] font-semibold flex items-center gap-1 hover:bg-cyan-500/30 transition-colors cursor-pointer"
            >
              <Play className="w-3 h-3 fill-cyan-300" />
              <span>Test Voice Line</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            "Meet Napkin AI! Turn your boring text into beautiful visuals in seconds. Follow anvora dot smarter for hidden AI tools!"
          </p>
        </div>

        {/* Done Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-display font-bold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>APPLY AUDIO SETTINGS</span>
        </button>
      </div>
    </div>
  );
};
