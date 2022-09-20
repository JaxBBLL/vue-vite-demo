import { ref } from 'vue';

export const currentPath = ref('');

export const data = ref([
  {
    id: 3,
    type: 'canvas',
    value:
      'https://img1.zhaosw.com/zsw/upload/images/202206/08/8ccdf9e1-a98f-4acc-a8f6-444bc2926bbb_large.jpg',
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
          'https://img1.zhaosw.com/zsw/upload/images/202203/29/def8fff7-8e16-4f08-aa01-6ff02993cad3_thumbnail.JPG',
        style: {
          width: '170px',
          height: '170px',
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
          height: '30px',
          'font-size': '14px',
          'text-align': 'center',
          'font-family': 'monospace',
        },
        point: {
          x: 0,
          y: 10,
        },
        editor: [
          {
            key: 'text-align',
            name: '对齐方式',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    type: 'canvas',
    value: '',
    style: {
      width: '375px',
      height: '100px',
    },
    children: [
      {
        type: 'text',
        value: '这是一段文本，这是一段文本',
        style: {
          width: '375px',
          height: '60px',
          'font-size': '14px',
          color: '#ff0000',
          'text-align': 'center',
          'font-family': 'monospace',
        },
        point: {
          x: 0,
          y: 10,
        },
        editor: [
          {
            key: 'text-align',
            name: '对齐方式',
          },
        ],
      },
    ],
  },
]);
