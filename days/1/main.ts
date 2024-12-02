const day = 1

console.log()
console.log(`Advent of code, day= ${day}`)

const filePath = './input/1.txt'
// const filePath = './test_input/1.txt'

const f = Deno.readTextFileSync(filePath)
const lines = f.trim().split('\n')

const l1: number[] = []
const l2: number[] = []

lines.forEach((line) => {
	line.trim()

	const [a, b] = line.split('   ').map(Number)
	l1.push(a)
	l2.push(b)
})

l1.sort()
l2.sort()

let total = 0

l1.forEach((v1, i) => {
	const v2 = l2[i]

	total += Math.max(v1, v2) - Math.min(v1, v2)
})

console.log(`P1: total= ${total}`)

let similarityScore = 0
const counter: { [key: number]: number } = {}

l2.forEach((v) => {
	counter[v] = (counter[v] || 0) + 1
})

l1.forEach((v) => {
	similarityScore += v * (counter[v] || 0)
})

console.log(`P2: similarityScore= ${similarityScore}`)

console.log()
