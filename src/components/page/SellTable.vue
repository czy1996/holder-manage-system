<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 订单管理</el-breadcrumb-item>
                <el-breadcrumb-item>卖出</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <!--<el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->
            <el-select v-model="select_cate" placeholder="筛选完成状态" class="handle-select mr10">
                <el-option key="1" label="全部" value="all"></el-option>
                <el-option key="1" label="未完成" value="open"></el-option>
                <el-option key="2" label="已完成" value="closed"></el-option>
            </el-select>
            <!--<el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>-->
            <!--<el-button type="primary" icon="search" @click="search">搜索</el-button>-->
        </div>
        <p style="font-size:12px;line-height:30px;color:#999;">Tips : 单击行启用编辑，完成保存。</p>
        <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange"
                  highlight-current-row>
            <!--<el-table-column type="selection" width="55"></el-table-column>-->
            <el-table-column prop="ct" label="创建时间" sortable :formatter="toTimeString" width="170">
            </el-table-column>
            <el-table-column label="书名" width="160">
                <template scope="scope">
                    <p style="font-size:12px;line-height:20px" v-for="item in scope.row.items">
                        {{ item.title}} : {{ item.quantity }}
                    </p>
                </template>
            </el-table-column>
            <el-table-column prop='name' label="用户">
            </el-table-column>
            <el-table-column prop='phone' label="电话" width="125">
            </el-table-column>
            <el-table-column prop='qq' label="QQ" width="110">
            </el-table-column>
            <el-table-column prop='dorm' label="宿舍">
            </el-table-column>
            <el-table-column label="状态" :formatter="orderStatus">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small"
                               @click.stop="toggleStatus(scope.$index, scope.row)"
                               v-show="scope.row.status == 'closed'">未完成
                    </el-button>
                    <el-button size="small" type="danger"
                               v-show="scope.row.status == 'open'"
                               @click.stop="toggleStatus(scope.$index, scope.row)">已完成
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--<div class="pagination">-->
        <!--<el-pagination-->
        <!--@current-change ="handleCurrentChange"-->
        <!--layout="prev, pager, next"-->
        <!--:total="1000">-->
        <!--</el-pagination>-->
        <!--</div>-->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: 'open',
                select_word: '',
                del_list: [],
                is_search: false
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                const self = this;
                return self.tableData.filter(function (d) {
                    let is_del = false;
                    for (let i = 0; i < self.del_list.length; i++) {
                        if (d.name === self.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if ((self.select_cate === 'all' ||
                                self.select_cate === d.status) &&
                            d.orderType === '购买') {
                            self.$set(d, 'isEditFlag', false)
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            getData() {
                let self = this;
                self.$order.all(res => {
                    this.log(res)
                    self.tableData = res
                    for (let i = 0; i < self.tableData.length; i++) {
                        let row = self.tableData[i]
                        this.$user.getInfo(row.user, res => {
                            for (let key in res) {
                                this.$set(row, key, res[key])
                            }
                        })
                    }
                })
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            toTimeString(row, column, cellValue) {
                return this.$formatTime(row.ct)
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            toggleStatus(index, row) {
                if (row.status === 'open') {
                    row.status = 'closed'
                    this.$order.update({id: row.id, status: 'closed'})
                } else {
                    row.status = 'open'
                    this.$order.update({id: row.id, status: 'open'})
                }

            },
            delAll() {
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }
                self.$message.error('删除了' + str);
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
//            handleRowClick(row, event, column) {
//                this.log(row, event, column, row.isEditFlag)
//                this.$set(row, 'isEditFlag', true)
//                this.log(this.tableData)
//            },
            orderStatus(row, column, cellValue) {
                if (row.status === 'open') {
                    return '未完成'
                } else if (row.status === 'closed') {
                    return '已完成'
                } else {
                    return row.status
                }
            }
        }
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
</style>
