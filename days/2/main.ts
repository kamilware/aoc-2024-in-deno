const day = 2

type Report = number[]

const isSafe = (report: Report): boolean => {

    return true;
}

console.log()
console.log(`Advent of code, day= ${day}`)

const filePath = './test_input/d2.txt'

const f = Deno.readTextFileSync(filePath)
const lines = f.trim().split('\n')

let safeReportCount = 0
const reports: Report[] = lines.map(line => line.trim().split(' ').map(Number))

reports.forEach(report => {
    const safe = isSafe(report)

    if (safe){
        safeReportCount += 1
    }

    console.log(`${report} is ${!safe ? 'not' : ''} safe`)
})

console.log(`P1: safe report count= ${safeReportCount}`)
