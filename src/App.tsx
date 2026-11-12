/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { ReelPlayer } from './components/ReelPlayer';
import { ProductionPackage } from './components/ProductionPackage';
import { AudioSettingsModal } from './components/AudioSettingsModal';
import { Sparkles, Sliders, Play, Film, ShieldCheck, Download, ExternalLink, ChevronRight } from 'lucide-react';

export default function App() {
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const productionSectionRef = useRef<HTMLDivElement>(null);

  const scrollToProductionPackage = () => {
    productionSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#05070e] text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* =========================================================================
          TOP BAR CONTRACT: [Brand Wordmark] — [4-5 Nav Links] — [1 Primary Action]
         ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#05070e]/85 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="/"
            className="font-display font-black text-xl tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-400 to-violet-600 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span>
              Napkin<span className="text-cyan-400">Reel</span>
            </span>
          </a>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a
              href="#player"
              className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
            >
              15s Reel Player
            </a>
            <button
              onClick={scrollToProductionPackage}
              className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 cursor-pointer text-left"
            >
              Scene Storyboard
            </button>
            <button
              onClick={scrollToProductionPackage}
              className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 cursor-pointer text-left"
            >
              AI Prompts
            </button>
            <button
              onClick={scrollToProductionPackage}
              className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 cursor-pointer text-left"
            >
              Voiceover Stems
            </button>
            <button
              onClick={scrollToProductionPackage}
              className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 cursor-pointer text-left"
            >
              Growth Blueprint
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsAudioModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer shadow-sm hover:border-cyan-500/40"
            >
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>Audio Mixer</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN WORKSPACE
         ========================================================================= */}
      <main className="flex-1 flex flex-col">
        {/* SECTION 1: Interactive 9:16 Reel Player Studio */}
        <section id="player" className="w-full pt-4 pb-12 relative overflow-hidden">
          {/* Subtle ambient lighting meshes */}
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

          <ReelPlayer onExportPackageClick={scrollToProductionPackage} />
        </section>

        {/* SECTION 2: Reel Architecture & Creative Direction Strip */}
        <section className="border-y border-slate-800/80 bg-[#080c1a]/60 py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">HOOK RETENTION</span>
                <div className="font-display font-extrabold text-2xl text-white">0.0s – 3.0s</div>
                <p className="text-xs text-slate-400">High-contrast punch typography + 808 sub-bass drop</p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-violet-400 font-bold uppercase tracking-wider">HERO MORPH</span>
                <div className="font-display font-extrabold text-2xl text-white">6.0s – 10.0s</div>
                <p className="text-xs text-slate-400">Text-to-infographic transformation sequence</p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">TARGET AUDIENCE</span>
                <div className="font-display font-extrabold text-2xl text-white">10.0s – 13.0s</div>
                <p className="text-xs text-slate-400">Triple badge social proof for students & creators</p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-sky-400 font-bold uppercase tracking-wider">VIRAL CTA</span>
                <div className="font-display font-extrabold text-2xl text-white">13.0s – 15.0s</div>
                <p className="text-xs text-slate-400">Follower conversion loop with DM trigger strategy</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Complete Agency Production Package */}
        <section ref={productionSectionRef} id="package" className="w-full py-10">
          <ProductionPackage />
        </section>
      </main>

      {/* =========================================================================
          AUDIO SETTINGS MODAL
         ========================================================================= */}
      <AudioSettingsModal
        isOpen={isAudioModalOpen}
        onClose={() => setIsAudioModalOpen(false)}
      />

      {/* =========================================================================
          QUIET FOOTER
         ========================================================================= */}
      <footer className="border-t border-slate-800/80 bg-[#04060b] py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-slate-300">Napkin AI Reel Production Suite</span>
            <span>·</span>
            <span>Agency Grade Vertical 9:16 Spec</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-400">1080 × 1920 · 30 FPS · Hinglish VO · Web Audio BGM</span>
            <a
              href="https://napkin.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              <span>Visit napkin.ai</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
