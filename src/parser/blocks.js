import { getIndent } from './file'
import { parseComponent } from './component'
import { parseWhen } from './when'

const BLOCK_TYPES = [
  'component',
  'tokens',
  'mock',
  'mocks',
]

const getBlockType = (content) => {
  if (BLOCK_TYPES.includes(content[0])) {
    return content[0]
  }

  if (content[1] === 'when') {
    return 'when'
  }

  return 'anonymous'
}

const getBlocks = (lines) => {
  const blocks = []
  const rootIndent = getIndent(lines[0])

  let block = null
  lines.forEach((line) => {
    if (getIndent(line) === rootIndent) {
      if (block !== null) {
        blocks.push(block)
      }

      const content = line
        .trim()
        .split(' ')
        .filter((part) => part !== '')

      block = {
        type: getBlockType(content),
        content,
        children: [],
      }
      return
    }

    if (block) {
      block.children.push(line)
    }
  })

  if (block) {
    blocks.push(block)
  }

  return blocks.map((block) => {
    block.children = getBlocks(block.children)
    return block
  })
}

const blockRouter = {
  component: parseComponent,
  when: parseWhen,
}

export { getBlocks, blockRouter }

export default {
  getBlocks,
  blockRouter,
}
