export interface SceneData {
  id: number;
  name: string;
  timeRange: [number, number]; // in seconds, e.g. [0, 3]
  title: string;
  hookText: string;
  subText?: string;
  voiceoverScript: string;
  voiceoverHinglishAlt?: string;
  sfxDescription: string;
  cameraMovement: string;
  visualDescription: string;
  videoPrompt: string;
  aspectRatio: string;
}

export interface AudioSettings {
  bgmVolume: number; // 0 to 1
  sfxVolume: number; // 0 to 1
  voiceoverVolume: number; // 0 to 1
  voiceoverSpeed: number; // 0.8 to 1.3
  isMuted: boolean;
  voiceoverPitch: number;
  useHinglish: boolean;
  voiceGender: 'female' | 'male';
  voiceProfile: 'female_natural' | 'female_tech' | 'female_hinglish' | 'female_studio';
  voiceName?: string;
}

export interface ModernAiUiSettings {
  diagramStyle: 'flowchart' | 'mindmap' | 'process_cycle' | 'venn';
  colorTheme: 'cyber_cyan' | 'neon_violet' | 'hologram_emerald';
  showKineticCaptions: boolean;
  activeFilterNode: string | null;
}

export interface GrowthStrategyData {
  caption: string;
  hashtags: string[];
  hookAlternatives: string[];
  ctaStrategy: string;
  pinnedComment: string;
  recommendedAudio: string;
}
