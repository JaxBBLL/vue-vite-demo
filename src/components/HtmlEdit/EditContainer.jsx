import { defineComponent } from 'vue';
import { currentPath, data } from './data.js';
import styles from './EditContainer.module.less';

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
    },
  },
  setup(props) {
    const imageEditHandle = (e, pIndex, index) => {
      data.value[pIndex].children[index].value =
        'https://tempim-1256796114.cos.ap-shanghai.myqcloud.com/100x100';
    };

    const textChange = (e, pIndex, index) => {
      const value = e.target.textContent;
    };

    const textClick = (e, path) => {
      console.log(e);
      currentPath.value = path;
      nextTick(() => {
        e.target.focus();
      });
    };

    const textBlur = (e, pIndex, index) => {
      console.log(e);
      const value = e.target.textContent;
      currentPath.value = '';
      data.value[pIndex].children[index].value = value;
    };

    const style = {
      position: 'relative',
      ...props.modelValue.style,
    };
    const children = () => {
      return props.modelValue.children.map((item, index) => {
        const path = props.index + '-' + index;
        const style = {
          position: 'absolute',
          left: item.point.x + 'px',
          top: item.point.y + 'px',
          'z-index': index + 10,
          overflow: 'hidden',
          ...item.style,
        };
        if (item.type === 'text') {
          return (
            <div
              class={styles.text}
              onKeyup={(e) => textChange(e, props.index, index)}
              onClick={(e) => textClick(e, path)}
              onBlur={(e) => textBlur(e, props.index, index)}
              contentEditable={path === currentPath.value ? 'true' : 'false'}
              style={style}
            >
              {item.value}
            </div>
          );
          // return path === currentPath.value ? (
          //   <textarea onBlur={textBlur} onInput={textChange} class={styles.textarea} style={style}>
          //     {item.value}
          //   </textarea>

          // ) : (
          //   <div onClick={(e) => textEditHandle(e, index)} style={style}>
          //     {item.value}
          //   </div>
          // )
        } else if (item.type === 'image') {
          const imageStyle = {
            width: style.width,
            height: style.height,
          };
          return (
            <div class={styles.imageWrap} style={style}>
              <img src={item.value} style={imageStyle} />
              <div
                onClick={(e) => imageEditHandle(e, props.index, index)}
                class={styles.imageEdit}
              ></div>
            </div>
          );
        }
      });
    };
    return () => (
      <div class={styles.container} style={style}>
        {children()}
      </div>
    );
  },
});
