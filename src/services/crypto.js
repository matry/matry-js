const hash = (str) => {
  let hash = 0
  let i
  let chr

  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0
  }

  return hash
}

export { hash }

export default {
  hash,
}
