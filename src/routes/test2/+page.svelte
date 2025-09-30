<!-- +page.svelte -->
<script>
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { flip } from "svelte/animate";

    export let data;

    $: ({ users, searchQuery, error } = data);

    // Current search value from URL
    $: currentSearch = $page.url.searchParams.get("search") || "";

    // Function to handle search input
    function handleSearch(event) {
        const value = event.target.value;

        // Update URL with search parameter, which triggers the load function
        if (value) {
            goto(`?search=${encodeURIComponent(value)}`, {
                replaceState: true,
                keepFocus: true,
            });
        } else {
            // If search is empty, remove the parameter
            goto(`?`, {
                replaceState: true,
                keepFocus: true,
            });
        }
    }
</script>

<svelte:head>
    <title>Users</title>
</svelte:head>

<h1>Users</h1>

<!-- Search Input -->
<div class="search-container">
    <div class="search-input-wrapper">
        <input
            type="text"
            value={currentSearch}
            on:input={handleSearch}
            placeholder="Search users by name..."
            autocomplete="off" />
        {#if currentSearch}
            <button type="button" class="clear-btn" on:click={() => handleSearch({ target: { value: "" } })}>
                ×
            </button>
        {/if}
    </div>

    {#if currentSearch}
        <p class="search-info">
            Showing results for: "<strong>{currentSearch}</strong>"
            {#if users}
                ({users.length} {users.length === 1 ? "user" : "users"} found)
            {/if}
        </p>
    {/if}
</div>

<!-- Error Message -->
{#if error}
    <p class="error">{error}</p>
{/if}

<!-- Users Table -->
{#if users && users.length > 0}
    <div style="display:flex; gap:10px; flex-wrap:wrap;">
        {#each users as user (user.id)}
            <div animate:flip={{ duration: 300 }}>
                <p>
                    {#if user.photo}
                        <img src={user.photo} alt={user.name} width="300" height="300" />
                    {:else}
                        <span class="no-photo">No photo</span>
                    {/if}
                </p>
                <p>{user.nameCH}</p>
                <p>{user.price}</p>
                <p>{user.descriptioCH}</p>
                <button>asd</button>
            </div>
        {/each}
    </div>
{:else}
    <div class="no-results">
        {#if currentSearch}
            <p>No users found matching "<strong>{currentSearch}</strong>"</p>
            <button on:click={() => handleSearch({ target: { value: "" } })} class="clear-search-btn">
                Clear search
            </button>
        {:else}
            <p>No users found in the database.</p>
        {/if}
    </div>
{/if}

<style>
    .search-container {
        margin-bottom: 2rem;
        padding: 1rem;
        background: #f5f5f5;
        border-radius: 8px;
    }

    .search-input-wrapper {
        position: relative;
        display: inline-block;
        width: 100%;
        max-width: 400px;
    }

    input[type="text"] {
        width: 100%;
        padding: 12px 40px 12px 16px;
        border: 2px solid #ddd;
        border-radius: 6px;
        font-size: 16px;
        transition: border-color 0.3s ease;
        box-sizing: border-box;
    }

    input[type="text"]:focus {
        outline: none;
        border-color: #4caf50;
        box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
    }

    .clear-btn {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        background: #999;
        color: white;
        border: none;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        line-height: 1;
    }

    .clear-btn:hover {
        background: #777;
    }

    .search-info {
        margin: 0.5rem 0 0 0;
        color: #666;
        font-size: 14px;
    }

    .table-container {
        overflow-x: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
        background: white;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    th,
    td {
        border: 1px solid #ddd;
        padding: 12px;
        text-align: left;
    }

    th {
        background-color: #f8f9fa;
        font-weight: 600;
        color: #333;
    }

    tr:nth-child(even) {
        background-color: #f8f9fa;
    }

    tr:hover {
        background-color: #e9ecef;
    }

    .error {
        color: #dc3545;
        background: #f8d7da;
        padding: 12px;
        border-radius: 4px;
        border: 1px solid #f5c6cb;
    }

    .no-photo {
        color: #999;
        font-style: italic;
    }

    .no-results {
        text-align: center;
        padding: 3rem;
        color: #666;
    }

    .clear-search-btn {
        margin-top: 1rem;
        padding: 8px 16px;
        background: #6c757d;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .clear-search-btn:hover {
        background: #5a6268;
    }

    img {
        border-radius: 4px;
        object-fit: cover;
    }
</style>
