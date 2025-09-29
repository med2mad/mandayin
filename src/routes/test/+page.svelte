<script>
    import { onMount, tick } from "svelte";
    import { dndzone } from "svelte-dnd-action";
    import { flip } from "svelte/animate";
    import { cardsStyling, downloadJSON } from "$lib/index";

    export let data;

    let groups = [];
    let loading = true;
    let error = null;
    let cards = true;
    let sortBy = "id";
    let sortDirection = "asc";
    let groupKey = 0; // Add a key to force re-render

    function initializeGroups() {
        const allWords = data.x.default;

        // Group words by the "group" property from your JSON
        const groupsMap = {};

        allWords.forEach((word) => {
            const groupName = word.group || "ungrouped";
            if (!groupsMap[groupName]) {
                groupsMap[groupName] = [];
            }
            groupsMap[groupName].push(word);
        });

        // Convert to array format for the template
        groups = Object.entries(groupsMap).map(([groupName, words], index) => ({
            id: `group-${index}`,
            name: groupName,
            words: words,
        }));
    }

    function handleConsider(event, groupIndex) {
        groups[groupIndex].words = event.detail.items;
        groups = groups; // Trigger reactivity
    }

    function handleFinalize(event, groupIndex) {
        const { items, info } = event.detail;

        // Update the target group
        groups[groupIndex].words = items;

        // If item came from another group, remove it from the source group
        if (info && info.sourceDndZoneId !== undefined) {
            const sourceGroupIndex = parseInt(info.sourceDndZoneId);
            if (sourceGroupIndex !== groupIndex) {
                // Find the moved item
                const movedItemId = info.id;

                // Remove from source group
                groups[sourceGroupIndex].words = groups[sourceGroupIndex].words.filter(
                    (word) => word.id !== movedItemId,
                );

                // Update the group property of the moved word
                const movedWord = items.find((word) => word.id === movedItemId);
                if (movedWord) {
                    movedWord.group = groups[groupIndex].name;
                }
            }
        }

        groups = groups; // Trigger reactivity
        cardsStyling();
    }

    function sortWords() {
        groups = groups.map((group) => ({
            ...group,
            words: [...group.words].sort((a, b) => {
                let result = 0;

                if (sortBy === "id") {
                    result = a.id - b.id;
                } else if (sortBy === "type") {
                    result = a.type.localeCompare(b.type);
                } else if (sortBy === "date") {
                    result = new Date(a.date) - new Date(b.date);
                } else if (sortBy === "group") {
                    result = a.group.localeCompare(b.group);
                }

                return sortDirection === "desc" ? -result : result;
            }),
        }));
    }

    // Function to create a new empty group
    async function addNewGroup() {
        const newGroupName = prompt("Enter new group name:");
        if (newGroupName && newGroupName.trim()) {
            const newGroup = {
                id: `group-${Date.now()}`,
                name: newGroupName.trim(),
                words: [],
            };

            // Create a new array to ensure reactivity
            groups = [...groups, newGroup];

            // Force reactivity and wait for DOM update
            await tick();

            // Increment the group key to force re-render of dnd zones
            groupKey++;
        }
    }

    // Function to remove a group and redistribute its words
    function removeGroup(groupIndex) {
        const group = groups[groupIndex];
        if (confirm(`Remove group "${group.name}"? The ${group.words.length} words will be moved to "ungrouped".`)) {
            // Move all words to ungrouped
            const wordsToMove = group.words;
            wordsToMove.forEach((word) => {
                word.group = "ungrouped";
            });

            // Find or create ungrouped group
            let ungroupedIndex = groups.findIndex((g) => g.name === "ungrouped");
            if (ungroupedIndex === -1) {
                // Create ungrouped group if it doesn't exist
                groups.push({
                    id: `group-${Date.now()}`,
                    name: "ungrouped",
                    words: [],
                });
                ungroupedIndex = groups.length - 1;
            }

            // Add words to ungrouped
            groups[ungroupedIndex].words = [...groups[ungroupedIndex].words, ...wordsToMove];

            // Remove the group
            groups = groups.filter((_, index) => index !== groupIndex);
            groupKey++; // Force re-render
        }
    }

    onMount(async () => {
        try {
            initializeGroups();
            loading = false;
        } catch (err) {
            error = err.message;
            loading = false;
        }

        await tick();
        cardsStyling();
    });
</script>

