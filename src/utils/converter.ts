import { bs, months, monthsEng } from "../constants"
import { evaluateEnglishDate, evaluateNepaliDate } from "./evaluate"
import { AdDateSanitizer, BsDateSanitizer } from "./sanitizer"

const startEnglishDate = "1921-04-13"

function adToBs(adDate: string, format = true) {
  adDate = AdDateSanitizer(adDate)
  const startDate = new Date(startEnglishDate)
  const today = new Date(adDate)
  const daysDifference = Math.floor(
    (today.getTime() - startDate.getTime()) / 86400000
  )
  if (daysDifference < 0) {
    throw new Error("AD Date out of range")
  }
  return evaluateNepaliDate(daysDifference, format)
}

function bsToAd(selectedDate: string) {
  selectedDate = BsDateSanitizer(selectedDate)
  const splittedDate = selectedDate.split("-")
  const year = parseInt(splittedDate[0])
  const month = parseInt(splittedDate[1])
  const day = parseInt(splittedDate[2])
  let daysDiff = 0
  for (let i = 1978; i <= year; i++) {
    if (i === year) {
      for (let j = 1; j < month; j++) {
        daysDiff += bs[i][j]
      }
      daysDiff += day - 1
    } else {
      for (let j = 1; j <= 12; j++) {
        daysDiff += bs[i][j]
      }
    }
  }
  return evaluateEnglishDate(startEnglishDate, daysDiff)
}

function getBsMonthName(month: number, locale = "ne"): string {
  if (locale === "en") {
    return monthsEng[month - 1]
  } else {
    return months[month - 1]
  }
}

function getBsMonths(locale = "ne"): string[] {
  if (locale === "ne") {
    return monthsEng
  } else {
    return months
  }
}

export { adToBs, bsToAd, getBsMonthName, getBsMonths }
