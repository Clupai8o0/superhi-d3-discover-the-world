// https://www.numbeo.com/cost-of-living/in/New-York

const clean = function (input) {
  return parseFloat(input.innerHTML.replace(/[$,]/g, ""), 10)
}

const apartment = clean(document.querySelector("body > div.innerWidth > table > tbody > tr:nth-child(56) > td.priceValue"))
const utilities = clean(document.querySelector("body > div.innerWidth > table > tbody > tr:nth-child(40) > td.priceValue"))
const monthlyPass = clean(document.querySelector("body > div.innerWidth > table > tbody > tr:nth-child(32) > td.priceValue.tr_highlighted"))
const expensiveMeal = clean(document.querySelector("body > div.innerWidth > table > tbody > tr:nth-child(3) > td.priceValue.tr_highlighted"))

const singlePerson = clean(document.querySelector("body > div.innerWidth > div.seeding-call.limit_size_ad_right.padding_lower.other_highlight_color > ul > li:nth-child(2) > span"))
const family = clean(document.querySelector("body > div.innerWidth > div.seeding-call.limit_size_ad_right.padding_lower.other_highlight_color > ul > li:nth-child(1) > span"))

const city = document.querySelector("body > div.innerWidth > div.seeding-call.limit_size_ad_right.padding_lower.other_highlight_color > p > span").innerHTML

copy({
  city,
  singlePerson,
  family,
  apartment,
  utilities,
  monthlyPass,
  expensiveMeal
})