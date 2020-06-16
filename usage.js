const getNameSel = (idx) => `div.name:nth(${idx})`
const getRatioSel = (idx) => `div.progress div.progress:nth(${idx})`
const getBarSel = (idx) => `div.bar:nth(${idx})`

// init username
axios('http://140.112.225.211:8888/usage').then(({ data }) => {
  data = data[1]
  console.log(data)

  let usernames = Object.keys(data)
  console.log(usernames)

  usernames.map((name, idx) => {
    let ratio = Math.round(data[name] * 100) + '%'
    $(getNameSel(idx)).text(name)
    $(getRatioSel(idx)).text(ratio)
    $(getBarSel(idx)).css('width', ratio)
  })
})
