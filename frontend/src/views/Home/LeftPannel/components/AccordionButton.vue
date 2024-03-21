<template>
    <div class="accordion" ref="accordionRef" id="accordion">

        <el-radio-group v-model="radioSelected" size="large" class="accordion-radio" id="accordion-radio"
            :class="{ 'is-open': isOpen }">
            <template :key="index" v-for="(item, index) in visibleItems">
                <el-radio-button v-if="item.visible" :label="item.ComposeName" ref="accordionRadioRef"
                    class="radio-button" :value="item.ComposeID" />
            </template>
            <el-button @click="toggleAccordion" class="accordion-button" text>
                {{ isOpen ? '收起' : '展开' }}
                <el-icon class="el-icon--right">
                    <component :is="isOpen ? ArrowUpBold : ArrowDownBold" />
                </el-icon></el-button>

        </el-radio-group>
        <el-scrollbar :height="scrollHeight" style="min-height: 400px;">
            <el-form :model="dynamicForm" label-width="auto" class="accordion-form" ref="formRef">
                <el-form-item v-for="(domain, index) in dynamicForm.ItemList" :key="index" :prop="domain.ItemID">

                    <template #label>
                        <div class="flex items-center">
                            <span class="text-gray-600">{{ domain.ItemName }} <span class="unit">{{ domain.ItemUnit
                                    }}</span></span>
                        </div>
                    </template>
                    <el-input v-model="domain.Value" class="accordion-input" clearable />
                    <div class="accordion-divider">
                        参考值：{{ domain.LowValue }} - {{ domain.HighValue }}
                    </div>
                </el-form-item>

            </el-form>
        </el-scrollbar>

    </div>
</template>

<script lang='ts' setup>
import { ArrowUpBold, ArrowDownBold } from '@element-plus/icons-vue'
import json from '../../../../../public/static/data.json'
import { GetItemList, ItemList } from './data.model';
import _ from 'lodash';
import { FormInstance } from 'element-plus';
const formRef = ref<FormInstance>()
const formKey = ref(0);
const props = withDefaults(defineProps<{
    btnList?: any[]
}>(), {
    btnList: () => json.Data.map((item) => new GetItemList({ ...item, isInit: true }))
})
defineExpose({
    reset,
    getFormData
})
console.error(props.btnList)
const isOpen = ref(false)
const radioSelected = ref(props.btnList[0].ComposeID)
// 创建一个数组来存储对子元素的引用
const accordionRadioRef = ref([]);
// 动态生成的表单
const dynamicForm = reactive<{
    ItemList: ItemList[]
}>({
    ItemList: (props.btnList.find((item) => item.ComposeID === radioSelected.value)).ItemList
})
const scrollHeight = ref(400);
const items = ref(props.btnList)
// 开始的原始数据
let itemOldData: any = []
let widthsArr: any = []
const visibleItems = computed(() => {
    // 过滤掉不可见的项
    return items.value.filter(item => item.visible);
})
watch(() => formRef.value, () => {
    console.log("视图发生改变了吗", formRef.value)
})
watch(radioSelected, (newVal: string) => {
    dynamicForm.ItemList = (items.value.find((item) => item.ComposeID === newVal)).ItemList;
    // 通过key刷新组件，获取最新的ref
    formKey.value += 1;
})
onMounted(() => {

    nextTick(() => {
        const children = accordionRadioRef.value;
        widthsArr = children.map((child: any) => child.$el.offsetWidth);
        updateVisibleItems(widthsArr)
        updateHeight()
    });
    window.addEventListener('resize', resizeObserver)
})
// 计算一次性显示的子元素数量
const updateVisibleItems = (width?: any) => {
    const widths = width || widthsArr;
    console.log('Widths of children:', widths);
    let totalWidth = 0
    let line = 0
    let parentWidth: any = document.getElementById('accordion')?.offsetWidth ?? 0
    // items.value.forEach((item, index) => {
    //     // item.width = widths[index];
    //     totalWidth += widths[index] + 12;
    //     if (totalWidth > parentWidth * 2 - 100) {
    //         totalWidth = 0
    //         line++
    //     }
    //     if (line > 1) {

    //         item.visible = false
    //     } else {
    //         item.visible = true
    //     }
    // })
    items.value.forEach((item, index) => {
        // item.width = widths[index];
        totalWidth += widths[index] + 12;
        if (totalWidth > parentWidth) {

            line++
            if (line == 1) {
                totalWidth = widths[index] + 12;
                parentWidth = parentWidth - 83
            } else {
                totalWidth = 0
            }
        }
        if (line > 1) {
            item.visible = false
        } else {
            item.visible = true
        }
    })
    // 保存原始数据,解构赋值
    itemOldData = _.cloneDeep(items.value)
};

function updateHeight() {
    const header = document.getElementById('left-header')?.offsetHeight ?? 70;
    const tab = 40;
    const footer = 60;
    const radio = document.getElementById('accordion-radio')?.offsetHeight ?? 100;
    const padding = 47;
    const totalHeight = document.body.offsetHeight > 700 ? document.body.offsetHeight : 700;
    console.log('totalHeight', totalHeight)
    scrollHeight.value = totalHeight - header - footer - padding - radio - tab;
}

function toggleAccordion() {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
        items.value.forEach((item) => {
            item.visible = true
        })
    } else {
        items.value = _.cloneDeep(itemOldData)
    }
    nextTick(() => {
        updateHeight()
    })

}


// 监听浏览器的变化事件
const resizeObserver = () => {
    updateVisibleItems();
    updateHeight();
    console.log('浏览器变化')
}

onUnmounted(() => {
    // dom节点销毁时，要及时销毁浏览器的监听事件，避免内存泄露
    window.removeEventListener('resize', resizeObserver);
})

function reset() {
    dynamicForm.ItemList.forEach((item: ItemList) => {
        item.Value = ''
    })
}
// 获取表单数据，发送给ai分析
function getFormData() {
    return items.value.filter((item) => item.ComposeID === radioSelected.value);
}

</script>

<style lang='scss' scoped>
.accordion-radio {
    height: 100px;
    overflow: hidden;
    transition: all .5s ease;
    --el-fill-color-blank: #F2F5FA;
}

.is-open {
    height: auto;
    transition: all .22s ease-in-out;
}

.el-button:not(.el-button--text) {
    border: 0 solid transparent;
    background-color: transparent;
}

.radio-button {
    margin-right: 12px;
    margin-bottom: 12px;
}

:deep(.el-radio-button__inner) {
    padding: 10px 19px;
}

:deep(.el-radio-button__inner) {
    border-left: var(--el-border);
    border-radius: 4px;
}

.accordion-form {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}

.el-form-item {
    display: flex;
    width: 50%;
    flex-direction: column;

}



:deep(.el-form-item__label-wrap) {
    display: flex;
    margin: 0 !important;
    width: 100%;
}

.accordion-input {
    min-width: 160px;
    width: 70%
}

.accordion-divider {
    width: 100%;
    color: #AFB5B9;
    font-size: 12px;
    font-weight: 500;
}

.unit {
    color: #AFB5B9;
    font-size: 14px;
    margin-left: 5px;
    font-weight: 400;
}
</style>