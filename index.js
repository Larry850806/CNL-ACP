const getCardSel = (cardIdx) => `.cards > .card:nth(${cardIdx})`
const getCardNameSel = (cardIdx) => `.card .header:nth(${cardIdx})`
const getInputSel = (inputIdx) => `input:nth(${inputIdx})`

let times = null
let inputValues = null

let selectedUser = null

function initInputStatus() {
  // console.log(inputValues)
  let name = $(getCardNameSel(selectedUser)).text()
  let values = inputValues.map((obj) => obj[name])
  // console.log(values) // [true, false, true, false]
  for (i in values) {
    let selector = getInputSel(i)
    $(selector).prop('checked', values[i])
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

  // user: 想更改的人的名字字串
  // recordtime0: 想修改的時間，yyyy - mm - dd XX: XX: XX格式
  // exist0: 對應recordtime0的布林值，以1代表TRUE以0代表FALSE
  // recordtime6, exist6 : 同上
  // recordtime12, exist12 : 同上
  // recordtime18, exist18 : 同上

  let values = [0, 1, 2, 3].map((i) => {
    let selector = getInputSel(i)
    return $(selector).is(':checked')
  })

  let form = new FormData()

  form.set('user', name)
  form.set('recordtime0', times[0])
  form.set('recordtime6', times[1])
  form.set('recordtime12', times[2])
  form.set('recordtime18', times[3])
  form.set('exist0', values[0].toString())
  form.set('exist6', values[1])
  form.set('exist12', values[2])
  form.set('exist18', values[3])

  console.log(form)

  axios({
    method: 'post',
    url: 'http://140.112.225.211:8888/',
    data: form,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then(() => {
      alert('送出成功')
    })
    .catch((err) => {
      console.error(err)
    })
})

// init username
axios('http://140.112.225.211:8888/').then(({ data }) => {
  // console.log(data)
  times = Object.keys(data)
  inputValues = times.map((t) => data[t])
  let usernames = Object.keys(inputValues[0])

  // set usernames
  // console.log(usernames)
  for (let i = 0; i < 4; i++) {
    $(getCardNameSel(i)).text(usernames[i])
  }
})
