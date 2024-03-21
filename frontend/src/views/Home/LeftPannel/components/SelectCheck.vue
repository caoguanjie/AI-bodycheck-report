<template>
    <div id="checklist" class="checklist">
        <div id="SelectBox">
            <el-form :inline="true" :model="formInline" class="form-inline">
                <el-form-item class="inline-input">
                    <el-autocomplete ref="autocompleteRef" v-model="selectUserName"
                        :fetch-suggestions="querySearchAsync" value-key="UserName" placeholder="请选择体检人" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button @click="onSubmit" class="btn-search">查询</el-button>
                </el-form-item>
            </el-form>
            <el-divider class="divider">
                检查单列表<span style="color:#999">({{ checkReportList.length }})</span>
            </el-divider>
        </div>
        <el-scrollbar :height="scrollHeight">
            <div class="check-report-list" v-if="checkReportList.length">
                <div class="check-report-item clickRipple" v-for="(item, index) in checkReportList" :key="index">
                    <span class="check-report-item-label" @click="selcectItem(item)">{{ item.ComposeName }}</span>
                    <el-icon v-if="item.selected">
                        <Check />
                    </el-icon>
                </div>

            </div>
            <FitsEmpty v-else />

        </el-scrollbar>
    </div>

</template>

<script lang='ts' setup>
import { GetUserList, GetItemListApi } from '@/api/business/ai';
import FitsEmpty from '@/fits-components/Data/FitsEmpty/index.vue';
import { ResultEnum } from '@/utils/http/types';
import { Check } from '@element-plus/icons-vue'
import { ElAutocomplete, ElMessage } from 'element-plus';
import _ from 'lodash';
import { GetItemList, ItemList } from './data.model';
import useStore from '@/store';
const scrollHeight = ref(400);
const formInline = reactive({
    user: ''
})
const selectUserName = ref('')
const userInfoList = ref<Array<{ UserName: string, NowPhysicalNum: string }>>([])
const checkReportList = ref<GetItemList[]>([])
const currentItem = ref<GetItemList | null>(null)
const autocompleteRef = ref<InstanceType<typeof ElAutocomplete> | null>(null)
const { user } = useStore();
defineExpose({
    reset,
    updateHeight,
    getItemListContent
})

onMounted(() => {
    // 默默加载用户列表
    getUserList()
    nextTick(() => {
        updateHeight()
    })
    window.addEventListener('resize', resizeObserver)
})
function onSubmit() {
    const item: any = userInfoList.value.find(item => item.UserName === selectUserName.value)
    handleSelect(item)
}

function handleSelect(item: { UserName: string, NowPhysicalNum: string } | any) {
    GetItemListApi({
        NowPhysicalNum: item.NowPhysicalNum
    }).then((res) => {
        if (res.RslCode === ResultEnum.SUCCESS) {
            // checkReportList.value = res.Data ?? []
            user.userInfo = item
            console.log(item)
            checkReportList.value = res.Data.map((element: any) => new GetItemList({ ...element, selected: false }));
        } else {
            ElMessage.error(res.RslMsg)
        }
    })
}



function reset() {
    // 重置检查单的选中状态
    checkReportList.value.forEach(item => {
        item.selected = false
    })
}

function getUserList(UserName = "") {
    GetUserList({
        UserName: UserName,
        NowPhysicalNum: window.systemConfig.NowPhysicalNum
    }).then((res) => {
        if (res.RslCode === ResultEnum.SUCCESS) {
            userInfoList.value = res.Data ?? []
        } else {
            ElMessage.error(res.RslMsg)
        }
    })
}
function updateHeight() {
    const header = document.getElementById('left-header')?.offsetHeight ?? 70;
    const tab = 40;
    const footer = 60;
    const selected = 84;
    const padding = 50;
    const totalHeight = document.body.offsetHeight > 700 ? document.body.offsetHeight : 700;
    scrollHeight.value = totalHeight - header - footer - selected - tab - padding;
}

// 选择检查单
function selcectItem(item: GetItemList) {
    item.selected = !item.selected
    // 把当前数据记录好，传给ai分析
    currentItem.value = item
}

function getItemListContent() {
    const index = checkReportList.value.findIndex(item => item.selected === true)
    if (index < 0) {
        // 如果一个都没选中检验单，默认选择全部

        checkReportList.value.forEach(item => {
            item.selected = true
        })

        // ElMessage.error("请先选择检查单")
        // return null
    }
    return checkReportList.value.filter(item => item.selected === true)
}

// 用户自动补全的搜索接口
function querySearchAsync(queryString: string, cb: any) {
    // 处理在Chrome 49版本下，输入框输入文字会有空格的出现
    selectUserName.value = selectUserName.value.trim()
    console.warn(JSON.stringify(selectUserName.value))
    const debouncedSearch = _.debounce((queryString: string) => {
        const results = queryString ? userInfoList.value.filter((item) => item.UserName.toLowerCase().includes(selectUserName.value.toLowerCase())) : userInfoList.value
        cb(results)
    }, 300);
    debouncedSearch(queryString)
}

// 监听浏览器的变化事件
const resizeObserver = () => {
    updateHeight();
}
onUnmounted(() => {
    // dom节点销毁时，要及时销毁浏览器的监听事件，避免内存泄露
    window.removeEventListener('resize', resizeObserver);
})
</script>

<style lang='scss' scoped>
.inline-input {
    --el-border-radius-base: 2px;
    width: 60%;
}

.form-inline {
    --el-font-size-base: 14px;
    margin-bottom: -15px;
}

:deep(.el-autocomplete) {
    width: 100%;
}

.btn-search {
    width: 60px;
    border-radius: 2px;
    margin-left: -24px;
}

.divider {
    width: 70%;
    margin: 24px auto;
}

.check-report-list {
    width: 100%;
    min-height: 400px;

    .check-report-item {
        padding: 0 16px;
        margin-bottom: 12px;
        width: 100%;
        display: flex;
        align-items: center;
        line-height: 48px;
        background-color: #F9FAFB;
        border-radius: 3px;
        font-size: 14px;
        cursor: pointer;

    }

    .check-report-item-label {
        flex: 1
    }

    .el-icon {
        font-size: 20px;
        color: #4F89E5;
    }

}
</style>