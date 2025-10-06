import localforage from 'localforage';

// Configure localForage
localforage.config({
    name: 'ChineseVocabApp',
    version: 1.0,
    storeName: 'vocabulary_data'
});

// Your initial data
const initialData = [
    {
        "groupName": "aaa",
        "id": 1,
        "words": [
            {
                "id": 2,
                "chinese": "你",
                "pinyin": "nǐ",
                "english": "You",
                "examplePinyin": "",
                "literal": "",
                "exampleEnglish": "",
                "info": "",
                "checked": true,
                "type": "Pronoun",
                "createdAt": "2025-09-26T20:58:52.451Z"
            },
            {
                "id": 3,
                "chinese": "<i>pro.+</i>们",
                "pinyin": "<i>pro.+</i> men",
                "english": "We/Us/You/Them",
                "examplePinyin": "<b>wǒmen</b> xuéxí zhōngwén",
                "literal": "<b>we</b> learn chinese",
                "exampleEnglish": "We are learning chinese",
                "info": "Plural pronouns",
                "checked": true,
                "type": "Particle",
                "createdAt": "2025-08-26T20:58:52.451Z"
            },
            {
                "id": 4,
                "chinese": "这",
                "pinyin": "zhè",
                "english": "This",
                "examplePinyin": "",
                "literal": "",
                "exampleEnglish": "",
                "info": "",
                "checked": true,
                "type": "Pronoun",
                "createdAt": "2025-07-26T20:58:52.451Z"
            },
            {
                "id": 5,
                "chinese": "什么",
                "pinyin": "shénme",
                "english": "What?",
                "examplePinyin": "zhè shì <b>shénme?</b>",
                "literal": "this is <b>what?</b>",
                "exampleEnglish": "what is this ?",
                "info": "",
                "checked": true,
                "type": "Pronoun",
                "createdAt": "2025-06-26T20:58:52.451Z"
            }
        ]
    },
    {
        "groupName": "bbb",
        "id": 6,
        "words": [
            {
                "id": 7,
                "chinese": "我",
                "pinyin": "wǒ",
                "english": "Me/I/I am",
                "examplePinyin": "<b>wǒ</b> ài nǐ",
                "literal": "<b>me</b> love you",
                "exampleEnglish": "I love you",
                "info": "",
                "checked": true,
                "type": "Pronoun",
                "createdAt": "2025-05-26T20:58:52.451Z"
            },
            {
                "id": 8,
                "chinese": "<i>sub.+</i>们",
                "pinyin": "<i>sub.+</i> men",
                "english": "Plural",
                "examplePinyin": "rén<b>men</b>",
                "literal": "person <b>plural</b>",
                "exampleEnglish": "People",
                "info": "",
                "checked": true,
                "type": "Particle",
                "createdAt": "2025-04-26T20:58:52.451Z"
            },
            {
                "id": 9,
                "chinese": "很<i>+Adj.</i>",
                "pinyin": "Hěn <i>+Adj.</i>",
                "english": "very/quite/rather",
                "examplePinyin": "zhōngguó <b>hěn</b> dà",
                "literal": "china <b>very</b> big",
                "exampleEnglish": "China is big",
                "info": "for descriptions",
                "checked": true,
                "type": "Adverb",
                "createdAt": "2025-03-26T20:58:52.451Z"
            },
            {
                "id": 10,
                "chinese": "谁",
                "pinyin": "shéi",
                "english": "Who?",
                "examplePinyin": "tā shì <b>shéi?</b>",
                "literal": "he is <b>who?</b>",
                "exampleEnglish": "who is he ?",
                "info": "",
                "checked": true,
                "type": "Pronoun",
                "createdAt": "2025-02-26T20:58:52.451Z"
            }
        ]
    },
    {
        "groupName": "ungrouped",
        "id": 11,
        "words": [
            {
                "id": 12,
                "chinese": "他/她",
                "pinyin": "tā",
                "english": "He/Him/She/Her/it",
                "examplePinyin": "<b>tā</b> shì wǒ de péngyǒu",
                "literal": "<b>he</b> is my friend",
                "exampleEnglish": "He's my friend",
                "info": "Male and female characters are pronounced the same",
                "checked": true,
                "type": "Pronoun",
                "createdAt": "2025-01-26T20:58:52.451Z"
            },
            {
                "id": 13,
                "chinese": "<i>pro.+</i>的",
                "pinyin": "<i>pro.+</i> de",
                "english": "my/mine/our/ours/your/yours<br/>his/her/hers/their/theirs",
                "examplePinyin": "<b>wǒ de</b> bǐ",
                "literal": "<b>my</b> pen",
                "exampleEnglish": "My pen",
                "info": "Possessive pronouns",
                "checked": true,
                "type": "Particle",
                "createdAt": "2024-09-26T20:58:52.451Z"
            },
            {
                "id": 14,
                "chinese": "不<i>+Verb.</i>",
                "pinyin": "Bù <i>+Verb.</i>",
                "english": "not to",
                "examplePinyin": "wǒ <b>bù</b> rèn shi nǐ",
                "literal": "i <b>not</b> know you",
                "exampleEnglish": "I don't know you",
                "info": "To Negate verbs",
                "checked": true,
                "type": "Adverb",
                "createdAt": "2023-09-26T20:58:52.451Z"
            },
            {
                "id": 15,
                "chinese": "吗",
                "pinyin": "ma?",
                "english": "yes or no ?",
                "examplePinyin": "nǐ shì zhōngguó rén <b>ma?</b>",
                "literal": "you are chinese <b>aren't you ?</b>",
                "exampleEnglish": "Are you chinese ?",
                "info": "",
                "checked": true,
                "type": "Particle",
                "createdAt": "2022-09-26T20:58:52.451Z"
            }
        ]
    }
];

