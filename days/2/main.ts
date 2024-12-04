const day = 2

type Report = number[]

const isAsc = (report: Report): boolean => {
	for (let i = 1; i < report.length; i++) {
		if (report[i] < report[i - 1]) {
			return false
		}
	}

	return true
}

const isDesc = (report: Report): boolean => {
	for (let i = 1; i < report.length; i++) {
		if (report[i] > report[i - 1]) {
			return false
		}
	}

	return true
}

const isSafe = (report: Report) => {
	if (!(isAsc(report) || isDesc(report))) {
		return false
	}

	for (let i = 1; i < report.length; i++) {
		const diff = Math.abs(report[i] - report[i - 1])

		if (diff < 1 || diff > 3) {
			return false
		}
	}

	return true
}

const canBeSafe = (report: Report) => {
	for (let i = 0; i < report.length; i++) {
		const newReport = [...report.slice(0, i), ...report.slice(i + 1)]

		if (isSafe(newReport)) {
			return true
		}
	}

	return false
}

console.log()
console.log(`Advent of code, day= ${day}`)

// const filePath = './test_input/2.txt'
const filePath = './input/2.txt'

const f = Deno.readTextFileSync(filePath)
const lines = f.trim().split('\n')

let safeReportCount = 0
let safeReportCountAfterDampening = 0
const reports: Report[] = lines.map(line => line.trim().split(' ').map(Number))

reports.forEach(report => {
	const safe = isSafe(report)

	if (safe) {
		safeReportCount += 1
	}

	// console.log(`${report} is ${!safe ? 'not' : ''} safe`)
})

reports.forEach(report => {
	const safe = isSafe(report)

	if (safe || canBeSafe(report)) {
		safeReportCountAfterDampening += 1
	}

	// console.log(`${report} is ${!safe ? 'not' : ''} safe`)
})

console.log(`P1: safeReportCount= ${safeReportCount}`)
console.log(
	`P2: safeReportCountAfterDampening= ${safeReportCountAfterDampening}`
)

console.log()
