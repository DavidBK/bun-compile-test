import { fibonacci } from "./fibonaci.ts";
import pino from "pino";

const port = process.env.PORT || 8787;

console.time("server");
const server = Bun.serve({
	port,
	fetch(req: Request): Response | Promise<Response> {
		return new Response(`Hello World! ${Math.random()}`);
	},
});
console.timeEnd("server");

//
console.time("fetch");

let count = 1_00_000;
for (let i = 0; i < count; i++) {
	fetch(`http://localhost:${port}`)
		.then((res) => res.text())
		.then((r) => {
			count--;
			if (count === 0) {
				console.timeEnd("fetch");
				server.stop();
			}
		});
}

console.time("fibonacci");
const res = await fibonacci(100);
console.log(res);
console.timeEnd("fibonacci");

pino().info("Hello World!");
