<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 自述</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <h3>README.md</h3>
            <article>
                <!--<h1>承之后台</h1>-->
                <!--<p>基于Vue.js 2.x系列 + Element UI 的后台管理系统解决方案</p>-->
                <!--<h2>书目管理</h2>-->
                <!--<p>点击 行 可以更改该行库存和定价</p>-->
                <!--&lt;!&ndash;<p>该方案作为一套多功能的后台框架模板，适用于绝大部分的后台管理系统（Web Management System）开发。基于vue.js,使用vue-cli脚手架快速生成项目目录，引用Element UI组件库，方便开发快速简洁好看的组件。分离颜色样式，支持手动切换主题色，而且很方便使用自定义主题色。</p>&ndash;&gt;-->
                <!--<h2>订单管理</h2>-->
                <!--&lt;!&ndash;<el-checkbox disabled checked>Element UI</el-checkbox>&ndash;&gt;-->
                <!--<br>-->
                <!--<p>查看订单的用户和联系方式</p>-->
                <!--<br>-->
                <!--<p>目前可以标记订单完成</p>-->
                <!--&lt;!&ndash;<el-checkbox disabled checked>登录/注销</el-checkbox>&ndash;&gt;-->
                <!--&lt;!&ndash;<br>&ndash;&gt;-->
                <!--&lt;!&ndash;<el-checkbox disabled checked>表格</el-checkbox>&ndash;&gt;-->
                <!--&lt;!&ndash;<br>&ndash;&gt;-->
                <!--&lt;!&ndash;<el-checkbox disabled checked>表单</el-checkbox>&ndash;&gt;-->
                <!--&lt;!&ndash;<br>&ndash;&gt;-->
                <!--&lt;!&ndash;<el-checkbox disabled checked>图表</el-checkbox>&ndash;&gt;-->
                <!--&lt;!&ndash;<br>&ndash;&gt;-->
                <!--&lt;!&ndash;<el-checkbox disabled checked>富文本编辑器</el-checkbox>&ndash;&gt;-->
                <!--&lt;!&ndash;<br>&ndash;&gt;-->
                <!--&lt;!&ndash;<el-checkbox disabled checked>markdown编辑器</el-checkbox>&ndash;&gt;-->
                <!--&lt;!&ndash;<br>&ndash;&gt;-->
                <!--&lt;!&ndash;<el-checkbox disabled checked>图片拖拽/裁剪上传</el-checkbox>&ndash;&gt;-->
                <!--&lt;!&ndash;<br>&ndash;&gt;-->
                <!--&lt;!&ndash;<el-checkbox disabled checked>支持切换主题色</el-checkbox>&ndash;&gt;-->
                <!--&lt;!&ndash;<br>&ndash;&gt;-->
                <!--&lt;!&ndash;<el-checkbox disabled checked>列表拖拽排序</el-checkbox>&ndash;&gt;-->
                <!--&lt;!&ndash;<br>&ndash;&gt;-->
                <vue-markdown :source="source" class="markdown-body"></vue-markdown>
            </article>
        </div>
    </div>
</template>

<script>
    import vueMarkdown from 'vue-markdown'

    export default {
        data: function () {
            return {
                source: 'default'
            }
        },
        components: {
            vueMarkdown,
        },
        created: function () {
            this.$board.getById(1, res => {
                this.source = res.content
            })
        }
    }

</script>

<style scoped>
    .ms-doc {
        width: 100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }

    .ms-doc h3 {
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }

    .ms-doc article {
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }

    .ms-doc article h1 {
        font-size: 32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }

    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }

    .ms-doc article p {
        margin-bottom: 15px;
        line-height: 1.5;
    }

    .ms-doc article .el-checkbox {
        margin-bottom: 5px;
    }
</style>
