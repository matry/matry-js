const parseStyles = (component_id, element_id, context_id, block, bundle) => {
  block.children.forEach(({ content }) => {
    const name = content[0]
    const expression = content.slice(2).join(' ')
    const style_id = `${element_id}.${name}.${context_id}` // "default" context

    if (name === 'element') {
      bundle.elements.map[element_id].type = expression
      return
    }

    bundle.styles.map[style_id] = {
      id: style_id,
      component_id,
      element_id: `${element_id}`,
      context_id,
      name,
      expression,
    }
    bundle.styles.list.push(style_id)
  })

  return bundle
}

export { parseStyles }

export default {
  parseStyles
}
