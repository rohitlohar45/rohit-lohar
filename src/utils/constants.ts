/** @notice Author's url */
export const OFFICIAL_AUTHOR_URL = 'https://rohit-lohar.vercel.app';

/** @notice Official Author Twitter */
export const OFFICIAL_PLATOFORM_TWITTER_URL = 'https://twitter.com/0xMalviya';


/** @notice Official Platform Twitter Image URL */
export const OFFICIAL_TWITTER_IMAGE_URL = `${OFFICIAL_AUTHOR_URL}/brandings/rohit-lohar-twitter.png`;

export const ROHIT_PORTFOLIO_V2_GITHUB_LINK =
  'https://github.com/rohitlohar45/rohit-lohar';

export const ROHIT_GITHUB_LINK = 'https://github.com/rohitlohar45';
export const ROHIT_REDDIT_LINK =
  'https://www.reddit.com/u/Lazy_Philosopher_69';
export const ROHIT_EMAIL_LINK = 'mailto:loharrohit45@gmail.com';
export const ROHIT_LINKEDIN_LINK = 'https://www.linkedin.com/in/rohitlohar';
export const ROHIT_TWITTER_LINK = 'https://twitter.com/0xMalviya';
export const ROHIT_DISCORD_LINK =
  'https://discordapp.com/users/905709524026032188';

export const GO_LINK = 'https://go.dev/';
export const TS_LINK = 'https://typescriptlang.org/';
export const SOL_LINK = 'https://soliditylang.org/';
export const JAVA_LINK = 'https://java.com/';
export const MONGO_LINK = 'https://mongodb.com/';
export const TAILWIND_LINK = 'https://tailwindcss.com/';
export const FRAMER_LINK = 'https://www.framer.com/motion/';
export const REACT_LINK = 'https://reactjs.org/';
export const NEXT_LINK = 'https://nextjs.org/';
export const SPRING_LINK = 'https://spring.io/';
export const HARDHAT_LINK = 'https://hardhat.org/';
export const NODE_LINK = 'https://nodejs.org/';
export const DOCKER_LINK = 'https://docker.com/';
export const JS_LINK = 'https://javascript.com/';
export const ETHEREUM_LINK = 'https://ethereum.org/en/';
export const OZ_LINK = 'https://www.openzeppelin.com/';
export const MOCHA_LINK = 'https://mochajs.org/';
export const POSTGRES_LINK = 'https://www.postgresql.org/';
export const AWS_LINK = 'https://aws.amazon.com/';
export const VERCEL_LINK = 'https://vercel.com/';
export const NETLIFY_LINK = 'https://www.netlify.com/';
export const DYNAMO_LINK = 'https://aws.amazon.com/dynamodb/';
export const VITE_LINK = 'https://vitejs.dev/';
export const POLYGON_LINK = 'https://polygon.technology/';
export const OL_LINK = 'https://openliberty.io/';
export const REDUX_LINK = 'https://redux.js.org/';
export const KOT_LINK = 'https://kotlinlang.org/';
export const XML_LINK =
  'https://developer.mozilla.org/en-US/docs/Web/XML/XML_introduction';
export const ANDROID_LINK = 'https://developer.android.com/';
export const FIRE_LINK = 'https://firebase.google.com/';
export const SWIFT_LINK = 'https://developer.apple.com/xcode/swiftui/';
export const MAC_LINK = 'https://support.apple.com/macos';
export const XCODE_LINK = 'https://developer.apple.com/xcode/';
export const FIGMA_LINK = 'https://www.figma.com/';

export const MAIN_RIGHT_SKILLS_LISTS: Technology[] = [
  
  {
    technology: 'TypeScript',
    value: 40,
    techLink: TS_LINK,
    shouldShake: false,
  },
  {
    technology: 'Solidity',
    value: 30,
    techLink: SOL_LINK,
    shouldShake: false,
  },
  {
    technology: 'Java',
    value: 50,
    techLink: JAVA_LINK,
    shouldShake: false,
  },
  {
    technology: 'MongoDB',
    value: 90,
    techLink: MONGO_LINK,
    shouldShake: false,
  },
  {
    technology: 'TailwindCSS',
    value: 70,
    techLink: TAILWIND_LINK,
    shouldShake: false,
  },
  {
    technology: 'vercel',
    techLink: VERCEL_LINK,
    shouldShake: false,
    value: 100,
  },
  {
    technology: 'Netlify',
    techLink: NETLIFY_LINK,
    shouldShake: false,
    value: 100
  },
 
];

