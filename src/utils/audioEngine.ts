/**
 * Web Audio Procedural Sound Engine & Speech Synthesizer
 * Provides electronic background track, precision cinematic SFX, and Hinglish voiceover narration.
 */

import { AudioSettings } from '../types/reel';

class AudioEngine {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  public analyser: AnalyserNode | null = null;

  private isBgmPlaying = false;
  private bgmInterval: number | null = null;
  private currentStep = 0;

  // Settings
  public settings: AudioSettings = {
    bgmVolume: 0.35,
    sfxVolume: 0.65,
    voiceoverVolume: 0.95,
    voiceoverSpeed: 1.08,
    voiceoverPitch: 1.24,
    isMuted: false,
    useHinglish: true,
    voiceGender: 'female',
    voiceProfile: 'female_natural',
    voiceName: undefined,
  };

  private lastTriggeredSfx: { [key: string]: boolean } = {};

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.bgmGain = this.ctx.createGain();
      this.sfxGain = this.ctx.createGain();
      this.analyser = this.ctx.createAnalyser();

      this.analyser.fftSize = 64;

      this.bgmGain.connect(this.masterGain);
      this.sfxGain.connect(this.masterGain);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);

      this.updateVolumes();
    } catch (e) {
      console.warn('AudioContext failed to initialize:', e);
    }
  }

  public updateVolumes() {
    if (!this.ctx || !this.masterGain || !this.bgmGain || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    if (this.settings.isMuted) {
      this.masterGain.gain.setValueAtTime(0, now);
    } else {
      this.masterGain.gain.setValueAtTime(1, now);
      this.bgmGain.gain.setValueAtTime(this.settings.bgmVolume, now);
      this.sfxGain.gain.setValueAtTime(this.settings.sfxVolume, now);
    }
  }

  public resumeContext() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // --- PROCEDURAL SFX GENERATORS ---

  public playSubBassDrop() {
    if (!this.ctx || !this.sfxGain || this.settings.isMuted) return;
    const now = this.ctx.currentTime;

    // Sub-bass sine sweep 130Hz -> 38Hz
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.exponentialRampToValueAtTime(38, now + 1.2);

    gain.gain.setValueAtTime(0.9, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 1.4);

    // Noise burst / impact punch
    this.playNoiseImpact(now);
  }

  private playNoiseImpact(startTime: number) {
    if (!this.ctx || !this.sfxGain) return;
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, startTime);
    filter.frequency.exponentialRampToValueAtTime(100, startTime + 0.35);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(startTime);
    noise.stop(startTime + 0.4);
  }

  public playDigitalChirp() {
    if (!this.ctx || !this.sfxGain || this.settings.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(2400, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  public playMorphShimmer() {
    if (!this.ctx || !this.sfxGain || this.settings.isMuted) return;
    const now = this.ctx.currentTime;

    // Harmonic arpeggio sweep 800Hz, 1200Hz, 1600Hz, 2400Hz
    [600, 900, 1200, 1800, 2400].forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + idx * 0.06 + 0.3);

      gain.gain.setValueAtTime(0.15, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.4);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.45);
    });
  }

  public playPopChime(step: number) {
    if (!this.ctx || !this.sfxGain || this.settings.isMuted) return;
    const now = this.ctx.currentTime;
    const baseFreqs = [523.25, 659.25, 783.99]; // C5, E5, G5
    const freq = baseFreqs[step % baseFreqs.length] || 600;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.15, now + 0.15);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  public playCelebrationChime() {
    if (!this.ctx || !this.sfxGain || this.settings.isMuted) return;
    const now = this.ctx.currentTime;
    const notes = [587.33, 739.99, 880.0, 1174.66]; // D5, F#5, A5, D6

    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.3, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.8);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.85);
    });
  }

  // --- PROCEDURAL CYBERPUNK BGM ---

  public startBGM() {
    this.init();
    this.resumeContext();
    if (this.isBgmPlaying) return;
    this.isBgmPlaying = true;

    const tempo = 124; // BPM
    const stepDuration = 60 / tempo / 2; // eighth notes

    const bassNotes = [55, 55, 65.4, 55, 49, 49, 58.27, 49]; // A1, C2, G1, A#1

    this.bgmInterval = window.setInterval(() => {
      if (!this.ctx || !this.bgmGain || this.settings.isMuted) return;
      const now = this.ctx.currentTime;

      // 1. Kick on beats 0, 4
      if (this.currentStep % 4 === 0) {
        this.playKick(now);
      }

      // 2. Cyber-bass line
      const noteFreq = bassNotes[this.currentStep % bassNotes.length];
      this.playBassNote(now, noteFreq, stepDuration * 0.85);

      // 3. Hi-hat on offbeats
      if (this.currentStep % 2 === 1) {
        this.playHiHat(now);
      }

      // 4. Arpeggiated melody line
      if (this.currentStep % 2 === 0) {
        const arpNotes = [440, 523.25, 659.25, 783.99, 880];
        const arpFreq = arpNotes[(this.currentStep / 2) % arpNotes.length];
        this.playArp(now, arpFreq, stepDuration * 0.5);
      }

      this.currentStep = (this.currentStep + 1) % 16;
    }, stepDuration * 1000);
  }

  public stopBGM() {
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    this.isBgmPlaying = false;
    this.currentStep = 0;
  }

  private playKick(time: number) {
    if (!this.ctx || !this.bgmGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(35, time + 0.12);

    gain.gain.setValueAtTime(0.65, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.14);

    osc.connect(gain);
    gain.connect(this.bgmGain);

    osc.start(time);
    osc.stop(time + 0.15);
  }

  private playBassNote(time: number, freq: number, duration: number) {
    if (!this.ctx || !this.bgmGain) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, time);
    filter.frequency.exponentialRampToValueAtTime(120, time + duration);

    gain.gain.setValueAtTime(0.35, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.bgmGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  private playHiHat(time: number) {
    if (!this.ctx || !this.bgmGain) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(8000, time);

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7000, time);

    gain.gain.setValueAtTime(0.08, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.bgmGain);

    osc.start(time);
    osc.stop(time + 0.06);
  }

  private playArp(time: number, freq: number, duration: number) {
    if (!this.ctx || !this.bgmGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(gain);
    gain.connect(this.bgmGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  // --- TIMELINE SYNCED SFX TRIGGERS ---

  public syncTimecode(currentTime: number, isPlaying: boolean) {
    if (!isPlaying) {
      this.lastTriggeredSfx = {};
      return;
    }

    // Trigger exact SFX at key points
    if (currentTime >= 0.0 && currentTime < 0.3 && !this.lastTriggeredSfx['bassDrop']) {
      this.playSubBassDrop();
      this.lastTriggeredSfx['bassDrop'] = true;
    }
    if (currentTime >= 3.0 && currentTime < 3.3 && !this.lastTriggeredSfx['digitalChirp']) {
      this.playDigitalChirp();
      this.lastTriggeredSfx['digitalChirp'] = true;
    }
    if (currentTime >= 6.0 && currentTime < 6.3 && !this.lastTriggeredSfx['morphShimmer']) {
      this.playMorphShimmer();
      this.lastTriggeredSfx['morphShimmer'] = true;
    }
    if (currentTime >= 10.2 && currentTime < 10.5 && !this.lastTriggeredSfx['pop1']) {
      this.playPopChime(0);
      this.lastTriggeredSfx['pop1'] = true;
    }
    if (currentTime >= 11.1 && currentTime < 11.4 && !this.lastTriggeredSfx['pop2']) {
      this.playPopChime(1);
      this.lastTriggeredSfx['pop2'] = true;
    }
    if (currentTime >= 12.0 && currentTime < 12.3 && !this.lastTriggeredSfx['pop3']) {
      this.playPopChime(2);
      this.lastTriggeredSfx['pop3'] = true;
    }
    if (currentTime >= 13.0 && currentTime < 13.3 && !this.lastTriggeredSfx['celebration']) {
      this.playCelebrationChime();
      this.lastTriggeredSfx['celebration'] = true;
    }

    // Voiceover synchronization triggers
    // Scene 1 Strong Vocal Startup (0.15s)
    if (currentTime >= 0.15 && currentTime < 0.45 && !this.lastTriggeredSfx['vo_scene1']) {
      this.playSceneAudio(1, 'Stop making diagrams manually! This AI does it for you in seconds!');
      this.lastTriggeredSfx['vo_scene1'] = true;
    }
    if (currentTime >= 3.1 && currentTime < 3.4 && !this.lastTriggeredSfx['vo_scene2']) {
      this.playSceneAudio(2, 'Meet Napkin AI!');
      this.lastTriggeredSfx['vo_scene2'] = true;
    }
    if (currentTime >= 6.2 && currentTime < 6.5 && !this.lastTriggeredSfx['vo_scene3']) {
      const line = 'Turn your boring text into beautiful visuals in seconds!';
      this.playSceneAudio(3, line);
      this.lastTriggeredSfx['vo_scene3'] = true;
    }
    if (currentTime >= 10.2 && currentTime < 10.5 && !this.lastTriggeredSfx['vo_scene4']) {
      this.playSceneAudio(4, 'Perfect for students, creators and professionals!');
      this.lastTriggeredSfx['vo_scene4'] = true;
    }
    if (currentTime >= 13.1 && currentTime < 13.4 && !this.lastTriggeredSfx['vo_scene5']) {
      const line = 'Follow anvora dot smarter for hidden AI tools!';
      this.playSceneAudio(5, line);
      this.lastTriggeredSfx['vo_scene5'] = true;
    }
  }

  private audioClipCache: { [key: number]: AudioBuffer } = {};
  public isGeneratingVoiceover = false;

  public async preloadGeminiVoiceover() {
    if (this.isGeneratingVoiceover) return;
    this.isGeneratingVoiceover = true;
    const lines = [
      { scene: 1, text: 'Stop making diagrams manually! This AI does it for you in seconds!' },
      { scene: 2, text: 'Meet Napkin AI!' },
      { scene: 3, text: 'Turn your boring text into beautiful visuals in seconds!' },
      { scene: 4, text: 'Perfect for students, creators and professionals!' },
      { scene: 5, text: 'Follow anvora dot smarter for hidden AI tools!' },
    ];

    try {
      this.init();
      for (const item of lines) {
        if (this.audioClipCache[item.scene]) continue;
        const res = await fetch('/api/voiceover', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: item.text,
            voiceName: 'Kore',
            style: 'Energetic, natural and confident young female tech creator, strong startup hook with enthusiastic Hinglish inflection',
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.audioBase64 && this.ctx) {
            const binary = atob(data.audioBase64);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
              bytes[i] = binary.charCodeAt(i);
            }
            const buffer = await this.ctx.decodeAudioData(bytes.buffer.slice(0));
            this.audioClipCache[item.scene] = buffer;
          }
        }
      }
    } catch (e) {
      console.warn('Gemini TTS preload error, using browser natural TTS fallback:', e);
    } finally {
      this.isGeneratingVoiceover = false;
    }
  }

  public playSceneAudio(sceneId: number, fallbackText: string) {
    if (this.settings.isMuted || this.settings.voiceoverVolume <= 0) return;
    
    // If Gemini studio clip is cached, play it through Web Audio
    if (this.ctx && this.audioClipCache[sceneId] && this.masterGain) {
      try {
        const source = this.ctx.createBufferSource();
        const gain = this.ctx.createGain();
        source.buffer = this.audioClipCache[sceneId];
        gain.gain.value = this.settings.voiceoverVolume;
        source.connect(gain);
        gain.connect(this.masterGain);
        source.start(0);
        return;
      } catch (err) {
        console.warn('Buffer playback error:', err);
      }
    }

    // Fallback: browser natural female voice
    this.speakVoiceover(fallbackText);
  }

  public speakVoiceover(text: string) {
    if (this.settings.isMuted || this.settings.voiceoverVolume <= 0) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel(); // Cancel any lingering speech
      const utterance = new SpeechSynthesisUtterance(text);

      // Pitch and speed tuning according to selected female voice profile
      let targetPitch = this.settings.voiceoverPitch;
      let targetRate = this.settings.voiceoverSpeed;

      if (this.settings.voiceProfile === 'female_natural') {
        targetPitch = Math.max(1.15, this.settings.voiceoverPitch);
        targetRate = Math.max(1.02, this.settings.voiceoverSpeed);
      } else if (this.settings.voiceProfile === 'female_tech') {
        targetPitch = 1.28;
        targetRate = 1.12;
      } else if (this.settings.voiceProfile === 'female_hinglish') {
        targetPitch = 1.25;
        targetRate = 1.06;
      } else if (this.settings.voiceProfile === 'female_studio') {
        targetPitch = 1.18;
        targetRate = 1.0;
      }

      utterance.pitch = targetPitch;
      utterance.rate = targetRate;
      utterance.volume = this.settings.voiceoverVolume;

      const voices = window.speechSynthesis.getVoices();
      
      // If user selected a specific voice by name, use it
      if (this.settings.voiceName) {
        const found = voices.find((v) => v.name === this.settings.voiceName);
        if (found) {
          utterance.voice = found;
          window.speechSynthesis.speak(utterance);
          return;
        }
      }

      // Automatically search for the best natural female voice:
      // Priority 1: Indian English Female voices (e.g., Neerja, Swara, Aditi, Google en-IN Female, Microsoft Heera)
      // Priority 2: Natural / Online female voices (Google UK English Female, Google US English Female, Samantha, Victoria, Zira, Karen)
      const femaleKeywords = [
        'female', 'woman', 'girl', 'neerja', 'swara', 'aditi', 'samantha', 'victoria', 
        'karen', 'moira', 'zira', 'fiona', 'tessa', 'sangeeta', 'priya', 'veena', 'ananya'
      ];

      // Match language preference
      const inVoices = voices.filter((v) => v.lang.toLowerCase().includes('in') || v.lang.toLowerCase().includes('en-in'));
      const femaleInVoice = inVoices.find((v) => 
        femaleKeywords.some((k) => v.name.toLowerCase().includes(k)) || (!v.name.toLowerCase().includes('male') && !v.name.toLowerCase().includes('david') && !v.name.toLowerCase().includes('rishi'))
      );

      const naturalFemaleVoice = voices.find((v) => {
        const name = v.name.toLowerCase();
        return (
          femaleKeywords.some((k) => name.includes(k)) ||
          (name.includes('google') && name.includes('female')) ||
          (name.includes('natural') && !name.includes('guy') && !name.includes('male'))
        );
      });

      const fallbackVoice = voices.find(
        (v) => (v.lang.startsWith('en') || v.lang.startsWith('hi')) && !v.name.toLowerCase().includes('male')
      );

      utterance.voice = femaleInVoice || naturalFemaleVoice || fallbackVoice || voices[0] || null;

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  public getAvailableFemaleVoices(): SpeechSynthesisVoice[] {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
    const voices = window.speechSynthesis.getVoices();
    const femaleKeywords = ['female', 'woman', 'girl', 'neerja', 'swara', 'aditi', 'samantha', 'victoria', 'karen', 'moira', 'zira', 'fiona', 'tessa', 'sangeeta', 'priya', 'veena', 'ananya'];
    
    return voices.filter((v) => {
      const name = v.name.toLowerCase();
      const isEnglishOrHindi = v.lang.startsWith('en') || v.lang.startsWith('hi');
      return (
        isEnglishOrHindi &&
        (femaleKeywords.some((k) => name.includes(k)) ||
          (name.includes('google') && !name.includes('male')) ||
          (!name.includes('male') && !name.includes('david') && !name.includes('mark') && !name.includes('george') && !name.includes('rishi')))
      );
    });
  }

  public cancelSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public getAudioFrequencyData(): Uint8Array {
    if (!this.analyser) return new Uint8Array(32);
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }
}

export const audioEngine = new AudioEngine();
