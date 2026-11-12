import { SceneData, GrowthStrategyData } from '../types/reel';

export const SCENES: SceneData[] = [
  {
    id: 1,
    name: 'Scene 1: The Hook',
    timeRange: [0, 3],
    title: 'High-Impact Hook & Problem Statement',
    hookText: 'STOP MAKING DIAGRAMS MANUALLY!',
    voiceoverScript: 'Stop making diagrams manually! This AI does it for you in seconds!',
    voiceoverHinglishAlt: 'Manual diagrams banana band karo! Ye AI sab kuch seconds me karta hai!',
    sfxDescription: 'Heavy cinematic 808 sub-bass drop, reverse swoosh riser, explosive impact glitch.',
    cameraMovement: 'Fast push-in zoom with slight rotational camera shake on text hit.',
    visualDescription: 'Dark futuristic tech workspace in deep navy and obsidian, glowing cyan and violet particle trails bursting towards the camera.',
    videoPrompt: 'Runway Gen-3 / Kling Prompt: Cinematic dark futuristic digital studio with glowing cyan and neon violet data particles ascending, fast dynamic push-in camera towards screen, high shutter speed, photorealistic 8k, volumetric atmosphere --ar 9:16 --motion 7',
    aspectRatio: '9:16'
  },
  {
    id: 2,
    name: 'Scene 2: Tool Reveal',
    timeRange: [3, 6],
    title: 'Introducing Napkin AI & Text Input',
    hookText: 'MEET NAPKIN AI',
    subText: 'Paste any text, article or bullet points',
    voiceoverScript: 'Meet Napkin AI!',
    voiceoverHinglishAlt: 'Meet Napkin AI! Ek aisa secret tool jo sabko chahiye.',
    sfxDescription: 'Futuristic digital computer chirp, tactile mechanical keyboard click sequence, glowing UI hover sound.',
    cameraMovement: 'Smooth tracking shot angling down towards the sleek glass UI as text streams in.',
    visualDescription: 'Sleek dark mode glassmorphic web interface showing napkin.ai address bar, user cursor typing bullet points into a pristine document card.',
    videoPrompt: 'Runway Gen-3 / Kling Prompt: Over-the-shoulder tracking shot of a sleek glassmorphic software interface with dark theme, user typing a bulleted paragraph into the text editor, soft violet rim lighting on a dark desk, 8k resolution --ar 9:16',
    aspectRatio: '9:16'
  },
  {
    id: 3,
    name: 'Scene 3: The Magic Morph',
    timeRange: [6, 10],
    title: 'Text-to-Visuals Transformation (Hero Scene)',
    hookText: 'TEXT → VISUALS IN SECONDS',
    subText: 'Automatic flowchart and node generation',
    voiceoverScript: 'Turn your boring text into beautiful visuals in seconds!',
    voiceoverHinglishAlt: 'Bas apna boring text dalo, aur ye seconds me banata hai beautiful flowcharts!',
    sfxDescription: 'Deep energy charge, crystalline morphing sweep, multiple pleasant connection node clicks.',
    cameraMovement: 'Slow macro zoom into the transforming nodes with smooth organic parallax.',
    visualDescription: 'Hero visual: The text paragraph effortlessly dissolves into glowing cyan energetic beams that assemble into a structured, high-end flowchart and infographic diagram.',
    videoPrompt: 'Runway Gen-3 / Kling Prompt: Morphing transition where typed sentences dissolve into glowing cyan and electric purple energy lines, assembling into a clean modern corporate flowchart with glowing interconnected nodes, dark glass aesthetic, 8k --ar 9:16',
    aspectRatio: '9:16'
  },
  {
    id: 4,
    name: 'Scene 4: Target Audience Proof',
    timeRange: [10, 13],
    title: 'Finished Showcase & Target Audience',
    hookText: 'PERFECT FOR CREATORS & PROS',
    subText: 'FLOWCHARTS · INFOGRAPHICS · VISUAL IDEAS',
    voiceoverScript: 'Perfect for students, creators and professionals!',
    voiceoverHinglishAlt: 'Students, creators aur professionals ke liye absolute game changer!',
    sfxDescription: 'Triple ascending pop chimes (10.2s, 11.1s, 12.0s) as badges pop onto the screen, subtle metallic swish.',
    cameraMovement: 'Cinematic 3D orbit around a modern titanium laptop resting on a minimalist desk.',
    visualDescription: 'Crisp finish diagram displayed on a modern laptop screen with 3 floating glass tags popping up: FLOWCHARTS, INFOGRAPHICS, and VISUAL IDEAS.',
    videoPrompt: 'Runway Gen-3 / Kling Prompt: Cinematic close-up pan across a dark titanium laptop screen showing an intricate illuminated mind map, studio depth of field, neon violet ambient accents, commercial agency grade --ar 9:16',
    aspectRatio: '9:16'
  },
  {
    id: 5,
    name: 'Scene 5: Call to Action',
    timeRange: [13, 15],
    title: 'Viral Follower Conversion Outro',
    hookText: 'FOLLOW FOR HIDDEN AI TOOLS 🚀',
    subText: '@anvora.smarter · Daily AI Secret Hacks',
    voiceoverScript: 'Follow for hidden AI tools!',
    voiceoverHinglishAlt: 'Aise aur hidden AI tools ke liye @anvora.smarter ko follow karo!',
    sfxDescription: 'Uplifting futuristic chime, celebratory sparkle, sub-bass outro echo.',
    cameraMovement: 'Gentle slow push-out with glowing radial pulse centered on the Follow button.',
    visualDescription: 'Dark futuristic backdrop with pulsing electric cyan ring, prominent Follow CTA button with glowing ambient light, safe-space for Instagram handle.',
    videoPrompt: 'Runway Gen-3 / Kling Prompt: Dark cosmic digital background with glowing violet and electric cyan energy rings expanding outward, high contrast typography, 8k advertisement finish --ar 9:16',
    aspectRatio: '9:16'
  }
];

