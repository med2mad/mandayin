export function validatePinyin(pinyin) {
    // Basic pinyin validation regex
    const pinyinRegex = /^[a-z]+[1-4]?$/i;
    return pinyinRegex.test(pinyin.trim());
}

export function formatPinyin(pinyin) {
    // Add tone marks (simplified version)
    return pinyin.replace(/([a-z]+)([1-4])/i, (match, letters, tone) => {
        return letters + getToneMark(parseInt(tone));
    });
}

function getToneMark(tone) {
    const marks = ['', '̄', '́', '̌', '̀'];
    return marks[tone] || '';
}

export function cardsStyling() {
    document.querySelectorAll("i").forEach((el) => {
        el.style =
            "color:#666; font-size:1rem; font-family:calibri;font-weight:normal;";
    });
    document.querySelectorAll("b").forEach((el) => {
        el.style = "color:red;font-weight:normal;";
    });
}

export function downloadJSON(groups, fileName) {
    const words = [];

    groups.forEach(group => {
        group.words.forEach(word => {
            words.push(word);
        });
    });

    const dataStr = JSON.stringify(words, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
}