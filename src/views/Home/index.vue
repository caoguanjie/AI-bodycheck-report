<template>
    <div class="common-layout">
        <el-container>
            <el-aside style="width: 40%; min-width: 300px">
                <LeftPannel id="leftPannel" />
            </el-aside>
            <el-main style="width: 60%; min-width: 400px; background:#F8F9FB ;">
                <RightPannel />
            </el-main>
        </el-container>
    </div>
</template>

<script lang='ts' setup>
import LeftPannel from '@/views/Home/LeftPannel/index.vue';
import RightPannel from '@/views/Home/RightPannel/index.vue';
</script>

<style lang='scss' scoped>
.common-layout {
    width: 100%;
    height: 100%;
    min-height: 700px;
    background-color: #fff;
}

.el-main {
    --el-main-padding: 16px 24px;
}
</style>