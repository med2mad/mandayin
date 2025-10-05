<script>
    import { onMount } from "svelte";

    let db;
    let groups = [];
    let newWord = {
        id: null,
        chinese: "",
        pinyin: "",
        english: "",
        examplePinyin: "",
        literal: "",
        exampleEnglish: "",
        info: "",
        checked: true,
        type: "",
        group: "",
        createdAt: "",
    };

    onMount(async () => {
        const LokiModule = await import("lokijs");
        const Loki = LokiModule.default ?? LokiModule;

        const AdapterModule = await import("lokijs/src/loki-indexed-adapter.js");
        const LokiIndexedAdapter = AdapterModule.default ?? AdapterModule;

        const idbAdapter = new LokiIndexedAdapter("myApp");

        db = new Loki("wordsDB", {
            adapter: idbAdapter,
            autoload: true,
            autosave: true,
            autosaveInterval: 4000,
            autoloadCallback: () => {
                let coll = db.getCollection("words");
                if (!coll) coll = db.addCollection("words", { indices: ["group"] });

                groups = groupWords(coll.find());
            },
        });
    });

    function groupWords(allWords) {
        const map = {};
        allWords.forEach((word) => {
            const groupName = word.group || "ungrouped";
            if (!map[groupName]) map[groupName] = [];
            map[groupName].push(word);
        });
        return Object.entries(map).map(([groupName, words]) => ({ groupName, words }));
    }

    function addWord() {
        const coll = db.getCollection("words");
        const wordToInsert = { ...newWord };
        wordToInsert.createdAt = new Date().toISOString();
        coll.insert(wordToInsert);
        db.saveDatabase();
        groups = groupWords(coll.find());

        newWord = {
            id: null,
            chinese: "",
            pinyin: "",
            english: "",
            examplePinyin: "",
            literal: "",
            exampleEnglish: "",
            info: "",
            checked: true,
            type: "",
            group: "",
            createdAt: "",
        };
    }

    function removeWord(id) {
        const coll = db.getCollection("words");
        const doc = coll.get(id);
        if (doc) {
            coll.remove(doc);
            db.saveDatabase();
            groups = groupWords(coll.find());
            console.log(groups);
        }
    }

    function exportDB() {
        db.saveDatabase(() => {
            const data = db.serialize();
            const blob = new Blob([data], { type: "application/json" });
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "wordsDB.json";
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    function importDB(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const json = e.target.result;
            db.loadJSON(json);
            db.saveDatabase();
            const coll = db.getCollection("words");
            groups = groupWords(coll.find());
        };
        reader.readAsText(file);
    }
</script>

<h1>Chinese Words Database</h1>

<h2>Add Word</h2>
<input placeholder="Chinese" bind:value={newWord.chinese} />
<input placeholder="Pinyin" bind:value={newWord.pinyin} />
<input placeholder="English" bind:value={newWord.english} />
<input placeholder="Example Pinyin" bind:value={newWord.examplePinyin} />
<input placeholder="Literal" bind:value={newWord.literal} />
<input placeholder="Example English" bind:value={newWord.exampleEnglish} />
<input placeholder="Info" bind:value={newWord.info} />
<label>
    Checked:
    <input type="checkbox" bind:checked={newWord.checked} />
</label>
<input placeholder="Type" bind:value={newWord.type} />
<input placeholder="Group" bind:value={newWord.group} />
<button on:click={addWord}>Add Word</button>

<button on:click={exportDB}>Export DB</button>
<input type="file" accept=".json" on:change={importDB} />

{#each groups as g}
    <h3>{g.groupName}</h3>
    <ul>
        {#each g.words as w}
            <li>
                <b>{w.chinese}</b> | {w.pinyin} | {w.english} | {w.type} | Checked: {w.checked ? "Yes" : "No"}
                <button on:click={() => removeWord(w.$loki)}>Remove</button>
            </li>
        {/each}
    </ul>
{/each}
