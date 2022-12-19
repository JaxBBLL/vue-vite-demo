import { ref } from 'vue';

export const currentPath = ref('');

export const data = ref([
  {
    children: [
      {
        edit: 1,
        point: {
          x: 0,
          y: 0,
        },
        style: {
          'font-family': 'SourceHanSansCN-Normal',
          'font-size': '50px',
          'letter-spacing': '0px',
          'line-height': '0px',
          'text-align': 'left',
        },
        type: 'image',
        value:
          'https://img1.zhaosw.com/zs-pre/upload/images/202210/19/690aa9e4-f685-4d01-8973-9a875796cc77.png',
      },
      {
        edit: 0,
        point: {
          x: 0,
          y: 0,
        },
        style: {
          'font-family': 'SourceHanSansCN-Normal',
          'font-size': '50px',
          'letter-spacing': '0px',
          'line-height': '0px',
          'text-align': 'left',
        },
        type: 'image',
        value:
          'https://img1.zhaosw.com/zs-pre/upload/images/202210/20/9ed83668-7ce8-4259-a979-edfa67efc24f.png',
      },
      {
        point: {
          x: 143,
          y: 19,
        },
        style: {
          color: 'rgba(255,255,255,1)',
          'font-family': 'SourceHanSansCN-Bold',
          'font-size': '42px',
          height: '42px',
          'letter-spacing': '0px',
          'line-height': '42px',
          'text-align': 'center',
          width: '504px',
        },
        type: 'text',
        value: '山东中崛重工机械十二个字',
      },
      {
        point: {
          x: 225,
          y: 726,
        },
        style: {
          color: 'rgba(0,0,0,1)',
          'font-family': 'SourceHanSansCN-Heavy',
          'font-size': '42px',
          height: '42px',
          'letter-spacing': '12px',
          'line-height': '42px',
          'text-align': 'left',
          width: '486px',
        },
        type: 'text',
        value: '蚊帐杆拉挤成型设备',
      },
      {
        point: {
          x: 27,
          y: 648,
        },
        style: {
          color: 'rgba(255,255,255,1)',
          'font-family': 'SourceHanSansCN-Heavy',
          'font-size': '52px',
          height: '118px',
          'letter-spacing': '10px',
          'line-height': '59px',
          'text-align': 'center',
          width: '124px',
        },
        type: 'text',
        value: '品牌保障',
      },
      {
        point: {
          x: 225,
          y: 666,
        },
        style: {
          color: 'rgba(254,255,255,1)',
          'font-family': 'SourceHanSansCN-Medium',
          'font-size': '28px',
          height: '28px',
          'letter-spacing': '10px',
          'line-height': '28px',
          'text-align': 'left',
          width: '489px',
        },
        type: 'text',
        value: '一站采购 规格齐全 量大价优',
      },
    ],
    edit: 0,
    name: '商品主图',
    point: {
      x: 0,
      y: 0,
    },
    style: {
      height: '790px',
      width: '790px',
    },
    type: 'canvas',
    value: '',
  },
]);

export const editData = ref({});
export const curIndex = ref(-1);
export const curType = ref('');
