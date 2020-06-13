function handleUserSelect(idx) {
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
  console.log(selector)
  $(selector).click(() => handleUserSelect(i))
}
