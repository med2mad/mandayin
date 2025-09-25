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