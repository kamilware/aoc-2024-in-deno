const day = 11

console.log()
console.log(`Advent of Code, day= ${day}`)
console.log()

const filePath = './input/11.txt'
// const filePath = './test_input/11.txt'

const f = Deno.readTextFileSync(filePath)
const initialArrangement = f
	.split('\n')
	.map(line => line.trim())[0]
	.split(' ')
	.map(Number)

const simulateStoneCount = (
	initialStones: number[],
	blinks: number
): number => {
	let stoneCounts = new Map<number, number>()

	initialStones.forEach(stone => {
		stoneCounts.set(stone, (stoneCounts.get(stone) || 0) + 1)
	})

	for (let i = 0; i < blinks; i++) {
		const newStoneCounts = new Map<number, number>()

		for (const [stone, count] of stoneCounts.entries()) {
			if (stone === 0) {
				newStoneCounts.set(1, (newStoneCounts.get(1) || 0) + count)
			} else if (stone.toString().length % 2 === 0) {
				const digits = stone.toString()
				const mid = digits.length / 2
				const left = parseInt(digits.slice(0, mid), 10)
				const right = parseInt(digits.slice(mid), 10)

				newStoneCounts.set(
					left,
					(newStoneCounts.get(left) || 0) + count
				)

				newStoneCounts.set(
					right,
					(newStoneCounts.get(right) || 0) + count
				)
			} else {
				const newStone = stone * 2024

				newStoneCounts.set(
					newStone,
					(newStoneCounts.get(newStone) || 0) + count
				)
			}
		}

		stoneCounts = newStoneCounts
	}

	let sum = 0
	stoneCounts.values().forEach(count => {
		sum += count
	})

	return sum
}

console.log(`P1: stoneCount= ${simulateStoneCount(initialArrangement, 25)}`)
console.log(`P2: stoneCount= ${simulateStoneCount(initialArrangement, 75)}`)
