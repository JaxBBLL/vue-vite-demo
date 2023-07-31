import { ref, type Ref } from 'vue';

const useArray = <T>(array: T[]) => {
  const list: Ref<T[]> = ref(array) as Ref<T[]>;

  return {
    list,
    add: (item: T) => {
      list.value.push(item);
    },
    remove: (i: number) => {
      list.value.splice(i, 1);
    },
    clear: () => (list.value = []),
  };
};

export default useArray;