export const PRODUCTION_IMAGES = {
  heroWorkspace: '/src/assets/images/napkin_workspace_hero_1794469198774.jpg',
  flowchartMorph: '/src/assets/images/napkin_diagram_flowchart_1794469199352.jpg',
  laptopShowcase: '/src/assets/images/napkin_laptop_showcase_1794469199458.jpg'
};

export const GROWTH_STRATEGY: GrowthStrategyData = {
  caption: `Boring diagrams banane me ghanto waste karte ho? 🤯 Stop right now!

Meet **Napkin AI** — an underrated AI tool that converts any raw text, paragraph, or messy notes into clean, professional infographics and flowcharts in literally 5 seconds.

Here is how it works:
1. Copy paste your article, research notes, or meeting points.
2. Napkin AI analyzes the structure automatically.
3. Pick from 10+ diagram styles (flowcharts, mindmaps, cycle graphs).
4. Download as high-res PNG/SVG or embed directly.

Perfect for students making presentation decks, startup founders pitching investors, and creators making viral carousel posts.

Save this Reel so you don't forget it later! 📌
Drop a "TOOL" in the comments and I'll DM you the link + 5 prompt templates.

Follow @anvora.smarter for the best undiscovered AI productivity tools every single day! 🚀`,
  hashtags: [
    '#NapkinAI',
    '#AITools',
    '#ArtificialIntelligence',
    '#ProductivityHacks',
    '#Infographics',
    '#Flowcharts',
    '#StudentHacks',
    '#TechReels',
    '#ViralAI',
    '#DesignTools',
    '#PresentationDesign',
    '#StudyWithMe'
  ],
  hookAlternatives: [
    'Stop making diagrams manually! This AI does it for you in 5 seconds 🤯',
    'The most underrated AI tool of 2026 that nobody is talking about...',
    'I just turned a 500-word essay into a flowchart with 1 click ⚡',
    'Teachers & Bosses hate this secret AI hack for instant presentations!'
  ],
  ctaStrategy: 'Comment "TOOL" for the direct link + prompt templates. Drives algorithmic engagement signals on Instagram within the first 30 minutes.',
  pinnedComment: '📌 Direct link to try Napkin AI is in our bio! Which diagram type do you make the most? (A: Flowcharts, B: Mindmaps, C: Infographics)?',
  recommendedAudio: 'Trending Synthwave / Cyberpunk Electronic Instrumental (120-128 BPM) with low mid-range to keep speech crisp.'
};

export const AUDIO_CUES = [
  { time: 0.0, label: '808 Sub-Drop & Impact Riser', freq: '45Hz - 120Hz', type: 'Bass Drop' },
  { time: 1.2, label: 'Speed Glitch Accent', freq: '2.4kHz', type: 'Glitch' },
  { time: 3.0, label: 'Digital UI Ping & Typing Chirp', freq: '1.8kHz', type: 'UI Click' },
  { time: 6.0, label: 'Crystalline Morph Energy Charge', freq: '800Hz - 4.5kHz', type: 'Magic Shimmer' },
  { time: 8.5, label: 'Node Snapping Clicks', freq: '3.2kHz', type: 'Tech Node' },
  { time: 10.2, label: 'Badge Pop 1: Flowcharts', freq: '900Hz', type: 'Crisp Pop' },
  { time: 11.1, label: 'Badge Pop 2: Infographics', freq: '1.2kHz', type: 'Crisp Pop' },
  { time: 12.0, label: 'Badge Pop 3: Visual Ideas', freq: '1.5kHz', type: 'Crisp Pop' },
  { time: 13.0, label: 'Uplifting Outro Chord & Follow Ping', freq: '440Hz - 2.8kHz', type: 'Success Chime' }
];

export const ASSEMBLY_GUIDELINES = {
  software: 'CapCut / Adobe Premiere Pro / After Effects',
  timelineSettings: '1080 x 1920 (9:16), 30.00 FPS, Rec.709, Square Pixels',
  safeMargins: {
    top: '220px (Profile and Audio bar clearance)',
    bottom: '280px (Captions and Account name zone)',
    right: '140px (Like, Comment, Share, Audio wheel clearance)',
    left: '60px (Margin buffer)'
  },
  typographyRules: {
    hookFont: 'Outfit Black / Montserrat ExtraBold (ALL CAPS for hook)',
    accentColor: '#00E5FF (Electric Cyan) & #A855F7 (Violet Glow)',
    bodyFont: 'Plus Jakarta Sans Bold (Title Case)',
    easingCurve: 'cubic-bezier(0.16, 1, 0.3, 1)'
  },
  audioMixing: {
    voiceoverLUFS: '-14 LUFS (Normalized, Crisp High-Pass at 80Hz)',
    musicBGM: '-22 dB (Sidechain ducked by 4dB when voiceover speaks)',
    sfxPushes: '-10 dB for 808 drop, -14 dB for UI clicks'
  }
};
