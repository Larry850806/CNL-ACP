const url = 'http://140.112.225.211:8888/signup'

function handleSubmit(idx) {
  let mac = $(`input[name=mac]:nth(${idx})`).val()
  let name = $(`input[name=name]:nth(${idx})`).val()
  const phone = $(`input[name=phone]:nth(${idx})`).val()

  console.log({ mac, name, number: phone })
  let form = new FormData()
  form.set('MAC', mac)
  form.set('name', name)
  form.set('number', phone)

  axios({
    method: 'post',
    url,
    data: form,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then(() => {
      alert('更新成功')
      location.reload()
    })
    .catch((err) => {
      console.error(err)
      alert(err)
      location.reload()
    })
}

axios('http://140.112.225.211:8888/signup').then(({ data }) => {
  console.log(data)
  for (let i = 0; i < 4; i++) {
    const row = data[i]
    $(`input[name=mac]:nth(${i})`).val(row[0])
    $(`input[name=name]:nth(${i})`).val(row[1])
    $(`input[name=phone]:nth(${i})`).val(row[2])

    $(`button.submit:nth(${i})`).click((e) => {
      e.preventDefault()
      handleSubmit(i)
    })
  }
})
