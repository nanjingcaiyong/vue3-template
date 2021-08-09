import { defineComponent } from 'vue'
import PropTypes from 'vue-types'
export default defineComponent({
  name: 'TabPane',
  props: {
    tab: PropTypes.string.def('')
  },
  render () {
    return this.$slots.default?.()
  }
})