import React, { useState } from 'react';
import { SCENES, GROWTH_STRATEGY, AUDIO_CUES, ASSEMBLY_GUIDELINES } from '../data/productionData';
import { Copy, Check, Sparkles, Download, Layers, Mic, Volume2, Film, TrendingUp, Sliders, ExternalLink } from 'lucide-react';

export const ProductionPackage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'storyboard' | 'prompts' | 'voiceover' | 'audio' | 'assembly' | 'growth'>('storyboard');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleDownloadMarkdown = () => {
    let md = `# NAPKIN AI — 15-SECOND INSTAGRAM REEL PRODUCTION PACKAGE\n`;
    md += `Agency Grade Video Production, AI Prompts, Voiceover & Growth Blueprint\n\n`;
    md += `Target Platform: Instagram Reels / TikTok / YouTube Shorts\n`;
    md += `Aspect Ratio: 9:16 Vertical (1080 x 1920) | Frame Rate: 30 FPS | Duration: 15.0 Seconds\n\n`;

    md += `## 1. SCENE-BY-SCENE STORYBOARD\n\n`;
    SCENES.forEach((s) => {
      md += `### ${s.name} (${s.timeRange[0]}s - ${s.timeRange[1]}s): ${s.title}\n`;
      md += `- On-Screen Text: "${s.hookText}"\n`;
      if (s.subText) md += `- Subtitle: "${s.subText}"\n`;
      md += `- Hinglish Voiceover: "${s.voiceoverScript}"\n`;
      md += `- Visual: ${s.visualDescription}\n`;
      md += `- Camera: ${s.cameraMovement}\n`;
      md += `- Sound Effects: ${s.sfxDescription}\n`;
      md += `- Video AI Prompt: ${s.videoPrompt}\n\n`;
    });

    md += `## 2. VOICEOVER SCRIPT (HINGLISH & ENGLISH)\n\n`;
    md += `Full Script: "Meet Napkin AI! Turn your boring text into beautiful visuals in seconds. Perfect for students, creators and professionals! Follow for hidden AI tools!"\n\n`;

    md += `## 3. INSTAGRAM VIRAL CAPTION & HASHTAGS\n\n`;
    md += `${GROWTH_STRATEGY.caption}\n\n`;
    md += `Hashtags:\n${GROWTH_STRATEGY.hashtags.join(' ')}\n\n`;

    md += `## 4. ASSEMBLY & AUDIO MIXING SPECIFICATIONS\n\n`;
    md += `- Software: ${ASSEMBLY_GUIDELINES.software}\n`;
    md += `- Safe Margins: Top: ${ASSEMBLY_GUIDELINES.safeMargins.top}, Bottom: ${ASSEMBLY_GUIDELINES.safeMargins.bottom}, Right: ${ASSEMBLY_GUIDELINES.safeMargins.right}\n`;
    md += `- Easing Curves: ${ASSEMBLY_GUIDELINES.typographyRules.easingCurve}\n`;

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'napkin_ai_15s_reel_production_package.md';
    a.click();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header with Title and Download Action */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-violet-950 text-violet-400 border border-violet-500/40">
              COMMERCIAL AGENCY SUITE
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-400">Instagram Reels Blueprint</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Complete Reel Production Package
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Engineered prompts, voiceover stems, sound cue sheets, and viral distribution strategy for Napkin AI.
          </p>
        </div>

        <button
          onClick={handleDownloadMarkdown}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors shrink-0 cursor-pointer"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>DOWNLOAD COMPLETE BLUEPRINT (.MD)</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto py-4 border-b border-slate-800/80">
        {[
          { id: 'storyboard', label: 'Scene Storyboard', icon: Layers },
          { id: 'prompts', label: 'AI Video Prompts', icon: Film },
          { id: 'voiceover', label: 'Voiceover Script', icon: Mic },
          { id: 'audio', label: 'Sound Cues & SFX', icon: Volume2 },
          { id: 'assembly', label: 'Editing & Timeline', icon: Sliders },
          { id: 'growth', label: 'Instagram Strategy', icon: TrendingUp },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Storyboard */}
      {activeTab === 'storyboard' && (
        <div className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SCENES.map((scene) => (
              <div
                key={scene.id}
                className="bg-[#090d1c] rounded-2xl border border-slate-800 p-5 flex flex-col justify-between shadow-xl hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                      {scene.timeRange[0]}s – {scene.timeRange[1]}s
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">Duration: {scene.timeRange[1] - scene.timeRange[0]}s</span>
                  </div>

                  <h3 className="font-display font-bold text-base text-white mb-2">{scene.name}</h3>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 mb-3">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">On-Screen Text</div>
                    <div className="font-display font-black text-sm text-cyan-300">{scene.hookText}</div>
                    {scene.subText && <div className="text-xs text-slate-300 mt-1">{scene.subText}</div>}
                  </div>

                  <div className="space-y-2 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-400 font-semibold">Visual: </span>
                      <span>{scene.visualDescription}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold">Camera: </span>
                      <span>{scene.cameraMovement}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold">Hinglish Voice: </span>
                      <span className="text-violet-300 italic">"{scene.voiceoverScript}"</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 truncate max-w-[200px]">
                    SFX: {scene.sfxDescription.split(',')[0]}
                  </span>
                  <button
                    onClick={() => handleCopy(`scene-${scene.id}`, scene.videoPrompt)}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs flex items-center gap-1 transition-colors"
                    title="Copy AI Video Prompt"
                  >
                    {copiedKey === `scene-${scene.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: AI Video Prompts */}
      {activeTab === 'prompts' && (
        <div className="pt-6 space-y-6">
          <div className="p-4 bg-cyan-950/30 border border-cyan-500/30 rounded-2xl flex items-start gap-3 text-xs text-cyan-200">
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Production Note for AI Generators: </span>
              These prompts are optimized for Runway Gen-3 Alpha, Kling AI, Luma Dream Machine, and Sora with `--ar 9:16`, camera trajectory control, high-shutter speed and hyper-clean dark neon aesthetics.
            </div>
          </div>

          <div className="space-y-4">
            {SCENES.map((scene) => (
              <div
                key={scene.id}
                className="bg-[#090d1c] rounded-2xl border border-slate-800 p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      S{scene.id} ({scene.timeRange[0]}s–{scene.timeRange[1]}s)
                    </span>
                    <span className="font-bold text-sm text-white">{scene.title}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-300 leading-relaxed">
                    {scene.videoPrompt}
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(`prompt-${scene.id}`, scene.videoPrompt)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                >
                  {copiedKey === `prompt-${scene.id}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Voiceover Script */}
      {activeTab === 'voiceover' && (
        <div className="pt-6 space-y-6 max-w-4xl">
          <div className="bg-[#090d1c] rounded-2xl border border-slate-800 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-white">15-Second Synchronized Voiceover Script (Natural Female Voice)</h3>
                <p className="text-xs text-slate-400">Delivery Persona: Natural Indian Female Creator (Aanya / Priya) — energetic, warm, and authentic Hinglish inflection.</p>
              </div>
              <button
                onClick={() => handleCopy('full-script', 'Meet Napkin AI! Turn your boring text into beautiful visuals in seconds. Perfect for students, creators and professionals! Follow @anvora.smarter for hidden AI tools!')}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedKey === 'full-script' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Full Script</span>
              </button>
            </div>

            <div className="space-y-4">
              {[
                { time: '0.0s – 3.0s', line: '(Visual Hook Sound Only / 808 Bass Drop impact)', note: 'No voiceover during hook to let the massive visual text and 808 drop hit hard.' },
                { time: '3.0s – 6.0s', line: 'Meet Napkin AI!', note: 'Tone: Natural curious hook, conversational female presenter.' },
                { time: '6.0s – 10.0s', line: 'Turn your boring text into beautiful visuals in seconds!', note: 'Tone: Excited, emphasizing "boring text" vs "beautiful visuals".' },
                { time: '10.0s – 13.0s', line: 'Perfect for students, creators and professionals!', note: 'Tone: Fast, relatable, high social proof.' },
                { time: '13.0s – 15.0s', line: 'Follow @anvora.smarter for hidden AI tools!', note: 'Tone: Warm, direct call-to-action.' },
              ].map((step, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono text-cyan-400 font-bold mr-3">{step.time}</span>
                    <span className="font-display font-bold text-sm text-slate-100">"{step.line}"</span>
                  </div>
                  <span className="text-[11px] text-slate-400 italic">{step.note}</span>
                </div>
              ))}
            </div>

            {/* Alternate Hinglish Version */}
            <div className="p-4 bg-violet-950/20 rounded-xl border border-violet-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-violet-300">Alternate Hinglish (India Regional Viral Variant):</span>
                <button
                  onClick={() => handleCopy('hinglish-alt', 'Manual diagrams banana band karo! Meet Napkin AI! Bas apna boring text dalo, aur ye seconds me banata hai professional flowcharts. Students aur creators ke liye game changer hai. Aise aur secret AI tools ke liye follow karo!')}
                  className="text-xs text-violet-400 hover:text-violet-200 flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy Hinglish</span>
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "Manual diagrams banana band karo! Meet Napkin AI! Bas apna boring text dalo, aur ye seconds me banata hai professional flowcharts. Students aur creators ke liye game changer hai. Aise aur secret AI tools ke liye follow karo!"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Sound Cues & SFX */}
      {activeTab === 'audio' && (
        <div className="pt-6 space-y-6">
          <div className="bg-[#090d1c] rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="font-display font-bold text-lg text-white">Precision Audio Cue Sheet & Sound Design</h3>
            <p className="text-xs text-slate-400">Synchronized trigger points for sound effects and sidechain ducking.</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="py-2.5 px-3">TIMECODE</th>
                    <th className="py-2.5 px-3">SOUND EFFECT</th>
                    <th className="py-2.5 px-3">FREQUENCY PROFILE</th>
                    <th className="py-2.5 px-3">CATEGORY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {AUDIO_CUES.map((cue, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40">
                      <td className="py-3 px-3 font-bold text-cyan-400">{cue.time.toFixed(1)}s</td>
                      <td className="py-3 px-3 text-slate-200 font-sans font-medium">{cue.label}</td>
                      <td className="py-3 px-3 text-slate-400">{cue.freq}</td>
                      <td className="py-3 px-3 text-violet-300">{cue.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Assembly & Editing */}
      {activeTab === 'assembly' && (
        <div className="pt-6 space-y-6 max-w-4xl">
          <div className="bg-[#090d1c] rounded-2xl border border-slate-800 p-6 space-y-5">
            <h3 className="font-display font-bold text-lg text-white">Video Editor Timeline & CapCut / Premiere Assembly</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="font-mono text-cyan-400 font-bold">PROJECT CANVAS SETTINGS</span>
                <div className="text-slate-300">Resolution: <span className="font-mono text-white">1080 × 1920 (9:16)</span></div>
                <div className="text-slate-300">Frame Rate: <span className="font-mono text-white">30.00 FPS / 60 FPS</span></div>
                <div className="text-slate-300">Color Profile: <span className="font-mono text-white">Rec.709 Standard</span></div>
                <div className="text-slate-300">Bitrate: <span className="font-mono text-white">25 - 35 Mbps (VBR 2-Pass)</span></div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="font-mono text-violet-400 font-bold">KEYFRAME EASING & MOTION</span>
                <div className="text-slate-300">Primary Easing: <span className="font-mono text-white">{ASSEMBLY_GUIDELINES.typographyRules.easingCurve}</span></div>
                <div className="text-slate-300">Motion Blur: <span className="font-mono text-white">180° Shutter Angle (Enabled)</span></div>
                <div className="text-slate-300">Camera Zooms: <span className="font-mono text-white">Scale 100% → 112% Exponential</span></div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
              <span className="font-mono text-emerald-400 font-bold">INSTAGRAM SAFE AREA CLEARANCES</span>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li><strong className="text-white">Top Safe Margin:</strong> 220px clearance (prevents reels camera, search bar, and sound title overlap)</li>
                <li><strong className="text-white">Bottom Safe Margin:</strong> 280px clearance (prevents username, caption, and music track ticker overlap)</li>
                <li><strong className="text-white">Right Side Margin:</strong> 140px clearance (keeps text clear of like, comment, bookmark, and share icons)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Instagram Growth Strategy */}
      {activeTab === 'growth' && (
        <div className="pt-6 space-y-6 max-w-4xl">
          <div className="bg-[#090d1c] rounded-2xl border border-slate-800 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-white">High-Converting Instagram Caption & SEO</h3>
                <p className="text-xs text-slate-400">Engineered to trigger Instagram algorithm's Save & Share multipliers.</p>
              </div>
              <button
                onClick={() => handleCopy('caption', `${GROWTH_STRATEGY.caption}\n\n${GROWTH_STRATEGY.hashtags.join(' ')}`)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedKey === 'caption' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Caption + Tags</span>
              </button>
            </div>

            {/* Caption Text Box */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
              {GROWTH_STRATEGY.caption}
            </div>

            {/* Hashtag Cloud */}
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">High-Intent Hashtags:</span>
              <div className="flex flex-wrap gap-1.5">
                {GROWTH_STRATEGY.hashtags.map((tag, i) => (
                  <span key={i} className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Pinned Comment Strategy */}
            <div className="p-4 bg-cyan-950/20 rounded-xl border border-cyan-500/30 text-xs space-y-1.5">
              <span className="font-bold text-cyan-300">Pinned Comment Strategy (For 3x More Comments):</span>
              <p className="text-slate-300 italic">{GROWTH_STRATEGY.pinnedComment}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
