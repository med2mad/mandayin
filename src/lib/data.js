export const initialData = {
    grammar: [
        {
            groupName: "aaa",
            id: 1,
            words: [
                {
                    id: 1,
                    checked: true,
                    createdAt: "2025-08-26T20:58:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "<i>pro.+</i>们",
                            pinyin: "<i>pro.+</i> men",
                            english: "We/Us/You/Them",
                            type: "Particle",
                            info: "Plural pronouns",
                            checked: true,
                            examples: [
                                {
                                    id: 1,
                                    pinyin: "<b>wǒmen</b> xuéxí zhōngwén",
                                    literal: "<b>we</b> learn chinese",
                                    english: "We are learning chinese",
                                },
                                {
                                    id: 2,
                                    pinyin: "nǐ rèn shi <b>tāmen</b>",
                                    literal: "you know <b>them</b>",
                                    english: "you know them",
                                }
                            ]
                        },
                        {
                            id: 2,
                            chinese: "<i>sub.+</i>们",
                            pinyin: "<i>sub.+</i> men",
                            english: "Plural",
                            type: "Particle",
                            info: "",
                            checked: true,
                            examples: [
                                {
                                    id: 1,
                                    pinyin: "rén<b>men</b>",
                                    literal: "person <b>plural</b>",
                                    english: "People",
                                }
                            ]
                        },
                    ]
                },
                {
                    id: 2,
                    checked: true,
                    createdAt: "2025-09-26T20:58:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "你",
                            pinyin: "nǐ",
                            english: "You",
                            type: "Pronoun",
                            info: "",
                            checked: true,
                            examples: []
                        }
                    ]
                },
                {
                    id: 4,
                    checked: true,
                    createdAt: "2025-07-26T20:58:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "这",
                            pinyin: "zhè",
                            english: "This",
                            type: "Pronoun",
                            info: "",
                            checked: true,
                            examples: []
                        }
                    ]
                },
                {
                    id: 5,
                    checked: true,
                    createdAt: "2025-06-26T20:58:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "什么",
                            pinyin: "shénme",
                            english: "What?",
                            type: "Pronoun",
                            info: "Interrogative pronoun",
                            checked: true,
                            examples: [
                                {
                                    id: 19,
                                    pinyin: "zhè shì <b>shénme?</b>",
                                    literal: "this is <b>what?</b>",
                                    english: "what is this ?",
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            groupName: "bbb",
            id: 6,
            words: [
                {
                    id: 7,
                    checked: true,
                    createdAt: "2025-05-26T20:58:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "我",
                            pinyin: "wǒ",
                            english: "Me/I/I am",
                            type: "Pronoun",
                            info: "",
                            checked: true,
                            examples: [
                                {
                                    id: 20,
                                    pinyin: "<b>wǒ</b> ài nǐ",
                                    literal: "<b>me</b> love you",
                                    english: "I love you",
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 9,
                    checked: true,
                    createdAt: "2025-03-26T20:58:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "很<i>+Adj.</i>",
                            pinyin: "hěn <i>+Adj.</i>",
                            english: "Very/Quite/Rather",
                            type: "Adverb",
                            info: "for descriptions",
                            checked: true,
                            examples: [
                                {
                                    id: 22,
                                    pinyin: "zhōngguó <b>hěn</b> dà",
                                    literal: "china <b>very</b> big",
                                    english: "China is big",
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 10,
                    checked: true,
                    createdAt: "2025-02-26T20:58:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "谁",
                            pinyin: "shéi",
                            english: "Who?",
                            type: "Pronoun",
                            info: "Interrogative pronoun",
                            checked: true,
                            examples: [
                                {
                                    id: 23,
                                    pinyin: "tā shì <b>shéi?</b>",
                                    literal: "he is <b>who?</b>",
                                    english: "who is he ?",
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            groupName: "ungrouped",
            id: 11,
            words: [
                {
                    id: 12,
                    checked: true,
                    createdAt: "2025-01-26T20:58:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "他/她",
                            pinyin: "tā",
                            english: "He/Him/She/Her/it",
                            type: "Pronoun",
                            info: "",
                            checked: true,
                            examples: [
                                {
                                    id: 24,
                                    pinyin: "<b>tā</b> shì wǒ de péngyǒu",
                                    literal: "<b>he</b> is my friend",
                                    english: "He's my friend",
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 13,
                    checked: true,
                    createdAt: "2024-09-26T20:58:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "<i>pro.+</i>的",
                            pinyin: "<i>pro.+</i> de",
                            english: "My/Mine/Our/Ours/Your/Yours<br/>His/Her/Hers/Their/Theirs",
                            type: "Particle",
                            info: "",
                            checked: true,
                            examples: [
                                {
                                    id: 25,
                                    pinyin: "<b>wǒ de</b> bǐ",
                                    literal: "<b>my</b> pen",
                                    english: "My pen",
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 14,
                    checked: true,
                    createdAt: "2023-09-26T20:58:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "不<i>+Verb</i>",
                            pinyin: "bù <i>+Verb</i>",
                            english: "Not to",
                            type: "Adverb",
                            info: "Negate present tense verbs<br/>cannot be used with \"To have\"",
                            checked: true,
                            examples: [
                                {
                                    id: 26,
                                    pinyin: "wǒ <b>bù</b> rèn shi nǐ",
                                    literal: "i <b>not</b> know you",
                                    english: "I don't know you",
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 15,
                    checked: true,
                    createdAt: "2022-09-26T20:58:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "吗",
                            pinyin: "ma?",
                            english: "Yes/No questions",
                            type: "Particle",
                            info: "",
                            checked: true,
                            examples: [
                                {
                                    id: 27,
                                    pinyin: "nǐ shì zhōngguó rén <b>ma?</b>",
                                    literal: "you are chinese <b>aren't you ?</b>",
                                    english: "Are you chinese ?",
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 28,
                    checked: true,
                    createdAt: "2022-09-26T20:58:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "没(有)<i>+Verb</i>",
                            pinyin: "méi(yóu) <i>+Verb</i>",
                            english: "Did not",
                            type: "Adverb",
                            info: "Negate pass tense verbs",
                            checked: true,
                            examples: [
                                {
                                    id: 29,
                                    pinyin: "Wǒ <b>méiyǒu</b> chī píngguǒ",
                                    literal: "i <b>did not</b> eat apples",
                                    english: "Are you chinese ?",
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 140,
                    checked: true,
                    createdAt: "2023-09-26T20:58:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "<i>Verb+</i>不<i>+Verb</i>",
                            pinyin: "<i>Verb+</i> bù <i>+Verb</i>",
                            english: "Is action happening ?",
                            type: "Adverb",
                            info: "Present tense questions",
                            checked: true,
                            examples: [
                                {
                                    id: 26,
                                    pinyin: "nǐ <b>chī bù chī</b> píngguǒ",
                                    literal: "you <b>eat not eat</b> apple",
                                    english: "do you eat apples",
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 1400,
                    checked: true,
                    createdAt: "2023-09-26T20:58:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "<i>Verb+</i>没<i>+Verb</i>",
                            pinyin: "<i>Verb+</i> méi <i>+Verb</i>",
                            english: "Did action happen ?",
                            type: "Adverb",
                            info: "Past tense questions",
                            checked: true,
                            examples: [
                                {
                                    id: 26,
                                    pinyin: "nǐ <b>chī méi chī</b> píngguǒ",
                                    literal: "you <b>eat didn't eat</b> apple",
                                    english: "have you eaten apples",
                                }
                            ]
                        }
                    ]
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
                    checked: true,
                    createdAt: "2025-09-26T20:58:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "是",
                            pinyin: "shì",
                            english: "To be",
                            type: "Verb",
                            info: "",
                            checked: true,
                            examples: [
                                {
                                    id: 28,
                                    pinyin: "zhè <b>shì</b> shénme?",
                                    literal: "this <b>is</b> what?",
                                    english: "What is this ? ",
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 3,
                    checked: true,
                    createdAt: "2025-09-26T20:58:51.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "叫",
                            pinyin: "jiào",
                            english: "To be called",
                            type: "Verb",
                            info: "",
                            checked: true,
                            examples: [
                                {
                                    id: 29,
                                    pinyin: "nǐ <b>jiào</b> shénme?",
                                    literal: "you <b>named</b> what?",
                                    english: "what's your name ?",
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 4,
                    checked: true,
                    createdAt: "2025-09-26T20:58:50.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "好",
                            pinyin: "hǎo",
                            english: "Good",
                            type: "Adjectif",
                            info: "",
                            checked: true,
                            examples: [
                                {
                                    id: 30,
                                    pinyin: "nǐ <b>hǎo</b>",
                                    literal: "you <b>good</b>",
                                    english: "Hello !",
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 5,
                    checked: true,
                    createdAt: "2025-09-26T20:58:49.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "非常",
                            pinyin: "fēicháng",
                            english: "Very",
                            type: "Adverb",
                            info: "",
                            checked: true,
                            examples: [
                                {
                                    id: 31,
                                    pinyin: "<b>fēicháng</b> hǎo",
                                    literal: "<b>very</b> good",
                                    english: "Very good !",
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 6,
                    checked: true,
                    createdAt: "2025-09-26T20:58:48.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "知道",
                            pinyin: "zhīdào",
                            english: "To know something",
                            type: "Verb",
                            info: "To know informations",
                            checked: true,
                            examples: [
                                {
                                    id: 32,
                                    pinyin: "",
                                    literal: "",
                                    english: ""
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 7,
                    checked: true,
                    createdAt: "2025-09-26T20:58:48.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "认识",
                            pinyin: "rènshi",
                            english: "To be familiar with",
                            type: "Verb",
                            info: "To be familiar with people/places/... (not just to know information about them)",
                            checked: true,
                            examples: [
                                {
                                    id: 33,
                                    pinyin: "wǒ <b>rènshi</b> tā",
                                    literal: "i <b>know</b> him",
                                    english: "I know him",
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 8,
                    checked: true,
                    createdAt: "2025-09-26T20:58:47.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "人",
                            pinyin: "rén",
                            english: "Person/People",
                            type: "Noun",
                            info: "",
                            checked: true,
                            examples: [
                                {
                                    id: 34,
                                    pinyin: "wǒ shì zhōng guó <b>rén</b>",
                                    literal: "i am china <b>person</b>",
                                    english: "I am chinese",
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 9,
                    checked: true,
                    createdAt: "2025-09-26T20:58:46.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "有",
                            pinyin: "yǒu",
                            english: "To have",
                            type: "Verb",
                            info: "",
                            checked: true,
                            examples: [
                                {
                                    id: 35,
                                    pinyin: "wǒ <b>yǒu</b> bǐ",
                                    literal: "I have pen",
                                    english: "I have pens",
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 30,
                    checked: true,
                    createdAt: "2022-09-26T20:58:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "没(有)",
                            pinyin: "méi(yóu)",
                            english: "Not to have",
                            type: "Verb",
                            info: "",
                            checked: true,
                            examples: [
                                {
                                    id: 31,
                                    pinyin: "Wǒ <b>méiyǒu</b> bǐ",
                                    literal: "i <b>Not to have</b> pens",
                                    english: "I don't have pens",
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 10,
                    checked: true,
                    createdAt: "2025-09-26T20:58:45.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "谢谢",
                            pinyin: "xièxiè",
                            english: "Thanks",
                            type: "Verb",
                            info: "",
                            checked: true,
                            examples: [
                                {
                                    id: 36,
                                    pinyin: "<b>xièxiè</b> nǐ",
                                    literal: "<b>thank</b> you",
                                    english: "Thank you !",
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 11,
                    checked: true,
                    createdAt: "2025-09-26T20:58:44.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "学习",
                            pinyin: "xuéxí",
                            english: "Learning",
                            type: "Verb",
                            info: "",
                            checked: true,
                            examples: [
                                {
                                    id: 37,
                                    pinyin: "wǒ <b>xuéxí</b> zhōngwén",
                                    literal: "I <b>learning</b> chinese",
                                    english: "I learn chinese",
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 38,
                    checked: true,
                    createdAt: "2025-09-26T20:58:44.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "爱",
                            pinyin: "ài",
                            english: "Love",
                            type: "Verb",
                            info: "",
                            checked: true,
                            examples: [
                                {
                                    id: 39,
                                    pinyin: "tā <b>xuéxí</b> zhōngwén",
                                    literal: "He <b>learning</b> chinese",
                                    english: "He learns chinese",
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 40,
                    checked: true,
                    createdAt: "2025-09-26T20:58:44.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "要",
                            pinyin: "yào",
                            english: "To want",
                            type: "Verb",
                            info: "",
                            checked: true,
                            examples: [
                                {
                                    id: 41,
                                    pinyin: "tā <b>xuéxí</b> zhōngwén",
                                    literal: "He <b>learning</b> chinese",
                                    english: "He learns chinese",
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 42,
                    checked: true,
                    createdAt: "2025-09-26T20:58:44.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "要",
                            pinyin: "chī",
                            english: "To eat",
                            type: "Verb",
                            info: "",
                            checked: true,
                            examples: [
                                {
                                    id: 43,
                                    pinyin: "Wǒ <b>chī</b> píngguǒ",
                                    literal: "i <b>to eat</b> apple",
                                    english: "I eat apples",
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 44,
                    checked: true,
                    createdAt: "2025-09-26T20:58:44.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "苹果",
                            pinyin: "píngguǒ",
                            english: "Apple",
                            type: "Noun",
                            info: "",
                            checked: true,
                            examples: [
                                {
                                    id: 45,
                                    pinyin: "Wǒ chī <b>píngguǒ</b>",
                                    literal: "i to eat <b>apple</b>",
                                    english: "I eat apples",
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            groupName: "ungrouped",
            id: 12,
            words: []
        }
    ],

    numbers: [
        {
            groupName: "aaa",
            id: 1,
            words: [
                {
                    id: 1,
                    checked: true,
                    createdAt: "2025-09-26T20:55:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "一",
                            pinyin: "yī",
                            english: "One (1)",
                            type: "Number",
                            info: "",
                            checked: true,
                            examples: []
                        }
                    ]
                },
                {
                    id: 2,
                    checked: true,
                    createdAt: "2025-09-26T20:55:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "二",
                            pinyin: "èr",
                            english: "Two (2)",
                            type: "Number",
                            info: "",
                            checked: true,
                            examples: []
                        }
                    ]
                },
                {
                    id: 3,
                    checked: true,
                    createdAt: "2025-09-26T20:55:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "三",
                            pinyin: "sān",
                            english: "Three (3)",
                            type: "Number",
                            info: "",
                            checked: true,
                            examples: []
                        }
                    ]
                },
                {
                    id: 4,
                    checked: true,
                    createdAt: "2025-09-26T20:55:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "四",
                            pinyin: "sì",
                            english: "Four (4)",
                            type: "Number",
                            info: "",
                            checked: true,
                            examples: []
                        }
                    ]
                },
                {
                    id: 5,
                    checked: true,
                    createdAt: "2025-09-26T20:55:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "五",
                            pinyin: "wǔ",
                            english: "Five (5)",
                            type: "Number",
                            info: "",
                            checked: true,
                            examples: []
                        }
                    ]
                },
                {
                    id: 6,
                    checked: true,
                    createdAt: "2025-09-26T20:55:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "六",
                            pinyin: "liù",
                            english: "Six (6)",
                            type: "Number",
                            info: "",
                            checked: true,
                            examples: []
                        }
                    ]
                },
                {
                    id: 7,
                    checked: true,
                    createdAt: "2025-09-26T20:55:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "七",
                            pinyin: "qī",
                            english: "Seven (7)",
                            type: "Number",
                            info: "",
                            checked: true,
                            examples: []
                        }
                    ]
                },
                {
                    id: 8,
                    checked: true,
                    createdAt: "2025-09-26T20:55:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "八",
                            pinyin: "bā",
                            english: "Eight (8)",
                            type: "Number",
                            info: "",
                            checked: true,
                            examples: []
                        }
                    ]
                },
                {
                    id: 9,
                    checked: true,
                    createdAt: "2025-09-26T20:55:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "九",
                            pinyin: "jiǔ",
                            english: "Nine (9)",
                            type: "Number",
                            info: "",
                            checked: true,
                            examples: []
                        }
                    ]
                },
                {
                    id: 10,
                    checked: true,
                    createdAt: "2025-09-26T20:55:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "十",
                            pinyin: "shí",
                            english: "Ten (10)",
                            type: "Number",
                            info: "",
                            checked: true,
                            examples: []
                        }
                    ]
                },
                {
                    id: 11,
                    checked: true,
                    createdAt: "2025-09-26T20:55:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "十一",
                            pinyin: "shí yī",
                            english: "Eleven (11)",
                            type: "Number",
                            info: "",
                            checked: true,
                            examples: []
                        }
                    ]
                },
                {
                    id: 12,
                    checked: true,
                    createdAt: "2025-09-26T20:55:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "二十一",
                            pinyin: "èr shí yī",
                            english: "Twenty one (21)",
                            type: "Number",
                            info: "",
                            checked: true,
                            examples: []
                        }
                    ]
                },
                {
                    id: 13,
                    checked: true,
                    createdAt: "2025-09-26T20:55:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "八十七",
                            pinyin: "bā shí qī",
                            english: "Eighty seven (87)",
                            type: "Number",
                            info: "",
                            checked: true,
                            examples: []
                        }
                    ]
                },
                {
                    id: 100,
                    checked: true,
                    createdAt: "2025-09-26T20:55:52.451Z",
                    usages: [
                        {
                            id: 1,
                            chinese: "岁",
                            pinyin: "suì",
                            english: "Years/Old",
                            type: "Character",
                            info: "",
                            checked: true,
                            examples: [
                                {
                                    id: 220,
                                    pinyin: "wǒ èr shí <b>suì</b>",
                                    literal: "I 20 <b>years old</b>",
                                    english: "I'm twenty years old",
                                }
                            ]
                        }
                    ]
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