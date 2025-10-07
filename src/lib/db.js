import localforage from 'localforage';
import { data } from "$lib/data";

localforage.config({
    name: 'ChineseVocabApp',
    version: 1.0,
    storeName: 'vocabulary_data'
});

export class VocabDB {
    static async load(section) {
        const data = await localforage.getItem(section);
        return data || data[section];
    }

    static async reset(section) {
        await localforage.setItem(section, data[section]);
        return data[section];
    }

    // Add word to a group
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

    // check word
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

    static async save(data, section) {
        const cleanData = this.deepCleanForIndexedDB(data);
        await localforage.setItem(section, cleanData);
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