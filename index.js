const getCardSel = (cardIdx) => `.cards > .card:nth(${cardIdx})`
const getCardNameSel = (cardIdx) => `.card .header:nth(${cardIdx})`
const getInputSel = (inputIdx) => `input:nth(${inputIdx})`

let selectedUser = null

function initInputStatus() {
  alert('正在抓取 server 蒐集到的時間')
  let inputValues = [true, false, true, true] // get from api
  for (i in inputValues) {
    let selector = getInputSel(i)
    $(selector).prop('checked', inputValues[i])
  }
}

function handleUserSelect(idx) {
  selectedUser = idx
  for (let i = 0; i < 4; i++) {
    let selector = getCardSel(i)
    if (i == idx) {
      $(selector).addClass('active')
    } else {
      $(selector).removeClass('active')
    }
  }
  initInputStatus()
}

for (let i = 0; i < 4; i++) {
  let selector = getCardSel(i)
  $(selector).click(() => handleUserSelect(i))
}

$('#submit').click(() => {
  let name = $(getCardNameSel(selectedUser)).text()
  if (name === '') {
    alert('要先選你是誰才能送出哦')
    return
  }

  let inputValues = [0, 1, 2, 3].map((i) => {
    let selector = getInputSel(i)
    return $(selector).is(':checked')
  })
  alert(`你是${name}\n時段：${inputValues}`)
})
