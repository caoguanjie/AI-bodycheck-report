<template>
  <MdEditor ref="editorRef" class="overflow-x-auto" :toolbars="props.toolbars" :theme="theme" :editorId="id"
    :modelValue="props.content" :footers="props.footers" :preview="props.preview" />
  <!-- <ExportPDF :modelValue="props.content" v-if="visible" :visible="visible" /> -->
</template>

<script setup lang="ts">
import { MdEditor } from 'md-editor-v3';
import type { ExposeParam } from 'md-editor-v3';

import '@vavt/v3-extension/lib/asset/ExportPDF.css';
import 'md-editor-v3/lib/style.css';
const editorRef = ref<ExposeParam>();
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

const id = 'mdEdit';
onMounted(() => {
  console.log(editorRef.value)

})
</script>



<style lang="scss">
.md-editor {
  // --md-bk-color: transparent;
}
</style>
