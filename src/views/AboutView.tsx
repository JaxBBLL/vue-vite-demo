import { defineComponent, ref } from 'vue'
import { NButton } from 'naive-ui'

export default defineComponent({
  setup() {
    const msg = ref('abcdefg')
    const handleClick = () => {
      msg.value = msg.value.split('').reverse().join('')
      console.log(msg.value)
    }
    return {
      msg,
      handleClick,
    }
  },
  render(ctx: any) {
    return (
      <NButton type="primary" onClick={ctx.handleClick}>
        {ctx.msg}
      </NButton>
    )
  },
})
