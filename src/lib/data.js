export const initialData = {
    grammar: [
        {
            groupName: "aaa",
            id: 1,
            words: [
                {
                    id: 2,
                    chinese: "你",
                    pinyin: "nǐ",
                    english: "You",
                    examples: [
                    ],
                    info: "",
                    checked: true,
                    type: "Pronoun",
                    createdAt: "2025-09-26T20:58:52.451Z"
                },
                {
                    id: 3,
                    chinese: "<i>pro.+</i>们",
                    pinyin: "<i>pro.+</i> men",
                    english: "We/Us/You/Them",
                    examples: [
                        {
                            id: 17,
                            pinyin: "<b>wǒmen</b> xuéxí zhōngwén",
                            literal: "<b>we</b> learn chinese",
                            english: "We are learning chinese",
                        },
                        {
                            id: 18,
                            pinyin: "<b>zzz</b> zzz",
                            literal: "<b>zzz</b> zzzz",
                            english: "zzzzzzzzzz",
                        }
                    ],
                    info: "Plural pronouns",
                    checked: true,
                    type: "Particle",
                    createdAt: "2025-08-26T20:58:52.451Z"
                },
                {
                    id: 4,
                    chinese: "这",
                    pinyin: "zhè",
                    english: "This",
                    examples: [
                    ],
                    info: "",
                    checked: true,
                    type: "Pronoun",
                    createdAt: "2025-07-26T20:58:52.451Z"
                },
                {
                    id: 5,
                    chinese: "什么",
                    pinyin: "shénme",
                    english: "What?",
                    examples: [
                        {
                            id: 19,
                            pinyin: "zhè shì <b>shénme?</b>",
                            literal: "this is <b>what?</b>",
                            english: "what is this ?",
                        }
                    ],
                    info: "",
                    checked: true,
                    type: "Pronoun",
                    createdAt: "2025-06-26T20:58:52.451Z"
                }
            ]
        },
        {
            groupName: "bbb",
            id: 6,
            words: [
                {
                    id: 7,
                    chinese: "我",
                    pinyin: "wǒ",
                    english: "Me/I/I am",
                    examples: [
                        {
                            id: 20,
                            pinyin: "<b>wǒ</b> ài nǐ",
                            literal: "<b>me</b> love you",
                            english: "I love you",
                        }
                    ],
                    info: "",
                    checked: true,
                    type: "Pronoun",
                    createdAt: "2025-05-26T20:58:52.451Z"
                },
                {
                    id: 8,
                    chinese: "<i>sub.+</i>们",
                    pinyin: "<i>sub.+</i> men",
                    english: "Plural",
                    examples: [
                        {
                            id: 21,
                            pinyin: "rén<b>men</b>",
                            literal: "person <b>plural</b>",
                            english: "People",
                        }
                    ],
                    info: "",
                    checked: true,
                    type: "Particle",
                    createdAt: "2025-04-26T20:58:52.451Z"
                },
                {
                    id: 9,
                    chinese: "很<i>+Adj.</i>",
                    pinyin: "Hěn <i>+Adj.</i>",
                    english: "very/quite/rather",
                    examples: [
                        {
                            id: 22,
                            pinyin: "zhōngguó <b>hěn</b> dà",
                            literal: "china <b>very</b> big",
                            english: "China is big",
                        }
                    ],
                    info: "for descriptions",
                    checked: true,
                    type: "Adverb",
                    createdAt: "2025-03-26T20:58:52.451Z"
                },
                {
                    id: 10,
                    chinese: "谁",
                    pinyin: "shéi",
                    english: "Who?",
                    examples: [
                        {
                            id: 23,
                            pinyin: "tā shì <b>shéi?</b>",
                            literal: "he is <b>who?</b>",
                            english: "who is he ?",
                        }
                    ],
                    info: "",
                    checked: true,
                    type: "Pronoun",
                    createdAt: "2025-02-26T20:58:52.451Z"
                }
            ]
        },
        {
            groupName: "ungrouped",
            id: 11,
            words: [
                {
                    id: 12,
                    chinese: "他/她",
                    pinyin: "tā",
                    english: "He/Him/She/Her/it",
                    examples: [
                        {
                            id: 24,
                            pinyin: "<b>tā</b> shì wǒ de péngyǒu",
                            literal: "<b>he</b> is my friend",
                            english: "He's my friend",
                        }
                    ],
                    info: "Male and female characters are pronounced the same",
                    checked: true,
                    type: "Pronoun",
                    createdAt: "2025-01-26T20:58:52.451Z"
                },
                {
                    id: 13,
                    chinese: "<i>pro.+</i>的",
                    pinyin: "<i>pro.+</i> de",
                    english: "my/mine/our/ours/your/yours<br/>his/her/hers/their/theirs",
                    examples: [
                        {
                            id: 25,
                            pinyin: "<b>wǒ de</b> bǐ",
                            literal: "<b>my</b> pen",
                            english: "My pen",
                        }
                    ],
                    info: "Possessive pronouns",
                    checked: true,
                    type: "Particle",
                    createdAt: "2024-09-26T20:58:52.451Z"
                },
                {
                    id: 14,
                    chinese: "不<i>+Verb.</i>",
                    pinyin: "Bù <i>+Verb.</i>",
                    english: "not to",
                    examples: [
                        {
                            id: 26,
                            pinyin: "wǒ <b>bù</b> rèn shi nǐ",
                            literal: "i <b>not</b> know you",
                            english: "I don't know you",
                        }
                    ],
                    info: "To Negate verbs",
                    checked: true,
                    type: "Adverb",
                    createdAt: "2023-09-26T20:58:52.451Z"
                },
                {
                    id: 15,
                    chinese: "吗",
                    pinyin: "ma?",
                    english: "yes or no ?",
                    examples: [
                        {
                            id: 27,
                            pinyin: "nǐ shì zhōngguó rén <b>ma?</b>",
                            literal: "you are chinese <b>aren't you ?</b>",
                            english: "Are you chinese ?",
                        }
                    ],
                    info: "",
                    checked: true,
                    type: "Particle",
                    createdAt: "2022-09-26T20:58:52.451Z"
                }
            ]
        }
    ],

    vocabulary: [
        {
            groupName: "aaa",
            id: 1,
            words: [
                {
                    id: 2,
                    chinese: "是",
                    pinyin: "shì",
                    english: "To be",
                    examples: [
                        {
                            id: 28,
                            pinyin: "zhè <b>shì</b> shénme?",
                            literal: "this <b>is</b> what?",
                            english: "What is this ? ",
                        }
                    ],
                    info: "",
                    checked: true,
                    type: "Verb",
                    createdAt: "2025-09-26T20:58:52.451Z"
                },
                {
                    id: 3,
                    chinese: "叫",
                    pinyin: "jiào",
                    english: "To be called",
                    examples: [
                        {
                            id: 29,
                            pinyin: "nǐ <b>jiào</b> shénme?",
                            literal: "you <b>named</b> what?",
                            english: "what's your name ?",
                        }
                    ],
                    info: "",
                    checked: true,
                    type: "Verb",
                    createdAt: "2025-09-26T20:58:51.451Z"
                },
                {
                    id: 4,
                    chinese: "好",
                    pinyin: "hǎo",
                    english: "Good",
                    examples: [
                        {
                            id: 30,
                            pinyin: "nǐ <b>hǎo</b>",
                            literal: "you <b>good</b>",
                            english: "Hello !",
                        }
                    ],
                    info: "",
                    checked: true,
                    type: "Adjectif",
                    createdAt: "2025-09-26T20:58:50.451Z"
                },
                {
                    id: 5,
                    chinese: "非常",
                    pinyin: "fēicháng",
                    english: "Very",
                    examples: [
                        {
                            id: 31,
                            pinyin: "<b>fēicháng</b> hǎo",
                            literal: "<b>very</b> good",
                            english: "Very good !",
                        }
                    ],
                    info: "",
                    checked: true,
                    type: "Adverb",
                    createdAt: "2025-09-26T20:58:49.451Z"
                },
                {
                    id: 6,
                    chinese: "知道",
                    pinyin: "zhīdào",
                    english: "To know something",
                    examples: [
                        {
                            id: 32,
                            pinyin: "",
                            literal: "",
                            english: ""
                        }
                    ],
                    info: "To know informations",
                    checked: true,
                    type: "Verb",
                    createdAt: "2025-09-26T20:58:48.451Z"
                },
                {
                    id: 7,
                    chinese: "认识",
                    pinyin: "rènshi",
                    english: "To be familiar with",
                    examples: [
                        {
                            id: 33,
                            pinyin: "wǒ <b>rènshi</b> tā",
                            literal: "i <b>know</b> him",
                            english: "I know him",
                        }
                    ],
                    info: "To be familiar with people/places/... (not just to know information about them)",
                    checked: true,
                    type: "Verb",
                    createdAt: "2025-09-26T20:58:48.451Z"
                },
                {
                    id: 8,
                    chinese: "人",
                    pinyin: "rén",
                    english: "Person/People",
                    examples: [
                        {
                            id: 34,
                            pinyin: "wǒ shì zhōng guó <b>rén</b>",
                            literal: "i am china <b>person</b>",
                            english: "I am chinese",
                        }
                    ],
                    info: "",
                    checked: true,
                    type: "Noun",
                    createdAt: "2025-09-26T20:58:47.451Z"
                },
                {
                    id: 9,
                    chinese: "有",
                    pinyin: "yǒu",
                    english: "To have",
                    examples: [
                        {
                            id: 35,
                            pinyin: "wǒ <b>yǒu</b> bǐ",
                            literal: "I have pen",
                            english: "I have a pen",
                        }
                    ],
                    info: "",
                    checked: true,
                    type: "Verb",
                    createdAt: "2025-09-26T20:58:46.451Z"
                },
                {
                    id: 10,
                    chinese: "谢谢",
                    pinyin: "xièxiè",
                    english: "Thanks",
                    examples: [
                        {
                            id: 36,
                            pinyin: "<b>xièxiè</b> nǐ",
                            literal: "<b>thank</b> you",
                            english: "Thank you !",
                        }
                    ],

                    info: "",
                    checked: true,
                    type: "Verb",
                    createdAt: "2025-09-26T20:58:45.451Z"
                },
                {
                    id: 11,
                    chinese: "学习",
                    pinyin: "xuéxí",
                    english: "Learning",
                    examples: [
                        {
                            id: 37,
                            pinyin: "tā <b>xuéxí</b> zhōngwén",
                            literal: "He <b>learning</b> chinese",
                            english: "He learns chinese",
                        }
                    ],
                    info: "",
                    checked: true,
                    type: "Verb",
                    createdAt: "2025-09-26T20:58:44.451Z"
                }
            ]
        },
        {
            groupName: "ungrouped",
            id: 12,
            words: []
        }
    ]
}