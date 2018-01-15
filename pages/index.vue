<template>
<div>
    <menu-s></menu-s>
    <p>{{ userAgent }} {{ date }}</p>
    <p>Vuex: {{ counter }} <a href="javascript:;" @click="increment">加1个</a></p>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column label="地址">
            <template slot-scope="scope">
                {{ scope.row.address }}
            </template>
        </el-table-column>
    </el-table>
    <div class="a" style="padding: 10px;">
        <el-tag v-for="(item, index) in tag" :type="item.type" :key="index">{{ item.text }}</el-tag>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

import menuS from '@/components/menu.vue'
export default {
    name: 'index',
    serverCacheKey () {
        // Will change every 100 secondes
        return 'index_' + Math.floor(Date.now() / 100000)
    },
    fetch({ store }) {
        store.commit('increment')
    },
    computed: mapState([
        'counter'
    ]),
    data() {
        return {
            date: Date.now()
        }
    },
    asyncData({ req }, callback) {
        setTimeout(() => {
            // callback(err, data)
            callback(null, {
                userAgent: req ? req.headers['user-agent'] : navigator.userAgent,
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                tag: [{
                    type: 'gray',
                    text: '标签一'
                }, {
                    type: 'primary',
                    text: '标签一'
                }, {
                    type: 'success',
                    text: '标签一'
                }, {
                    type: 'warning',
                    text: '标签一'
                }, {
                    type: 'danger',
                    text: '标签一'
                }]
            })
        }, 100)
    },
    head() {
        return {
            title: 'index'
        }
    },
    components: {
        menuS,
    },
    methods: {
        increment() {
            this.$store.commit('increment')
        }
    }
}
</script>

<style scoped>
p {
    font-size: 20px;
    text-align: center;
    padding: 100px;
    padding-bottom: 0;
}
</style>
