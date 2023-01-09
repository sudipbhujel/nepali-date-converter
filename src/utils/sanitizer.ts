import { bs } from "../constants"

function dateSanitizer(date: string) {
  const splittedDate = date.split("-")
  if (splittedDate.length !== 3) {
    throw new Error("Date format is invalid")
  }
  const year = parseInt(splittedDate[0])
  const month = parseInt(splittedDate[1])
  const day = parseInt(splittedDate[2])

  if (day > 32 || day < 1 || !day) {
    throw new Error("Day is invalid.")
  }

  if (month > 12 || month < 1 || !month) {
    throw new Error("Month is invalid.")
  }

  if (!year || year.toString().length < 4) {
    throw new Error("Year is invalid.")
  }
  return { year, month, day }
}

function AdDateSanitizer(date: string) {
  const { year, month, day } = dateSanitizer(date)

  if (year > 2040) {
    throw new Error("AD Date out of range")
  }

  if (month > 31) {
    throw new Error("Month is invalid.")
  }

  return `${year}-${("0" + month).slice(-2)}-${("0" + day).slice(-2)}`
}

function BsDateSanitizer(date: string) {
  const { year, month, day } = dateSanitizer(date)
  if (year < 1978 || year > 2099) {
    throw new Error("BS Date out of range")
  }
  if (day > bs[year][month]) {
    throw new Error(`No ${day} day exits in this month.`)
  }
  return `${year}-${("0" + month).slice(-2)}-${("0" + day).slice(-2)}`
}

export { AdDateSanitizer, BsDateSanitizer }
