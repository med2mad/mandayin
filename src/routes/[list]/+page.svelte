<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { dndzone } from "svelte-dnd-action";
    import { flip } from "svelte/animate";

    let words = [];
    let loading = true;
    let error = null;

    onMount(async () => {
        try {
            const data = await import(`$lib/data/${$page.params.list}.json`);
            words = data.default.sort((a, b) => a.order - b.order);
            loading = false;
        } catch (err) {
            error = err.message;
            loading = false;
        }
        window.words = words;
    });
</script>

<svelte:head>
    <title>Chinese Words</title>
</svelte:head>

<a href="/grammar" target="_self">Grammar</a>
<a href="/vocabulary" target="_self">Vocabulary</a>

{#if loading}
    <img src="/spinner.gif" alt="Loading..." />
{:else if error}
    <p class="error">Error: {error}</p>
{:else}
    <div
        class="words-list"
        use:dndzone={{ items: words, flipDurationMs: 100, dropTargetStyle: {} }}
        on:consider={(e) => (words = e.detail.items)}
        on:finalize={(e) => (
            (words = e.detail.items),
            words.forEach((word, index) => (word.order = index + 1))
        )}
    >
        {#each words as word (word.id)}
            <div class="word-card" animate:flip={{ duration: 300 }}>
                <h2>{word.chinese}</h2>
                <div class="order"><span>{word.order}</span></div>
                <p>{@html word.pinyin}</p>
                <p style="font-weight:bold;">{@html word.english}</p>
                {#if word.examplePinyin}
                    <p class="chex">
                        {@html word.examplePinyin}<br />
                        <em>{@html word.literal}</em>
                    </p>
                    <p>{word.exampleEnglish}</p>
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
        padding: 0.5rem 0.5rem 0rem 1rem;
        background: #f9f9f9;
        text-align: center;
        min-width: 100px;
        margin: auto;
        position: relative;
    }
    .word-card h2 {
        margin: 0;
        color: #2c3e50;
        font-size: 2rem;
    }
    .word-card p {
        font-size: 1.3rem;
        margin: 0.9rem 0;
        font-family: "calibri", sans-serif;
    }
    .word-card .chex {
        border-top: 1px dashed #ccc;
        padding-top: 1rem;
    }
    .word-card em {
        color: #666;
        font-size: 1rem;
    }
    .error {
        color: #e74c3c;
        text-align: center;
    }
    .order {
        position: absolute;
        top: 6px;
        right: 3px;
    }
    .order span {
        background: #3498db;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-weight: bold;
    }
</style>
