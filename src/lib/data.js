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

                    ],
                    chinese: "你",
                    pinyin: "nǐ",
                    english: "You",
                    examples: [
                    ],
                    info: "Personal pronoun",
                    checked: true,
                    type: "Pronoun",

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
                    info: "Interrogative pronoun",
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
                    info: "Personal pronoun",
                    checked: true,
                    type: "Pronoun",
                    createdAt: "2025-05-26T20:58:52.451Z"
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
                    info: "Interrogative pronoun",
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
                    info: "Personal pronoun (Male and female are pronounced the same)",
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
                    chinese: "不<i>+Verb</i>",
                    pinyin: "Bù <i>+Verb</i>",
                    english: "not to",
                    examples: [
                        {
                            id: 26,
                            pinyin: "wǒ <b>bù</b> rèn shi nǐ",
                            literal: "i <b>not</b> know you",
                            english: "I don't know you",
                        }
                    ],
                    info: "Negate present tense verbs",
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
                },
                {
                    id: 28,
                    chinese: "没(有)<i>+Verb</i>",
                    pinyin: "méi(yóu) <i>+Verb</i>",
                    english: "did not",
                    examples: [
                        {
                            id: 29,
                            pinyin: "Wǒ <b>méiyǒu</b> chī píngguǒ",
                            literal: "i <b>did not</b> eat apples",
                            english: "Are you chinese ?",
                        }
                    ],
                    info: "Negate pass tense verbs",
                    checked: true,
                    type: "Adverb",
                    createdAt: "2022-09-26T20:58:52.451Z"
                },
                {
                    id: 30,
                    chinese: "没(有)",
                    pinyin: "méi(yóu)",
                    english: "Not to have",
                    examples: [
                        {
                            id: 31,
                            pinyin: "Wǒ <b>méiyǒu</b> bǐ",
                            literal: "i <b>Not to have</b> pens",
                            english: "I don't have pens",
                        }
                    ],
                    info: "",
                    checked: true,
                    type: "Adverb",
                    createdAt: "2022-09-26T20:58:52.451Z"
                },
                {
                    id: 140,
                    chinese: "<i>Verb+</i>不<i>+Verb</i>",
                    pinyin: "<i>Verb+</i> bù <i>+Verb</i>",
                    english: "Is action happenning ?",
                    examples: [
                        {
                            id: 26,
                            pinyin: "nǐ <b>chī bù chī</b> píngguǒ",
                            literal: "you <b>eat not eat</b> apple",
                            english: "do you eat apples",
                        }
                    ],
                    info: "Negate present tense verbs",
                    checked: true,
                    type: "Adverb",
                    createdAt: "2023-09-26T20:58:52.451Z"
                },
                {
                    id: 1400,
                    chinese: "<i>Verb+</i>没<i>+Verb</i>",
                    pinyin: "<i>Verb+</i> méi <i>+Verb</i>",
                    english: "did action happen ?",
                    examples: [
                        {
                            id: 26,
                            pinyin: "nǐ <b>chī méi chī</b> píngguǒ",
                            literal: "you <b>eat didn't eat</b> apple",
                            english: "have you eaten apples",
                        }
                    ],
                    info: "Negate past tense verbs",
                    checked: true,
                    type: "Adverb",
                    createdAt: "2023-09-26T20:58:52.451Z"
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
                            english: "I have pens",
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
                            pinyin: "wǒ <b>xuéxí</b> zhōngwén",
                            literal: "I <b>learning</b> chinese",
                            english: "I learn chinese",
                        }
                    ],
                    info: "",
                    checked: true,
                    type: "Verb",
                    createdAt: "2025-09-26T20:58:44.451Z"
                },
                {
                    id: 38,
                    chinese: "爱",
                    pinyin: "ài",
                    english: "Love",
                    examples: [
                        {
                            id: 39,
                            pinyin: "tā <b>xuéxí</b> zhōngwén",
                            literal: "He <b>learning</b> chinese",
                            english: "He learns chinese",
                        }
                    ],
                    info: "",
                    checked: true,
                    type: "Verb",
                    createdAt: "2025-09-26T20:58:44.451Z"
                },
                {
                    id: 40,
                    chinese: "要",
                    pinyin: "yào",
                    english: "To want",
                    examples: [
                        {
                            id: 41,
                            pinyin: "tā <b>xuéxí</b> zhōngwén",
                            literal: "He <b>learning</b> chinese",
                            english: "He learns chinese",
                        }
                    ],
                    info: "",
                    checked: true,
                    type: "Verb",
                    createdAt: "2025-09-26T20:58:44.451Z"
                },
                {
                    id: 42,
                    chinese: "要",
                    pinyin: "chī",
                    english: "To eat",
                    examples: [
                        {
                            id: 43,
                            pinyin: "Wǒ <b>chī</b> píngguǒ",
                            literal: "i <b>to eat</b> apple",
                            english: "I eat apples",
                        }
                    ],
                    info: "",
                    checked: true,
                    type: "Verb",
                    createdAt: "2025-09-26T20:58:44.451Z"
                },
                {
                    id: 44,
                    chinese: "苹果",
                    pinyin: "píngguǒ",
                    english: "Apple",
                    examples: [
                        {
                            id: 45,
                            pinyin: "Wǒ chī <b>píngguǒ</b>",
                            literal: "i to eat <b>apple</b>",
                            english: "I eat apples",
                        }
                    ],
                    info: "",
                    checked: true,
                    type: "Noun",
                    createdAt: "2025-09-26T20:58:44.451Z"
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
                    chinese: "一",
                    pinyin: "yī",
                    english: "One (1)",
                    examples: [
                    ],
                    info: "",
                    checked: true,
                    type: "Number",
                    createdAt: "2025-09-26T20:55:52.451Z"
                },
                {
                    id: 2,
                    chinese: "二",
                    pinyin: "èr",
                    english: "Two (2)",
                    examples: [
                    ],
                    info: "",
                    checked: true,
                    type: "Number",
                    createdAt: "2025-09-26T20:55:52.451Z"
                },
                {
                    id: 3,
                    chinese: "三",
                    pinyin: "sān",
                    english: "Three (3)",
                    examples: [
                    ],
                    info: "",
                    checked: true,
                    type: "Number",
                    createdAt: "2025-09-26T20:55:52.451Z"
                },
                {
                    id: 4,
                    chinese: "四",
                    pinyin: "sì",
                    english: "Four (4)",
                    examples: [
                    ],
                    info: "",
                    checked: true,
                    type: "Number",
                    createdAt: "2025-09-26T20:55:52.451Z"
                },
                {
                    id: 5,
                    chinese: "五",
                    pinyin: "wǔ",
                    english: "Five (5)",
                    examples: [
                    ],
                    info: "",
                    checked: true,
                    type: "Number",
                    createdAt: "2025-09-26T20:55:52.451Z"
                },
                {
                    id: 6,
                    chinese: "六",
                    pinyin: "liù",
                    english: "Six (6)",
                    examples: [
                    ],
                    info: "",
                    checked: true,
                    type: "Number",
                    createdAt: "2025-09-26T20:55:52.451Z"
                },
                {
                    id: 7,
                    chinese: "七",
                    pinyin: "qī",
                    english: "Seven (7)",
                    examples: [
                    ],
                    info: "",
                    checked: true,
                    type: "Number",
                    createdAt: "2025-09-26T20:55:52.451Z"
                },
                {
                    id: 8,
                    chinese: "八",
                    pinyin: "bā",
                    english: "Eight (8)",
                    examples: [
                    ],
                    info: "",
                    checked: true,
                    type: "Number",
                    createdAt: "2025-09-26T20:55:52.451Z"
                },
                {
                    id: 9,
                    chinese: "九",
                    pinyin: "jiǔ",
                    english: "Nine (9)",
                    examples: [
                    ],
                    info: "",
                    checked: true,
                    type: "Number",
                    createdAt: "2025-09-26T20:55:52.451Z"
                },
                {
                    id: 10,
                    chinese: "十",
                    pinyin: "shí",
                    english: "Ten (10)",
                    examples: [
                    ],
                    info: "",
                    checked: true,
                    type: "Number",
                    createdAt: "2025-09-26T20:55:52.451Z"
                },
                {
                    id: 11,
                    chinese: "十一",
                    pinyin: "shí yī",
                    english: "Eleven (11)",
                    examples: [
                    ],
                    info: "",
                    checked: true,
                    type: "Number",
                    createdAt: "2025-09-26T20:55:52.451Z"
                },
                {
                    id: 12,
                    chinese: "二十一",
                    pinyin: "èr shí yī",
                    english: "Twenty one (21)",
                    examples: [
                    ],
                    info: "",
                    checked: true,
                    type: "Number",
                    createdAt: "2025-09-26T20:55:52.451Z"
                },
                {
                    id: 13,
                    chinese: "八十七",
                    pinyin: "bā shí qī",
                    english: "Eighty seven (87)",
                    examples: [
                    ],
                    info: "",
                    checked: true,
                    type: "Number",
                    createdAt: "2025-09-26T20:55:52.451Z"
                },
                {
                    id: 100,
                    chinese: "岁",
                    pinyin: "suì",
                    english: "Years/Old",
                    examples: [
                        {
                            id: 220,
                            pinyin: "wǒ èr shí <b>suì</b>",
                            literal: "I 20 <b>years old</b>",
                            english: "I'm twenty years old",
                        }
                    ],
                    info: "",
                    checked: true,
                    type: "Character",
                    createdAt: "2025-09-26T20:55:52.451Z"
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
