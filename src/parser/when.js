import { parseStyles } from './styles'

const parseWhen = (block, bundle) => {
  const component_id = block.content[0]

  let context_id = block.content[2]
  const property_id = `${component_id}.${context_id}`
  if (block.content.length === 5) {
    bundle.properties.map[property_id].options.push(block.content[4])
    context_id = `${block.content[2]}.${block.content[4]}`
  } else {
    bundle.properties.map[property_id] = {
      id: property_id,
      component_id,
      name: block.content[2],
      default: false,
      options: [ false, true ],
      type: 'bool',
    }
    bundle.properties.list.push(property_id)
  }

  block.children.forEach((block) => {
    const elementId = block.content[0]
    const element_id = `${component_id}.${elementId}`

    // Parse styles for element
    bundle = parseStyles(component_id, element_id, context_id, block, bundle)
  })

  return bundle
}

export { parseWhen }

export default {
  parseWhen
}
