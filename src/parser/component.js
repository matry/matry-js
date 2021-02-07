import { parseStyles } from './styles'
import { parseProperties } from './properties'

const parseComponent = (block, bundle) => {
  const component_id = block.content[1]
  bundle.components.map[component_id] = {
    id: component_id,
    name: component_id,
  }
  bundle.components.list.push(component_id)

  block.children.forEach((block) => {
    if (block.content.length === 3 && !block.children.length) {
      bundle = parseProperties(component_id, block, bundle)
      return
    }

    const elementId = block.content[0]
    const element_id = `${component_id}.${elementId}`

    // Parse element
    bundle.elements.map[element_id] = {
      id: element_id,
      name: elementId,
      component_id,
      type: null,
    }
    bundle.elements.list.push(element_id)

    // Parse styles for element
    bundle = parseStyles(component_id, element_id, '_default', block, bundle)
  })

  return bundle
}



export { parseComponent }

export default {
  parseComponent,
}
