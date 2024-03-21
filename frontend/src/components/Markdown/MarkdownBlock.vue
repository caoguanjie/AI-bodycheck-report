<template>
  <MdPreview class="overflow-x-auto" :editorId="id" :modelValue="props.content" @onHtmlChanged="onHtmlChanged" />
</template>

<script setup lang="ts">
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';

const props = defineProps({
  content: {
    type: String,
    required: true,
    default: "# None Content"
  },
});

const theme = ref('light');

const id = 'preview-only';

function onHtmlChanged() {
  nextTick(() => {
    // 给编辑器特定的标题
    const greenStyle = document.getElementById(window.systemConfig.titleStyle.green);
    const blueStyle = document.getElementById(window.systemConfig.titleStyle.blue);
    const prupleStyle = document.getElementById(window.systemConfig.titleStyle.purple);
    greenStyle?.classList.add('greenStyle');
    blueStyle?.classList.add('blueStyle');
    prupleStyle?.classList.add('prupleStyle');
  })


}

</script>



<style lang="scss">
.md-editor-preview {
  font-size: 14px;
  color: #333;

  h2 {
    height: 36px;
    line-height: 36px;

  }
}

.md-editor-dark {
  --md-color: #fff;
}

.md-editor {

  --md-bk-color: transparent;
}

.prupleStyle {
  display: inline-block;
  padding: 0 8px 0 40px;
  background: #E9EEFD;
  border-radius: 8px;
  position: relative;
  color: #333 !important;
  font-size: 16px !important;

  &::after {
    content: "";
    position: absolute;
    left: 4px;
    top: 4px;
    width: 28px;
    height: 28px;
    background: #1C55EA url(../../assets/AI/title.png) no-repeat center;
    background-size: 60%;
    border-radius: 8px;
  }
}

.blueStyle {
  display: inline-block;
  padding: 0 8px 0 40px;
  background: #EEF9FE;
  border-radius: 8px;
  position: relative;
  color: #333 !important;
  font-size: 16px !important;

  &::after {
    content: "";
    position: absolute;
    left: 4px;
    top: 4px;
    width: 28px;
    height: 28px;
    background: #50BEF0 url(../../assets/AI/title.png) no-repeat center;
    background-size: 60%;
    border-radius: 8px;
  }
}

.greenStyle {
  display: inline-block;
  padding: 0 8px 0 40px;
  background: #E6FBF3;
  border-radius: 8px;
  position: relative;
  color: #333 !important;
  font-size: 16px !important;

  &::after {
    content: "";
    position: absolute;
    left: 4px;
    top: 4px;
    width: 28px;
    height: 28px;
    background: #00D781 url(../../assets/AI/title.png) no-repeat center;
    background-size: 60%;
    border-radius: 8px;
  }
}
</style>
