<script>
    import { onMount, tick } from "svelte";
    import { page } from "$app/stores";
    import { dndzone } from "svelte-dnd-action";
    import { flip } from "svelte/animate";
    import { cardsStyling, downloadJSON } from "$lib/index.js";
    import Group from "$lib/components/Group.svelte";

    const { data } = $props();
    let words = [];
    let groups = $state([]);
    let loading = $state(true);
    let error = $state(null);
    let cards = $state(true);
    let sortBy = $state("id");
    let groupBy = $state("group");
    let sortDirection = $state("asc");

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
                if (sortBy === "id") {
                    result = a.id - b.id;
                } else if (sortBy === "type") {
                    result = (a.group || "").localeCompare(b.group || "");
                }
                return sortDirection === "asc" ? result : -result;
            });
        });
    }

    function addGroup() {
        groups.push({
            id: groups.length + 1,
            groupName: prompt("Group name"),
            words: [],
        });
    }

    async function group() {
        // groups = [];
        // const groupsMap = {};
        // words.forEach((word) => {
        //     const g = word[groupBy];
        //     if (!groupsMap[g]) {
        //         groupsMap[g] = { id: groups.length + 1, groupName: g, words: [] };
        //         groups.push(groupsMap[g]);
        //     }
        //     groupsMap[g].words.push(word);
        // });
        // groups.push(groupsMap[g]);

        await tick();
        cardsStyling();
    }

    function removeGroup(groupIndex) {
        groups = groups.filter((_, index) => index !== groupIndex);
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
    <select id="group" bind:value={groupBy} onchange={group}>
        <option value="type">types</option>
        <option value="group">groups</option>
    </select>

    <select id="sort" bind:value={sortBy} onchange={sortWords}>
        <option value="id">date</option>
        <option value="type">type</option>
        <option value="group">group</option>
    </select>

    <select id="sortDirection" bind:value={sortDirection} onchange={sortWords}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
    </select>
</div>

{#if loading}
    <img src="/spinner.gif" alt="Loading..." />
{:else if error}
    <p class="error">Error: {error}</p>
{:else}
    <div class="groups" style="margin-bottom: 10px;">
        {#each groups as group, groupIndex (group.id)}
            {#if groupIndex != groups.length - 1}
                <Group
                    {group}
                    {groupIndex}
                    {groupBy}
                    {cards}
                    {groupForward}
                    {groupBack}
                    {removeGroup}
                    ungrouped={false} />
            {/if}
        {/each}
    </div>
    <Group
        group={groups[groups.length - 1]}
        groupIndex={groups.length - 1}
        {groupBy}
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
