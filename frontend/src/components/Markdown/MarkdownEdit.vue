<template>
  <MdEditor ref="editorRef" class="overflow-x-auto" :toolbars="props.toolbars" :theme="theme" :editorId="id"
    :modelValue="content" :footers="props.footers" :preview="props.preview" @onChange="handleChangeSave" />
  <!-- <ExportPDF :modelValue="props.content" v-if="visible" :visible="visible" /> -->
</template>

<script setup lang="ts">
import { MdEditor } from 'md-editor-v3';
import type { ExposeParam } from 'md-editor-v3';
import _ from 'lodash';
import '@vavt/v3-extension/lib/asset/ExportPDF.css';
import 'md-editor-v3/lib/style.css';
const editorRef = ref<ExposeParam>();
const emit = defineEmits(["updataContent"]);   //定义一个变量来接收父组件传来的方法

const props = defineProps({
  content: {
    type: String,
    required: true,
    default: "# None Content"
  },
  toolbars: {
    type: Array,
    default: () => []
  },
  footers: {
    type: Array,
    default: () => []
  },
  preview: {
    type: Boolean,
    default: false
  }
});

const theme = ref('light');
const content = ref(props.content);
const id = 'mdEdit';
onMounted(() => {
})
// 每次值改变都去修改预览的值
function handleChangeSave(value: string) {
  const update = _.debounce((value: string) => {
    emit('updataContent', value)
  }, 1000)
  update(value)
}
</script>



<style lang="scss">
.md-editor {
  // --md-bk-color: transparent;
}
</style>
