<script>
    import { dndzone } from "svelte-dnd-action";
    import { flip } from "svelte/animate";
    import Details from "$lib/components/Details.svelte";

    let currentWord;
    let showModal = false;

    export let group, cards, groupIndex, ungrouped, groupBack, groupForward, removeGroup;
</script>

<div class={"group" + (ungrouped ? " ungrouped" : " grouped")}>
    {#if !ungrouped}
        <div class="group-header">
            <h3>
                {group.groupName}
                <span class="word-count">({group.words.length} words)</span>
            </h3>

            <div class="group-actions">
                <button style="margin-right: 10px;" onclick={() => groupBack(groupIndex)}>&larr;</button>
                <button style="margin-right: 10px;" onclick={() => groupForward(groupIndex)}>&rarr;</button>
                <button class="remove-group" onclick={() => removeGroup(groupIndex)}>×</button>
            </div>
        </div>
    {:else}
        <div class="group-header" style="backgroud: rgb(221, 144, 71)">
            <h3>
                Ungrouped
                <span class="word-count">({group.words.length} words)</span>
            </h3>
        </div>
    {/if}
    <div
        class={"group-body" + (ungrouped ? " ungrouped" : " grouped")}
        style:flex-direction={cards ? "row" : "column"}
        use:dndzone={{ items: group.words, flipDurationMs: 100 }}
        onconsider={(e) => (group.words = e.detail.items)}
        onfinalize={(e) => {
            group.words = e.detail.items;
        }}>
        {#each group.words as word, i (word.id)}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
                class="word"
                style:width={cards ? "" : "100%"}
                animate:flip={{ duration: 300 }}
                onclick={async () => {
                    currentWord = group.words[i];
                    showModal = true;
                }}>
                <div class={"type " + word.type}>{word.type}</div>
                <div class="checked">
                    <input type="checkbox" checked={word.checked} onchange={() => (word.checked = !word.checked)} />
                </div>
                <h2>{@html word.chinese}</h2>
                <p class="pinyin">{@html word.pinyin}</p>
                <p>{@html word.english}</p>
                <!-- -----details------- -->
                {#if word.examples.length > 0}
                    <div class="example">
                        <p class="ch">
                            {@html word.examples[0].pinyin}<br />
                            <em>{@html word.examples[0].literal}</em>
                        </p>
                        <p class="en">{word.examples[0].english}</p>
                    </div>
                {/if}
                <!-- -----details------- -->
            </div>
        {/each}
    </div>
</div>

<Details word={currentWord} {showModal} on:close={() => (showModal = false)} />

<style>
    .group {
        border: 2px solid #e0e0e0;
        border-radius: 12px;
        padding: 5px;
        min-width: 150px;
    }
    .group.grouped {
        background: #fafafa;
    }
    .group.ungrouped {
        background: #dd9047;
    }
    .group-header {
        padding: 10px;
        border: 2px solid #e0e0e0;
        border-radius: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .group.grouped .group-header {
        background: linear-gradient(to bottom, #d3d3d3, #ffffff, #d3d3d3);
    }
    .group.ungrouped .group-header {
        background: linear-gradient(to bottom, #dd9047, #ffffff, #dd9047);
    }
    .group-header h3 {
        color: #333;
        font-size: 1.2em;
        margin: 0;
    }
    .group-actions {
        display: flex;
        align-items: center;
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
    .group-body {
        border-radius: 12px;
        border: 2px solid #e0e0e0;
        box-shadow: inset 0px 0px 7px 0px;
        background-color: #e6e1e1;
        padding: 10px;
        margin-top: 5px;
        min-height: 200px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        align-items: flex-start;
        gap: 10px;
    }
    .ungrouped.group-body {
        background: rgb(107, 80, 55);
    }
    .word {
        border-radius: 8px;
        background: linear-gradient(to right, #d1d1d1, #ffffff);
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
    .word .Number {
        background-color: rgb(139, 155, 81);
    }
    .word .Character {
        background-color: rgb(139, 155, 81);
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
    .checked {
        position: absolute;
        top: 25px;
        left: 3px;
        cursor: default;
    }
    p {
        padding: 0;
    }
    /* ----------details---------- */
    .example {
        background-color: #facc76;
        padding: 0.5rem;
        border: 2px solid #bdbdbd;
        border-radius: 8px;
        margin: 0.5rem !important;
        max-height: 100px;
        overflow-y: auto;
    }
    .example p {
        padding: 0;
    }
    .example p.ch {
        line-height: 1rem;
    }
    .example p.en {
        border-top: dashed 1px #9c9c9c;
        padding-top: 0.6rem;
        font-weight: bold;
        font-style: italic;
    }
    .example p em {
        color: #666;
        font-size: 1rem;
    }
    /* ----------details---------- */
</style>
