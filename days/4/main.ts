const day = 4

console.log()
console.log(`Advent of Code, day= ${day}`)

const filePath = './input/4.txt'
// const filePath = './test_input/4.txt'

const f = Deno.readTextFileSync(filePath)

{
	const lines = f.trim().split('\n')

	const rows = lines.length
	const cols = lines[0].length
	let count = 0

	const directions = [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
		[1, 1],
		[-1, -1],
		[1, -1],
		[-1, 1],
	]

	const isValid = (x: number, y: number): boolean =>
		x >= 0 && x < rows && y >= 0 && y < cols

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			for (const [dx, dy] of directions) {
				let found = true

				for (let k = 0; k < 4; k++) {
					const nr = r + k * dx
					const nc = c + k * dy

					if (!isValid(nr, nc) || lines[nr][nc] !== 'XMAS'[k]) {
						found = false
						break
					}
				}

				if (found) count++
			}
		}
	}

	console.log(`P1: count= ${count}`)
}

{
	const lines = f.trim().split('\n')

	const rows = lines.length
	const cols = lines[0].length
	let count = 0

	const directions1 = [
		[1, 1], // top left
		[-1, -1], // bot right
	]

	const directions2 = [
		[-1, 1], // top right
		[1, -1], // bot left
	]

	const isValid = (x: number, y: number): boolean =>
		x >= 0 && x < rows && y >= 0 && y < cols

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			// A is in the middle
			if (lines[r][c] === 'A') {
				let w1 = ''
				let w2 = ''

				for (const [dx, dy] of directions1) {
					const nr = r + dx
					const nc = c + dy

					if (isValid(nr, nc)) {
						w1 += lines[nr][nc]
					}
				}

				for (const [dx, dy] of directions2) {
					const nr = r + dx
					const nc = c + dy

					if (isValid(nr, nc)) {
						w2 += lines[nr][nc]
					}
				}

				if (
					(w1 === 'SM' || w1 === 'MS') &&
					(w2 === 'SM' || w2 === 'MS')
				) {
					count++
				}
			}
		}
	}

	console.log(`P2: count= ${count}`)
}

console.log()
