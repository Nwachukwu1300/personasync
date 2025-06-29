const mockUsers = [
  // Creative Owl Users (3)
  {
    id: 1,
    name: "Lena Rivers",
    email: "lena.rivers@email.com",
    xp: 87,
    personalityType: "Creative Owl",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Lena",
    bio: "A poetic mind always chasing the next artistic inspiration.",
    joinedAt: "2025-01-15",
    region: "London, UK"
  },
  {
    id: 2,
    name: "Marcus Chen",
    email: "marcus.chen@gmail.com",
    xp: 92,
    personalityType: "Creative Owl",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Marcus",
    bio: "Dreamer and storyteller who finds beauty in everyday moments.",
    joinedAt: "2025-01-08",
    region: "London, UK"
  },
  {
    id: 3,
    name: "Isabella Moreau",
    email: "bella.moreau@outlook.com",
    xp: 73,
    personalityType: "Creative Owl",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Isabella",
    bio: "Imaginative soul who paints with words and colors alike.",
    joinedAt: "2025-01-22",
    region: "Paris, France"
  },

  // Tech Enthusiast Users (4)
  {
    id: 4,
    name: "Zara Ahmed",
    email: "zara.ahmed@proton.me",
    xp: 94,
    personalityType: "Tech Enthusiast",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Zara",
    bio: "Coding wizard who builds the future one algorithm at a time.",
    joinedAt: "2025-01-11",
    region: "Dubai, UAE"
  },
  {
    id: 5,
    name: "Alex Rodriguez",
    email: "alex.r@techcorp.com",
    xp: 88,
    personalityType: "Tech Enthusiast",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Alex",
    bio: "Digital native who transforms ideas into innovative tech solutions.",
    joinedAt: "2025-01-13",
    region: "Birmingham, UK"
  },
  {
    id: 6,
    name: "Yuki Tanaka",
    email: "yuki.tanaka@dev.jp",
    xp: 91,
    personalityType: "Tech Enthusiast",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Yuki",
    bio: "Gaming developer who lives at the intersection of code and creativity.",
    joinedAt: "2025-01-09",
    region: "Tokyo, Japan"
  },
  {
    id: 7,
    name: "Ryan Kumar",
    email: "ryan.kumar@startup.dev",
    xp: 85,
    personalityType: "Tech Enthusiast",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Ryan",
    bio: "AI enthusiast who sees machine learning as the key to everything.",
    joinedAt: "2025-01-16",
    region: "Bangalore, India"
  },

  // Nature Connector Users (4)
  {
    id: 8,
    name: "Oliver Westwood",
    email: "oliver.w@icloud.com",
    xp: 81,
    personalityType: "Nature Connector",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Oliver",
    bio: "Thoughtful soul who finds inspiration in nature's patterns.",
    joinedAt: "2025-01-19",
    region: "Melbourne, Australia"
  },
  {
    id: 9,
    name: "Luna Garcia",
    email: "luna.garcia@earth.org",
    xp: 76,
    personalityType: "Nature Connector",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Luna",
    bio: "Environmental advocate who believes in the healing power of nature.",
    joinedAt: "2025-01-20",
    region: "Costa Rica"
  },
  {
    id: 10,
    name: "Finn O'Connor",
    email: "finn.oconnor@outdoor.ie",
    xp: 72,
    personalityType: "Nature Connector",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Finn",
    bio: "Adventure photographer who captures the wild beauty of our planet.",
    joinedAt: "2025-01-14",
    region: "Dublin, Ireland"
  },
  {
    id: 11,
    name: "Sierra Johnson",
    email: "sierra.j@trails.com",
    xp: 79,
    personalityType: "Nature Connector",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Sierra",
    bio: "Hiking enthusiast who finds peace in mountain trails and forest paths.",
    joinedAt: "2025-01-12",
    region: "Colorado, USA"
  },

  // Chill Explorer Users (3)
  {
    id: 12,
    name: "Maya Patel",
    email: "maya.patel@yahoo.com",
    xp: 64,
    personalityType: "Chill Explorer",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Maya",
    bio: "Laid-back wanderer who discovers magic in unexpected places.",
    joinedAt: "2025-01-14",
    region: "Mumbai, India"
  },
  {
    id: 13,
    name: "Jake Morrison",
    email: "jake.m.explorer@gmail.com",
    xp: 55,
    personalityType: "Chill Explorer",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Jake",
    bio: "Easy-going adventurer who takes life one curious step at a time.",
    joinedAt: "2025-01-17",
    region: "Vancouver, Canada"
  },
  {
    id: 14,
    name: "Sofia Lindberg",
    email: "sofia.lindberg@hotmail.com",
    xp: 76,
    personalityType: "Chill Explorer",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Sofia",
    bio: "Calm observer who finds wonder in life's simple pleasures.",
    joinedAt: "2025-01-09",
    region: "Stockholm, Sweden"
  },

  // Bold Visionary Users (3)
  {
    id: 15,
    name: "Victoria Sterling",
    email: "v.sterling@business.com",
    xp: 95,
    personalityType: "Bold Visionary",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Victoria",
    bio: "Ambitious leader who turns impossible dreams into concrete realities.",
    joinedAt: "2025-01-05",
    region: "New York, USA"
  },
  {
    id: 16,
    name: "Alexander Petrov",
    email: "alex.petrov@startup.io",
    xp: 88,
    personalityType: "Bold Visionary",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Alexander",
    bio: "Future-focused innovator who sees opportunities where others see obstacles.",
    joinedAt: "2025-01-07",
    region: "Moscow, Russia"
  },
  {
    id: 17,
    name: "Priya Sharma",
    email: "priya.sharma@tech.com",
    xp: 91,
    personalityType: "Bold Visionary",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Priya",
    bio: "Driven entrepreneur who builds tomorrow's solutions today.",
    joinedAt: "2025-01-10",
    region: "Bangalore, India"
  },

  // Focused Strategist Users (3)
  {
    id: 18,
    name: "David Kim",
    email: "david.kim@consulting.com",
    xp: 89,
    personalityType: "Focused Strategist",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=David",
    bio: "Analytical mind who solves complex problems through systematic thinking.",
    joinedAt: "2025-01-13",
    region: "Seoul, South Korea"
  },
  {
    id: 19,
    name: "Emma Thompson",
    email: "emma.thompson@analytics.co",
    xp: 86,
    personalityType: "Focused Strategist",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Emma",
    bio: "Detail-oriented planner who turns data into actionable strategies.",
    joinedAt: "2025-01-18",
    region: "Edinburgh, UK"
  },
  {
    id: 20,
    name: "Michael Weber",
    email: "m.weber@strategy.de",
    xp: 93,
    personalityType: "Focused Strategist",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Michael",
    bio: "Logical thinker who excels at breaking down complexity into clear steps.",
    joinedAt: "2025-01-04",
    region: "Berlin, Germany"
  },

  // Social Spark Users (3)
  {
    id: 21,
    name: "Luna Rodriguez",
    email: "luna.rodriguez@social.com",
    xp: 71,
    personalityType: "Social Spark",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=LunaR",
    bio: "Energetic connector who brings people together through shared passions.",
    joinedAt: "2025-01-24",
    region: "Mexico City, Mexico"
  },
  {
    id: 22,
    name: "James Wilson",
    email: "james.wilson@community.org",
    xp: 65,
    personalityType: "Social Spark",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=James",
    bio: "People-focused leader who ignites collaboration and team spirit.",
    joinedAt: "2025-01-03",
    region: "Chicago, USA"
  },
  {
    id: 23,
    name: "Chloe Dubois",
    email: "chloe.dubois@network.fr",
    xp: 79,
    personalityType: "Social Spark",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Chloe",
    bio: "Expressive communicator who builds bridges between diverse communities.",
    joinedAt: "2025-01-25",
    region: "Lyon, France"
  },

  // Collaborative Spirit Users (4)
  {
    id: 24,
    name: "Hassan Omar",
    email: "hassan.omar@connect.com",
    xp: 67,
    personalityType: "Collaborative Spirit",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Hassan",
    bio: "Dynamic facilitator who creates inclusive spaces for meaningful connections.",
    joinedAt: "2025-01-02",
    region: "Cairo, Egypt"
  },
  {
    id: 25,
    name: "Natasha Volkov",
    email: "natasha.volkov@engage.com",
    xp: 74,
    personalityType: "Collaborative Spirit",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Natasha",
    bio: "Enthusiastic networker who transforms individual ideas into collective action.",
    joinedAt: "2025-01-01",
    region: "Prague, Czech Republic"
  },
  {
    id: 26,
    name: "Aiden Murphy",
    email: "aiden.murphy@team.ie",
    xp: 83,
    personalityType: "Collaborative Spirit",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Aiden",
    bio: "Team builder who believes the best ideas come from diverse perspectives.",
    joinedAt: "2025-01-21",
    region: "Dublin, Ireland"
  },
  {
    id: 27,
    name: "Maya Chen",
    email: "maya.chen@together.com",
    xp: 70,
    personalityType: "Collaborative Spirit",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=MayaC",
    bio: "Community organizer who turns strangers into lifelong collaborators.",
    joinedAt: "2025-01-23",
    region: "Toronto, Canada"
  },

  // Additional users for better distribution (3)
  {
    id: 28,
    name: "Diego Santos",
    email: "diego.santos@email.com",
    xp: 42,
    personalityType: "Chill Explorer",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Diego",
    bio: "Relaxed explorer who believes the journey matters more than the destination.",
    joinedAt: "2025-01-21",
    region: "São Paulo, Brazil"
  },
  {
    id: 29,
    name: "Ethan Brooks",
    email: "ethan.brooks@venture.com",
    xp: 84,
    personalityType: "Bold Visionary",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Ethan",
    bio: "Bold strategist who transforms ambitious visions into market disruptions.",
    joinedAt: "2025-01-16",
    region: "Austin, USA"
  },
  {
    id: 30,
    name: "Kai Nakamura",
    email: "kai.nakamura@gmail.com",
    xp: 59,
    personalityType: "Chill Explorer",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Kai",
    bio: "Peaceful wanderer who approaches new experiences with gentle curiosity.",
    joinedAt: "2025-01-12",
    region: "Tokyo, Japan"
  },

  // Additional Creative Owl Users (4)
  {
    id: 31,
    name: "Aria Foster",
    email: "aria.foster@design.com",
    xp: 75,
    personalityType: "Creative Owl",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Aria",
    bio: "Visual storyteller who crafts compelling narratives through design.",
    joinedAt: "2025-01-07",
    region: "Los Angeles, USA"
  },
  {
    id: 32,
    name: "Theo Larsson",
    email: "theo.larsson@art.se",
    xp: 82,
    personalityType: "Creative Owl",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Theo",
    bio: "Experimental artist who pushes boundaries through mixed media creations.",
    joinedAt: "2025-01-04",
    region: "Gothenburg, Sweden"
  },
  {
    id: 33,
    name: "Camila Reyes",
    email: "camila.reyes@studio.mx",
    xp: 69,
    personalityType: "Creative Owl",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Camila",
    bio: "Imaginative sculptor who finds inspiration in cultural heritage.",
    joinedAt: "2025-01-18",
    region: "Mexico City, Mexico"
  },
  {
    id: 34,
    name: "Nolan Harper",
    email: "nolan.harper@creative.au",
    xp: 78,
    personalityType: "Creative Owl",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Nolan",
    bio: "Reflective musician who composes melodies that touch the soul.",
    joinedAt: "2025-01-11",
    region: "Sydney, Australia"
  },

  // Additional Tech Enthusiast Users (4)
  {
    id: 35,
    name: "Mmesoma",
    email: "nova.singh@quantum.com",
    xp: 96,
    personalityType: "Tech Enthusiast",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Nova",
    bio: "Quantum computing researcher pioneering the next generation of technology.",
    joinedAt: "2025-01-03",
    region: "London, UK"
  },
  {
    id: 36,
    name: "Felix Wagner",
    email: "felix.wagner@blockchain.de",
    xp: 89,
    personalityType: "Tech Enthusiast",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Felix",
    bio: "Blockchain architect building decentralized solutions for tomorrow.",
    joinedAt: "2025-01-14",
    region: "Munich, Germany"
  },
  {
    id: 37,
    name: "Zoe Martinez",
    email: "zoe.martinez@robotics.com",
    xp: 87,
    personalityType: "Tech Enthusiast",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Zoe",
    bio: "Robotics engineer creating AI companions for a better world.",
    joinedAt: "2025-01-08",
    region: "Barcelona, Spain"
  },
  {
    id: 38,
    name: "Ravi Patel",
    email: "ravi.patel@cybersec.in",
    xp: 92,
    personalityType: "Tech Enthusiast",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Ravi",
    bio: "Cybersecurity expert protecting digital futures from emerging threats.",
    joinedAt: "2025-01-06",
    region: "Hyderabad, India"
  },

  // Additional Nature Connector Users (3)
  {
    id: 39,
    name: "River Stone",
    email: "river.stone@wilderness.com",
    xp: 74,
    personalityType: "Nature Connector",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=River",
    bio: "Wildlife photographer capturing the untamed beauty of remote landscapes.",
    joinedAt: "2025-01-17",
    region: "Alaska, USA"
  },
  {
    id: 40,
    name: "Sage Thompson",
    email: "sage.thompson@conservation.org",
    xp: 80,
    personalityType: "Nature Connector",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Sage",
    bio: "Marine biologist dedicated to protecting ocean ecosystems.",
    joinedAt: "2025-01-10",
    region: "Cairns, Australia"
  },
  {
    id: 41,
    name: "Atlas Johansson",
    email: "atlas.johansson@nordic.no",
    xp: 77,
    personalityType: "Nature Connector",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Atlas",
    bio: "Arctic explorer documenting climate change through field research.",
    joinedAt: "2025-01-05",
    region: "Bergen, Norway"
  },

  // Additional Chill Explorer Users (3)
  {
    id: 42,
    name: "Indigo Lee",
    email: "indigo.lee@journey.com",
    xp: 63,
    personalityType: "Chill Explorer",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Indigo",
    bio: "Mindful traveler who discovers wisdom in every new culture.",
    joinedAt: "2025-01-19",
    region: "Bali, Indonesia"
  },
  {
    id: 43,
    name: "Phoenix Carter",
    email: "phoenix.carter@nomad.us",
    xp: 58,
    personalityType: "Chill Explorer",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Phoenix",
    bio: "Digital nomad who finds inspiration in slow travel and local connections.",
    joinedAt: "2025-01-22",
    region: "Portland, USA"
  },
  {
    id: 44,
    name: "Zen Morales",
    email: "zen.morales@peaceful.ph",
    xp: 51,
    personalityType: "Chill Explorer",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Zen",
    bio: "Meditation teacher who explores inner landscapes through quiet adventure.",
    joinedAt: "2025-01-15",
    region: "Palawan, Philippines"
  },

  // Additional Bold Visionary Users (4)
  {
    id: 45,
    name: "Tobi Salaw",
    email: "tobi.salami@disrupt.com",
    xp: 150,
    personalityType: "Bold Visionary",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Storm",
    bio: "Serial entrepreneur revolutionizing industries through fearless innovation.",
    joinedAt: "2025-01-02",
    region: "London, UK"
  },
  {
    id: 46,
    name: "Valentina Rossi",
    email: "valentina.rossi@empire.it",
    xp: 90,
    personalityType: "Bold Visionary",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Valentina",
    bio: "Fashion mogul transforming sustainable luxury into mainstream reality.",
    joinedAt: "2025-01-09",
    region: "Milan, Italy"
  },
  {
    id: 47,
    name: "Maximilian Cross",
    email: "max.cross@venture.uk",
    xp: 93,
    personalityType: "Bold Visionary",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Maximilian",
    bio: "Investment strategist who identifies tomorrow's unicorns today.",
    joinedAt: "2025-01-12",
    region: "London, UK"
  },
  {
    id: 48,
    name: "Catalyst Wong",
    email: "catalyst.wong@future.hk",
    xp: 95,
    personalityType: "Bold Visionary",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Catalyst",
    bio: "Biotech visionary engineering solutions for humanity's greatest challenges.",
    joinedAt: "2025-01-01",
    region: "Hong Kong"
  },

  // Additional Focused Strategist Users (4)
  {
    id: 49,
    name: "Logic Chen",
    email: "logic.chen@systems.tw",
    xp: 91,
    personalityType: "Focused Strategist",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Logic",
    bio: "Operations researcher who optimizes complex systems through data science.",
    joinedAt: "2025-01-13",
    region: "Taipei, Taiwan"
  },
  {
    id: 50,
    name: "Precision Davies",
    email: "precision.davies@analytics.ca",
    xp: 88,
    personalityType: "Focused Strategist",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Precision",
    bio: "Risk analyst who turns uncertainty into strategic advantage.",
    joinedAt: "2025-01-20",
    region: "Montreal, Canada"
  },
  {
    id: 51,
    name: "Method Andersson",
    email: "method.andersson@consulting.se",
    xp: 84,
    personalityType: "Focused Strategist",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Method",
    bio: "Management consultant who designs frameworks for organizational excellence.",
    joinedAt: "2025-01-16",
    region: "Stockholm, Sweden"
  },
  {
    id: 52,
    name: "Algorithm Kumar",
    email: "algorithm.kumar@quant.in",
    xp: 87,
    personalityType: "Focused Strategist",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Algorithm",
    bio: "Quantitative analyst who finds patterns in market chaos.",
    joinedAt: "2025-01-11",
    region: "Mumbai, India"
  },

  // Additional Social Spark Users (4)
  {
    id: 53,
    name: "Vibe Johnson",
    email: "vibe.johnson@connect.za",
    xp: 73,
    personalityType: "Social Spark",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Vibe",
    bio: "Community builder who creates spaces where diverse voices thrive.",
    joinedAt: "2025-01-24",
    region: "Cape Town, South Africa"
  },
  {
    id: 54,
    name: "Spark Williams",
    email: "spark.williams@energy.us",
    xp: 68,
    personalityType: "Social Spark",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Spark",
    bio: "Event organizer who transforms gatherings into memorable experiences.",
    joinedAt: "2025-01-07",
    region: "Miami, USA"
  },
  {
    id: 55,
    name: "Flame Okafor",
    email: "flame.okafor@inspire.ng",
    xp: 76,
    personalityType: "Social Spark",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Flame",
    bio: "Motivational speaker who ignites passion in every audience.",
    joinedAt: "2025-01-14",
    region: "Lagos, Nigeria"
  },
  {
    id: 56,
    name: "Electric Sato",
    email: "electric.sato@buzz.jp",
    xp: 72,
    personalityType: "Social Spark",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Electric",
    bio: "Social media strategist who amplifies authentic voices across platforms.",
    joinedAt: "2025-01-18",
    region: "Osaka, Japan"
  },

  // Additional Collaborative Spirit Users (4)
  {
    id: 57,
    name: "Unity Brown",
    email: "unity.brown@harmony.co.uk",
    xp: 81,
    personalityType: "Collaborative Spirit",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Unity",
    bio: "Cross-cultural facilitator who builds bridges between global teams.",
    joinedAt: "2025-01-23",
    region: "Manchester, UK"
  },
  {
    id: 58,
    name: "Synergy Liu",
    email: "synergy.liu@together.cn",
    xp: 78,
    personalityType: "Collaborative Spirit",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Synergy",
    bio: "Design thinking coach who helps teams unlock their collective creativity.",
    joinedAt: "2025-01-08",
    region: "Shanghai, China"
  },
  {
    id: 59,
    name: "Collective Garcia",
    email: "collective.garcia@unite.es",
    xp: 75,
    personalityType: "Collaborative Spirit",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Collective",
    bio: "Non-profit coordinator who mobilizes communities for social change.",
    joinedAt: "2025-01-21",
    region: "Valencia, Spain"
  },
  {
    id: 60,
    name: "Harmony Kim",
    email: "harmony.kim@balance.kr",
    xp: 77,
    personalityType: "Collaborative Spirit",
    avatarUrl: "https://api.dicebear.com/6.x/thumbs/svg?seed=Harmony",
    bio: "Agile coach who transforms conflict into collaborative breakthrough.",
    joinedAt: "2025-01-25",
    region: "Busan, South Korea"
  }
];

// Export for use in your app
export default mockUsers;

// Or if using CommonJS:
// module.exports = mockUsers; 