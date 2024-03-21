<template>
    <div class="rightbox">
        <div class="right-header" id="right-header">
            <div class="header-title">
                <el-avatar :src="logo" :size="24" />
                <el-text class="mx-1" size="large">AI分析结果</el-text>
            </div>
        </div>

        <div class="right-content" v-loading="loading" element-loading-text="AI正在分析体检报告，请耐心等待...">
            <div class="right-content-reported" v-if="reportContent">
                <el-scrollbar :max-height="scrollHeight">
                    <MarkdownBlock :content="reportContent" v-if="!isEdit" ref="pdfRef" />
                    <MarkdownEdit :content="reportContent" v-else @updata-content="updataContent" />

                </el-scrollbar>
                <el-footer id="right-footer">
                    <!-- <el-button class="reset" @click="handleExportPDF" :loading="loadingExport"
                        :disabled="isEdit && loadingExport">导出PDF</el-button> -->
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
import { OtherAiApiUrl, GetInspectionResult } from '@/api/business/ai';
import MarkdownEdit from '@/components/Markdown/MarkdownEdit.vue';
import MarkdownBlock from '@/components/Markdown/MarkdownBlock.vue';
import eventBus from '@/utils/base/EventBus';
import html2pdf from 'html2pdf.js';
import { isArray } from 'lodash';
import { LLMApi, YDApi } from '../LeftPannel/components/data.model';
import useStore from '@/store';
import { useWebSocket } from '@/utils/base/websocket'
const logo = new URL('../../../assets/AI/bot.png', import.meta.url).href;
const scrollHeight = ref(400);
const isEdit = ref(false);
const loading = ref(false);
const loadingExport = ref(false);
const reportContent = ref('');
const pdfRef = ref<any>(null);
const { user } = useStore()
const { connect, disconnect, send, messages, connected } = useWebSocket();
const exportPDFOption = {
    filename: "AI体检报告分析.pdf",
    html2canvas: {
        scale: 2,
        useCORS: true
    },
    // 智能分页，防止图片被截断
    pagebreak: { mode: 'avoid-all' },
    jsPDF: {
        orientation: 'portrait',
        unit: 'in',
        format: 'a5',
    }

}
watch(() => messages.value, (newVal) => {
    loading.value = false
    reportContent.value = newVal
})
watch(() => connected.value, (newVal) => {
    if (!newVal && window.systemConfig.AI_TYPE === 2) {
        connect()
    }
})
onMounted(() => {
    nextTick(() => {
        updateHeight();
        // 如果是例如kimi大模型的话，开启websocket
        if (window.systemConfig.AI_TYPE === 2) {
            connect()
        }

    })
    window.addEventListener('resize', updateHeight)
    // 绑定立即分析按钮的触发事件
    eventBus.on('aiAnalysis', (content: any) => {
        if (loading.value) return
        if (isArray(content)) {
            if (content.length === 1) {
                exportPDFOption.filename = `${content[0].ComposeName}-AI体检报告分析.pdf`;
            } else {
                exportPDFOption.filename = `所有检查单-AI体检报告分析.pdf`;
            }
        } else {
            exportPDFOption.filename = `${content.ComposeName}-AI体检报告分析.pdf`;
        }


        switch (window.systemConfig.AI_TYPE) {
            case 0:
                if (user.isMyself) {
                    YiDongLLM(content);
                } else {
                    MyselfLLM();
                }
                break;
            case 1:
                YiDongLLM(content);
                break;
            case 2:

                moonshotLLM(content);
                break;

        }




    })

})
onUnmounted(() => {
    disconnect()
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

function updataContent(content: string) {
    reportContent.value = content;
}
// 对接kimichat
function moonshotLLM(content: any) {
    if (!connected.value) {
        ElMessage.error('Ai链接失败，请联系开发者')
        return
    }
    loading.value = true
    const params = new LLMApi({
        user_content: new YDApi({ reportData: content })
    })
    send(params)
}


// 自己公司丰德的业务接口
function MyselfLLM() {
    loading.value = true
    // 调用内部接口
    GetInspectionResult({
        NowPhysicalNum: user.userInfo.NowPhysicalNum || window.systemConfig.NowPhysicalNum,
    }).then((res: any) => {
        if (res.RslCode == '1') {
            const content = `## ${window.systemConfig.titleStyle.green} \n ${res.Data.Summary || "无"}  \n ## ${window.systemConfig.titleStyle.blue} \n${res.Data.Conclude || "无"} \n## ${window.systemConfig.titleStyle.purple} \n ${res.Data.Advice || "无"}\n`
            let currentIndex = 0; // 当前要显示的字符索引
            let timer: any = null
            const typeWriter = () => {
                if (timer) {
                    clearTimeout(timer)
                    timer = null
                }
                if (currentIndex < content.length) {
                    reportContent.value += content.charAt(currentIndex);
                    currentIndex++; // 移动到下一个字符
                    timer = setTimeout(typeWriter, window.systemConfig.textSpeed); // 100ms 后再次调用 typeWriter 函
                }
            }
            typeWriter()
        } else {
            ElMessage.error(res.message)
        }
        loading.value = false
    }).catch((err: any) => {
        console.log(err)
        loading.value = false
        reportContent.value = ''
        ElMessage.error('请求失败')
    })
}

// 对接移动的ai接口
function YiDongLLM(content: any) {
    loading.value = true
    OtherAiApiUrl(new YDApi({ reportData: content })).then((res: any) => {
        if (res.status == 'success') {
            let content = ''
            res.data.forEach((element: any) => {
                switch (element.type) {
                    case '0':
                        content += `## ${window.systemConfig.titleStyle.green} \n ${element.content || '无'}\n`;
                        break;
                    case '1':
                        content += `## ${window.systemConfig.titleStyle.blue} \n ${element.content || '无'}\n`;
                        break;
                    case '2':
                        content += `## ${window.systemConfig.titleStyle.purple} \n ${element.content || '无'}\n`;
                        break;
                    default:
                        break;
                }
            });
            reportContent.value = content;
        } else {
            ElMessage.error(res.message)
        }
        loading.value = false
    })
}


function handleExportPDF() {
    if (!pdfRef.value && isEdit.value) {
        ElMessage.warning('只有预览模式下才能导出PDF')
        return
    }
    loadingExport.value = true
    html2pdf()
        .set(exportPDFOption)
        .from(pdfRef.value.$el)
        // .toPdf()
        // .get('pdf')
        // .then((pdfObj: any) => {
        //     console.log(pdfObj)
        //     pdfObj.autoPrint();
        //     createIframeWindow()
        //     // window.print();
        //     // let str = pdfObj.output('datauristring');
        //     // window.print(str);
        //     window.open(pdfObj.output('bloburl'), '_parent');
        //     createIframeWindow(pdfObj.output('bloburl'))
        //     // let iframe = "<iframe width='100%' height='100%' src='" + str + "'></iframe>";
        //     // let x = window.open();
        //     // x.document.open();
        //     // x.document.write(iframe);
        //     // x.document.close();
        // });
        .save()
        .then((pdf: any) => {
            console.error(pdf)
            ElMessage.success(`${exportPDFOption.filename}导出成功`)
            loadingExport.value = false

        })
        .catch((error: unknown) => {
            ElMessage.error(`导出失败：${JSON.stringify(error)}`,)
            loadingExport.value = false
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