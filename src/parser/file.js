const getIndent = (line) => {
  if (!line) {
    return 0
  }

  return line.search(/\S|$/)
}

const replaceMany = (str, mapObj) => {
  const regEx = new RegExp(Object.keys(mapObj).join('|'), 'gi')
  return str.replace(regEx, (matched) => mapObj[matched.toLowerCase()])
}

const splitLines = (text) => {
  return text
    .split(/\r?\n/)
    .filter((line) => line.trim() !== '')
    .map((line) => {
      return replaceMany(line, {
        ':': ' : ',
        '{': '',
        '}': '',
      })
    })
}

export { getIndent, splitLines }

export default { getIndent, splitLines }
