const getBalanceSel = (idx) => `tbody td:nth(${idx + 1})`
const getNameSel = (idx) => `thead th:nth(${idx + 1})`

// init username and balance
axios('http://140.112.225.211:8888/usage').then(({ data }) => {
  data = data[0]
  // console.log(data)

  let usernames = Object.keys(data)
  // console.log(usernames)

  usernames.map((name, idx) => {
    let balance = data[name]
    $(getNameSel(idx)).text(name)
    $(getBalanceSel(idx)).text(balance)
  })
})

function handleSplitClick() {
  console.log('split click')
  axios
    .post('http://140.112.225.211:8888/split')
    .then(({ data }) => {
      console.log(data)
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
    .then(() => {
      alert('送出成功')
      location.reload()
    })
    .catch((err) => {
      console.error(err)
    })
}

$('button#split').click(handleSplitClick)
$('button#pay').click(handlePayClick)
