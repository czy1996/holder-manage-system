<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 书目管理</el-breadcrumb-item>
                <el-breadcrumb-item>书目</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <!--<el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->
            <!--<el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">-->
            <!--<el-option key="1" label="广东省" value="广东省"></el-option>-->
            <!--<el-option key="2" label="湖南省" value="湖南省"></el-option>-->
            <!--</el-select>-->
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
            <el-button type="primary" icon="plus" @click="addBook">添加</el-button>
        </div>
        <p style="font-size:12px;line-height:30px;color:#999;">Tips : 单击行启用编辑，完成保存。</p>
        <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange"
                  @row-click="handleRowClick" highlight-current-row>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="isbn" label="ISBN" sortable width="150">
            </el-table-column>
            <el-table-column prop="title" label="书名" width="120">
            </el-table-column>
            <el-table-column label="定价">
                <template scope="scope">
                    <el-input v-show="scope.row.isEditFlag" size="small" v-model="scope.row.second_price"
                              placeholder="请输入内容"></el-input>
                    <span v-show="!scope.row.isEditFlag">{{scope.row.second_price}}</span>
                </template>
            </el-table-column>
            <el-table-column label="库存">
                <template scope="scope">
                    <el-input v-show="scope.row.isEditFlag" size="small" v-model="scope.row.inventory"
                              placeholder="请输入内容"></el-input>
                    <span v-show="!scope.row.isEditFlag">{{scope.row.inventory}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small"
                               @click.stop="handleEditComplete(scope.$index, scope.row)"
                               v-show="scope.row.isEditFlag">完成
                    </el-button>
                    <el-button size="small" type="danger"
                               @click.stop="handleDelete(scope.$index, scope.row)">删除
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
                select_cate: '',
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
                        if ( // d.address.indexOf(self.select_cate) > -1 &&
                            (d.title.indexOf(self.select_word) > -1 ||
                                d.description.indexOf(self.select_word) > -1)
                        ) {
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
                self.$book.all(res => {
                    self.tableData = res
                })
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEditComplete(index, row) {
                this.$message('编辑第' + (index + 1) + '行');
                this.$book.update(row.id, {
                    inventory: parseInt(row.inventory),
                    second_price: row.second_price,
                }, res => {
                    this.log(res)
                })
                this.$set(row, 'isEditFlag', false)
            },
            handleDelete(index, row) {
                this.$message.error('删除第' + (index + 1) + '行');
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
            handleRowClick(row, event, column) {
                this.log(row, event, column, row.isEditFlag)
                this.$set(row, 'isEditFlag', true)
                this.log(this.tableData)
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
