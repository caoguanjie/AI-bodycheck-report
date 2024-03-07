<template>
    <div class="rightbox">
        <div class="right-header" id="right-header">
            <div class="header-title">
                <el-avatar :src="logo" :size="24" />
                <el-text class="mx-1" size="large">AI体检报告分析</el-text>
            </div>
        </div>

        <div class="right-content" v-loading="loading" element-loading-text="AI正在分析体检报告，请耐心等待...">
            <div class="right-content-reported" v-if="reportContent">
                <el-scrollbar :max-height="scrollHeight">
                    <MarkdownBlock :content="reportContent" v-if="!isEdit" ref="pdfRef" />
                    <MarkdownEdit :content="reportContent" v-else />

                </el-scrollbar>
                <el-footer id="right-footer">
                    <el-button class="reset" @click="handleExportPDF" :disabled="isEdit">导出PDF</el-button>
                    <!-- <el-button class="reset" v-if="isEdit" @click="handleEdit">预览</el-button> -->
                    <el-button type="primary" @click="handleEdit">{{ !isEdit ? '编辑' : '预览' }}</el-button>
                </el-footer>
            </div>
            <AIEmpty style="height: 650px;" v-else />
        </div>

    </div>

</template>

<script lang='ts' setup>
import AIEmpty from '@/components/AIEmpty/index.vue';
import { OtherAiApiUrl, GetAIReport } from '@/api/business/ai';
import MarkdownEdit from '@/components/Markdown/MarkdownEdit.vue';
import MarkdownBlock from '@/components/Markdown/MarkdownBlock.vue';
import eventBus from '@/utils/base/EventBus';
import html2pdf from 'html2pdf.js';
const logo = new URL('../../../assets/AI/bot.png', import.meta.url).href;
const scrollHeight = ref(400);
const isEdit = ref(false);
const loading = ref(false);
const reportContent = ref('');
const pdfRef = ref<any>(null);
const exportPDFOption = {
    filename: "AI体检报告分析.pdf",
    html2canvas: {
        scale: 2,
        useCORS: true
    },
    // 智能分页，防止图片被截断
    pagebreak: { mode: 'avoid-all' },

}

onMounted(() => {
    nextTick(() => {
        updateHeight()
    })
    window.addEventListener('resize', updateHeight)
    // 绑定立即分析按钮的触发事件
    eventBus.on('aiAnalysis', (content: any) => {
        loading.value = true;
        exportPDFOption.filename = `${content.ComposeName}-AI体检报告分析.pdf`;
        // const _func = window.systemConfig.clientYiDong ? OtherAiApiUrl : GetAIReport
        OtherAiApiUrl({
            report_content: JSON.stringify(content)
        }).then((res: any) => {
            if (res.type == '1') {
                reportContent.value = res.data;
            } else {
                ElMessage.error(res.data)
            }
            loading.value = false
        }).catch((err: any) => {
            loading.value = false
            reportContent.value = ''
            ElMessage.error('请求失败')
        })
    })
})
onUnmounted(() => {
    // dom节点销毁时，要及时销毁浏览器的监听事件，避免内存泄露
    window.removeEventListener('resize', updateHeight);
})

// 处理是否编辑内容
function handleEdit() {
    isEdit.value = !isEdit.value;
}


function updateHeight() {
    const header = 32;
    const footer = 60;
    const padding = 50;
    const totalHeight = document.body.offsetHeight > 700 ? document.body.offsetHeight : 700;
    scrollHeight.value = totalHeight - header - footer - padding;
}

function handleExportPDF() {
    if (!pdfRef.value && isEdit.value) {
        ElMessage.warning('只有预览模式下才能导出PDF')
        return
    }
    html2pdf()
        .set(exportPDFOption)
        .from(pdfRef.value.$el)
        .save()
        .then(() => {
            ElMessage.success(`${exportPDFOption.filename}导出成功`)
        })
        .catch((error: unknown) => {
            ElMessage.error(`导出失败：${JSON.stringify(error)}`,)
        })

}
</script>

<style lang='scss' scoped>
.rightbox {
    height: 100%;
}

.right-content {
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.header-title {
    display: flex;
    align-items: center;
}

.el-text--large {
    --el-text-color: #333;
    font-weight: 800;
    --el-text-font-size: var(--el-font-size-large);
    margin-left: 8px;
    color: #000;
}

.right-content-reported {
    width: 100%;
    background-color: #fff;
    padding: 8px 24px 0;
    border-radius: 8px;

}

#right-footer {
    --el-footer-padding: 0;

    display: flex;
    align-items: center;
    border-top: 1px solid #DCDFE6;

    .el-button {
        --el-button-text-color: #333;
        --el-button-border-color: #DCDFE6;
        padding: 8px 24px;
    }

    .el-button--primary {
        --el-button-text-color: #fff;
        --el-button-border-color: #3982DE;
        --el-button-bg-color: #3982DE;
    }
}
</style>