<script>
    import { addItem } from "$lib/stores/vocabulary";

    let chineseWord = "";
    let pinyin = "";
    let englishMeaning = "";
    let examplePinyin = "";
    let exampleEnglish = "";
    let wordForWordTranslation = "";

    function handleSubmit() {
        addItem({
            chineseWord,
            pinyin,
            englishMeaning,
            examplePinyin,
            exampleEnglish,
            wordForWordTranslation,
        });

        // Reset form
        chineseWord = "";
        pinyin = "";
        englishMeaning = "";
        examplePinyin = "";
        exampleEnglish = "";
        wordForWordTranslation = "";
    }

    function clearForm() {
        chineseWord = "";
        pinyin = "";
        englishMeaning = "";
        examplePinyin = "";
        exampleEnglish = "";
        wordForWordTranslation = "";
    }
</script>

<svelte:head>
    <title>zzzzzzzzzz</title>
</svelte:head>
<p><a href="/grammar">List</a></p>
<div class="container">
    <header>
        <h1>Chinese Vocabulary Builder</h1>
        <nav>
            <a href="/" class="nav-link active">Add Vocabulary</a>
            <a href="/list" class="nav-link">View All Items</a>
        </nav>
    </header>

    <form on:submit|preventDefault={handleSubmit} class="vocabulary-form">
        <div class="form-section">
            <div class="form-group">
                <label for="chineseWord">Chinese Word/Character:</label>
                <input
                    id="chineseWord"
                    type="text"
                    value={chineseWord}
                    on:input={(e) => (chineseWord = e.target.value)}
                    placeholder="你好"
                    required />
            </div>

            <div class="form-group">
                <label for="pinyin">Pinyin:</label>
                <input
                    id="pinyin"
                    type="text"
                    value={pinyin}
                    on:input={(e) => (pinyin = e.target.value)}
                    placeholder="nǐ hǎo"
                    required />
            </div>

            <div class="form-group">
                <label for="englishMeaning">English Meaning:</label>
                <input
                    id="englishMeaning"
                    type="text"
                    value={englishMeaning}
                    on:input={(e) => (englishMeaning = e.target.value)}
                    placeholder="Hello"
                    required />
            </div>
        </div>

        <div class="form-section">
            <div class="form-group">
                <label for="examplePinyin">Example Sentence (Pinyin):</label>
                <input
                    id="examplePinyin"
                    type="text"
                    value={examplePinyin}
                    on:input={(e) => (examplePinyin = e.target.value)}
                    placeholder="nǐ hǎo ma?" />
            </div>

            <div class="form-group">
                <label for="exampleEnglish">Example Sentence (English):</label>
                <input
                    id="exampleEnglish"
                    type="text"
                    value={exampleEnglish}
                    on:input={(e) => (exampleEnglish = e.target.value)}
                    placeholder="How are you?" />
            </div>

            <div class="form-group">
                <label for="wordForWordTranslation">Word-for-Word Translation:</label>
                <input
                    id="wordForWordTranslation"
                    type="text"
                    value={wordForWordTranslation}
                    on:input={(e) => (wordForWordTranslation = e.target.value)}
                    placeholder="you good ?" />
            </div>
        </div>

        <div class="form-actions">
            <div class="form-buttons">
                <button type="button" on:click={clearForm} class="secondary"> Clear Form </button>
                <button type="submit">Add Vocabulary</button>
            </div>
        </div>
    </form>

    <div class="preview">
        <h3>Preview:</h3>
        {#if chineseWord || pinyin || englishMeaning}
            <div class="preview-item">
                {#if chineseWord}
                    <div class="chinese-preview">{chineseWord}</div>
                {/if}
                {#if pinyin}
                    <div class="pinyin-preview">{pinyin}</div>
                {/if}
                {#if englishMeaning}
                    <div class="meaning-preview">{englishMeaning}</div>
                {/if}

                {#if examplePinyin || exampleEnglish || wordForWordTranslation}
                    <div class="example-preview">
                        <strong>Example:</strong>
                        {#if examplePinyin}<div class="example-pinyin">
                                {examplePinyin}
                            </div>{/if}
                        {#if exampleEnglish}<div class="example-english">
                                {exampleEnglish}
                            </div>{/if}
                        {#if wordForWordTranslation}
                            <div class="literal">
                                Literal: {wordForWordTranslation}
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>
        {:else}
            <div class="preview-placeholder">Start typing to see a preview of your vocabulary item...</div>
        {/if}
    </div>
</div>

<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        min-height: 100vh;
        background-color: #fda654;
    }

    header {
        text-align: center;
        margin-bottom: 3rem;
        padding: 2rem;
        background: #fad6b2 !important;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    h1 {
        color: #2c3e50;
        margin-bottom: 0.5rem;
        font-size: 2.5rem;
        font-weight: 700;
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

    .vocabulary-form {
        background: #f1ad6c;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin-bottom: 2rem;
        border: 1px solid #e9ecef;
    }

    .form-section {
        margin-bottom: 2.5rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #e9ecef;
    }

    .form-section:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #2c3e50;
        font-size: 0.95rem;
    }

    input {
        width: 100%;
        padding: 0.875rem;
        border: 2px solid #e9ecef;
        border-radius: 8px;
        font-size: 1rem;
        box-sizing: border-box;
        transition: border-color 0.3s;
        font-family: inherit;
    }

    input:focus {
        outline: none;
        border-color: #e74c3c;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
    }

    .form-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        margin-top: 2rem;
        flex-wrap: wrap;
    }

    .form-buttons {
        display: flex;
        gap: 1rem;
    }

    button {
        padding: 0.875rem 1.5rem;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s;
        font-weight: 600;
    }

    button[type="submit"] {
        background: #e74c3c;
        color: white;
    }

    button[type="submit"]:hover {
        background: #c0392b;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
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

    .preview {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid #e9ecef;
    }

    .preview h3 {
        color: #2c3e50;
        margin-bottom: 1rem;
        font-size: 1.3rem;
        font-weight: 600;
    }

    .preview-item {
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 8px;
        border: 1px solid #e9ecef;
    }

    .chinese-preview {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
        text-align: center;
        font-weight: bold;
        color: #2c3e50;
    }

    .pinyin-preview {
        color: #e74c3c;
        font-weight: bold;
        margin-bottom: 0.5rem;
        text-align: center;
        font-size: 1.2rem;
    }

    .meaning-preview {
        text-align: center;
        font-size: 1.1rem;
        color: #2c3e50;
        margin-bottom: 1rem;
        font-weight: 500;
    }

    .example-preview {
        border-top: 2px solid #e9ecef;
        padding-top: 1.5rem;
        margin-top: 1.5rem;
    }

    .example-preview strong {
        color: #2c3e50;
        display: block;
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
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

    .literal {
        font-style: italic;
        color: #666;
        font-size: 0.95rem;
        border-left: 3px solid #ddd;
        padding-left: 1rem;
    }

    .preview-placeholder {
        text-align: center;
        color: #999;
        font-style: italic;
        padding: 2rem;
        background: #f8f9fa;
        border-radius: 8px;
        border: 2px dashed #ddd;
    }

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

        .form-actions {
            flex-direction: column;
            align-items: stretch;
            gap: 1.5rem;
        }

        .form-buttons {
            justify-content: center;
            flex-wrap: wrap;
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

        .chinese-preview {
            font-size: 2rem;
        }

        .vocabulary-form {
            padding: 1.5rem;
        }
    }

    @media (max-width: 480px) {
        .container {
            padding: 0.5rem;
        }

        header {
            padding: 1rem;
            margin-bottom: 1.5rem;
        }

        h1 {
            font-size: 1.8rem;
        }

        .vocabulary-form {
            padding: 1rem;
        }

        .form-buttons {
            flex-direction: column;
            width: 100%;
        }

        button {
            width: 100%;
            justify-content: center;
        }

        .preview {
            padding: 1rem;
        }

        .chinese-preview {
            font-size: 1.8rem;
        }
    }
</style>
