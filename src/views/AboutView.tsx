import { defineComponent, ref } from 'vue'
import { NButton } from 'naive-ui'

export default defineComponent({
  render() {
    const msg = ref('abc')
    const handleClick = () => {
      msg.value = '123'
    }
    return (
      <NButton type="primary" onClick={handleClick}>
        click me {msg.value}
      </NButton>
    )
  },
})
