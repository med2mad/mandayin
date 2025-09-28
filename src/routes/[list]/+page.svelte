<script>
    import { onMount, tick } from "svelte";
    import { page } from "$app/stores";
    import { dndzone } from "svelte-dnd-action";
    import { flip } from "svelte/animate";
    import { cardsStyling, downloadJSON } from "$lib/utils/utils.js";

    export let data;
    let words = [];
    let grouped = [];
    let loading = true;
    let error = null;
    let cards = true;
    let groups = true;
    let sortBy = "id";
    let sortDirection = "asc";

    onMount(async () => {
        try {
            words = data.x.default;
            loading = false;
        } catch (err) {
            error = err.message;
            loading = false;
        }

        const groupsMap = {};
        words.forEach((word) => {
            const g = word.group;
            if (!groupsMap[g]) {
                groupsMap[g] = { id: grouped.length + 1, group: g, words: [] };
                grouped.push(groupsMap[g]);
            }
            groupsMap[g].words.push(word);
        });

        await tick();
        cardsStyling();
    });

    function sortWords() {
        words = words.sort((a, b) => {
            let result;
            if (sortBy === "id") {
                result = a.id - b.id;
            } else if (sortBy === "type") {
                result = (a.group || "").localeCompare(b.group || "");
            }
            return sortDirection === "asc" ? result : -result;
        });
    }
</script>

<a href="/grammar" target="_self">Grammar</a>
<a href="/vocabulary" target="_self">Vocabulary</a>
<input bind:checked={cards} type="checkbox" id="toggleLayout" />
<button onclick={() => downloadJSON(words, `${$page.params.list}.json`)}>Download JSON</button>

<div class="sort-controls">
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
    <div
        class="groups-list"
        use:dndzone={{ items: grouped, flipDurationMs: 100, dropTargetStyle: {} }}
        onconsider={(e) => (grouped = e.detail.items)}
        onfinalize={(e) => {
            grouped = e.detail.items;
            cardsStyling();
            console.log(grouped);
        }}>
        {#each grouped as group (group.id)}
            <div
                class="words-list"
                style:flex-direction={cards ? "row" : "column"}
                use:dndzone={{ items: group.words, flipDurationMs: 100, dropTargetStyle: {} }}
                onconsider={(e) => (group.words = e.detail.items)}
                onfinalize={(e) => {
                    group.words = e.detail.items;
                    cardsStyling();
                }}
                animate:flip={{ duration: 300 }}>
                {#each group.words as word (word.id)}
                    <div class="word-card" style:width={cards ? "" : "100%"} animate:flip={{ duration: 300 }}>
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
        {/each}
    </div>
{/if}

<style>
    .words-list {
        padding: 2rem;
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        border: solid 2px black;
    }
    .word-card {
        border-radius: 8px;
        background: #f9f9f9;
        text-align: center;
        box-shadow: 0 0 5px #838383;
        min-width: 100px;
        margin: auto;
        position: relative;
    }
    .word-card .type {
        border-radius: 8px 8px 0 0;
        color: #adadad;
        font-size: 1.2rem;
    }
    .word-card .Adjectif {
        background-color: rgb(72, 161, 72);
    }
    .word-card .Verb {
        background-color: rgb(255, 81, 81);
    }
    .word-card .Adverb {
        background-color: rgb(161, 115, 72);
    }
    .word-card .Particle {
        background-color: rgb(161, 72, 156);
    }
    .word-card .Pronoun {
        background-color: rgb(72, 81, 161);
    }
    .word-card .Noun {
        background-color: rgb(72, 151, 161);
    }
    .word-card h2 {
        margin: 0;
        color: #2c3e50;
        font-size: 3rem;
        font-family: "Songti SC", "SimSun", "Songti TC", "Noto Serif CJK SC", serif;
    }
    .word-card .pinyin {
        font-weight: bold;
        color: #2c3e50;
    }
    .word-card p {
        font-size: 1.3rem;
        margin: 0.7rem 0;
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
        border-radius: 8px;
        margin: 0.5rem;
    }
    .example .ch {
        line-height: 1rem;
    }
    .example .en {
        border-top: dashed 1px #9c9c9c;
        margin-bottom: 0.3rem;
        padding-top: 0.3rem;
        font-weight: bold;
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
