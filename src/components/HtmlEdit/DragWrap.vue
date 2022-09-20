<template>
  <div class="drag-container">
    <slot></slot>
    <!-- <div class="handle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-arrows-move"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"
        />
      </svg>
    </div> -->
    <div class="controls">
      <span @click="upHandle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-arrow-up-short"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
          />
        </svg>
      </span>
      <span @click="downHandle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-arrow-down-short"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
          />
        </svg>
      </span>
      <span @click="deleteHandle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-trash-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
          />
        </svg>
      </span>
    </div>
  </div>
</template>
<script setup name="DragWrap">
import { data } from './data';
const props = defineProps({
  index: {
    type: Number,
  },
});

const upHandle = () => {
  console.log(props.index);
};

const downHandle = () => {
  console.log(props.index);
};

const deleteHandle = () => {
  data.value.splice(props.index, 1);
};
</script>
<style lang="less" scoped>
.drag-container {
  position: relative;
  // padding: 10px;
  outline: 1px dashed #f5f5f5;

  .handle {
    position: absolute;
    top: 0;
    left: -1px;
    transform: translateX(-100%);
    box-shadow: 1px 2px 4px rgb(0 0 0 / 20%);
    background-color: #fff;
    padding: 5px 8px;
    cursor: move;
  }
  .controls {
    position: absolute;
    top: 0;
    right: 0px;
    transform: translateX(100%);
    box-shadow: 1px 2px 4px rgb(0 0 0 / 20%);
    background-color: #fff;
    display: none;
    flex-direction: column;
    > span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      cursor: pointer;
      text-align: center;
      color: #666;
    }
    span + span {
      border-top: 1px solid #f5f5f5;
    }
  }
  &:hover {
    .controls {
      display: flex;
    }
  }
}
</style>
