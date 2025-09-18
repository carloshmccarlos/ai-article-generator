export type Subcategory = string;

export type Category = {
    name: string;
    description: string;
    subcategories: Subcategory[];
};

export const categories: Category[] = [
    {
        name: "Education & Learning",
        description: "Articles related to learning, academic topics, and exam preparation.",
        subcategories: [
            "Language Learning (English, Chinese, Spanish, etc.)",
            "Exam Preparation (IELTS, TOEFL, SAT, GRE)",
            "Science (Physics, Chemistry, Biology)",
            "Mathematics (Algebra, Geometry, Statistics)",
            "History (World, Ancient, Modern, Regional)",
            "Geography (Physical, Human, Environmental)",
        ],
    },
    {
        name: "Technology & Computing",
        description: "Covers AI, programming, gadgets, cybersecurity, and emerging technologies.",
        subcategories: [
            "Artificial Intelligence & Machine Learning",
            "Software Development (Web, Mobile, Backend, DevOps)",
            "Cybersecurity",
            "Gadgets & Consumer Tech",
            "Space & Astronomy Tech",
            "Emerging Tech (Blockchain, AR/VR, Quantum)",
        ],
    },
    {
        name: "Business & Economics",
        description: "Topics on entrepreneurship, finance, marketing, management, and economics.",
        subcategories: [
            "Entrepreneurship & Startups",
            "Marketing & Advertising",
            "Finance & Investing",
            "Economics (Micro, Macro, Global Trends)",
            "Management & Leadership",
            "Productivity & Career Growth",
        ],
    },
    {
        name: "Science & Nature",
        description: "Scientific fields and natural sciences including medicine and environmental studies.",
        subcategories: [
            "Physics & Astronomy",
            "Chemistry & Materials Science",
            "Biology & Genetics",
            "Medicine & Health Science",
            "Earth Science (Geology, Meteorology)",
            "Environmental Science (Climate Change, Ecology)",
        ],
    },
    {
        name: "Health & Lifestyle",
        description: "Covers health, fitness, mental wellness, relationships, and personal development.",
        subcategories: [
            "Nutrition & Diet",
            "Exercise & Fitness",
            "Mental Health & Psychology",
            "Self-improvement & Motivation",
            "Relationships & Family",
            "Beauty & Fashion",
        ],
    },
    {
        name: "Culture & Humanities",
        description: "Literature, philosophy, arts, music, religion, and social sciences.",
        subcategories: [
            "Literature & Writing",
            "Philosophy & Ethics",
            "Art & Design",
            "Music & Performing Arts",
            "Religion & Spirituality",
            "Anthropology & Sociology",
        ],
    },
    {
        name: "Entertainment & Media",
        description: "Topics on movies, music, gaming, books, and internet culture.",
        subcategories: [
            "Movies & TV Shows",
            "Music & Pop Culture",
            "Gaming & eSports",
            "Books & Literature Reviews",
            "Celebrity & Influencer News",
            "Internet Culture & Memes",
        ],
    },
    {
        name: "Travel & Places",
        description: "Travel guides, cultural experiences, and exploration of places and nature.",
        subcategories: [
            "Countries & Cities",
            "Travel Tips & Guides",
            "Adventure Travel",
            "Cultural Tourism",
            "Food & Local Traditions",
            "Nature & Landscapes",
        ],
    },
    {
        name: "Food & Cooking",
        description: "Culinary arts, recipes, cuisines, nutrition, and food culture.",
        subcategories: [
            "Recipes (Regional, Quick Meals, Desserts)",
            "Cuisines (Chinese, Italian, Indian, etc.)",
            "Food Science & Nutrition",
            "Food Culture & History",
            "Beverages (Coffee, Tea, Wine, Cocktails)",
        ],
    },
    {
        name: "Sports & Recreation",
        description: "All kinds of sports, outdoor activities, and competitive games.",
        subcategories: [
            "Football / Soccer",
            "Basketball",
            "Tennis",
            "Olympic Sports",
            "Outdoor Adventures (Hiking, Camping)",
            "eSports & Online Games",
        ],
    },
    {
        name: "Society & Current Affairs",
        description: "Politics, law, international relations, human rights, and social issues.",
        subcategories: [
            "Politics & Governance",
            "Law & Justice",
            "International Relations",
            "Human Rights & Equality",
            "Social Issues & Movements",
            "Urban Development & Cities",
        ],
    },
    {
        name: "Environment & Sustainability",
        description: "Environmental topics, climate change, sustainability, and conservation.",
        subcategories: [
            "Climate Change",
            "Renewable Energy",
            "Wildlife & Conservation",
            "Sustainable Living",
            "Pollution & Waste Management",
            "Green Tech",
        ],
    },
    {
        name: "Career & Professional Skills",
        description: "Career guidance, professional growth, workplace skills, and freelancing.",
        subcategories: [
            "Resume & Interview Prep",
            "Career Guidance (Tech, Business, Creative fields)",
            "Freelancing & Remote Work",
            "Workplace Communication",
            "Public Speaking & Writing",
            "Leadership & Teamwork",
        ],
    },
    {
        name: "Creative Writing & Storytelling",
        description: "Short stories, poetry, worldbuilding, and narrative techniques.",
        subcategories: [
            "Short Stories (Fantasy, Sci-Fi, Mystery, Romance)",
            "Poetry",
            "Worldbuilding & Fictional Universes",
            "Character Development",
            "Writing Prompts",
            "Screenwriting & Scripts",
        ],
    },
    {
        name: "Miscellaneous Fun & Curiosity",
        description: "Fun facts, life hacks, inspirational stories, puzzles, and random topics.",
        subcategories: [
            "Trivia & Fun Facts",
            "What If Scenarios",
            "Life Hacks",
            "Inspirational Stories",
            "Puzzles & Brain Teasers",
            "Random Generator (lucky draw topic)",
        ],
    }
];