export const MAIN_LEFT_SKILLS_LISTS: Technology[] = [
  {
    technology: 'Javascript',
    techLink: JS_LINK,
    value:90,
    shouldShake: false,
  },
  {
    technology: 'ReactJS',
    value: 90,
    techLink: REACT_LINK,
    shouldShake: false,
  },
  {
    technology: 'NextJS',
    value: 88,
    techLink: NEXT_LINK,
    shouldShake: false,
  },
  {
    technology: 'Hardhat',
    value: 52,
    techLink: HARDHAT_LINK,
    shouldShake: false,
  },
  {
    technology: 'NodeJS',
    value: 90,
    techLink: NODE_LINK,
    shouldShake: false,
  },
  {
    technology: 'Docker',
    value: 80,
    techLink: DOCKER_LINK,
    shouldShake: false,
  },
  {
    technology: 'Redux',
    techLink: REDUX_LINK,
    shouldShake: false,
    value: 60,
  },
];

export const MORE_SKILLS_LISTS: Technology[] = [
  
  
  
];

export const PROJECTS_LISTS: Project[] = [
  {
    id: 0,
    title: 'E-commerce',
    stacks: {
      FE: [
        {
          technology: 'ReactJS',
          techLink: REACT_LINK,
          shouldShake: false,
        },
        {
          technology: 'TailwindCSS',
          techLink: TAILWIND_LINK,
          shouldShake: false,
        },
        {
          technology: 'Redux',
          techLink: REDUX_LINK,
          shouldShake: false,
        },
      ],
      BC: [
        
      ],
      BE: [
        {
          technology: 'NodeJS',
          techLink: NODE_LINK,
          shouldShake: false,
        },
        {
          technology: 'MongoDB',
          techLink: MONGO_LINK,
          shouldShake: false,
        },
        {
          technology: 'Vercel',
          techLink: VERCEL_LINK,
          shouldShake: false,
        },

      ],
      Mobile: [],
    },
    description:
      'A Full Stack E-commerce platform built with ReactJS, TailwindCSS, Redux, NodeJS, MongoDB, Vercel. It is a fully functional e-commerce platform with features like cart, filtering, checkout, payment, etc.',
    repoLink: 'https://github.com/rohitlohar45/e-commerce-backend',
    liveLink: 'https://e-commerce-backend-zeta-six.vercel.app/',
    demoLink: '',
    thumbnail: 'e-commerce/E-commerce_adobe_express.svg',
    cssWrapper: 'e-commerce-full-stack',
    cssWrapperSm: 'e-commerce-full-stack-sm',
    cssDesc: 'e-commerce-full-stack-desc',
    cssBtn: 'e-commerce-full-stack-btn',
    cssUnderline: 'e-commerce-full-stack-underline',
  },
  {
    id: 1,
    title: 'Algorithm Visulaizer',
    stacks: {
      FE: [
        {
          technology: 'HTML5',
          techLink: XML_LINK,
          shouldShake: false,
        },
        {
          technology: 'CSS3',
          techLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
          shouldShake: false,
        },
        {
          technology: 'JavaScript',
          techLink: JS_LINK,
          shouldShake: false,
        },
      ],
      BC: [
      ],
      BE: [],
      Mobile: [],
    },

    description:
      'A web application that allows users to visualize the process of sorting algorithms such as Bubble Sort, Merge Sort, Quick Sort, and Selection Sort, and pathfinding algorithms such as Dijkstra’s Algorithm and A* Algorithm',
    repoLink: `${ROHIT_GITHUB_LINK}/algorithm-visulaizer`,
    liveLink: 'https://algorithm-visulaizer.vercel.app/',
    demoLink: ``,
    thumbnail: 'algorithm-visualizer/algorithm-viusalizer.svg',
    cssWrapper: 'algorithm-visualizer',
    cssWrapperSm: 'algorithm-visualizer-sm',
    cssDesc: 'algorithm-visualizer-desc',
    cssBtn: 'algorithm-visualizer-btn',
    cssUnderline: 'algorithm-visualizer-underline',
  },
  {
    id: 2,
    title: 'Coderigade',
    stacks: {
      FE: [
        {
          technology: 'ReactJS',
          techLink: REACT_LINK,
          shouldShake: false,
        },
        {
          technology: 'JavaScript',
          techLink: JS_LINK,
          shouldShake: false,
        },
      ],
      BC: [],
      BE: [
        {
          technology: 'NodeJS',
          techLink: NODE_LINK,
          shouldShake: false,
        },
        {
          technology: 'Socketio',
          techLink: '#',
          shouldShake: false,
        },
      ],
      Mobile: [],
    },
    description:
      'A real time code editor with live preview. It is built with ReactJS, NodeJS, Socketio. ',
    repoLink: `${ROHIT_GITHUB_LINK}/coderigade`,
    liveLink: 'https://coderigade.netlify.app/',
    demoLink: '',
    thumbnail: 'coderigade/coderigade.svg',
    cssWrapper: 'coderigade',
    cssWrapperSm: 'coderigade-sm',
    cssDesc: 'coderigade-desc',
    cssBtn: 'coderigade-btn',
    cssUnderline: 'coderigade-underline',
  },
  {
    id: 3,
    title: 'E-commerce using Context API',
    stacks: {
      FE: [
        {
          technology: 'ReactJS',
          techLink: REACT_LINK,
          shouldShake: false,
        }
      ],
      BC: [],
      BE: [
        
      ],
      Mobile: [],
    },
    description:
      'A ReactJs E-commerce application using Context API. It is a fully functional e-commerce platform with features like cart, filtering, checkout, etc.',
    repoLink: `${ROHIT_GITHUB_LINK}/e-commerce-context-api`,
    liveLink: 'https://e-commerce-context-api.vercel.app/',
    demoLink: '',
    thumbnail: 'e-commerce-context-api/e-commerce-context-api.svg',
    cssWrapper: 'e-commerce-context-api',
    cssWrapperSm: 'e-commerce-context-api-sm',
    cssDesc: 'e-commerce-context-api-desc',
    cssBtn: 'e-commerce-context-api-btn',
    cssUnderline: 'e-commerce-context-api-underline',
  },
];

