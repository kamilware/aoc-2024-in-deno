const day = 12

console.log()
console.log(`Advent of Code, day= ${day}`)
console.log()

// const filePath = './input/12.txt'
const filePath = './test_input/12.txt'

const directions = [
	[-1, 0],
	[1, 0],
	[0, -1],
	[0, 1],
]

const f = Deno.readTextFileSync(filePath)
const input = f
	.trim()
	.split('\n')
	.map(line => line.trim().split(''))

{
	const calculatePrice = (map: string[][]): number => {
		const rows = map.length
		const cols = map[0].length
		const visited = Array.from({ length: rows }, () =>
			Array(cols).fill(false)
		)
		let price = 0

		const floodFill = (
			startX: number,
			startY: number
		): { area: number; perimeter: number } => {
			const queue: [number, number][] = [[startX, startY]]
			const plantType = map[startX][startY]
			let area = 0
			let perimeter = 0

			while (queue.length > 0) {
				const [x, y] = queue.pop()!
				if (visited[x][y]) continue

				visited[x][y] = true
				area++

				for (const [dx, dy] of directions) {
					const nx = x + dx
					const ny = y + dy

					if (
						nx < 0 ||
						nx >= rows ||
						ny < 0 ||
						ny >= cols ||
						map[nx][ny] !== plantType
					) {
						perimeter++
					} else if (!visited[nx][ny]) {
						queue.push([nx, ny])
					}
				}
			}

			return { area, perimeter }
		}

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				if (!visited[i][j]) {
					const { area, perimeter } = floodFill(i, j)
					price += area * perimeter
				}
			}
		}

		return price
	}

	console.log(`P1: price= $ ${calculatePrice(input)}`)
}
