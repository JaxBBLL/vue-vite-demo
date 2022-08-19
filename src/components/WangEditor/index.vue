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
      @customPaste="customPaste"
    />
  </div>
</template>

<script lang="ts" setup name="WangEditor">
import '@wangeditor/editor/dist/css/style.css'
import type {
  IDomEditor,
  IToolbarConfig,
  IEditorConfig,
} from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    mode?: 'simple' | 'default'
    height?: number | string
    toolbarConfig?: Partial<IToolbarConfig>
    editorConfig?: Partial<IEditorConfig>
  }>(),
  {
    mode: 'default', // simple default
    height: 400,
    toolbarConfig: () => ({
      // editor.getAllMenuKeys()查看所有keys
      // 排除的menu key
      excludeKeys: ['insertImage', 'emotion', 'uploadVideo'],
    }),
    editorConfig: () => ({
      placeholder: '请输入内容...',
      MENU_CONF: {
        uploadImage: {
          server: `${import.meta.env.VITE_API_BASE}/file/upload`,
          fieldName: 'file',
          headers: {},
          // 自定义插入
          customInsert(
            res: AnyObject,
            insertFn: (url: string, alt: string, href: string) => void
          ) {
            const { url, alt, href } = res.data as Record<string, string>
            if (!url) throw new Error(`Image url is empty`)
            insertFn(url, alt, href)
          },
        },
      },
    }),
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', str: string): void
  (e: 'onCreated', editor: IDomEditor): void
  (e: 'onChange', str: string): void
  (e: 'onFocus', editor: IDomEditor): void
  (e: 'onBlur', editor: IDomEditor): void
  (
    e: 'customPaste',
    editor: IDomEditor,
    event: Event,
    callback: (b: boolean) => void
  ): void
}>()

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef<IDomEditor>()

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
const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  emit('onCreated', editor)
}

const handleChange = (editor: IDomEditor) => {
  emit('update:modelValue', editor.getHtml())
  emit('onChange', editor.getHtml())
}

const handleDestroyed = (editor: IDomEditor) => {}

const handleFocus = (editor: IDomEditor) => {
  emit('onFocus', editor)
}

const handleBlur = (editor: IDomEditor) => {
  emit('onBlur', editor)
}

const customPaste = (
  editor: IDomEditor,
  event: Event,
  callback: (b: boolean) => void
) => {
  emit('customPaste', editor, event, callback)
  // 返回值（注意，vue 事件的返回值，不能用 return）
  // callback(false) // 返回 false ，阻止默认粘贴行为
  // callback(true) // 返回 true ，继续默认的粘贴行为
}
</script>
<style lang="postcss" scoped>
.w-e-full-screen-container {
  z-index: 10000;
}
:deep(.w-e-bar-divider),
:deep(.w-e-bar-item),
:deep(.w-e-bar-item button) {
  height: 30px;
}
:deep(.w-e-bar-item-group .w-e-bar-item-menus-container) {
  top: -10px;
}
</style>
