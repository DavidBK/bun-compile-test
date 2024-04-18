export class AsyncCache<K, V> {
	private cache = new Map<K, Promise<V>>();

	async set(key: K, value: V): Promise<V> {
		await Bun.sleep(0);
		this.cache.set(key, Promise.resolve(value));
		return value;
	}

	async get(key: K): Promise<V> {
		const value = this.cache.get(key);
		if (value === undefined) throw new Error(`Key not found ${key}`);
		await Bun.sleep(0);
		return value;
	}

	has(key: K): boolean {
		return this.cache.has(key);
	}

	async getByArr(keys: K[]): Promise<V[]> {
		const values = await Promise.all(keys.map((key) => this.get(key)));
		return values;
	}
}
