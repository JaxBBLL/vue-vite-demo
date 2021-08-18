import { ref } from "vue";

export default function useCount(val) {
  let count = ref(val);
  function setCount() {
    count.value++;
  }
  return [count, setCount];
}
