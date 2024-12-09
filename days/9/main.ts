const day = 9

console.log()
console.log(`Advent of Code, day= ${day}`)
console.log()

const filePath = './input/9.txt'
// const filePath = './test_input/9.txt'

const line = Deno.readTextFileSync(filePath)

const range = (end: number) => [...Array(end).keys()]

const blocks: (string | number)[] = []
let fileIndex = 0
line.split('').forEach((size, i) => {
	if (i % 2 !== 0) {
		range(Number(size)).forEach(() => {
			blocks.push('.')
		})
	} else {
		range(Number(size)).forEach(() => {
			blocks.push(fileIndex)
		})

		fileIndex++
	}
})

while (
	blocks
		.slice(
			0,
			blocks.findLastIndex(block => typeof block === 'number'),
		)
		.includes('.')
) {
	let popped = null
	while (typeof popped !== 'number') {
		popped = blocks.pop()
	}

	blocks[blocks.findIndex(block => block === '.')] = popped
}

let total = BigInt(0)

blocks.forEach((block, i) => {
	if (block === '.') {
		return
	}

	total += BigInt(block) * BigInt(i)
})

console.log(`P1: checksum= ${total.toString()}`)
