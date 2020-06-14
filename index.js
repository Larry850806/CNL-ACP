let selectedUser = null

function handleUserSelect(idx) {
  selectedUser = idx
  for (let i = 0; i < 4; i++) {
    let selector = `.cards > .card:nth(${i})`
    if (i == idx) {
      $(selector).addClass('active')
    } else {
      $(selector).removeClass('active')
    }
  }
}

for (let i = 0; i < 4; i++) {
  let selector = `.cards > .card:nth(${i})`
  $(selector).click(() => handleUserSelect(i))
}

$('#submit').click(() => {
  let name = $(`.card .header:nth(${selectedUser})`).text()
  if (name === '') {
    alert('要先選你是誰才能送出哦')
    return
  }

  let inputValues = [0, 1, 2, 3].map((i) => {
    let selector = `input:nth(${i})`
    return $(selector).is(':checked')
  })
  alert(`你是${name}\n時段：${inputValues}`)
})
