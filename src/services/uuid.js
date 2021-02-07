const uuid = () => `_${Math.random().toString(36).substr(2, 9)}`

export { uuid }

export default {
  uuid,
}
