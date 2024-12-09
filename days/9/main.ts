const day = 9

console.log()
console.log(`Advent of Code, day= ${day}`)
console.log()

const filePath = './input/9.txt'
// const filePath = './test_input/9.txt'

const line = Deno.readTextFileSync(filePath)

const range = (end: number, step = 1) => {
	const arr = []
	for (let i = 0; i < end; i += step) {
		arr.push(i)
	}

	return arr
}

const blocks1: (string | number)[] = []
let fileIndex = 0
line.split('').forEach((size, i) => {
	if (i % 2 !== 0) {
		range(Number(size)).forEach(() => {
			blocks1.push('.')
		})
	} else {
		range(Number(size)).forEach(() => {
			blocks1.push(fileIndex)
		})

		fileIndex++
	}
})

const blocks2 = [...blocks1]

{
	while (
		blocks1
			.slice(
				0,
				blocks1.findLastIndex(block => typeof block === 'number'),
			)
			.includes('.')
	) {
		let popped = null
		while (typeof popped !== 'number') {
			popped = blocks1.pop()
		}

		blocks1[blocks1.findIndex(block => block === '.')] = popped
	}

	let total = BigInt(0)

	blocks1.forEach((block, i) => {
		if (block === '.') {
			return
		}

		total += BigInt(block) * BigInt(i)
	})

	console.log(`P1: checksum= ${total.toString()}`)
}

{
	for (let i = blocks2.length - 1; i >= 0; i--) {
		if (blocks2[i] === '.') {
			continue
		}

		const digit = blocks2[i]
		let count = 1

		for (let j = i - 1; j >= 0; j--) {
			if (blocks2[j] === digit) {
				count++
				i = j
			} else {
				break
			}
		}

		for (let k = 0; k < i; k++) {
			if (blocks2.slice(k, k + count).every(block => block === '.')) {
				for (let l = 0; l < count; l++) {
					blocks2[k + l] = digit
				}

				for (let l = 0; l < count; l++) {
					blocks2[i + l] = '.'
				}

				break
			}
		}
	}

	let total2 = BigInt(0)
	blocks2.forEach((block, i) => {
		if (block === '.') {
			return
		}

		total2 += BigInt(block) * BigInt(i)
	})

	console.log(`P2: checksum= ${total2.toString()}`)
}
