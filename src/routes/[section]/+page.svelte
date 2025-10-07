<script>
    import { onMount, tick } from "svelte";
    import { page } from "$app/stores";
    import { dndzone } from "svelte-dnd-action";
    import { cardsStyling, downloadJSON } from "$lib/utils.js";
    import Group from "$lib/components/Group.svelte";
    import { VocabDB } from "$lib/db.js";

    // const { data } = $props();
    let loading = true;
    let error = null;
    let cards = true;
    let sortBy = "date";
    let sortDirection = "desc";

    let groups = [];
    let searchTerm = "";

    async function filter() {
        groups = await VocabDB.load($page.params.section);

        groups.forEach((group) => {
            group.words = group.words.filter((word) => {
                if (!searchTerm) return true;
                const term = searchTerm.toLowerCase();
                return word.english?.toLowerCase().includes(term);
            });
        });
    }

    function findDuplicateIds(data) {
        const idMap = new Map();

        data.forEach((group, groupIndex) => {
            if (idMap.has(group.id)) {
                console.warn(`Duplicate group ID ${group.id} at indexes ${idMap.get(group.id)} and ${groupIndex}`);
            } else {
                idMap.set(group.id, groupIndex);
            }

            group.words.forEach((word, wordIndex) => {
                if (idMap.has(word.id)) {
                    console.warn(`Duplicate word ID ${word.id} in group ${groupIndex}, word ${wordIndex}`);
                } else {
                    idMap.set(word.id, `${groupIndex}-${wordIndex}`);
                }
            });
        });
    }

    onMount(async () => {
        try {
            groups = await VocabDB.load($page.params.section);
            loading = false;
        } catch (err) {
            error = err.message;
            loading = false;
        }

        group();
    });

    function sortWords() {
        groups.forEach((group) => {
            group.words = group.words.sort((a, b) => {
                let result;
                if (sortBy === "date") {
                    result = a.createdAt.localeCompare(b.createdAt);
                } else if (sortBy === "type") {
                    result = (a.type || "").localeCompare(b.type || "");
                }
                return sortDirection === "asc" ? result : -result;
            });
        });
    }

    function addGroup() {
        groups.unshift({
            id: groups.length + 1,
            groupName: prompt("Group name"),
            words: [],
        });
    }

    async function group() {
        await tick();
        cardsStyling();
    }

    async function removeGroup(groupIndex) {
        const group = groups[groupIndex];
        if (confirm(`${group.words.length} words will be ungrouped.`)) {
            const wordsToMove = group.words;
            groups[groups.length - 1].words = [...groups[groups.length - 1].words, ...wordsToMove];
            groups = groups.filter((_, index) => index !== groupIndex);
            await tick();
            cardsStyling();
        }
    }

    function groupBack(i) {
        if (i > 0) [groups[i - 1], groups[i]] = [groups[i], groups[i - 1]];
    }
    function groupForward(i) {
        if (i < groups.length - 2) [groups[i + 1], groups[i]] = [groups[i], groups[i + 1]];
    }

    async function handleImport(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (confirm("This will replace all your current vocabulary. Continue?")) {
            await importVocabulary(file);
        }
        event.target.value = "";
    }

    function importVocabulary(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = JSON.parse(e.target.result);
                groups = data;
                resolve(data);
            };
            reader.readAsText(file);
        });
    }
</script>

<div class="data-management">
    <div class="data-actions">
        <button onclick={() => downloadJSON(groups, `${$page.params.section}.json`, true)} class="secondary"> 📥 Export Backup </button>
        <button onclick={document.getElementById("import-file").click()} class="secondary"> 📥 Import Backup </button>
        <input id="import-file" type="file" accept=".json" onchange={handleImport} style="display: none;" />
    </div>
</div>

<div class="search-box">
    <input type="text" bind:value={searchTerm} oninput={filter} placeholder="Search vocabulary..." class="search-input" />
    <span class="search-icon">🔍</span>
</div>

<a href="/grammar" target="_self">Grammar</a>
<a href="/vocabulary" target="_self">Vocabulary</a>
<input bind:checked={cards} type="checkbox" id="toggleLayout" />
<button onclick={addGroup}>Add group</button>
<button onclick={() => VocabDB.save(groups, $page.params.section)}>save</button>
<div class="sort-controls">
    <select id="sort" bind:value={sortBy} onchange={sortWords}>
        <option value="date">date</option>
        <option value="type">type</option>
    </select>

    <select id="sortDirection" bind:value={sortDirection} onchange={sortWords}>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
    </select>
</div>

{#if loading}
    <img src="/spinner.gif" alt="Loading..." />
{:else if error}
    <p class="error">Error: {error}</p>
{:else}
    <div
        class="groups"
        use:dndzone={{ items: groups, flipDurationMs: 100, type: "columns" }}
        onconsider={(e) => (groups = e.detail.items)}
        onfinalize={(e) => {
            groups = e.detail.items;
            cardsStyling();
        }}>
        {#each groups as group, groupIndex (group.id)}
            {#if groupIndex != groups.length - 1}
                <Group bind:group={groups[groupIndex]} {groupIndex} {cards} {groupForward} {groupBack} {removeGroup} ungrouped={false} />
            {/if}
        {/each}
    </div>
    <Group bind:group={groups[groups.length - 1]} groupIndex={groups.length - 1} {cards} {groupForward} {groupBack} {removeGroup} ungrouped={true} />
{/if}

<style>
    .groups {
        margin-top: 20px;
        display: flex;
        align-items: flex-start;
        justify-content: space-evenly;
        gap: 20px;
    }
    .error {
        color: #e74c3c;
        text-align: center;
    }
    .sort-controls {
        display: flex;
        gap: 10px;
        margin: 10px 0;
    }
    .sort-controls select {
        padding: 5px;
    }

    @media (max-width: 767px) {
        .groups {
            flex-wrap: wrap;
        }
    }

    button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 6px;
        font-size: 0.9rem;
        cursor: pointer;
        font-weight: 600;
        white-space: nowrap;
    }

    button.secondary {
        background: #f8f9fa;
        color: #666;
    }

    button.secondary:hover {
        background: #e9ecef;
        transform: translateY(-1px);
    }

    .data-management {
        background: #fad6b2;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 1.5rem;
    }

    .search-box {
        position: relative;
        flex: 1;
        min-width: 200px;
        max-width: 400px;
    }

    .search-input {
        width: 100%;
        padding: 0.5rem 0.5rem 0.5rem 2rem;
        border: 2px solid #e9ecef;
        border-radius: 6px;
        font-size: 0.9rem;
        box-sizing: border-box;
    }

    .search-icon {
        position: absolute;
        left: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        color: #666;
        font-size: 0.9rem;
    }
</style>
