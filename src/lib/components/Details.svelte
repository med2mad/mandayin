<script>
    import { createEventDispatcher } from "svelte";
    import { scale } from "svelte/transition";

    const dispatch = createEventDispatcher();

    export let showModal = false,
        word;

    function close() {
        dispatch("close");
    }

    function handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            close();
        }
    }
</script>

{#if showModal}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="modal-backdrop" onclick={handleBackdropClick}>
        <div transition:scale={{ duration: 150 }} class="modal">
            <div class="modal-header">
                <h2>{@html word.chinese}</h2>
                <p class="pinyin">{@html word.pinyin}</p>
                <button onclick={close} class="remove-group">×</button>
            </div>
            <div class="modal-content">
                <p>{word.type}</p>
                <p>{word.info}</p>
                {#each word.examples as example (example.id)}
                    <div class="example">
                        <p class="ch">
                            {@html example.pinyin}<br />
                            <em>{@html example.literal}</em>
                        </p>
                        <p class="en">{example.english}</p>
                    </div>
                {/each}
            </div>
        </div>
    </div>
{/if}

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    .modal {
        background: white;
        border-radius: 8px;
        padding: 0;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
    }
    .modal-header {
        text-align: right;
        padding: 20px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
    .modal-content {
        padding: 20px;
    }
    /* ----------content----------- */
    h2 {
        margin: 0;
        color: #2c3e50;
        font-size: 3rem;
        font-family: "Songti SC", "SimSun", "Songti TC", "Noto Serif CJK SC", serif;
    }
    .pinyin {
        font-weight: bold;
        color: #2c3e50;
    }
    .example {
        background-color: #facc76;
        padding: 0.5rem;
        border: 2px solid #bdbdbd;
        border-radius: 8px;
        margin: 0.5rem !important;
        max-height: 100px;
        overflow-y: auto;
    }
    p {
        font-size: 1.3rem;
        margin: 0.4rem 0;
        padding: 0 0.5rem;
        font-family: "calibri", sans-serif;
        padding: 0;
    }
    .example p em {
        color: #666;
        font-size: 1rem;
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
</style>
