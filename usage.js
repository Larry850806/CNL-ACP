const getNameSel = (idx) => `div.name:nth(${idx})`
const getRatioSel = (idx) => `div.progress div.progress:nth(${idx})`
const getBarSel = (idx) => `div.bar:nth(${idx})`
const getSplitTimeSel = () => `#last-split-time > span`

// init username
axios('http://140.112.225.211:8888/usage').then(({ data }) => {
  console.log(data)
  let splitTime = data[2]

  data = data[1]
  let usernames = Object.keys(data)
  console.log(usernames)

  $(getSplitTimeSel()).text(splitTime)
  usernames.map((name, idx) => {
    let ratio = Math.round(data[name] * 100) + '%'
    $(getNameSel(idx)).text(name)
    $(getRatioSel(idx)).text(ratio)
    $(getBarSel(idx)).css('width', ratio)
  })
})
