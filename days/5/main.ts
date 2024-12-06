const day = 5

console.log()
console.log(`Advent of Code, day= ${day}`)
console.log()

const filePath = './input/5.txt'
// const filePath = './test_input/5.txt'

const f = Deno.readTextFileSync(filePath)
const lines = f.trim().split('\n')

const rules = new Map<number, number[]>()
const updates: number[][] = []

lines.forEach(line => {
	line = line.trim()

	if (line.includes('|')) {
		const [x, y] = line.split('|').map(Number)
		rules.set(x, [...(rules.get(x) || []), y])
	} else if (line.includes(',')) {
		updates.push(line.split(',').map(Number))
	}
})

const isCorrectlyOrdered = (update: number[]): boolean => {
	const position = new Map<number, number>()
	for (let i = 0; i < update.length; i++) {
		position.set(update[i], i)
	}

	for (const [x, yList] of rules) {
		if (!position.has(x)) {
			continue
		}

		for (const y of yList) {
			if (!position.has(y)) {
				continue
			}

			if (position.get(x)! >= position.get(y)!) {
				return false
			}
		}
	}

	return true
}

const correctUpdates = updates.filter(u => isCorrectlyOrdered(u))
const incorrectUpdates = updates.filter(u => !isCorrectlyOrdered(u))

const reorderUpdate = (update: number[]): number[] => {
	const setUpdatePages = new Set(update)

	const graph = new Map<number, Set<number>>()
	const indegree = new Map<number, number>()

	for (const p of update) {
		graph.set(p, new Set<number>())

		indegree.set(p, 0)
	}

	for (const [x, yList] of rules) {
		if (!setUpdatePages.has(x)) {
			continue
		}

		for (const y of yList) {
			if (!setUpdatePages.has(y)) {
				continue
			}

			graph.get(x)!.add(y)
		}
	}

	for (const [_p, edges] of graph) {
		for (const nxt of edges) {
			indegree.set(nxt, indegree.get(nxt)! + 1)
		}
	}

	const queue: number[] = []
	for (const [p, deg] of indegree) {
		if (deg === 0) queue.push(p)
	}

	const sorted: number[] = []
	while (queue.length > 0) {
		const node = queue.shift()!
		sorted.push(node)

		for (const nxt of graph.get(node)!) {
			indegree.set(nxt, indegree.get(nxt)! - 1)

			if (indegree.get(nxt) === 0) {
				queue.push(nxt)
			}
		}
	}

	if (sorted.length !== update.length) {
		throw new Error('no order found')
	}

	return sorted
}

const reorderedIncorrect = incorrectUpdates.map(reorderUpdate)

let sumIncorrect = 0
for (const upd of reorderedIncorrect) {
	sumIncorrect += upd[Math.floor(upd.length / 2)]
}

let sumCorrect = 0
for (const upd of correctUpdates) {
	sumCorrect += upd[Math.floor(upd.length / 2)]
}

console.log(`P1: sum= ${sumCorrect}`)
console.log(`P2: sum= ${sumIncorrect}`)