export const SOCIAL_FOOTER = [
  {
    id: 0,
    title: 'Github',
    desc: "Most favorite place. I know it's not like a social media place but love pushing code to it daily. NERD!",
    link: ROHIT_GITHUB_LINK,
    bgClass: 'bg-github',
  },
  {
    id: 1,
    title: 'Reddit',
    desc: "Second favorite place. Just became a redditor for a year now but can't stop reading random posts.",
    link: ROHIT_REDDIT_LINK,
    bgClass: 'bg-reddit',
  },
  {
    id: 2,
    title: 'LinkedIn',
    desc: 'Professional social media. Been using it professionaly for 2 years. Connect with me!',
    link: ROHIT_LINKEDIN_LINK,
    bgClass: 'bg-linkedin',
  },
  {
    id: 3,
    title: 'Twitter',
    desc: 'Only up for the news. Well you know still follow me.',
    link: ROHIT_TWITTER_LINK,
    bgClass: 'bg-twitter',
  },
  {
    id: 4,
    title: 'Gmail',
    desc: 'Main communicating media. Shoot me an email!',
    link: ROHIT_EMAIL_LINK,
    bgClass: 'bg-gmail',
  },
  {
    id: 5,
    title: 'Discord',
    desc: "C'mon you just can't 'not' have a discord these days! No? nvm.",
    link: ROHIT_DISCORD_LINK,
    bgClass: 'bg-discord',
  },
];
