<template>
  <div class="flex h-full">
    <n-data-table
      remote
      flex-height
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :loading="loading"
    />
  </div>
</template>

<script lang="tsx" setup>
interface ResponsePagination extends ResponseData {
  data: any[];
  total: number;
}

const loading = ref(false);
const data = ref<any>([]);
const query = reactive<PaginationQuery>({
  pageNumber: 1,
  pageSize: 20,
});

const columns = [
  {
    title: '#',
    key: 'key',
  },
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Age',
    key: 'age',
  },
  {
    title: 'Address',
    key: 'address',
  },
];

const queryTable = (): Promise<ResponsePagination> => {
  return new Promise((resolve) => {
    const ret = Array.from({ length: query.pageSize }).map((_, index) => ({
      key: query.pageSize * (query.pageNumber - 1) + index,
      name: `Edward King ${index}`,
      age: Math.floor(Math.random() * 20 + 1),
      address: `London, Park Lane no. ${index}`,
    }));
    resolve({
      code: 200,
      data: ret,
      message: '成功',
      total: query.pageSize * 20,
    });
  });
};

const getList = () => {
  queryTable().then((res) => {
    data.value = res.data;
    pagination.itemCount = res.total;
  });
};

const pagination = reactive({
  page: 1,
  pageSize: 20,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  itemCount: 0,
  prefix({ itemCount }: { itemCount: number }) {
    return `共${itemCount}页`;
  },
  onChange: (page: number) => {
    pagination.page = page;
    query.pageNumber = page;
    getList();
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
    query.pageSize = pageSize;
    query.pageNumber = 1;
    getList();
  },
});

getList();
</script>
