const a = 'abcd'.split('')
const separate = '.'

function insertSeparate(first, arr, count) {
  if (count === 0) {
    console.log((first + arr).replace(/,/g, ''))
  }
  for (let i = 1; i < arr.length; i += 1) {
    insertSeparate(`${first}${arr.slice(0, i)}.`, arr.slice(i), count - 1)
  }
}

function start() {
  for (let j = 1; j <= a.length - 1; j += 1) {
    insertSeparate('', a, j)
  }
}

start()
