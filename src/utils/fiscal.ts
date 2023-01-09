import { bsToAd } from "./converter"

function getFiscalDateMonthWiseEN(year: number) {
  const boundaries: string[] = []

  let month = 5

  for (let i = 0; i < 12; i++) {
    if (month > 12) {
      month = 1
      year = year + 1
    }
    const nepaliDate = `${year}-${month}-01`
    const adDate = bsToAd(nepaliDate)
    const date = new Date(adDate)
    date.setDate(date.getDate() - 1)
    const lastDate = date.toISOString().split("T")[0]
    boundaries.push(lastDate)
    month = month + 1
  }

  return boundaries
}

export { getFiscalDateMonthWiseEN }
