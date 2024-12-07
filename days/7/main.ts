const day = 7

console.log()
console.log(`Advent of Code, day= ${day}`)
console.log()

const filePath = './input/7.txt'
// const filePath = './test_input/7.txt'

const f = Deno.readTextFileSync(filePath)
const lines = f.split('\n').map(l => l.trim())

const equations = new Map<number, number[]>()

lines.forEach(line => {
	const [testValue, rest] = line.split(':').map(l => l.trim())

	equations.set(
		Number(testValue),
		rest.split(' ').map(num => Number(num)),
	)
})

const evaluate = (expression: string) => {
	const tokens = expression.split(' ')

	let result = Number(tokens[0])
	for (let i = 1; i < tokens.length; i += 2) {
		const op = tokens[i]
		const val = Number(tokens[i + 1])

		if (op === '+') {
			result = result + val
		} else if (op === '*') {
			result = result * val
		} else if (op === '||') {
			result = Number(String(result) + String(val))
		}
	}

	return result
}

{
	let calibrationResult = 0

	equations.forEach((numbers, target) => {
		let formulas = [`${numbers[0]}`]

		numbers.slice(1).forEach(num => {
			const newFormulas: string[] = []

			formulas.forEach(formula => {
				newFormulas.push(`${formula} + ${num}`)
				newFormulas.push(`${formula} * ${num}`)
			})

			formulas = newFormulas
		})

		for (const formula of formulas) {
			const result = evaluate(formula)

			if (result === target) {
				calibrationResult += target

				break
			}
		}
	})

	console.log(`P1: calibrationResult: ${calibrationResult}`)
}

{
	let calibrationResult = 0

	equations.forEach((numbers, target) => {
		let formulas = [`${numbers[0]}`]

		numbers.slice(1).forEach(num => {
			const newFormulas: string[] = []

			formulas.forEach(formula => {
				newFormulas.push(`${formula} + ${num}`)
				newFormulas.push(`${formula} * ${num}`)
				newFormulas.push(`${formula} || ${num}`)
			})

			formulas = newFormulas
		})

		for (const formula of formulas) {
			const result = evaluate(formula)

			if (result === target) {
				calibrationResult += target

				break
			}
		}
	})

	console.log(`P2: calibrationResult: ${calibrationResult}`)
}

console.log()
