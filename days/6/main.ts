const day = 6

console.log()
console.log(`Advent of Code, day= ${day}`)
console.log()

const filePath = './input/6.txt'
// const filePath = './test_input/6.txt'

const f = Deno.readTextFileSync(filePath)
const lines = f.split('\n').map((l) => l.trim())

const directions = {
	UP: [-1, 0],
	DOWN: [1, 0],
	LEFT: [0, -1],
	RIGHT: [0, 1],
}

type Direction = keyof typeof directions

let guardStartPos: [number, number] = [-1, -1]
let guardStartDir: Direction = 'UP'

for (let i = 0; i < lines.length; i++) {
	for (let j = 0; j < lines[i].length; j++) {
		const char = lines[i][j]

		if (char === '^') {
			guardStartPos = [i, j]
			guardStartDir = 'UP'

			break
		} else if (char === 'v') {
			guardStartPos = [i, j]
			guardStartDir = 'DOWN'

			break
		} else if (char === '<') {
			guardStartPos = [i, j]
			guardStartDir = 'LEFT'

			break
		} else if (char === '>') {
			guardStartPos = [i, j]
			guardStartDir = 'RIGHT'

			break
		}
	}
}

const isInBounds = (y: number, x: number, grid: string[][]) => {
	return y >= 0 && y < grid.length && x >= 0 && x < grid[0].length
}

const rotateGuard90Degrees = (dir: Direction): Direction => {
	if (dir === 'UP') {
		return 'RIGHT'
	}

	if (dir === 'RIGHT') {
		return 'DOWN'
	}

	if (dir === 'DOWN') {
		return 'LEFT'
	}

	return 'UP'
}

const simulate = (
	grid: string[][],
	startY: number,
	startX: number,
	startDir: Direction,
) => {
	let [y, x] = [startY, startX]
	let dir = startDir

	const visitedStates = new Set<string>()
	visitedStates.add(`${y},${x},${dir}`)

	while (isInBounds(y, x, grid)) {
		const [dY, dX] = directions[dir]
		const [newY, newX] = [y + dY, x + dX]

		if (!isInBounds(newY, newX, grid)) {
			return false
		}

		if (grid[newY][newX] === '#') {
			dir = rotateGuard90Degrees(dir)
		} else {
			;[y, x] = [newY, newX]
		}

		const stateKey = `${y},${x},${dir}`
		if (visitedStates.has(stateKey)) {
			return true
		}

		visitedStates.add(stateKey)
	}

	return false
}

{
	const grid = lines.map((l) => l.split(''))

	grid[guardStartPos[0]][guardStartPos[1]] = 'X'
	let dir = guardStartDir
	let [y, x] = guardStartPos

	while (true) {
		const [dY, dX] = directions[dir]
		const [newY, newX] = [y + dY, x + dX]

		if (!isInBounds(newY, newX, grid)) {
			break
		}

		if (lines[newY][newX] === '#') {
			dir = rotateGuard90Degrees(dir)
		} else {
			;[y, x] = [newY, newX]
			grid[y][x] = 'X'
		}
	}

	let count = 0
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] === 'X') {
				count++
			}
		}
	}

	console.log(`P1: visitedCount= ${count}`)
}

{
	const baseGrid = lines.map((l) => l.split(''))
	let positionCount = 0

	for (let row = 0; row < baseGrid.length; row++) {
		for (let col = 0; col < baseGrid[0].length; col++) {
			if (row === guardStartPos[0] && col === guardStartPos[1]) {
				continue
			}

			const c = baseGrid[row][col]
			if (c === '#' || c === '^' || c === 'v' || c === '<' || c === '>') {
				continue
			}

			const gridCopy = baseGrid.map((r) => [...r])
			gridCopy[row][col] = '#'

			const loopDetected = simulate(
				gridCopy,
				guardStartPos[0],
				guardStartPos[1],
				guardStartDir,
			)

			if (loopDetected) {
				positionCount++
			}
		}
	}

	console.log(`P2: positionCount= ${positionCount}`)
}
