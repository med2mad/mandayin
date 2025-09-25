import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Create store with localStorage persistence
function createPersistentStore(key, defaultValue) {
    const store = writable(defaultValue);

    if (browser) {
        // Load from localStorage on client
        const json = localStorage.getItem(key);
        if (json) {
            try {
                store.set(JSON.parse(json));
            } catch (e) {
                console.error('Error loading from localStorage:', e);
            }
        }

        // Save to localStorage on changes
        store.subscribe(value => {
            localStorage.setItem(key, JSON.stringify(value));
        });
    }

    return store;
}

export const vocabulary = createPersistentStore('chinese-vocabulary', []);
export const isLoading = writable(false);

// No API calls needed - everything is client-side
export function addItem(newItem) {
    const item = {
        id: Date.now().toString(),
        ...newItem,
        createdAt: new Date().toISOString()
    };

    vocabulary.update(items => [...items, item]);
    return item;
}

export function deleteItem(id) {
    vocabulary.update(items => items.filter(item => item.id !== id));
    return true;
}

export function loadVocabulary() {
    // Nothing to do - data is automatically loaded from localStorage
    isLoading.set(false);
}

// Export/Import functionality for backups
export function exportVocabulary() {
    const data = JSON.stringify($vocabulary, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chinese-vocabulary-backup.json';
    a.click();
    URL.revokeObjectURL(url);
}

export function importVocabulary(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (Array.isArray(data)) {
                    vocabulary.set(data);
                    resolve(data);
                } else {
                    reject(new Error('Invalid file format'));
                }
            } catch (error) {
                reject(error);
            }
        };
        reader.readAsText(file);
    });
}