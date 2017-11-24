<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>markdown</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="plugins-tips">
            Vue-SimpleMDE：Vue.js的Markdown Editor组件。
            访问地址：<a href="https://github.com/F-loat/vue-simplemde" target="_blank">Vue-SimpleMDE</a>
        </div>
        <el-button class='el-button--primary' @click="handleSave">Save</el-button>
        <markdown-editor v-model="content" :configs="configs" ref="markdownEditor"></markdown-editor>
        <div class="plugins-tips">
            <p>既然用了markdown语法了，那么就有一个很实际的问题了。要怎么在前台展示数据呢？</p>
            <br>
            <p>这个时候就需要解析markdown语法了。可以使用 <a href="https://github.com/miaolz123/vue-markdown" target="_blank">vue-markdown</a>：一个基于vue.js的markdown语法解析插件。（这里不作展开，有需要自行了解）
            </p>
        </div>
    </div>
</template>

<script>
    import {markdownEditor} from 'vue-simplemde';
    import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";

    export default {
        data: function () {
            return {
                content: '',
                configs: {
//                    status: true,
                    initialValue: 'Loading',
                    spellChecker: false, // 禁用拼写检查
                    renderingConfig: {
                        codeSyntaxHighlighting: true,
                        highlightingTheme: 'atom-one-light'
                    }
                }
            }
        },
        components: {
            ElButton,
            markdownEditor
        },
        created() {
            this.$board.getById(1, res => {
                this.content = res.content
            })
        },
        methods: {
            handleSave() {
                let content = this.content
                this.log('save clicked', `(${content})`)
                this.$board.updateById({
                    id: 1,
                    content: content,
                }, res => {
                })
            }
        }
    }
</script>
