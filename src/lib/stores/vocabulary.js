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
        store.subscribe(($value) => {
            localStorage.setItem(key, JSON.stringify($value));
        });
    }

    return store;
}

export const vocabulary = createPersistentStore('chinese-vocabulary', []);
export const isLoading = writable(false);

// Add a new item
export function addItem(newItem) {
    const item = {
        id: Date.now().toString(),
        ...newItem,
        createdAt: new Date().toISOString()
    };

    vocabulary.update(($vocabulary) => [...$vocabulary, item]);
    return item;
}

// Delete an item
export function deleteItem(id) {
    vocabulary.update(($vocabulary) => $vocabulary.filter(item => item.id !== id));
    return true;
}
