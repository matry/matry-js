import { hash } from '../services/crypto'
import { splitLines } from './file'
import { getBlocks, blockRouter } from './blocks'

const parse = (data = '') => {
  const text = splitLines(data)
  const blocks = getBlocks(text)

  let bundle = {
    components: {
      map: {},
      list: [],
    },
    elements: {
      map: {},
      list: [],
    },
    styles: {
      map: {},
      list: [],
    },
    properties: {
      map: {},
      list: [],
    },
  }

  blocks.forEach((block) => {
    if (blockRouter[block.type]) {
      bundle = blockRouter[block.type](block, bundle)
    }
  })

  const jsonBundle = JSON.stringify(bundle)
  bundle.hash = hash(jsonBundle)

  return bundle
}

export default parse
