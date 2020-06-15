const getBalanceSel = (idx) => `tbody td:nth(${idx + 1})`

function initBalance() {
  alert('正在抓取 server 餘額')
  let inputValues = [-150, 100, 70, 80] // get from api
  for (i in inputValues) {
    let selector = getBalanceSel(i)
    $(selector).text(inputValues[i])
  }
}

initBalance()
