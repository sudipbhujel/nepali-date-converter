import { adToBs, bsToAd } from "./converter"

function getFiscalDateMonthWiseEN(year: number): {
  start: string
  boundaries: string[]
  end: string
} {
  const boundaries: string[] = []

  let month = 5
  const startFinancialYear = `${year}-04-01`
  const startFinancialYearAD = bsToAd(startFinancialYear)
  const startFinancialYearDate = new Date(startFinancialYearAD)

  const endFinancialYear = `${year + 1}-04-01`
  const endFinancialYearAD = bsToAd(endFinancialYear)
  const endFinancialYearDate = new Date(endFinancialYearAD)
  endFinancialYearDate.setDate(endFinancialYearDate.getDate() - 1)

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

  return {
    start: startFinancialYearDate.toISOString().split("T")[0],
    boundaries,
    end: endFinancialYearDate.toISOString().split("T")[0],
  }
}

function getFiscalBoundariesByMonth() {
  const today = new Date()

  const date = adToBs(today.toISOString().split("T")[0], false)

  if (typeof date == "object") {
    let { year, month, day } = date

    const fiscalEndDate = bsToAd(`${year}-04-01`)
    const fiscalEndDateAd = new Date(fiscalEndDate)
    fiscalEndDateAd.setDate(fiscalEndDateAd.getDate() - 1)

    // Compare today and fiscalEndDate
    if (today > fiscalEndDateAd) {
      year = year + 1
    } else {
      year = year
    }

    return getFiscalDateMonthWiseEN(year)
  } else {
    return null
  }
}

export { getFiscalDateMonthWiseEN, getFiscalBoundariesByMonth }
