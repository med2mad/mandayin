<script>
    import {
        vocabulary,
        deleteItem,
        exportVocabulary,
        importVocabulary,
    } from "$lib/stores/vocabulary";
    import { onMount } from "svelte";

    let searchTerm = "";
    let sortBy = "newest";
    let error = "";
    let success = "";
    let importError = "";

    onMount(() => {
        // Vocabulary is automatically loaded from localStorage via the store
    });

    $: filteredItems = $vocabulary.filter((item) => {
        if (!searchTerm) return true;

        const term = searchTerm.toLowerCase();
        return (
            item.chineseWord?.toLowerCase().includes(term) ||
            item.pinyin?.toLowerCase().includes(term) ||
            item.englishMeaning?.toLowerCase().includes(term) ||
            item.examplePinyin?.toLowerCase().includes(term) ||
            item.exampleEnglish?.toLowerCase().includes(term)
        );
    });

    $: sortedItems = filteredItems.sort((a, b) => {
        if (sortBy === "newest") {
            return new Date(b.createdAt) - new Date(a.createdAt);
        } else {
            return new Date(a.createdAt) - new Date(b.createdAt);
        }
    });

    function handleDelete(id, chineseWord) {
        if (confirm(`Are you sure you want to delete "${chineseWord}"?`)) {
            deleteItem(id);
            success = `"${chineseWord}" deleted successfully!`;
            setTimeout(() => (success = ""), 3000);
        }
    }

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    async function handleImport(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (
            confirm("This will replace all your current vocabulary. Continue?")
        ) {
            try {
                await importVocabulary(file);
                success = "Vocabulary imported successfully!";
                setTimeout(() => (success = ""), 3000);
                importError = "";
            } catch (err) {
                importError = "Failed to import file. Please check the format.";
                success = "";
            }
        }
        event.target.value = "";
    }

    function clearAll() {
        if (
            confirm(
                "Are you sure you want to delete ALL vocabulary items? This cannot be undone!",
            )
        ) {
            vocabulary.set([]);
            success = "All vocabulary items cleared!";
            setTimeout(() => (success = ""), 3000);
        }
    }
</script>

<svelte:head>
    <title>Vocabulary List - Chinese Learning</title>
</svelte:head>

