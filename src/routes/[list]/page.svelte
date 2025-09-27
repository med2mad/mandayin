<script>
    import {
        vocabulary,
        deleteItem,
        exportVocabulary,
        importVocabulary,
    } from "$lib/stores/vocabulary";
    import { onMount } from "svelte";
    import { dndzone } from "svelte-dnd-action";
    import { flip } from "svelte/animate";

    let searchTerm = "";
    let sortBy = "newest";
    let error = "";
    let success = "";
    let importError = "";

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

    function handleImport(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (
            confirm("This will replace all your current vocabulary. Continue?")
        ) {
            importVocabulary(file)
                .then(() => {
                    success = "Vocabulary imported successfully!";
                    setTimeout(() => (success = ""), 3000);
                    importError = "";
                })
                .catch(() => {
                    importError =
                        "Failed to import file. Please check the format.";
                    success = "";
                });
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
        <div class="controls-section">
            <div class="search-controls">
                <div class="search-box">
                    <input
                        type="text"
                        value={searchTerm}
                        on:input={(e) => (searchTerm = e.target.value)}
                        placeholder="Search vocabulary..."
                        class="search-input"
                    />
                    <span class="search-icon">🔍</span>
                </div>

                <div class="sort-controls">
                    <label for="sort">Sort by:</label>
                    <select
                        id="sort"
                        value={sortBy}
                        on:change={(e) => (sortBy = e.target.value)}
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>
            </div>

            <div class="stats-controls">
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

        <div
            class="vocabulary-list"
            use:dndzone={{
                items: sortedItems,
                flipDurationMs: 100,
                dropTargetStyle: {},
            }}
            on:consider={(e) => (sortedItems = e.detail.items)}
            on:finalize={(e) => (sortedItems = e.detail.items)}
        >
            {#if sortedItems.length === 0 && searchTerm}
                <div class="no-results">
                    <p>No items found for "<strong>{searchTerm}</strong>"</p>
                    <button on:click={() => (searchTerm = "")} class="secondary"
                        >Clear search</button
                    >
                </div>
            {:else}
                {#each sortedItems as item (item.id)}
                    <div
                        draggable="true"
                        class="vocabulary-item"
                        animate:flip={{ duration: 300 }}
                    >
                        <div class="item-main">
                            <div class="item-content">
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
                                <span class="delete-icon">×</span>
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
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    {/if}
</div>

<style>
    .container {
        max-width: 1000px;
        margin: 0 auto;
        padding: 1rem;
        min-height: 100vh;
        background-color: #fda654;
    }

    header {
        text-align: center;
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: #fad6b2;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h1 {
        color: #2c3e50;
        margin-bottom: 0.5rem;
        font-size: 2rem;
        font-weight: 700;
    }

    header p {
        color: #666;
        font-size: 1rem;
        margin-bottom: 1rem;
    }

    nav {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;
    }

    .nav-link {
        padding: 0.5rem 1rem;
        text-decoration: none;
        color: #666;
        border-radius: 6px;
        transition: all 0.3s;
        border: 2px solid transparent;
        font-weight: 600;
        background: #f8f9fa;
        font-size: 0.9rem;
    }

    .nav-link:hover {
        background: #e9ecef;
        color: #2c3e50;
        transform: translateY(-1px);
    }

    .nav-link.active {
        background: #e74c3c;
        color: white;
        border-color: #e74c3c;
    }

    .empty-state {
        text-align: center;
        padding: 3rem 2rem;
        background: #fad6b2;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .empty-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .empty-state h3 {
        color: #2c3e50;
        margin-bottom: 1rem;
        font-size: 1.3rem;
    }

    .empty-state a {
        color: #e74c3c;
        text-decoration: none;
        font-weight: 600;
    }

    .empty-state a:hover {
        text-decoration: underline;
    }

    /* Improved Controls Section */
    .controls-section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .search-controls {
        display: flex;
        gap: 1rem;
        align-items: center;
        flex-wrap: wrap;
        background: #fad6b2;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .search-box {
        position: relative;
        flex: 1;
        min-width: 200px;
        max-width: 400px;
    }

    .search-input {
        width: 100%;
        padding: 0.5rem 0.5rem 0.5rem 2rem;
        border: 2px solid #e9ecef;
        border-radius: 6px;
        font-size: 0.9rem;
        box-sizing: border-box;
    }

    .search-icon {
        position: absolute;
        left: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        color: #666;
        font-size: 0.9rem;
    }

    .sort-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-shrink: 0;
    }

    .sort-controls label {
        font-weight: 600;
        color: #2c3e50;
        white-space: nowrap;
        font-size: 0.9rem;
    }

    .sort-controls select {
        padding: 0.4rem;
        border: 2px solid #e9ecef;
        border-radius: 4px;
        background: white;
        font-size: 0.9rem;
        min-width: 120px;
    }

    .stats-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fad6b2;
        padding: 0.8rem 1rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .stats {
        display: flex;
        gap: 0.8rem;
        font-size: 0.8rem;
        color: #666;
        flex-wrap: wrap;
    }

    .stat {
        background: #f8f9fa;
        padding: 0.2rem 0.6rem;
        border-radius: 12px;
        font-weight: 600;
    }

    .message {
        padding: 0.8rem;
        border-radius: 6px;
        margin-bottom: 1rem;
        font-weight: 500;
        font-size: 0.9rem;
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
        background: #fad6b2;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 1.5rem;
    }

    .data-management h3 {
        color: #2c3e50;
        margin-bottom: 0.8rem;
        font-size: 1.1rem;
    }

    .data-actions {
        display: flex;
        gap: 0.8rem;
        flex-wrap: wrap;
    }

    button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 6px;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s;
        font-weight: 600;
        white-space: nowrap;
        flex-shrink: 0;
    }

    button.secondary {
        background: #f8f9fa;
        color: #666;
        border: 2px solid #e9ecef;
    }

    button.secondary:hover {
        background: #e9ecef;
        color: #2c3e50;
        transform: translateY(-1px);
    }

    button.danger {
        background: #dc3545;
        color: white;
        font-size: 0.8rem;
        padding: 0.4rem 0.8rem;
    }

    button.danger:hover {
        background: #c82333;
        transform: translateY(-1px);
    }

    .button {
        display: inline-block;
        padding: 0.5rem 1rem;
        background: #f8f9fa;
        color: #666;
        border: 2px solid #e9ecef;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.3s;
        font-weight: 600;
        text-align: center;
        font-size: 0.9rem;
        white-space: nowrap;
        flex-shrink: 0;
    }

    .button:hover {
        background: #e9ecef;
        color: #2c3e50;
        transform: translateY(-1px);
    }

    .vocabulary-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
    }

    .vocabulary-item {
        background: #fad6b2;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border: 1px solid #e9c9a5;
        transition: all 0.3s;
        display: flex;
        flex-direction: column;
    }

    .vocabulary-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .item-main {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.8rem;
        gap: 0.8rem;
    }

    .item-content {
        flex: 1;
        min-width: 0;
    }

    .chinese {
        font-size: 1.5rem;
        margin-bottom: 0.3rem;
        font-weight: bold;
        color: #2c3e50;
        line-height: 1.2;
    }

    .pinyin {
        color: #e74c3c;
        font-weight: bold;
        margin-bottom: 0.3rem;
        font-size: 0.9rem;
        line-height: 1.2;
    }

    .meaning {
        font-size: 0.9rem;
        color: #2c3e50;
        font-weight: 500;
        line-height: 1.2;
    }

    .delete-btn {
        background: #ff6b6b;
        color: white;
        border: none;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        cursor: pointer;
        transition: all 0.3s;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin-top: 0.2rem;
    }

    .delete-btn:hover {
        background: #ff5252;
        transform: scale(1.1);
    }

    .delete-icon {
        font-size: 1.1rem;
        font-weight: bold;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .item-examples {
        border-top: 1px solid #e9c9a5;
        padding-top: 0.8rem;
        margin-top: 0.8rem;
        flex: 1;
    }

    .example-pinyin {
        color: #e74c3c;
        margin-bottom: 0.3rem;
        font-style: italic;
        font-size: 0.8rem;
        line-height: 1.2;
    }

    .example-english {
        margin-bottom: 0.3rem;
        color: #2c3e50;
        font-size: 0.8rem;
        line-height: 1.2;
    }

    .literal-translation {
        font-style: italic;
        color: #666;
        font-size: 0.75rem;
        border-left: 2px solid #ddd;
        padding-left: 0.5rem;
        line-height: 1.2;
    }

    .literal-translation strong {
        color: #2c3e50;
    }

    .item-footer {
        margin-top: 0.8rem;
        padding-top: 0.8rem;
        border-top: 1px solid #e9c9a5;
        font-size: 0.7rem;
        color: #666;
        text-align: right;
    }

    .no-results {
        text-align: center;
        padding: 2rem;
        background: #fad6b2;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        grid-column: 1 / -1;
    }

    .no-results p {
        margin-bottom: 1rem;
        color: #666;
    }

    /* Improved Responsive Design */
    @media (max-width: 768px) {
        .container {
            padding: 0.5rem;
        }

        header {
            padding: 1rem;
            margin-bottom: 1rem;
        }

        h1 {
            font-size: 1.5rem;
        }

        .search-controls {
            flex-direction: column;
            align-items: stretch;
            gap: 0.8rem;
        }

        .search-box {
            max-width: 100%;
            min-width: auto;
        }

        .sort-controls {
            justify-content: space-between;
            width: 100%;
        }

        .sort-controls select {
            min-width: auto;
            flex: 1;
            max-width: 150px;
        }

        .stats-controls {
            flex-direction: column;
            gap: 0.8rem;
            align-items: stretch;
        }

        .stats {
            justify-content: center;
        }

        .data-actions {
            flex-direction: column;
        }

        button,
        .button {
            text-align: center;
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
        }

        nav {
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        }

        .nav-link {
            width: 100%;
            max-width: 200px;
            text-align: center;
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
        }

        .vocabulary-list {
            grid-template-columns: 1fr;
            gap: 0.8rem;
        }

        .vocabulary-item {
            padding: 0.8rem;
        }

        .chinese {
            font-size: 1.3rem;
        }
    }

    @media (max-width: 480px) {
        .container {
            padding: 0.3rem;
        }

        header {
            padding: 0.8rem;
        }

        h1 {
            font-size: 1.3rem;
        }

        .search-controls {
            padding: 0.8rem;
        }

        .sort-controls {
            flex-direction: column;
            align-items: stretch;
            gap: 0.5rem;
        }

        .sort-controls label {
            text-align: center;
        }

        .sort-controls select {
            max-width: 100%;
        }

        .data-management {
            padding: 0.8rem;
        }

        .chinese {
            font-size: 1.2rem;
        }

        .delete-btn {
            width: 22px;
            height: 22px;
        }

        .delete-icon {
            font-size: 1rem;
        }
    }

    @media (max-width: 360px) {
        .search-input {
            font-size: 16px; /* Prevents zoom on iOS */
        }

        .data-actions {
            gap: 0.5rem;
        }

        button,
        .button {
            padding: 0.6rem 0.8rem;
            font-size: 0.8rem;
        }
    }

    /* Animation for new items */
    .vocabulary-item {
        animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
