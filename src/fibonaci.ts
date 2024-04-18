import { AsyncCache } from "./async-cache.ts";

export async function fibonacci(n: number): Promise<number> {
	const cache = new AsyncCache<number, number>();
	await cache.set(0, 0);
	await cache.set(1, 1);
	for (let i = 2; i <= n; i++) {
		const res = await cache.getByArr([i - 1, i - 2]);
		await cache.set(
			i,
			res.reduce((a, b) => a + b, 0),
		);
	}
	return cache.get(n);
}