<div class="container">
    <header>
        <h1>My Vocabulary List</h1>
        <nav>
            <a href="/" class="nav-link">Add Vocabulary</a>
            <a href="/list" class="nav-link active">View All Items</a>
        </nav>
    </header>

    {#if $vocabulary.length === 0}
        <div class="empty-state">
            <div class="empty-icon">📚</div>
            <h3>No vocabulary yet</h3>
            <p>
                Start by adding some vocabulary on the <a href="/"
                    >Add Vocabulary</a
                > page!
            </p>
        </div>
    {:else}
        <div class="controls">
            <div class="search-box">
                <input
                    type="text"
                    bind:value={searchTerm}
                    placeholder="Search vocabulary..."
                    class="search-input"
                />
                <span class="search-icon">🔍</span>
            </div>

            <div class="controls-right">
                <div class="sort-controls">
                    <label for="sort">Sort by:</label>
                    <select id="sort" bind:value={sortBy}>
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>

                <div class="stats">
                    <span class="stat">Total: {$vocabulary.length}</span>
                    <span class="stat">Showing: {sortedItems.length}</span>
                </div>
            </div>
        </div>

        {#if success}
            <div class="message success">{success}</div>
        {/if}

        {#if importError}
            <div class="message error">{importError}</div>
        {/if}

        <div class="data-management">
            <div class="data-actions">
                <button on:click={exportVocabulary} class="secondary">
                    📥 Export Backup
                </button>
                <label for="import-file" class="secondary button">
                    📤 Import Backup
                    <input
                        id="import-file"
                        type="file"
                        accept=".json"
                        on:change={handleImport}
                        style="display: none;"
                    />
                </label>
                <button on:click={clearAll} class="danger">
                    🗑️ Clear All
                </button>
            </div>
        </div>

        <div class="vocabulary-list">
            {#if sortedItems.length === 0 && searchTerm}
                <div class="no-results">
                    <p>No items found for "<strong>{searchTerm}</strong>"</p>
                    <button on:click={() => (searchTerm = "")} class="secondary"
                        >Clear search</button
                    >
                </div>
            {:else}
                {#each sortedItems as item (item.id)}
                    <div class="vocabulary-item">
                        <div class="item-header">
                            <div class="item-main">
                                <div class="chinese">{item.chineseWord}</div>
                                <div class="pinyin">{item.pinyin}</div>
                                <div class="meaning">{item.englishMeaning}</div>
                            </div>
                            <button
                                class="delete-btn"
                                on:click={() =>
                                    handleDelete(item.id, item.chineseWord)}
                                title="Delete item"
                            >
                                ×
                            </button>
                        </div>

                        {#if item.examplePinyin || item.exampleEnglish || item.wordForWordTranslation}
                            <div class="item-examples">
                                <div class="example-section">
                                    {#if item.examplePinyin}
                                        <div class="example-pinyin">
                                            {item.examplePinyin}
                                        </div>
                                    {/if}
                                    {#if item.exampleEnglish}
                                        <div class="example-english">
                                            {item.exampleEnglish}
                                        </div>
                                    {/if}
                                    {#if item.wordForWordTranslation}
                                        <div class="literal-translation">
                                            <strong>Literal:</strong>
                                            {item.wordForWordTranslation}
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        {/if}

                        <div class="item-footer">
                            <span class="item-date"
                                >Added: {formatDate(item.createdAt)}</span
                            >
                            <span class="item-id">ID: {item.id.slice(-6)}</span>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    {/if}
</div>

<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        min-height: 100vh;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }

    header {
        text-align: center;
        margin-bottom: 2rem;
        padding: 2rem;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    h1 {
        color: #2c3e50;
        margin-bottom: 0.5rem;
        font-size: 2.5rem;
        font-weight: 700;
    }

    header p {
        color: #666;
        font-size: 1.1rem;
        margin-bottom: 2rem;
    }

    nav {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;
    }

    .nav-link {
        padding: 0.75rem 1.5rem;
        text-decoration: none;
        color: #666;
        border-radius: 8px;
        transition: all 0.3s;
        border: 2px solid transparent;
        font-weight: 600;
        background: #f8f9fa;
    }

    .nav-link:hover {
        background: #e9ecef;
        color: #2c3e50;
        transform: translateY(-2px);
    }

    .nav-link.active {
        background: #e74c3c;
        color: white;
        border-color: #e74c3c;
        box-shadow: 0 4px 8px rgba(231, 76, 60, 0.3);
    }

    .empty-state {
        text-align: center;
        padding: 4rem 2rem;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .empty-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
    }

    .empty-state h3 {
        color: #2c3e50;
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }

    .empty-state a {
        color: #e74c3c;
        text-decoration: none;
        font-weight: 600;
    }

    .empty-state a:hover {
        text-decoration: underline;
    }

    .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
        background: white;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .search-box {
        position: relative;
        flex: 1;
        min-width: 250px;
    }

    .search-input {
        width: 100%;
        padding: 0.75rem 1rem 0.75rem 2.5rem;
        border: 2px solid #e9ecef;
        border-radius: 8px;
        font-size: 1rem;
    }

    .search-icon {
        position: absolute;
        left: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        color: #666;
    }

    .controls-right {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        flex-wrap: wrap;
    }

    .sort-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .sort-controls label {
        font-weight: 600;
        color: #2c3e50;
        white-space: nowrap;
    }

    .sort-controls select {
        padding: 0.5rem;
        border: 2px solid #e9ecef;
        border-radius: 6px;
        background: white;
    }

    .stats {
        display: flex;
        gap: 1rem;
        font-size: 0.9rem;
        color: #666;
    }

    .stat {
        background: #f8f9fa;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-weight: 600;
    }

    .message {
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        font-weight: 500;
    }

    .success {
        background: #efe;
        color: #363;
        border: 1px solid #cfc;
    }

    .error {
        background: #fee;
        color: #c33;
        border: 1px solid #fcc;
    }

    .data-management {
        background: white;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin-bottom: 2rem;
    }

    .data-management h3 {
        color: #2c3e50;
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }

    .data-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    button {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s;
        font-weight: 600;
    }

    button.secondary {
        background: #f8f9fa;
        color: #666;
        border: 2px solid #e9ecef;
    }

    button.secondary:hover {
        background: #e9ecef;
        color: #2c3e50;
        transform: translateY(-2px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    button.danger {
        background: #dc3545;
        color: white;
    }

    button.danger:hover {
        background: #c82333;
        transform: translateY(-2px);
        box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
    }

    .button {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        background: #f8f9fa;
        color: #666;
        border: 2px solid #e9ecef;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s;
        font-weight: 600;
        text-align: center;
    }

    .button:hover {
        background: #e9ecef;
        color: #2c3e50;
        transform: translateY(-2px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .vocabulary-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .vocabulary-item {
        background: white;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid #e9ecef;
        transition:
            transform 0.3s,
            box-shadow 0.3s;
    }

    .vocabulary-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    .item-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
    }

    .item-main {
        flex: 1;
    }

    .chinese {
        font-size: 2rem;
        margin-bottom: 0.5rem;
        font-weight: bold;
        color: #2c3e50;
    }

    .pinyin {
        color: #e74c3c;
        font-weight: bold;
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
    }

    .meaning {
        font-size: 1.1rem;
        color: #2c3e50;
        font-weight: 500;
    }

    .delete-btn {
        background: #ff6b6b;
        color: white;
        border: none;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        cursor: pointer;
        font-size: 1.2rem;
        line-height: 1;
        transition: background-color 0.3s;
        flex-shrink: 0;
        margin-left: 1rem;
    }

    .delete-btn:hover {
        background: #ff5252;
        transform: scale(1.1);
    }

    .item-examples {
        border-top: 2px solid #f8f9fa;
        padding-top: 1rem;
        margin-top: 1rem;
    }

    .example-pinyin {
        color: #e74c3c;
        margin-bottom: 0.5rem;
        font-style: italic;
    }

    .example-english {
        margin-bottom: 0.5rem;
        color: #2c3e50;
    }

    .literal-translation {
        font-style: italic;
        color: #666;
        font-size: 0.9rem;
        border-left: 3px solid #ddd;
        padding-left: 1rem;
    }

    .item-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #f8f9fa;
        font-size: 0.8rem;
        color: #999;
    }

    .no-results {
        text-align: center;
        padding: 3rem;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .no-results p {
        margin-bottom: 1rem;
        color: #666;
    }

    /* Responsive design */
    @media (max-width: 768px) {
        .container {
            padding: 1rem;
        }

        header {
            padding: 1.5rem;
        }

        h1 {
            font-size: 2rem;
        }

        .controls {
            flex-direction: column;
            align-items: stretch;
            gap: 1.5rem;
        }

        .controls-right {
            justify-content: space-between;
            width: 100%;
        }

        .search-box {
            min-width: auto;
        }

        nav {
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        }

        .nav-link {
            width: 100%;
            max-width: 250px;
            text-align: center;
        }

        .data-actions {
            flex-direction: column;
        }

        button,
        .button {
            width: 100%;
            text-align: center;
        }

        .item-header {
            flex-direction: column;
            gap: 1rem;
        }

        .delete-btn {
            align-self: flex-end;
        }

        .item-footer {
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-start;
        }
    }

    @media (max-width: 480px) {
        .container {
            padding: 0.5rem;
        }

        header {
            padding: 1rem;
        }

        h1 {
            font-size: 1.8rem;
        }

        .chinese {
            font-size: 1.8rem;
        }

        .controls-right {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
        }

        .sort-controls {
            justify-content: space-between;
        }

        .stats {
            justify-content: center;
        }
    }

    /* Animation for new items */
    .vocabulary-item {
        animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
