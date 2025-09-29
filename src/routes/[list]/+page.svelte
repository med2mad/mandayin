<script>
    import { onMount, tick } from "svelte";
    import { page } from "$app/stores";
    import { dndzone } from "svelte-dnd-action";
    import { flip } from "svelte/animate";
    import { cardsStyling, downloadJSON } from "$lib/index.js";

    export let data;
    let words = [];
    let groups = [];
    let loading = true;
    let error = null;
    let cards = true;
    let sortBy = "id";
    let groupBy = "type";
    let sortDirection = "asc";

    onMount(async () => {
        try {
            words = data.x.default;
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
        groups = groups;
    }

    function addGroup() {
        groups.push({
            id: groups.length + 1,
            groupName: prompt("Group name"),
            words: [],
        });
        groups = groups;
    }

    async function group() {
        groups = [];
        const groupsMap = {};
        words.forEach((word) => {
            const g = word[groupBy];
            if (!groupsMap[g]) {
                groupsMap[g] = { id: groups.length + 1, groupName: g, words: [] };
                groups.push(groupsMap[g]);
            }
            groupsMap[g].words.push(word);
        });
        groups = groups;
        await tick();
        cardsStyling();
    }
</script>

<a href="/grammar" target="_self">Grammar</a>
<a href="/vocabulary" target="_self">Vocabulary</a>
<input bind:checked={cards} type="checkbox" id="toggleLayout" />
<button onclick={() => downloadJSON(groups, `${$page.params.list}.json`)}>Download JSON</button>
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
    <div class="groups">
        {#each groups as group (group.id)}
            <div class="group">
                <div class="group-header"><h3>{group.groupName + (groupBy == "type" ? "s" : "")}</h3></div>
                <div
                    class="group-body"
                    style:flex-direction={cards ? "row" : "column"}
                    use:dndzone={{ items: group.words, flipDurationMs: 100, dropTargetStyle: {} }}
                    onconsider={(e) => (group.words = e.detail.items)}
                    onfinalize={(e) => {
                        group.words = e.detail.items;
                        cardsStyling();
                    }}>
                    {#each group.words as word (word.id)}
                        <div class="word" style:width={cards ? "" : "100%"} animate:flip={{ duration: 300 }}>
                            <div class={"type " + word.type}>{word.type}</div>
                            <h2>{@html word.chinese}</h2>
                            <div class="checked">
                                <input
                                    type="checkbox"
                                    checked={word.checked}
                                    onchange={() => (word.checked = !word.checked)} />
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
                    {/each}
                </div>
            </div>
        {/each}
    </div>
{/if}

<style>
    .groups {
        gap: 20px;
        margin-top: 20px;
        display: flex;
    }
    .group {
        border: 2px solid #e0e0e0;
        border-radius: 12px;
        padding: 5px;
        background: #fafafa;
    }
    .group-header h3 {
        margin: 0;
        color: #333;
        font-size: 1.2em;
        padding: 10px;
        border: 2px solid #e0e0e0;
        border-radius: 12px;
        background-color: #ecebeb;
    }
    .group-body {
        border-radius: 12px;
        padding: 10px 0px;
        height: 100%;
        min-height: 200px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        gap: 10px;
    }
    .word {
        border-radius: 8px;
        background: linear-gradient(to right, #ffffff, #ececec);
        text-align: center;
        box-shadow: 0 0 5px #838383;
        min-width: 100px;
        margin: 0 auto 5px auto;
        position: relative;
        padding-bottom: 1px;
    }
    .word .type {
        border-radius: 8px 8px 0 0;
        color: #adadad;
        font-size: 1.2rem;
    }
    .word .Adjectif {
        background-color: rgb(72, 161, 72);
    }
    .word .Verb {
        background-color: rgb(255, 81, 81);
    }
    .word .Adverb {
        background-color: rgb(161, 115, 72);
    }
    .word .Particle {
        background-color: rgb(161, 72, 156);
    }
    .word .Pronoun {
        background-color: rgb(72, 81, 161);
    }
    .word .Noun {
        background-color: rgb(72, 151, 161);
    }
    .word h2 {
        margin: 0;
        color: #2c3e50;
        font-size: 3rem;
        font-family: "Songti SC", "SimSun", "Songti TC", "Noto Serif CJK SC", serif;
    }
    .word .pinyin {
        font-weight: bold;
        color: #2c3e50;
    }
    .word p {
        font-size: 1.3rem;
        margin: 0.4rem 0;
        padding: 0 0.5rem;
        font-family: "calibri", sans-serif;
    }
    em {
        color: #666;
        font-size: 1rem;
    }
    .error {
        color: #e74c3c;
        text-align: center;
    }
    .info {
        position: absolute;
        top: 28px;
        right: 6px;
        cursor: default;
    }
    .info span {
        color: gold;
        border: dashed gold 1px;
        padding: 0.1rem 0.5rem;
        border-radius: 20px;
        font-weight: bold;
    }
    .checked {
        position: absolute;
        top: 25px;
        left: 3px;
        cursor: default;
    }
    .example {
        background-color: #facc76;
        padding: 0.5rem;
        border: 2px solid #bdbdbd;
        border-radius: 8px;
        margin: 0.5rem !important;
    }
    .example p {
        padding: 0;
    }
    .example .ch {
        line-height: 1rem;
    }
    .example .en {
        border-top: dashed 1px #9c9c9c;
        padding-top: 0.6rem;
        font-weight: bold;
        font-style: italic;
    }
    .sort-controls {
        display: flex;
        gap: 10px;
        margin: 10px 0;
    }
    .sort-controls select {
        padding: 5px;
    }
</style>
