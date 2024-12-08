const day = 8

console.log()
console.log(`Advent of Code, day= ${day}`)
console.log()

const filePath = './input/8.txt'
// const filePath = './test_input/8.txt'

const f = Deno.readTextFileSync(filePath)
const lines = f.split('\n').map(l => l.replace(/\r$/, ''))

const rows = lines.length
const cols = rows > 0 ? lines[0].length : 0

interface Coord {
	r: number
	c: number
}

const inBounds = (r: number, c: number) => {
	return r >= 0 && r < rows && c >= 0 && c < cols
}

{
	const frequencyMap = new Map<string, Coord[]>()

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			const ch = lines[r][c]

			if (ch !== '.') {
				if (!frequencyMap.has(ch)) {
					frequencyMap.set(ch, [])
				}

				frequencyMap.get(ch)!.push({ r, c })
			}
		}
	}

	const antinodes = new Set<string>()

	for (const [_freq, positions] of frequencyMap.entries()) {
		if (positions.length < 2) {
			continue
		}

		for (let i = 0; i < positions.length; i++) {
			const { r: rA, c: cA } = positions[i]

			for (let j = i + 1; j < positions.length; j++) {
				const { r: rB, c: cB } = positions[j]

				const par = 2 * rA - rB
				const pac = 2 * cA - cB
				const pbr = 2 * rB - rA
				const pbc = 2 * cB - cA

				if (inBounds(par, pac)) {
					antinodes.add(`${par},${pac}`)
				}

				if (inBounds(pbr, pbc)) {
					antinodes.add(`${pbr},${pbc}`)
				}
			}
		}
	}

	console.log(`P1: locationCount= ${antinodes.size}`)
}

{
	const frequencyMap = new Map<string, Coord[]>()

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			const ch = lines[r][c]
			if (ch !== '.') {
				if (!frequencyMap.has(ch)) {
					frequencyMap.set(ch, [])
				}

				frequencyMap.get(ch)!.push({ r, c })
			}
		}
	}

	const gcd = (a: number, b: number): number =>
		b === 0 ? Math.abs(a) : gcd(b, a % b)

	const antinodes = new Set<string>()

	for (const [_freq, positions] of frequencyMap.entries()) {
		if (positions.length < 2) continue

		const n = positions.length
		for (let i = 0; i < n; i++) {
			const { r: rA, c: cA } = positions[i]

			for (let j = i + 1; j < n; j++) {
				const { r: rB, c: cB } = positions[j]

				const dr = rB - rA
				const dc = cB - cA

				const g = gcd(dr, dc)
				const drstep = dr / g
				const dcstep = dc / g

				{
					let rr = rA
					let cc = cA

					while (inBounds(rr, cc)) {
						antinodes.add(`${rr},${cc}`)

						rr += drstep
						cc += dcstep
					}
				}

				{
					let rr = rA - drstep
					let cc = cA - dcstep

					while (inBounds(rr, cc)) {
						antinodes.add(`${rr},${cc}`)

						rr -= drstep
						cc -= dcstep
					}
				}
			}
		}
	}

	console.log(`P2: locationCount= ${antinodes.size}`)
}

console.log()