export class VocabDB {
    static async load() {
        const data = await localforage.getItem('vocabulary');
        return data || initialData;
    }

    // Reset to initial data
    static async reset() {
        await localforage.setItem('vocabulary', initialData);
        return initialData;
    }

    // Add a new word to a group
    static async addWord(groupId, newWord) {
        const data = await this.load();
        const group = data.find(g => g.id === groupId);
        if (group) {
            newWord.id = Date.now(); // Simple ID generation
            newWord.createdAt = new Date().toISOString();
            group.words.push(newWord);
            await this.save(data);
        }
        return data;
    }

    // Toggle word checked status
    static async toggleWord(groupId, wordId) {
        const data = await this.load();
        const group = data.find(g => g.id === groupId);
        if (group) {
            const word = group.words.find(w => w.id === wordId);
            if (word) {
                word.checked = !word.checked;
                await this.save(data);
            }
        }
        return data;
    }

    static async addGroup(groupName) {
        const data = await this.load();
        const newGroup = {
            groupName,
            id: Date.now(),
            words: []
        };
        data.push(newGroup);
        await this.save(data);
        return data;
    }

    static async save(data) {
        const cleanData = this.deepCleanForIndexedDB(data);
        await localforage.setItem('vocabulary', cleanData);
    }
    static deepCleanForIndexedDB(obj) {
        if (obj === null || obj === undefined) {
            return null;
        }
        // Handle primitive types
        if (typeof obj !== 'object') {
            return obj;
        }
        // Handle Date objects
        if (obj instanceof Date) {
            return obj.toISOString(); // Convert to string
        }
        // Handle arrays
        if (Array.isArray(obj)) {
            // Remove any undefined values and clean each item
            return obj
                .filter(item => item !== undefined)
                .map(item => this.deepCleanForIndexedDB(item));
        }
        // Handle objects
        const cleanObj = {};
        for (const [key, value] of Object.entries(obj)) {
            // Skip undefined values and functions
            if (value !== undefined && typeof value !== 'function') {
                cleanObj[key] = this.deepCleanForIndexedDB(value);
            }
        }
        return cleanObj;
    }
}