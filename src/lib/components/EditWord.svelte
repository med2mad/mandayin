<script>
    import { createEventDispatcher } from "svelte";
    import { scale } from "svelte/transition";

    export let showEditModal, word;

    const dispatch = createEventDispatcher();

    function save() {
        dispatch("save", { word });
        close();
    }

    function close() {
        dispatch("close");
    }

    function handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            close();
        }
    }

    // Add new example
    function addExample(usageIndex) {
        if (!word.usages[usageIndex].examples) {
            word.usages[usageIndex].examples = [];
        }
        word.usages[usageIndex].examples.push({
            id: Date.now(),
            pinyin: "",
            literal: "",
            english: "",
        });
        word.usages[usageIndex].examples = word.usages[usageIndex].examples; // trigger reactivity
    }

    // Remove example
    function removeExample(usageIndex, exampleIndex) {
        word.usages[usageIndex].examples.splice(exampleIndex, 1);
        word.usages[usageIndex].examples = word.usages[usageIndex].examples; // trigger reactivity
    }

    // Add new usage
    function addUsage() {
        word.usages.push({
            id: Date.now(),
            type: "Noun",
            chinese: "",
            pinyin: "",
            english: "",
            info: "",
            examples: [],
            checked: false,
        });
        word.usages = word.usages; // trigger reactivity
    }

    // Remove usage
    function removeUsage(usageIndex) {
        if (word.usages.length > 1) {
            word.usages.splice(usageIndex, 1);
            word.usages = word.usages; // trigger reactivity
        }
    }
</script>

{#if showEditModal}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="modal-backdrop" onclick={handleBackdropClick}>
        <div transition:scale={{ duration: 150 }} class="modal edit-modal">
            <div class="modal-header">
                <h2>Edit Word</h2>
                <button onclick={close} class="close">×</button>
            </div>

            <div class="modal-content">
                {#each word.usages as usage, usageIndex (usage.id)}
                    <div class="usage-section">
                        <div class="section-header">
                            <h3>Usage {usageIndex + 1}</h3>
                            {#if word.usages.length > 1}
                                <button class="remove-btn" onclick={() => removeUsage(usageIndex)}>Remove Usage</button>
                            {/if}
                        </div>

                        <div class="form-group">
                            <label>Type:</label>
                            <select bind:value={usage.type}>
                                <option value="Noun">Noun</option>
                                <option value="Verb">Verb</option>
                                <option value="Adjective">Adjective</option>
                                <option value="Adverb">Adverb</option>
                                <option value="Particle">Particle</option>
                                <option value="Pronoun">Pronoun</option>
                                <option value="Number">Number</option>
                                <option value="Character">Character</option>
                                <option value="_">Other</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Chinese:</label>
                            <input type="text" bind:value={usage.chinese} />
                        </div>

                        <div class="form-group">
                            <label>Pinyin:</label>
                            <input type="text" bind:value={usage.pinyin} />
                        </div>

                        <div class="form-group">
                            <label>English:</label>
                            <textarea bind:value={usage.english} rows="2" />
                        </div>

                        <div class="form-group">
                            <label>Additional Info:</label>
                            <input type="text" bind:value={usage.info} />
                        </div>

                        <div class="examples-section">
                            <h4>Examples:</h4>
                            {#each usage.examples as example, exampleIndex (example.id)}
                                <div class="example-form">
                                    <div class="form-group">
                                        <label>Pinyin:</label>
                                        <input type="text" bind:value={example.pinyin} />
                                    </div>
                                    <div class="form-group">
                                        <label>Literal:</label>
                                        <input type="text" bind:value={example.literal} />
                                    </div>
                                    <div class="form-group">
                                        <label>English:</label>
                                        <textarea bind:value={example.english} rows="2" />
                                    </div>
                                    <button class="remove-btn" onclick={() => removeExample(usageIndex, exampleIndex)}> Remove Example </button>
                                </div>
                            {/each}
                            <button class="add-btn" onclick={() => addExample(usageIndex)}>Add Example</button>
                        </div>
                    </div>
                {/each}

                <button class="add-btn" onclick={addUsage}>Add Another Usage</button>
            </div>

            <div class="modal-actions">
                <button class="cancel-btn" onclick={close}>Cancel</button>
                <button class="save-btn" onclick={save}>Save Changes</button>
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
        z-index: 1001;
    }
    .edit-modal {
        background: white;
        border-radius: 8px;
        padding: 0;
        max-width: 600px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
    }
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #e0e0e0;
    }
    .modal-header h2 {
        margin: 0;
        color: #2c3e50;
    }
    .close {
        background: #ff4444;
        color: white;
        border: none;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        cursor: pointer;
        font-size: 16px;
        padding: 0;
    }
    .modal-content {
        padding: 20px;
    }
    .usage-section {
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 20px;
    }
    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }
    .section-header h3 {
        margin: 0;
        color: #2c3e50;
    }
    .form-group {
        margin-bottom: 15px;
    }
    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
        color: #333;
    }
    .form-group input,
    .form-group textarea,
    .form-group select {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
    }
    .examples-section {
        margin-top: 20px;
    }
    .example-form {
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        padding: 10px;
        margin-bottom: 10px;
        background: #f9f9f9;
    }
    .add-btn {
        background: #4caf50;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        margin: 5px 0;
    }
    .remove-btn {
        background: #ff4444;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
    }
    .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        padding: 20px;
        border-top: 1px solid #e0e0e0;
    }
    .cancel-btn {
        background: #6c757d;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
    }
    .save-btn {
        background: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
    }
    .add-btn:hover,
    .save-btn:hover,
    .cancel-btn:hover,
    .remove-btn:hover {
        opacity: 0.8;
    }
</style>
