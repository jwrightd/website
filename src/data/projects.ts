import type { Project } from '@/types';

export const PROJECTS: Project[] = [
  {
    id: 'saynario',
    name: 'Saynario',
    category: 'Voice product',
    status: 'HackPrinceton Winner',
    summary: 'Voice-first language learning app that turns each completed conversation into a personalized next scenario.',
    overview:
      'Saynario is a voice-first language learning app built around live roleplay rather than static drills. Each conversation feeds the next one, so practice stays adaptive instead of resetting back to generic prompts.',
    problem:
      'Most language-learning tools make it easier to review vocabulary than to build comfort speaking spontaneously. The harder problem is turning live conversation into useful, personalized follow-up practice.',
    approach: [
      'Built a real-time roleplay loop across the React client, FastAPI backend, WebSockets, speech transcription, and text-to-speech output.',
      'Used Gemini-powered adaptive coaching so each finished conversation could generate the next personalized scenario.',
      'Deployed the system end to end so the product felt like a usable voice interface rather than a disconnected model demo.',
    ],
    technicalChallenge:
      'The core challenge was keeping speech capture, transcription, generation, and synthesis coordinated tightly enough that the experience still felt conversational.',
    result:
      'Won HackPrinceton 2026 Best Use of ElevenLabs and produced a working voice practice experience centered on real conversation instead of passive repetition.',
    techStack: ['React', 'FastAPI', 'WebSockets', 'Gemini', 'Claude', 'Whisper', 'ElevenLabs', 'DigitalOcean'],
    links: [
      { label: 'Devpost', href: 'https://devpost.com/software/saynario', kind: 'devpost' },
      { label: 'GitHub', href: 'https://github.com/jwrightd/Saynario', kind: 'github' },
      { label: 'Demo Video', href: 'https://www.youtube.com/watch?v=Je2w8DHKhnI', kind: 'demo' },
    ],
    media: [
      {
        src: '/projects/saynario-main.png',
        alt: 'Saynario conversation workspace',
        caption: 'Live practice flow with roleplay, transcript context, and the next adaptive scenario.',
      },
    ],
  },
  {
    id: 'mingl',
    name: 'MINGL',
    category: 'Research package',
    status: 'bioRxiv preprint',
    summary: 'Implemented a scverse-compatible Python package for probabilistic cell-type classification in multiplexed spatial proteomics.',
    overview:
      'MINGL is a research package for probabilistic cell-type classification in multiplexed tissue imaging. My contribution centered on implementing package tooling that fit into a real lab workflow rather than live only in notebooks.',
    problem:
      'Cell-type classification in multiplexed spatial proteomics often depends on manual gating or brittle heuristics, which makes uncertainty harder to represent and slows down research iteration.',
    approach: [
      'Implemented Gaussian Mixture Model-based classification for probabilistic annotation of cells in multiplexed imaging data.',
      'Published the package in a scverse-compatible format so it could slot into existing bioinformatics workflows.',
      'Added 13 tool functions and 13 plotting functions spanning gradient, border, and heterogeneity analyses.',
    ],
    technicalChallenge:
      'The technical challenge was turning statistically grounded modeling into reusable package tooling without sacrificing interpretability or downstream usability.',
    result:
      'Implemented and shipped MINGL as a usable research package, and contributed to the bioRxiv preprint as a named co-author.',
    techStack: ['Python', 'Gaussian Mixture Models', 'scverse', 'Spatial proteomics'],
    links: [
      { label: 'GitHub', href: 'https://github.com/HickeyLab/Mingl', kind: 'github' },
      { label: 'bioRxiv', href: 'https://www.biorxiv.org/content/10.64898/2026.03.24.713296v1', kind: 'paper' },
    ],
    media: [
      {
        src: '/projects/mingl-main.png',
        alt: 'MINGL spatial proteomics figure',
        caption: 'Probabilistic tissue analysis output from the MINGL package workflow.',
      },
    ],
  },
  {
    id: 'adni-ncde',
    name: 'ADNI Multimodal NCDE',
    category: 'Multimodal ML research',
    status: 'Ongoing research',
    summary: 'Longitudinal Alzheimer’s disease forecasting pipeline for predicting next-visit ADAS13 scores.',
    overview:
      'This project models Alzheimer’s progression as a multimodal longitudinal prediction problem, combining clinical history with MRI-derived trajectory features.',
    problem:
      'ADNI data is irregular across visits and spread across modalities, which makes it difficult to model next-visit outcomes faithfully with simple fixed-step sequence assumptions.',
    approach: [
      'Extracted 3D MRI trajectory features across visits to preserve structural information over time.',
      'Modeled irregular patient histories with Neural Controlled Differential Equations instead of flattening them into fixed-step sequences.',
      'Built the pipeline around repeated experimentation for multimodal disease forecasting.',
    ],
    technicalChallenge:
      'The hardest part was keeping the representation faithful to irregular longitudinal structure while still making the training pipeline practical enough for repeated research iteration.',
    result:
      'The result is an end-to-end forecasting pipeline aimed at improving next-visit ADAS13 prediction using both longitudinal clinical context and MRI-derived features.',
    techStack: ['PyTorch', 'torchcde', 'pandas', 'MRI', 'ADNI'],
    links: [{ label: 'GitHub', href: 'https://github.com/AshCher51/multimodal-ncde', kind: 'github' }],
    media: [
      {
        src: '/projects/adni-main.png',
        alt: 'ADNI Multimodal NCDE workflow',
        caption: 'Modeling pipeline for longitudinal clinical data and MRI-derived features.',
      },
    ],
  },
  {
    id: 'chessvision',
    name: 'ChessVision',
    category: 'Computer vision system',
    status: 'Prototype',
    summary: 'Real-time over-the-board chess digitizer with 90%+ move detection accuracy across arbitrary board angles.',
    overview:
      'ChessVision captures physical chess games and converts them into a live digital record. The system links camera perception with chess-specific state tracking so real games can be logged in real time.',
    problem:
      'Over-the-board chess is difficult to digitize reliably because board angles, lighting, and piece occlusion all destabilize frame-level detection.',
    approach: [
      'Trained a YOLOv11 model on Roboflow-annotated chess piece images for piece detection.',
      'Used OpenCV for live board localization before mapping detections into game-state updates.',
      'Built the system as part of TJHSST senior research with the goal of real-time recording rather than offline analysis.',
    ],
    technicalChallenge:
      'The technical challenge was making board interpretation stable enough across arbitrary camera angles that move detection stayed reliable over time.',
    result:
      'Reached 90%+ move detection accuracy across arbitrary board angles and turned live games into structured digital records.',
    techStack: ['Python', 'Roboflow', 'OpenCV', 'YOLOv11', 'Tkinter'],
    links: [{ label: 'GitHub', href: 'https://github.com/Aarushvinod/ChessVision', kind: 'github' }],
    media: [
      {
        src: '/projects/chessvision-main.png',
        alt: 'ChessVision board digitization view',
        caption: 'Board localization and live move capture for physical chess games.',
      },
    ],
  },
  {
    id: 'datacrawl',
    name: 'DataCrawl',
    category: 'Data infrastructure',
    status: 'Pipeline tooling',
    summary: 'Prompt-to-dataset pipeline for turning plain-English financial requests into validated structured files.',
    overview:
      'DataCrawl automates financial dataset acquisition from plain-English requests. Instead of starting with brittle one-off scripts, it treats acquisition as an orchestrated pipeline from prompt to validated file output.',
    problem:
      'Useful financial data often lives behind inconsistent source structures, so manual collection does not scale and shallow crawlers fail quickly once validation matters.',
    approach: [
      'Built a Gemini orchestrator coordinating 5+ subagents for crawling, normalization, and validation.',
      'Connected LangGraph and FastAPI so the pipeline could move from prompt to schema-accurate output files.',
      'Designed the flow around repeatable execution rather than one-off scraping sessions.',
    ],
    technicalChallenge:
      'The hardest part was making the pipeline durable enough to maintain schema accuracy while coordinating multiple specialized crawling and validation steps.',
    result:
      'Won a HackDuke 2026 award and demonstrated full pipeline execution from a plain-English request to validated output files.',
    techStack: ['Python', 'TypeScript', 'React', 'FastAPI', 'LangGraph', 'Firebase', 'Gemini', 'Auth0', 'Stripe', 'Solana'],
    links: [{ label: 'GitHub', href: 'https://github.com/Aarushvinod/DataCrawl', kind: 'github' }],
    media: [
      {
        src: '/projects/datacrawl-main.png',
        alt: 'DataCrawl orchestration interface',
        caption: 'From user prompt to crawling, normalization, validation, and structured output.',
      },
    ],
  },
  {
    id: 'co2ldown',
    name: 'CO2Ldown',
    category: 'Website + Chrome extension',
    status: 'Sustainability tooling',
    summary:
      'Joint website and Chrome extension that surfaces per-action carbon estimates across browsing sessions.',
    overview:
      'CO2Ldown is a web product plus browser extension built to help users understand and reduce the carbon footprint of everyday browsing behavior.',
    problem:
      'Carbon impact is usually invisible during normal browsing, so users rarely get concrete feedback that can shape lower-emission habits.',
    approach: [
      'Built a joint website and Chrome extension instead of treating sustainability feedback as a one-surface experience.',
      'Used an LLM-powered pipeline with Gemini function calling and prompt optimization to generate useful carbon estimates.',
      'Added Firebase auth and storage for personalized emissions tracking across browsing sessions.',
    ],
    technicalChallenge:
      'The core challenge was keeping the website, extension, and estimation pipeline aligned closely enough that carbon feedback stayed personalized and usable across sessions.',
    result:
      'Reduced user carbon footprints by surfacing per-action carbon estimates across browsing sessions.',
    techStack: ['React.js', 'Python', 'HTML', 'CSS', 'Firebase', 'FastAPI', 'NumPy', 'Crawl4AI', 'Gemini'],
    links: [{ label: 'GitHub', href: 'https://github.com/Aarushvinod/CarbonWise', kind: 'github' }],
    media: [],
  },
  {
    id: 'chessengine',
    name: 'Chess Engine Development',
    category: 'Chess engine',
    status: 'Lichess deployment',
    summary:
      'Self-built chess engines in Python and C++ that reached an estimated 1500 Elo rating on Lichess.org.',
    overview:
      'This project focused on building chess engines from scratch in both Python and C++ and deploying them for live play on Lichess.org.',
    problem:
      'The goal was to turn core classical engine techniques into a self-built system strong enough to compete credibly in live online games.',
    approach: [
      'Implemented iterative deepening to improve move quality under practical time constraints.',
      'Built minimax search with alpha-beta pruning to explore candidate lines efficiently.',
      'Added piece tables and quiescence search to improve evaluation quality and tactical stability.',
    ],
    technicalChallenge:
      'The hardest part was balancing search depth, pruning, and evaluation so the engine stayed both efficient and strong in live play.',
    result:
      'Achieved an estimated 1500 Elo rating on Lichess.org with self-built engines deployed in both Python and C++.',
    techStack: ['Python', 'C++', 'Minimax', 'Alpha-Beta Pruning', 'Lichess.org'],
    links: [{ label: 'GitHub', href: 'https://github.com/jwrightd/chessengine', kind: 'github' }],
    media: [],
  },
];
