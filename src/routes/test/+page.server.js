export async function load({ fetch, params }) {
    const x = await import(`$lib/data/grammar.json`);
    return { x };
}
