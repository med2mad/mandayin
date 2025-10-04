<script>
    import { onMount, tick } from "svelte";
    import { page } from "$app/stores";
    import { dndzone } from "svelte-dnd-action";
    import { cardsStyling, downloadJSON } from "$lib/utils.js";
    import Group from "$lib/components/Group.svelte";

    const { data } = $props();
    let groups = $state([]);
    let loading = $state(true);
    let error = $state(null);
    let cards = $state(true);
    let sortBy = $state("date");
    let sortDirection = $state("desc");

    onMount(async () => {
        try {
            groups = data.x.default;
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
</script>

<a href="/grammar" target="_self">Grammar</a>
<a href="/vocabulary" target="_self">Vocabulary</a>
<input bind:checked={cards} type="checkbox" id="toggleLayout" />
<button onclick={() => downloadJSON(groups, `${$page.params.list}.json`, true)}>Download JSON</button>
<button onclick={addGroup}>Add group</button>
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
                <Group {group} {groupIndex} {cards} {groupForward} {groupBack} {removeGroup} ungrouped={false} />
            {/if}
        {/each}
    </div>
    <Group
        group={groups[groups.length - 1]}
        groupIndex={groups.length - 1}
        {cards}
        {groupForward}
        {groupBack}
        {removeGroup}
        ungrouped={true} />
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
</style>
