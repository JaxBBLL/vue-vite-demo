<script setup name="Editor">
import tinymce from 'tinymce/tinymce'
import TinymceEditor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default/icons'
import 'tinymce/models/dom'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/image'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/table'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/code'
import 'tinymce/plugins/searchreplace'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  setting: {
    type: Object,
    default: () => {},
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const images_upload_handler = (blobInfo, progress) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.withCredentials = false
    xhr.open('POST', 'postAcceptor.php')

    xhr.upload.onprogress = (e) => {
      progress((e.loaded / e.total) * 100)
    }

    xhr.onload = () => {
      if (xhr.status === 403) {
        reject({ message: 'HTTP Error: ' + xhr.status, remove: true })
        return
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        reject('HTTP Error: ' + xhr.status)
        return
      }

      const json = JSON.parse(xhr.responseText)

      if (!json || typeof json.location != 'string') {
        reject('Invalid JSON: ' + xhr.responseText)
        return
      }

      resolve(json.location)
    }

    xhr.onerror = () => {
      reject(
        'Image upload failed due to a XHR Transport error. Code: ' + xhr.status
      )
    }

    const formData = new FormData()
    formData.append('file', blobInfo.blob(), blobInfo.filename())

    xhr.send(formData)
  })

const defaultSetting = ref({
  language_url: 'tinymce/langs/zh-Hans.js',
  language: 'zh-Hans',
  skin_url: 'tinymce/skins/ui/oxide',
  content_css: 'tinymce/skins/content/default/content.min.css',
  min_height: 250,
  max_height: 600,
  selector: 'textarea',
  plugins:
    'autolink autoresize fullscreen image insertdatetime link lists media preview table wordcount code searchreplace',
  toolbar:
    'undo redo | blocks | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor removeformat | link image media table insertdatetime searchreplace | preview code fullscreen',
  branding: false,
  menubar: false,
  toolbar_mode: 'sliding',
  insertdatetime_formats: [
    '%Y年%m月%d日',
    '%H点%M分%S秒',
    '%Y-%m-%d',
    '%H:%M:%S',
  ],
  images_upload_handler: images_upload_handler,
})

const myValue = ref(props.modelValue)

const completeSetting = computed(() => {
  return Object.assign(defaultSetting.value, props.setting)
})

watch(
  () => myValue.value,
  (newValue) => {
    emit('update:modelValue', newValue)
  }
)

watch(
  () => props.modelValue,
  (newValue) => {
    myValue.value = newValue
  }
)

onMounted(() => {
  tinymce.init({})
})
</script>

<template>
  <div class="editor">
    <TinymceEditor
      v-model="myValue"
      :init="completeSetting"
      :disabled="disabled"
    />
  </div>
</template>

<style scoped>
:deep(.tox-tinymce) {
  border-radius: 4px;
}
</style>
