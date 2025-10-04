export async function load({ fetch, params }) {
    const x = await import(`$lib/data/${params.list}.json`);

    return { x };
}
