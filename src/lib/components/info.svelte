<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let show = false;
    export let word;

    function close() {
        dispatch("close");
    }

    function handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            close();
        }
    }
</script>

{#if show}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="modal-backdrop" on:click={handleBackdropClick}>
        <div class="modal">
            <div class="modal-header">
                <button on:click={close} class="close-btn">×</button>
            </div>
            <div class="modal-content">
                <div class="example">
                    {#each word.examples as example (example.id)}
                        <p class="ch">
                            {@html example.pinyin}<br />
                            <em>{@html example.literal}</em>
                        </p>
                        <p class="en" style="border-bottom: 1px solid black;">{example.english}</p>
                    {/each}
                </div>
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
    }

    .close-btn {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
    }

    .modal-content {
        padding: 20px;
    }

    p {
        font-size: 1.3rem;
        margin: 0.4rem 0;
        padding: 0 0.5rem;
        font-family: "calibri", sans-serif;
    }
    em {
        color: #666;
        font-size: 1rem;
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
