<template>
    <div class='approvals-section'>
        <div v-if='approvals.totalCount > 0'>
            <wm-table
                @onPagination="onPagination"
                mode="none"
                :source="approvals.items"
                :pageNo="approvals.pageNo"
                :pageSize="approvals.pageSize"
                :total="approvals.totalCount">
                <el-table-column label="文章标题" property="title" show-tooltip-when-overflow/>
                <el-table-column label="完成时间" property="dateTime" width="170"/>
                <el-table-column label="翻译详情" inline-template show-tooltip-when-overflow>
                    <a href='#' @click.prevent='showTranslatedArticle(row.processId, row)'>
                        <span v-if='row.content.length <= MAX_CONTENTS_LENGTH'>{{row.content}}</span>
                        <span v-else>
                            {{ row.content.substring(0,MAX_CONTENTS_LENGTH) + ' ...' }}
                        </span>
                    </a>
                </el-table-column>
                <el-table-column label="赏金" width="80" inline-template>
                    <span>${{row.reward}}</span>
                </el-table-column>
                <el-table-column label="操作" inline-template width="150">
                    <span>
                        <el-button type="primary" class="mr10" size="small" @click.native="doAccept(row.processId)">
                            通过
                        </el-button>
                        <el-button type="danger" size="small" @click.native="doReject(row.processId)">
                            不通过
                        </el-button>
                    </span>
                </el-table-column>
            </wm-table>
        </div>
        <div v-else>
            <span>没有任何数据</span>
        </div>

        <el-dialog title="翻译审核" v-model="isArticleVisible" size="large" :close-on-click-modal="false">
            <div class='article-wrapper'>
                <div class='article-translated  article mr10'>
                    <h2 class='title' v-html='translatedArticle.title'></h2>
                    <div class='content' v-html='translatedArticle.content'></div>
                </div>
                <div class='article-original article'>
                    <h2 class='title' v-html='currentOriginalArticle.title'></h2>
                    <div class='content' v-html='currentOriginalArticle.content'></div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native="isArticleVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import WmTable from '../components/Table'
    import {MAX_CONTENTS_LENGTH} from '../constants/api'

    export default {

        name: 'Approvals',

        components: {
            WmTable,
        },

        data(){
            return {
                isArticleVisible: false,
                currentOriginalArticle: '',
                MAX_CONTENTS_LENGTH
            }
        },

        beforeMount(){
            this.refreshPage();
        },

        computed: mapState({
            approvals: ({approvals}) => approvals.approvalsList,
            translatedArticle: ({approvals}) => approvals.translatedArticle
        }),


        methods: {

            doAccept(processId){

                this.$confirm('确认翻译通过？','审核翻译', {type:'warning'}).then(()=>{
                    this.showPageLoading();
                    this.acceptApproval({processId}).then(()=> {
                        this.hidePageLoading();
                        this.approvals.items.length == 0 && this.refreshPage();

                    });
                }).catch(()=>{});
            },

            doReject(processId){
                this.$prompt('确认改翻译不通过？请给出不通过原因或者翻译建议', '审核翻译',{
                    inputValidator(value){
                        return value !== null && value.replace(/^\s*|\s*$/g, '') !== ''
                    },
                    inputErrorMessage: '不通过原因或者翻译建议不可为空'

                }).then(({value:note}) => {
                    this.showPageLoading();
                    this.rejectApproval({processId, note}).then(()=> {
                        this.hidePageLoading();
                        this.approvals.items.length == 0 && this.refreshPage();
                    }).catch(()=>{});
                }).catch(()=>{});

            },

            refreshPage(otherParams = {}){
                this.showPageLoading();
                this.getApprovalList(otherParams).then(()=> {
                    this.hidePageLoading();
                });
            },


            onPagination(pageNo){
                this.refreshPage({pageNo})
            },

            showTranslatedArticle(processId, article){
                this.getTranslatedArticle(processId).then(()=> {
                    this.isArticleVisible = true;
                    this.currentOriginalArticle = article;
                })
            },

            ...mapActions(["showPageLoading", "hidePageLoading", "getApprovalList", "acceptApproval", "rejectApproval", "getTranslatedArticle"])
        },

    };
</script>


<style lang='less' scoped>
    .el-button {
        margin-right: 10px !important;
    }

    .article-wrapper {
        overflow: hidden;
        margin-bottom: -10px;

        .article {
            border: 1px solid #e0e6ed;
            border-radius: 4px;
            padding-top: 20px;

            .title {
                text-align: center;
                margin-bottom: 10px;
            }

            .content {
                overflow-y: scroll;
                padding: 0 15px;
                height: 450px;
            }

        }

        .article-translated {
            width: 50%;
            float: left;
        }

        .article-original {
            overflow: hidden;
        }

    }
</style>

