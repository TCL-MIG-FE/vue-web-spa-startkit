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
                <el-table-column label="Title" property="title" show-tooltip-when-overflow/>
                <el-table-column label="Finish Time" property="dateTime" width="180"/>
                <el-table-column label="Awards" width="100" inline-template>
                    <span>${{row.reward}}</span>
                </el-table-column>
                <el-table-column label="Operation" inline-template width='250' align="center">
                    <span>
                        <el-button type="info" class="mr10" size="small"
                                   @click.native="$parent.showTranslatedArticle(row.processId)">
                            View
                        </el-button>
                        <el-button type="success" class="mr10" size="small" @click.native="$parent.doAccept(row.processId)">
                            Accept
                        </el-button>
                        <el-button type="danger" size="small" @click.native="$parent.doReject(row.processId)">
                            Refuse
                        </el-button>
                    </span>
                </el-table-column>
            </wm-table>
        </div>
        <div v-else>
            <span>No contents available.</span>
        </div>

        <el-dialog title="Translation Review" v-model="isArticleVisible" size="large" :close-on-click-modal="false">
            <div class='article-wrapper clearfix'>
                <!-- 翻译后的文章 -->
                <div class='article-translated  article mr10'>
                    <h2 class='title' :title='translatedArticle.translateTitle'
                        v-html='translatedArticle.translateTitle'></h2>
                    <div class='content' v-html='translatedArticle.translateContent'></div>
                </div>
                <!-- 原文 -->
                <div class='article-original article'>
                    <h2 class='title' :title='translatedArticle.title' v-html='translatedArticle.title'></h2>
                    <div class='content' v-html='translatedArticle.content'></div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native="isArticleVisible = false">OK</el-button>
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
                article: '',
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

                this.$confirm('Are all the translations correct?','Translation Review', {
                    type:'warning',
                    cancelButtonText:'Cancel',
                    confirmButtonText: 'Confirm'
                    }).then(()=>{
                        this.showPageLoading();
                        this.acceptApproval({processId}).then(()=> {
                            this.hidePageLoading();
                            this.approvals.items.length == 0 && this.refreshPage();

                        });
                }).catch(()=>{});
            },

            doReject(processId){
                this.$prompt('Translation incorrect. Please give the modification suggest.', 'Translation Review',{
                    cancelButtonText:'Cancel',
                    confirmButtonText: 'Confirm',
                    inputValidator(value){
                        if(value === null || value.replace(/^\s*|\s*$/g, '') === '' ){
                            return 'Modification suggest can not be blank';
                        }
                        if(value.length > 200){
                            return 'Only 200 characters are allowed';
                        }
                    }

                }).then(({value:notes}) => {
                    this.showPageLoading();
                    this.rejectApproval({processId, notes}).then(()=> {
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

            showTranslatedArticle(processId){
                this.getTranslatedArticle(processId).then(()=> {
                    this.isArticleVisible = true;
                })
            },

            ...mapActions(["showPageLoading", "hidePageLoading", "getApprovalList", "acceptApproval", "rejectApproval", "getTranslatedArticle"])
        },

    };





</script>


<style lang='less' scoped>

    .tip() {
        position: absolute;
        width: 75px;
        height: 30px;
        top: -15px;
        left: 50%;
        margin-left: -50px;
        line-height: 30px;
        background-color: #fff;
        color: #ccc;
        text-align: center;
    }

    .el-button {
        margin-right: 5px !important;
    }

    /** 复用Tasks.vue中的 article-wrapper样式 **/
    .article-wrapper {
        .article-translated {
            width: 50%;
            float: left;
            &:before {
                .tip();
                content: 'Translation'
            }
        }
        .article-original {
            overflow: hidden;
        }

    }
</style>

