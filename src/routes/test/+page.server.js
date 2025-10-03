export async function load({ fetch, params }) {
    const x = await import(`$lib/data/vocabulary.json`);
    return { x };
}
