const day = 10

console.log()
console.log(`Advent of Code, day= ${day}`)
console.log()

const filePath = './input/10.txt'
// const filePath = './test_input/10.txt'

const f = Deno.readTextFileSync(filePath)
const lines = f.split('\n').map(line => line.trim())

type Trailhead = [number, number]
const trailheads: Trailhead[] = []

{
	for (let y = 0; y < lines.length; y++) {
		for (let x = 0; x < lines[y].length; x++) {
			if (lines[y][x] === '0') {
				trailheads.push([y, x])
			}
		}
	}

	const dfs = (y: number, x: number, visited: Set<string>): number => {
		const directions = [
			[-1, 0],
			[1, 0],
			[0, -1],
			[0, 1],
		]

		const posKey = `${y},${x}`
		if (visited.has(posKey)) {
			return 0
		}

		visited.add(posKey)

		let score = 0
		if (lines[y][x] === '9') {
			score = 1
		}

		for (const [dy, dx] of directions) {
			const [ny, nx] = [y + dy, x + dx]

			if (
				ny >= 0 &&
				ny < lines.length &&
				nx >= 0 &&
				nx < lines[0].length &&
				parseInt(lines[ny][nx]) === parseInt(lines[y][x]) + 1
			) {
				score += dfs(ny, nx, visited)
			}
		}

		return score
	}

	let score = 0

	for (const [startY, startX] of trailheads) {
		const visited = new Set<string>()
		score += dfs(startY, startX, visited)
	}

	console.log(`P1: score= ${score}`)
}

{
	const countTrails = (
		y: number,
		x: number,
		visited: Set<string>,
	): number => {
		const directions = [
			[-1, 0],
			[1, 0],
			[0, -1],
			[0, 1],
		]

		const posKey = `${y},${x}`
		if (visited.has(posKey)) {
			return 0
		}

		visited.add(posKey)

		let trailCount = 0
		if (lines[y][x] === '9') {
			trailCount = 1
		} else {
			for (const [dy, dx] of directions) {
				const [ny, nx] = [y + dy, x + dx]
				if (
					ny >= 0 &&
					ny < lines.length &&
					nx >= 0 &&
					nx < lines[0].length &&
					parseInt(lines[ny][nx]) === parseInt(lines[y][x]) + 1
				) {
					trailCount += countTrails(ny, nx, visited)
				}
			}
		}

		visited.delete(posKey)

		return trailCount
	}

	let rating = 0

	for (const [startY, startX] of trailheads) {
		const visited = new Set<string>()
		rating += countTrails(startY, startX, visited)
	}

	console.log(`P2: rating= ${rating}`)
}
