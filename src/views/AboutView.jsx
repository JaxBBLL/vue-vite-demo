import { defineComponent, ref } from 'vue'
import { NButton } from 'naive-ui'

const msg = ref('abc')
const handleClick = () => {
  msg.value = '123'
}

export default defineComponent({
  render() {
    return (
      <NButton type="primary" onClick={handleClick}>
        click me {msg.value}
      </NButton>
    )
  },
})
