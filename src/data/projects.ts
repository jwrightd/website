import type { Project } from '@/types';

export const PROJECTS: Project[] = [
  {
    id: 'saynario',
    name: 'Saynario',
    category: 'Voice product',
    status: 'HackPrinceton Winner',
    outcome: 'Won HackPrinceton Best Use of ElevenLabs with a shipped voice roleplay loop.',
    proof: 'Winner · live voice product',
    proofTone: 'winner',
    badges: ['Winner', 'Systems'],
    featured: true,
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
        type: 'image',
      },
    ],
  },
  {
    id: 'mingl',
    name: 'MINGL',
    category: 'Research package',
    status: 'bioRxiv preprint',
    outcome: 'Implemented a scverse-compatible research package and contributed as a named bioRxiv co-author.',
    proof: 'Published · named co-author',
    proofTone: 'published',
    badges: ['Published', 'Research'],
    featured: true,
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
    myContribution:
      'Implemented the scverse-compatible package: GMM classification, 13 tool functions, 13 plotting functions, and lab workflow integration.',
    links: [
      { label: 'Lab repo (HickeyLab)', href: 'https://github.com/HickeyLab/Mingl', kind: 'github' },
      { label: 'bioRxiv', href: 'https://www.biorxiv.org/content/10.64898/2026.03.24.713296v1', kind: 'paper' },
    ],
    media: [
      {
        src: '/projects/mingl-main.png',
        alt: 'MINGL spatial proteomics figure',
        caption: 'Probabilistic tissue analysis output from the MINGL package workflow.',
        type: 'image',
      },
    ],
  },
  {
    id: 'adni-ncde',
    name: 'ADNI Multimodal NCDE',
    category: 'Multimodal ML research',
    status: 'Ongoing research',
    outcome: 'Built a Neural CDE pipeline for next-visit ADAS-13 forecasting on irregular ADNI longitudinal data.',
    proof: 'Val MAE ~7 · Neural CDE',
    proofTone: 'research',
    badges: ['Research'],
    featured: true,
    summary: 'Longitudinal Alzheimer’s disease forecasting pipeline for predicting next-visit ADAS-13 scores.',
    overview:
      'This project models Alzheimer’s progression as a multimodal longitudinal prediction problem, combining clinical history with MRI-derived trajectory features on AWS-backed ADNI data.',
    problem:
      'ADNI data is irregular across visits and spread across modalities, which makes it difficult to model next-visit outcomes faithfully with simple fixed-step sequence assumptions.',
    approach: [
      'Built an AWS S3/EC2 data backbone for ADNI MPRAGE sequences, PET scans, and clinical features (age, gender, genetics).',
      'Extracted voxel-level MRI trajectories via flow matching and LoRA-finetuned point tracking before feeding irregular visit histories into a Neural CDE.',
      'Benchmarked trajectory-only models against tabular baselines with ADNIMERGE MMSE features to isolate what drives forecasting gains.',
    ],
    technicalChallenge:
      'The hardest part was keeping the representation faithful to irregular longitudinal structure while still making the training pipeline practical enough for repeated research iteration.',
    result:
      'Trajectory-only Neural CDE models reached validation MAE of ~13–16 on next-visit ADAS-13 over 100 epochs. Adding ADNIMERGE tabular features (MMSE) cut error to ~7 MAE — the best-performing configuration in current benchmarking.',
    techStack: ['PyTorch', 'torchcde', 'pandas', 'AWS S3', 'MRI', 'ADNI'],
    myContribution:
      'AWS data backbone, MRI trajectory feature pipeline, Neural CDE benchmarking, and ADNIMERGE MMSE ablation experiments.',
    links: [{ label: 'Team repo (collaborative)', href: 'https://github.com/AshCher51/multimodal-ncde', kind: 'github' }],
    media: [
      {
        src: '/projects/adni-architecture.png',
        alt: 'ADNI multimodal Neural CDE system architecture',
        caption: 'Data backbone and Neural CDE pipeline from MRI trajectories and clinical features to ADAS-13 forecasts.',
        type: 'image',
      },
      {
        src: '/projects/adni-metrics.png',
        alt: 'ADNI model training and validation metrics',
        caption: 'Train MSE and validation MAE/RMSE over 100 epochs; tabular MMSE features cut Val MAE to ~7.',
        type: 'image',
      },
    ],
  },
  {
    id: 'chessvision',
    name: 'ChessVision',
    category: 'Computer vision system',
    status: 'Prototype',
    outcome: 'Reached 90%+ move detection accuracy for real-time over-the-board chess digitization.',
    proof: '90%+ CV accuracy',
    proofTone: 'vision',
    badges: ['Computer Vision', 'Research'],
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
    myContribution:
      'YOLOv11 training pipeline, OpenCV board localization, and real-time game-state integration for TJHSST senior research.',
    links: [{ label: 'Team repo (hackathon)', href: 'https://github.com/Aarushvinod/ChessVision', kind: 'github' }],
    media: [
      {
        src: '/projects/chessvision-main.png',
        alt: 'ChessVision board digitization view',
        caption: 'Board localization and live move capture for physical chess games.',
        type: 'image',
      },
    ],
  },
  {
    id: 'datacrawl',
    name: 'DataCrawl',
    category: 'Data infrastructure',
    status: 'HackDuke Best Use of Solana',
    outcome: 'Won HackDuke Code for Good 2026 Best Use of Solana with a prompt-to-dataset agent pipeline for validated financial data acquisition.',
    proof: 'Best Use of Solana',
    proofTone: 'winner',
    badges: ['Winner', 'Data Pipeline', 'Systems'],
    featured: true,
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
      'Won HackDuke Code for Good 2026 Best Use of Solana with full pipeline execution from a plain-English request to validated output files.',
    techStack: ['Python', 'TypeScript', 'React', 'FastAPI', 'LangGraph', 'Firebase', 'Gemini'],
    myContribution:
      'Gemini orchestrator design, LangGraph/FastAPI pipeline wiring, and validation subagent coordination.',
    links: [{ label: 'Team repo (hackathon)', href: 'https://github.com/Aarushvinod/DataCrawl', kind: 'github' }],
    media: [
      {
        src: '/projects/datacrawl-main.png',
        alt: 'DataCrawl orchestration interface',
        caption: 'From user prompt to crawling, normalization, validation, and structured output.',
        type: 'image',
      },
    ],
  },
  {
    id: 'co2ldown',
    name: 'CO2Ldown',
    category: 'Website + Chrome extension',
    status: 'Sustainability tooling',
    outcome: 'Built a browser-extension and web workflow for per-action carbon estimates across sessions.',
    proof: 'Extension · emissions tracking',
    proofTone: 'sustainability',
    badges: ['Sustainability', 'Systems'],
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
    myContribution:
      'Gemini function-calling estimation pipeline, Firebase auth/storage, and Chrome extension integration.',
    links: [{ label: 'Team repo (hackathon)', href: 'https://github.com/Aarushvinod/CarbonWise', kind: 'github' }],
    media: [
      {
        src: '/projects/co2ldown-main.png',
        alt: 'CO2Ldown carbon score dashboard',
        caption: 'Per-action carbon tracking with personalized sustainability insights.',
        type: 'image',
      },
    ],
  },
  {
    id: 'fake-news-detection',
    name: 'Fake News Detection',
    category: 'NLP classifier',
    status: 'Course project',
    outcome: 'Compared classical embeddings against BERT fine-tuning on WELFake — 99.5% test accuracy on a known-separable benchmark.',
    proof: 'BERT vs. classical · WELFake',
    proofTone: 'research',
    badges: ['Research'],
    featured: true,
    summary:
      'End-to-end NLP pipeline for classifying fake vs. real news articles, comparing classical embeddings with transformer fine-tuning.',
    overview:
      'Group NLP project built around the WELFake dataset (~72K labeled articles). The work compared classical feature pipelines against a fine-tuned BERT classifier for fake-news detection.',
    problem:
      'Fake news spreads quickly on social platforms, but reliable detection needs models that generalize beyond simple keyword heuristics on noisy article text.',
    approach: [
      'Built a preprocessing pipeline with lemmatization, stopword handling, and stratified train/test splits on WELFake.',
      'Compared TF-IDF, Doc2Vec, Word2Vec, and Sentence2Vec embeddings with logistic regression, random forest, XGBoost, and k-NN baselines.',
      'Fine-tuned BERT on cleaned article text and evaluated against the classical embedding baselines.',
    ],
    technicalChallenge:
      'The core challenge was turning a large, noisy text corpus into reproducible preprocessing and evaluation so transformer gains were measurable against simpler baselines.',
    result:
      'Achieved 99.5% accuracy with fine-tuned BERT on WELFake — outperforming the classical embedding pipelines built earlier in the project.',
    techStack: ['Python', 'BERT', 'scikit-learn', 'Gensim', 'NLTK', 'pandas'],
    myContribution:
      'BERT fine-tuning, preprocessing/lemmatization workflow, and benchmark evaluation against classical embedding baselines.',
    links: [{ label: 'Team repo (course)', href: 'https://github.com/8301Joseph/FakeNewsDetection', kind: 'github' }],
    media: [],
  },
  {
    id: 'chessengine',
    name: 'Chess Engine Development',
    category: 'Chess engine',
    status: 'Lichess deployment',
    outcome: 'Deployed self-built Python and C++ engines that reached an estimated 1500 Elo on Lichess.',
    proof: '~1500 Elo · C++/Python',
    proofTone: 'engine',
    badges: ['Chess Engine', 'Systems'],
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
