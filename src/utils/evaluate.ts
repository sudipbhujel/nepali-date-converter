import { bs } from "../constants"

function evaluateEnglishDate(date: string, days: number): string {
  var result = new Date(date)
  result.setDate(result.getDate() + days)
  const year = result.getFullYear()
  const month = result.getMonth() + 1
  const day = result.getDate()
  return `${year}-${month > 9 ? month : "0" + month}-${
    day > 9 ? day : "0" + day
  }`
}

type EvaluateNepaliDateReturn = {
  year: number
  month: number
  day: number
}

function evaluateNepaliDate(
  dateElapsed: number,
  format = true
): string | { year: number; month: number; day: number } {
  let currentYear = 0
  let currentMonth = 0
  let currentDay = 0
  let totalD = 0
  let flag = false
  for (let i = 1978; i < 2100; i++) {
    if (flag) {
      break
    }
    for (let j = 1; j <= 12; j++) {
      totalD += bs[i][j]
      if (dateElapsed - totalD < 0) {
        currentDay = dateElapsed - totalD + bs[i][j] + 1
        flag = true
        currentYear = i
        currentMonth = j
        break
      }
    }
  }
  if (format)
    return `${currentYear}-${("0" + currentMonth).slice(-2)}-${(
      "0" + currentDay
    ).slice(-2)}`
  else return { year: currentYear, month: currentMonth, day: currentDay }
}

export { evaluateEnglishDate, evaluateNepaliDate }
