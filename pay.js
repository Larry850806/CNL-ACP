const getBalanceSel = (idx) => `tbody td:nth(${idx + 1})`
const getNameSel = (idx) => `thead th:nth(${idx + 1})`

// init username and balance
axios('http://140.112.225.211:8888/usage').then(({ data }) => {
  data = data[0]
  console.log(data)

  let usernames = Object.keys(data)
  console.log(usernames)

  usernames.map((name, idx) => {
    let balance = data[name]

    $(getNameSel(idx)).text(name)
    $(getBalanceSel(idx)).text(balance)
  })
})
