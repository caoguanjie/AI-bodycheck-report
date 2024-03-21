<template>
    <div class="leftbox">
        <div class="left-header" id="left-header">
            <div class="header-title">
                <el-avatar :src="logo" :size="32" />
                <el-text class="mx-1" size="large">AI报告分析</el-text>
            </div>
            <div class="desc"> <el-text class="mx-1" type="info"
                    size="small">基于患者的报告数据，为医生精确、全面的推荐体检报告的结论，提升决策效率</el-text></div>
        </div>
        <el-tabs v-model="activeTabs" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="手工录入" name="0">
                <AccordionButton ref="accordioRef" />
                <el-footer id="tabs-left-footer">
                    <el-button class="reset" @click="reset">重置</el-button>
                    <el-button type="primary" class="confirm" @click="confirm">AI分析</el-button>
                </el-footer>
            </el-tab-pane>
            <el-tab-pane label="选择检查单" name="1">
                <SelectCheck ref="selectCheckRef" />
                <el-footer id="tabs-left-footer">
                    <el-button class="reset" @click="reset">重置</el-button>
                    <el-button type="primary" class="confirm" @click="confirm">AI分析</el-button>
                </el-footer>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script lang='ts' setup>


import eventBus from '@/utils/base/EventBus';
import AccordionButton from './components/AccordionButton.vue'
import SelectCheck from './components/SelectCheck.vue'
import { ResultEnum } from '@/utils/http/types';
import useUserStore from '@/store/base/user';
const logo = new URL('../../../assets/AI/logo.png',
    import.meta.url).href;
const activeTabs = ref('0')
const selectCheckRef = ref<any>(null)
const accordioRef = ref<any>(null)
function handleClick({ index }: any) {
    if (index === '1') {
        //
    }
}

function reset() {
    if (activeTabs.value === '1') {
        if (!selectCheckRef.value) return;
        selectCheckRef.value?.reset()
    } else {
        if (!accordioRef.value) return;
        accordioRef.value?.reset()
    }
}
// 立即分析
function confirm() {
    const user = useUserStore()
    if (activeTabs.value === '1') {

        if (!selectCheckRef.value || selectCheckRef.value?.getItemListContent() === null) return;
        user.isMyself = false;
        eventBus.emit('aiAnalysis', selectCheckRef.value?.getItemListContent())
    } else {
        if (!accordioRef.value) return;
        user.isMyself = true;
        eventBus.emit('aiAnalysis', accordioRef.value?.getFormData())
    }
}
</script>

<style lang='scss' scoped>
.leftbox {
    padding: 16px 24px
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

.desc {
    padding: 10px 0;
}

.el-tabs {
    --el-color-primary: #3982DE;
    --el-font-size-base: 16px;
}

#tabs-left-footer {
    display: flex;
    align-items: center;
    --el-footer-padding: 0;


    .el-button {
        --el-button-text-color: #333;
        --el-button-border-color: #DCDFE6;
        padding: 8px 24px;
        height: 36px;
        font-size: 14px;
    }

    .el-button--primary {
        --el-button-text-color: #fff;
        --el-button-border-color: #3982DE;
        --el-button-bg-color: #3982DE;
    }

    .reset {
        width: 35%;

    }

    .confirm {
        width: calc(65% - 12px);
    }
}
</style>