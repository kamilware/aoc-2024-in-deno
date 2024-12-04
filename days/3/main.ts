const day = 3

console.log()
console.log(`Advent of code, day= ${day}`)

{
	const filePath = './input/3.txt'
	// const filePath = './test_input/3.txt'

	const f = Deno.readTextFileSync(filePath)
	const input = f.trim()

	const matches = input.match(/mul\(\d+,\d+\)/g) || []

	let total = 0

	matches.forEach(match => {
		const [x, y] = match.slice(4, -1).split(',').map(Number)
		total += x * y
	})

	console.log(`P1: total= ${total}`)
}

{
	const filePath = './input/3.txt'
	// const filePath = './test_input/3-2.txt'

	const f = Deno.readTextFileSync(filePath)
	const input = f.trim()

	const matches = input.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g) || []

	let total = 0
	let enabled = true

	matches.forEach(match => {
		if (match === 'do()') {
			enabled = true

			return
		}

		if (match === "don't()") {
			enabled = false

			return
		}

		if (enabled) {
			const [x, y] = match.slice(4, -1).split(',').map(Number)
			total += x * y
		}
	})

	console.log(`P2: total= ${total}`)
}

console.log()
