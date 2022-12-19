<template>
  <div class="">
    <div class="flex">
      <nav class="nav">
        <draggable
          class="nav"
          :list="list"
          :group="{ name: 'people', pull: 'clone', put: false }"
          :sort="false"
          item-key="id"
          :clone="cloneDog"
          @end="onEnd"
        >
          <template #item="{ element }">
            <div class="list-item">
              <img :src="element.icon" alt="" class="item-icon" />
              {{ element.name }}
            </div>
          </template>
        </draggable>
      </nav>
      <el-scrollbar class="app-main-outer">
        <draggable
          v-model="data"
          item-key="id"
          group="people"
          class="app-main"
          animation="150"
          @update="onChange"
        >
          <template #item="{ element, index }">
            <DragWrap
              :element="element"
              :index="index"
              @click="onDragClick(element, index)"
              class="drag-container"
              :key="index"
              :class="index === curIndex ? 'act-drag' : ''"
            >
              <template v-if="element.type === 'text'">
                <div
                  :style="element.style"
                  :contenteditable="index === curIndex"
                  @keyup="textChange"
                  class="drag-item"
                >
                  {{ element.value }}
                </div>
              </template>
              <template v-if="element.type === 'image'">
                <div class="drag-item">
                  <img :src="element.value" :style="element.style" />
                </div>
              </template>
              <template v-if="element.type === 'canvas'">
                <div class="drag-item">
                  <EditContainer :modelValue="element" />
                </div>
              </template>
              <!-- <div class="controls">
              <span
                @click="upHandle(element, index)"
                :class="index === 0 ? 'disBtn' : ''"
              >
                <el-icon><Top /></el-icon>
              </span>
              <span
                @click="downHandle(element, index)"
                :class="index === data.length - 1 ? 'disBtn' : ''"
              >
                <el-icon><Bottom /></el-icon>
              </span>
              <el-popconfirm
                title="是否确认删除？"
                @confirm="deleteHandle(element, index)"
              >
                <template #reference>
                  <span>
                    <el-icon><Delete /></el-icon>
                  </span>
                </template>
              </el-popconfirm>
            </div> -->
            </DragWrap>
          </template>
        </draggable>
      </el-scrollbar>
    </div>
    <div class="footer-wrap">
      <el-button type="primary" @click="exportHtml">导出</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import DragWrap from './DragWrap.vue';
import EditContainer from './EditContainer.jsx';
import { deepCopy } from '@/utils/index';
import { data, editData, curIndex, curType } from './data.js';
import html2canvas from 'html2canvas';

// watch(
//   () => data,
//   (n) => {
//     console.log(n.value)
//   },
//   {
//     deep: true
//   }
// )

const exportHtml = () => {
  const els = document.querySelectorAll('.drag-container');
  Array.from(els).forEach((el) => {
    html2canvas(el, {
      scale: 2,
      useCORS: true,
    }).then((canvas) => {
      const base64 = canvas.toDataURL();
      downloadImg(base64);
    });
  });
};

