<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
      style="border-bottom: 1px solid #ccc"
    />
    <Editor
      :defaultConfig="editorConfig"
      :mode="mode"
      :model-value="modelValue"
      :style="style"
      @onCreated="handleCreated"
      @onChange="handleChange"
      @onDestroyed="handleDestroyed"
      @onFocus="handleFocus"
      @onBlur="handleBlur"
      @customAlert="customAlert"
      @customPaste="customPaste"
    />
  </div>
</template>

<script name="WangEditor">
import '@wangeditor/editor/dist/css/style.css'
import { computed, onBeforeUnmount, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  components: { Editor, Toolbar },
  props: {
    height: {
      type: [Number, String],
      default: 400,
    },
    modelValue: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: 'default', // simple, default
    },
    toolbarConfig: {
      type: Object,
      default: () => ({
        // editor.getAllMenuKeys()查看所有keys
        // 排除的menu key
        excludeKeys: ['insertImage', 'emotion', 'uploadVideo'],
      }),
    },
    editorConfig: {
      type: Object,
      default: () => ({
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            server: '/api/upload',
          },
        },
      }),
    },
  },
  emits: [
    'update:modelValue',
    'onCreated',
    'onChange',
    'onFocus',
    'onBlur',
    'customPaste',
  ],
  setup(props, { emit }) {
    // 编辑器实例，必须用 shallowRef，重要！
    const editorRef = shallowRef()
    const style = computed(() => {
      const height =
        typeof props.height === 'number' ? props.height + 'px' : props.height
      return `height: ${height}; overflow-y: hidden`
    })

    // 组件销毁时，也及时销毁编辑器，重要！
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) {
        return
      }
      editor.destroy()
    })

    // 编辑器回调函数
    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
      emit('onCreated', editor)
    }

    const handleChange = (editor) => {
      emit('update:modelValue', editor.getHtml())
      emit('onChange', editor.getHtml())
    }

    const handleDestroyed = (editor) => {
      console.log('destroyed', editor)
    }

    const handleFocus = (editor) => {
      emit('onFocus', editor)
    }

    const handleBlur = (editor) => {
      emit('onBlur', editor)
    }

    const customAlert = (info, type) => {}

    const customPaste = (editor, event, callback) => {
      emit('customPaste', editor, event, callback)
      // 返回值（注意，vue 事件的返回值，不能用 return）
      // callback(false) // 返回 false ，阻止默认粘贴行为
      // callback(true) // 返回 true ，继续默认的粘贴行为
    }

    return {
      style,
      editorRef,
      handleCreated,
      handleChange,
      handleDestroyed,
      handleFocus,
      handleBlur,
      customAlert,
      customPaste,
    }
  },
}
</script>
