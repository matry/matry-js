const parseProperties = (component_id, block, bundle) => {
  const name = block.content[0]
  const property_id = `${component_id}.${name}`
  const defaultValue = block.content[2]

  // Determine type
  let type = 'text'
  if (defaultValue.startsWith('#')) {
    type = 'color'
  }

  if (defaultValue.startsWith('/')) {
    type = 'asset'
  }

  if (!isNaN(parseFloat(defaultValue))) {
    if (defaultValue.endsWith('%')) {
      type = 'percent'
    }

    type = 'number'
  }

  bundle.properties.map[property_id] = {
    id: property_id,
    component_id,
    name,
    default: block.content[2],
    options: [ block.content[2] ],
    type: null,
  }

  bundle.properties.list.push(property_id)

  return bundle
}

export { parseProperties }

export default {
  parseProperties
}
