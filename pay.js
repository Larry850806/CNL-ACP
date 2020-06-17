const getBalanceSel = (idx) => `tbody td:nth(${idx + 1})`
const getNameSel = (idx) => `thead th:nth(${idx + 1})`
const getSplitTimeSel = () => `#last-split-time > span`
const getDrop1ItemSel = (idx) => `#payer-dropdown .menu > .item:nth(${idx})`
const getDrop2ItemSel = (idx) => `#payee-dropdown .menu > .item:nth(${idx})`

$('input[type=hidden]').val('')

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
    })
}

function handlePayClick() {
  console.log('pay click')

  // payer: 付款者的名字，只能是一般使用者
  // payee: 收款者的名字，當為’admin’時代表payer付錢給公帳，即是買冷氣卡的意思
  // amount: 付款的數目，整數。當payee = 'admin’時請填400
  let form = new FormData()

  form.set('payer', '乖乖牌')
  form.set('payee', '空氣人')
  form.set('amount', 100)

  axios({
    method: 'post',
    url: 'http://140.112.225.211:8888/pay',
    data: form,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((data) => {
      alert('送出成功')
      console.log(data)
      // location.reload()
    })
    .catch((err) => {
      console.error(err)
    })
}

$('button#split').click(handleSplitClick)
$('button#pay').click(handlePayClick)

$('.dropdown').dropdown()
