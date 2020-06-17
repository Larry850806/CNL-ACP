const getBalanceSel = (idx) => `tbody td:nth(${idx + 1})`
const getNameSel = (idx) => `thead th:nth(${idx + 1})`
const getSplitTimeSel = () => `#last-split-time > span`
const getDrop1ItemSel = (idx) => `#payer-dropdown .menu > .item:nth(${idx})`
const getDrop2ItemSel = (idx) => `#payee-dropdown .menu > .item:nth(${idx})`

$('input[type=hidden]').val('')
$('input[name=amount]').val('')

// init username and balance
axios('http://140.112.225.211:8888/usage').then(({ data }) => {
  console.log(data)
  let splitTime = data[2]
  data = data[0]

  let usernames = Object.keys(data)

  $(getSplitTimeSel()).text(splitTime)
  usernames.map((name, idx) => {
    let balance = data[name]
    $(getNameSel(idx)).text(name)
    $(getBalanceSel(idx)).text(balance)
    $(getDrop1ItemSel(idx)).text(name)
    $(getDrop2ItemSel(idx)).text(name)
  })
})

function handleSplitClick() {
  console.log('split click')
  axios
    .post('http://140.112.225.211:8888/split')
    .then(({ data }) => {
      console.log(data)
      alert('分帳成功')
      location.reload()
    })
    .catch((err) => {
      console.error(err)
      alert(err)
      location.reload()
    })
}

function handlePayClick() {
  let payer = $('#payer-dropdown .text').text()
  let payee = $('#payee-dropdown .text').text()
  let amount = +$('input[name=amount]').val()

  console.log({ payer, payee, amount })
  if (payer == '轉出帳號') {
    alert('轉出帳號要填')
    return
  }
  if (payee == '轉入帳號') {
    alert('轉出帳號要填')
    return
  }
  if (amount == 0) {
    alert('金額要填')
    return
  }
  if (payee == payer) {
    alert('不可以轉給自己')
    return
  }

  // payer: 付款者的名字，只能是一般使用者
  // payee: 收款者的名字，當為’admin’時代表payer付錢給公帳，即是買冷氣卡的意思
  // amount: 付款的數目，整數。當payee = 'admin’時請填400
  let form = new FormData()
  form.set('payer', payer)
  form.set('payee', payee)
  form.set('amount', amount)

  axios({
    method: 'post',
    url: 'http://140.112.225.211:8888/pay',
    data: form,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((data) => {
      alert('轉帳成功')
      console.log(data)
      location.reload()
    })
    .catch((err) => {
      console.error(err)
      alert(err)
      location.reload()
    })
}

$('button#split').click(handleSplitClick)
$('button#pay').click(handlePayClick)
$('.dropdown').dropdown()
$('form.pay').keypress((e) => {
  var keycode = event.keyCode ? event.keyCode : event.which
  if (keycode == '13') {
    // do nothing on Enter pressed
    e.preventDefault()
  }
})