<!-- Your existing navigation and controls -->
<a href="/grammar" target="_self">Grammar</a>
<a href="/vocabulary" target="_self">Vocabulary</a>
<input bind:checked={cards} type="checkbox" id="toggleLayout" />
<button on:click={downloadJSON}>Download JSON</button>
<button on:click={addNewGroup}>Add New Group</button>

<div class="sort-controls">
    <select id="sort" bind:value={sortBy} on:change={sortWords}>
        <option value="id">id</option>
        <option value="type">type</option>
        <option value="date">date</option>
        <option value="group">group</option>
    </select>

    <select id="sortDirection" bind:value={sortDirection} on:change={sortWords}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
    </select>
</div>

{#if loading}
    <img src="/spinner.gif" alt="Loading..." />
{:else if error}
    <p class="error">Error: {error}</p>
{:else}
    <!-- Add the groupKey to force re-render of the entire groups container -->
    <div class="groups-container" key={groupKey}>
        {#each groups as group, groupIndex (group.id)}
            <div class="group">
                <div class="group-header">
                    <h3>{group.name}</h3>
                    <div class="group-actions">
                        <span class="word-count">({group.words.length} words)</span>
                        {#if group.name !== "ungrouped"}
                            <button class="remove-group" on:click={() => removeGroup(groupIndex)}>×</button>
                        {/if}
                    </div>
                </div>
                <div
                    class="words-list"
                    style:flex-direction={cards ? "row" : "column"}
                    use:dndzone={{
                        items: group.words,
                        flipDurationMs: 100,
                        dropTargetStyle: { "background-color": "#e8f5e8" },
                        dragDisabled: false,
                        dropFromOthersDisabled: false,
                        dndZone: groupIndex.toString(),
                    }}
                    on:consider={(e) => handleConsider(e, groupIndex)}
                    on:finalize={(e) => handleFinalize(e, groupIndex)}>
                    {#each group.words as word, wordIndex (word.id)}
                        <div
                            data-id={word.id}
                            class="word-card"
                            style:width={cards ? "" : "100%"}
                            animate:flip={{ duration: 300 }}>
                            <div class={"type " + word.type}>{word.type}</div>
                            <h2>{@html word.chinese}</h2>
                            <div class="checked">
                                <input
                                    type="checkbox"
                                    checked={word.checked}
                                    on:change={() => {
                                        group.words[wordIndex].checked = !group.words[wordIndex].checked;
                                        groups[groupIndex].words = [...group.words];
                                        groups = groups;
                                    }} />
                            </div>
                            {#if word.info}
                                <div class="info" title={word.info}><span>i</span></div>
                            {/if}
                            <p class="pinyin">{@html word.pinyin}</p>
                            <p>{@html word.english}</p>
                            {#if word.examplePinyin}
                                <div class="example">
                                    <p class="ch">
                                        {@html word.examplePinyin}<br />
                                        <em>{@html word.literal}</em>
                                    </p>
                                    <p class="en">{word.exampleEnglish}</p>
                                </div>
                            {/if}
                        </div>
                    {:else}
                        <div class="empty-group">
                            <p>Drag words here to add them to this group</p>
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
{/if}

<style>
    .groups-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 20px;
        margin-top: 20px;
    }

    .group {
        border: 2px solid #e0e0e0;
        border-radius: 12px;
        padding: 15px;
        background: #fafafa;
        min-height: 200px;
    }

    .group-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 0 15px 0;
        padding-bottom: 10px;
        border-bottom: 2px solid #e0e0e0;
    }

    .group-header h3 {
        margin: 0;
        color: #333;
        font-size: 1.2em;
    }

    .group-actions {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .word-count {
        color: #666;
        font-size: 0.9em;
    }

    .remove-group {
        background: #ff4444;
        color: white;
        border: none;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 16px;
        padding: 0;
    }

    .remove-group:hover {
        background: #cc0000;
    }

    .sort-controls {
        display: flex;
        gap: 10px;
        margin: 10px 0;
        align-items: center;
    }

    .sort-controls select {
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .words-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        min-height: 50px;
    }

    .word-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 12px;
        background: white;
        cursor: grab;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition:
            transform 0.2s,
            box-shadow 0.2s;
    }

    .word-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .word-card:active {
        cursor: grabbing;
    }

    .empty-group {
        text-align: center;
        color: #999;
        font-style: italic;
        padding: 20px;
        width: 100%;
    }

    button {
        padding: 8px 16px;
        background: #4caf50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background: #45a049;
    }
</style>