const downloadImg = (base64) => {
  var a = document.createElement('a');
  a.download = `${Date.now()}.jpg`;
  a.href = base64;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const list = ref([
  {
    id: 1,
    type: 'text',
    name: '文本组件',
    value: '文本组件',
    icon:
      import.meta.env.VITE_FYWU_URL + 'src/assets/images/icon_wenjianjia.svg',
    style: {
      'line-height': '32px',
      fontSize: '14px',
      padding: '10px 16px',
      background: '#fff',
      fontFamily: '',
      color: '',
      fontWeight: '',
      textAlign: 'left',
    },
  },
  {
    id: 2,
    type: 'image',
    name: '图片组件',
    value:
      'https://img1.zhaosw.com/zsw/upload/images/202206/08/8ccdf9e1-a98f-4acc-a8f6-444bc2926bbb_large.jpg',
    icon:
      import.meta.env.VITE_FYWU_URL + 'src/assets/images/icon_wenjianjia.svg',
    style: {
      display: 'block',
      width: '100%',
    },
  },
  // ,
  // {
  //   id: 3,
  //   type: 'canvas',
  //   name: '高级组件'
  // }
]);
const alignOptions = [
  {
    value: 'left',
    label: '居左',
  },
  {
    value: 'center',
    label: '居中',
  },
  {
    value: 'right',
    label: '居右',
  },
];
const fontOptions = [
  {
    value: '',
    label: '默认',
  },
  {
    value: 'sans-serif',
    label: '黑体',
  },
  {
    value: 'serif',
    label: '宋体',
  },
];
const fontSizeOptions = [
  {
    value: '14px',
    label: '14',
  },
  {
    value: '16px',
    label: '16',
  },
  {
    value: '20px',
    label: '20',
  },
  {
    value: '24px',
    label: '24',
  },
  {
    value: '32px',
    label: '32',
  },
  {
    value: '40px',
    label: '40',
  },
];
const fontcolor = ref('');
const fontFamily = ref('');
const fontSize = ref('14px');
const fontAlign = ref('left');
const emits = defineEmits(['onCloseDetails', 'onSureedit']);
const onBeforeClose = (done: any) => {
  console.log('111');
  ElMessageBox.confirm(
    '关闭弹窗编辑的商品详情将会被清空，是否离开?',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      done();
    })
    .catch(() => {});
};
const onClosedialog = () => {
  data.value = [];
  emits('onCloseDetails', false);
};
const onChange = (e: any) => {
  curIndex.value = e.oldIndex;
};
const onEnd = (e: any) => {
  curIndex.value = e.newIndex;
};
const upHandle = (el: any, i: number) => {
  if (i !== 0) {
    curIndex.value = i - 1;
    data.value.splice(i - 1, 1, ...data.value.splice(i, 1, data.value[i - 1]));
    console.log(curIndex.value);
    // var sourceIndex = i
    // var targetIndex = i - 1
    // data.value[sourceIndex] = data.value.splice(targetIndex, 1, data.value[sourceIndex])[0]
  }
};
const downHandle = (el: any, i: number) => {
  if (i !== data.value.length - 1) {
    curIndex.value = i + 1;
    data.value.splice(i, 1, ...data.value.splice(i + 1, 1, data.value[i]));
    console.log(curIndex.value);
    // var sourceIndex = i
    // var targetIndex = i + 1
    // data.value[targetIndex] = data.value.splice(sourceIndex, 1, data.value[targetIndex])[0]
  }
};
const deleteHandle = (el: any, i: number) => {
  if (i === 0) {
    curIndex.value = 0;
  } else if (i === data.value.length - 1) {
    curIndex.value = i - 1;
  } else {
    curIndex.value = i;
  }
  data.value.splice(i, 1);
  if (data.value.length) {
    curType.value = data.value[curIndex.value].type;
    editData.value = data.value[curIndex.value];
  } else {
    curType.value = '';
    editData.value = {};
  }
};
const cloneDog = (item: any) => {
  curType.value = item.type;
  editData.value = item;
  if (item.type === 'canvas') {
    return {
      type: 'canvas',
      name: '高级组件',
      value:
        'https://img1.zhaosw.com/zsw/upload/images/202111/15/fef8e3c9-138e-4637-a933-7d43934d0817.png',
      style: {
        width: '375px',
        height: '300px',
      },
      editor: [],
      point: {
        x: 0,
        y: 100,
      },
      children: [
        {
          type: 'image',
          isEdit: 1,
          value:
            'https://img1.zhaosw.com/zsw/upload/images/202111/15/fef8e3c9-138e-4637-a933-7d43934d0817.png',
          style: {
            width: '190px',
            height: '288px',
          },
          editor: [],
          point: {
            x: 10,
            y: 50,
          },
        },
        {
          type: 'text',
          isEdit: 1,
          value: '大家好',
          maxLength: 60,
          style: {
            width: '375px',
            height: '100px',
            'font-size': 16,
            'text-align': 'center',
          },
          point: {
            x: 0,
            y: 0,
          },
          editor: [
            {
              key: 'text-align',
              name: '对齐方式',
            },
          ],
        },
      ],
    };
  } else if (item.type === 'image') {
    return {
      ...deepCopy(item),
    };
  } else if (item.type === 'text') {
    return deepCopy(item);
  }
};
const onDragClick = (el: any, i: any) => {
  curType.value = el.type;
  curIndex.value = i;
  if (el.type !== 'canvas') {
    editData.value = el;
  }
};
const textChange = (e: any) => {
  editData.value = e.target.textContent;
  data.value[curIndex.value].value = e.target.textContent;
};
const onAlignChange = (val: any) => {
  data.value[curIndex.value].style.textAlign = val;
};

const onColorChange = (val: any) => {
  data.value[curIndex.value].style.color = val;
};
const onFamiChange = (val: any) => {
  data.value[curIndex.value].style.fontFamily = val;
};
const onSizeChange = (val: any) => {
  data.value[curIndex.value].style.fontSize = val;
};
const onBold = () => {
  if (data.value[curIndex.value].style.fontWeight) {
    data.value[curIndex.value].style.fontWeight = '';
  } else {
    data.value[curIndex.value].style.fontWeight = 'bold';
  }
};
const onChangPic = () => {};
const onSubmit = () => {
  console.log(document.querySelectorAll('.app-main .dragDetails-item'));
  document
    .querySelectorAll('.app-main .dragDetails-item')
    .forEach((el: any) => {
      html2canvas(el, {
        allowTaint: true, //开启跨域
        useCORS: true,
        scrollY: 0,
        scrollX: 0,
      }).then(function (canvas) {
        let imgUrl = canvas.toDataURL('image/png');
        console.log(imgUrl);
      });
    });

  emits('onSureedit', data.value);
};
</script>
<style scoped>
.footer-wrap {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px -1px 4px rgb(0 0 0 / 10%);
  z-index: 100;
  margin-top: 10px;
}

.nav {
  width: 200px;
}

.app-main-outer {
  width: 830px;
  outline: 1px solid #ddd;
  height: calc(100vh - 50px);
  overflow: auto;
}
.app-main {
  width: 790px;
  min-height: 750px;
}
.drag-item {
}
</style>
