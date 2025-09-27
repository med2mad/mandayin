<script>
    import { onMount, tick } from "svelte";
    import { page } from "$app/stores";
    import { dndzone } from "svelte-dnd-action";
    import { flip } from "svelte/animate";
    import { formatPinyin } from "$lib/utils/pinyin";

    export let data;
    let words = [];
    let loading = true;
    let error = null;
    let cards = true;

    onMount(async () => {
        try {
            words = data.x.default;
            loading = false;
        } catch (err) {
            error = err.message;
            loading = false;
        }

        await tick();
        f();
    });
    function f() {
        document.querySelectorAll("i").forEach((el) => {
            el.style =
                "color:#666; font-size:1rem; font-family:calibri;font-weight:normal;";
        });
        document.querySelectorAll("b").forEach((el) => {
            el.style = "color:red;font-weight:normal;";
        });
    }

    function downloadJSON() {
        const dataStr = JSON.stringify(words, null, 2);
        const dataBlob = new Blob([dataStr], { type: "application/json" });

        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${$page.params.list}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }
</script>

<a href="/grammar" target="_self">Grammar</a>
<a href="/vocabulary" target="_self">Vocabulary</a>
<input bind:checked={cards} type="checkbox" id="toggleLayout" />
<button on:click={downloadJSON}>Download JSON</button>

{#if loading}
    <img src="/spinner.gif" alt="Loading..." />
{:else if error}
    <p class="error">Error: {error}</p>
{:else}
    <div
        class="words-list"
        style:flex-direction={cards ? "row" : "column"}
        use:dndzone={{ items: words, flipDurationMs: 100, dropTargetStyle: {} }}
        on:consider={(e) => (words = e.detail.items)}
        on:finalize={(event) => {
            words = event.detail.items;
            f();
        }}
    >
        {#each words as word, i (word.id)}
            <div
                data-id={word.id}
                class="word-card"
                style:width={cards ? "" : "100%"}
                animate:flip={{ duration: 300 }}
            >
                <h2>{@html word.chinese}</h2>
                <div class="checked">
                    <input
                        type="checkbox"
                        checked={word.checked}
                        on:change={() => (words[i].checked = !words[i].checked)}
                    />
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
{/if}

<style>
    .words-list {
        padding: 2rem;
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
    }
    .word-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 0.5rem;
        background: #f9f9f9;
        text-align: center;
        box-shadow: 0 0 5px #838383;
        min-width: 100px;
        margin: auto;
        position: relative;
    }
    .word-card h2 {
        margin: 0;
        color: #2c3e50;
        font-size: 3rem;
        font-family: "Songti SC", "SimSun", "Songti TC", "Noto Serif CJK SC",
            serif;
    }
    .word-card .pinyin {
        font-weight: bold;
        color: #2c3e50;
    }
    .word-card p {
        font-size: 1.3rem;
        margin: 0.7rem 0;
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
        top: 9px;
        right: 3px;
        cursor: default;
    }
    .info span {
        color: #3498db;
        border: solid #3498db 2px;
        background-color: #bcd1df;
        padding: 0.1rem 0.5rem;
        border-radius: 20px;
        font-weight: bold;
    }
    .checked {
        position: absolute;
        top: 6px;
        left: 3px;
        cursor: default;
    }
    .example {
        background-color: #facc76;
        padding: 0.5rem;
        border-radius: 8px;
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
</style>
