<script>
    import { onMount } from "svelte";
    import { VocabDB } from "$lib/db.js";

    let groups = [];
    let isLoading = true;
    let activeGroup = null;
    let showAddWordForm = false;
    let showAddGroupForm = false;
    let newWord = {};
    let newGroupName = "";

    onMount(async () => {
        groups = await VocabDB.load();
        isLoading = false;
    });

    async function toggleWord(groupId, wordId) {
        groups = await VocabDB.toggleWord(groupId, wordId);
    }

    async function addWord(groupId) {
        if (newWord.chinese && newWord.pinyin && newWord.english) {
            groups = await VocabDB.addWord(groupId, {
                ...newWord,
                checked: true,
                type: newWord.type || "Other",
                examplePinyin: newWord.examplePinyin || "",
                literal: newWord.literal || "",
                exampleEnglish: newWord.exampleEnglish || "",
                info: newWord.info || "",
            });
            newWord = {};
            showAddWordForm = false;
        }
    }

    async function addGroup() {
        if (newGroupName.trim()) {
            groups = await VocabDB.addGroup(newGroupName.trim());
            newGroupName = "";
            showAddGroupForm = false;
        }
    }

    async function resetData() {
        if (confirm("Reset all data to initial state?")) {
            groups = await VocabDB.reset();
        }
    }

    function setActiveGroup(group) {
        activeGroup = activeGroup?.id === group.id ? null : group;
    }
</script>

<div class="container">
    <div class="header">
        <h1>Chinese Vocabulary App</h1>
        <div>
            <button on:click={() => (showAddGroupForm = !showAddGroupForm)} class="secondary"> Add Group </button>
            <button on:click={resetData} class="secondary">Reset Data</button>
        </div>
    </div>

    {#if isLoading}
        <p>Loading vocabulary data...</p>
    {:else}
        {#if showAddGroupForm}
            <div class="form-container">
                <h3>Add New Group</h3>
                <input bind:value={newGroupName} placeholder="Group name" />
                <div class="form-actions">
                    <button on:click={addGroup}>Add Group</button>
                    <button on:click={() => (showAddGroupForm = false)} class="secondary">Cancel</button>
                </div>
            </div>
        {/if}

        <div class="groups-grid">
            {#each groups as group (group.id)}
                <div class="group-card {activeGroup?.id === group.id ? 'active' : ''}">
                    <div class="group-header" on:click={() => setActiveGroup(group)}>
                        <div class="group-name">{group.groupName}</div>
                        <div class="word-count">{group.words.length} words</div>
                    </div>

                    {#if activeGroup?.id === group.id}
                        <div class="words-list">
                            {#each group.words as word (word.id)}
                                <div class="word-item {word.checked ? '' : 'unchecked'}">
                                    <label>
                                        <input type="checkbox" class="checkbox" checked={word.checked} on:change={() => toggleWord(group.id, word.id)} />
                                        <div class="word-chinese" innerHTML={word.chinese}></div>
                                        <div class="word-pinyin" innerHTML={word.pinyin}></div>
                                        <div class="word-english" innerHTML={word.english}></div>
                                        {#if word.examplePinyin}
                                            <div class="word-example">
                                                <strong>Example:</strong>
                                                <span innerHTML={word.examplePinyin}></span> → "{word.exampleEnglish}"
                                            </div>
                                        {/if}
                                        {#if word.info}
                                            <div class="word-info">{word.info}</div>
                                        {/if}
                                        <div class="word-meta">
                                            <span>{word.type}</span>
                                            <span>{new Date(word.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </label>
                                </div>
                            {/each}

                            {#if showAddWordForm && activeGroup.id === group.id}
                                <div class="form-container">
                                    <h4>Add New Word to {group.groupName}</h4>
                                    <input bind:value={newWord.chinese} placeholder="Chinese" />
                                    <input bind:value={newWord.pinyin} placeholder="Pinyin" />
                                    <input bind:value={newWord.english} placeholder="English" />
                                    <select bind:value={newWord.type}>
                                        <option value="Pronoun">Pronoun</option>
                                        <option value="Particle">Particle</option>
                                        <option value="Adverb">Adverb</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <input bind:value={newWord.examplePinyin} placeholder="Example Pinyin" />
                                    <input bind:value={newWord.exampleEnglish} placeholder="Example English" />
                                    <input bind:value={newWord.info} placeholder="Info" />
                                    <div class="form-actions">
                                        <button on:click={() => addWord(group.id)}>Add Word</button>
                                        <button on:click={() => (showAddWordForm = false)} class="secondary">Cancel</button>
                                    </div>
                                </div>
                            {:else}
                                <button
                                    on:click={() => {
                                        showAddWordForm = true;
                                        activeGroup = group;
                                    }}>
                                    Add Word
                                </button>
                            {/if}
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    {/if}
</div>
