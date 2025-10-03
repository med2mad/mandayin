<script>
    import { dndzone } from "svelte-dnd-action";
    import { flip } from "svelte/animate";
    import { cardsStyling } from "$lib/index.js";

    let { group, groupBy, cards, groupIndex, ungrouped, groupBack, groupForward, removeGroup } = $props();
</script>

<div class={"group" + (ungrouped ? " ungrouped" : " grouped")}>
    {#if !ungrouped}
        <div class="group-header">
            <h3>
                {group.groupName + (groupBy == "type" ? "s" : "")}
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
                    <input type="checkbox" checked={word.checked} onchange={() => (word.checked = !word.checked)} />
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
        background: rgb(221, 144, 71);
    }

    .group-header {
        padding: 10px;
        border: 2px solid #e0e0e0;
        border-radius: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(to bottom, #d3d3d3, #ffffff, #d3d3d3);
    }
    .group.grouped .group-header {
        background-color: #ecebeb;
    }
    .group.ungrouped .group-header {
        background-color: rgb(255, 243, 231);
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
        height: 100%;
        min-height: 200px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        align-items: flex-start;
        gap: 10px;
        border: 2px solid #e0e0e0;
        box-shadow: inset 0px 0px 7px 0px;
        padding: 10px;
        margin-top: 5px;
    }
    .ungrouped.group-body {
        background: rgb(107, 80, 55);
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
</style>
