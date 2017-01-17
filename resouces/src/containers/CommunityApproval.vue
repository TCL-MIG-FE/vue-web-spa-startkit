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
                <el-table-column label="Author" property="author" width="120"/>
                <el-table-column label="Creation Time" width="180" property="dateTime"/>
                <el-table-column label="Operation" inline-template width='280' align="center">
                    <span>
                        <el-button type="info" class="mr10" size="small"
                                   @click.native="$parent.showCommunityArticle(row.processId)">
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

        <el-dialog title="Article Review" v-model="isArticleVisible" size="large" :close-on-click-modal="false">
            <div class='article-wrapper clearfix'>
                <div class='article'>
                    <h2 class='title' :title='article.title' v-html='article.title'></h2>
                    <div class='content' v-html='article.content'></div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <strong>Category</strong>:
                <el-select class="ml5 mr5 inline-block vb" v-model='articleCategoryCode' placeholder='Please choose'>
                    <el-option v-for="item in articleCategories" :label="item.categoryName"
                               :value="item.categoryCode"></el-option>
                </el-select>
                <el-button type="primary" @click.native="applyCategoryCode">OK</el-button>
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
                articleCategoryCode: '',
                MAX_CONTENTS_LENGTH
            }
        },

        beforeMount(){
            this.refreshPage();
            this.getCommunityArticleCategory();
        },

        computed: mapState({
            approvals: ({communityApprovals}) => communityApprovals.approvalsList,
            article: ({communityApprovals}) => communityApprovals.article,
            articleCategories:({communityApprovals}) => communityApprovals.articleCategories,
        }),


        methods: {

            doAccept(processId){

                this.$confirm('Is the articles Ok?','Article Review', {
                    type:'warning',
                    cancelButtonText:'Cancel',
                    confirmButtonText: 'Confirm'
                    }).then(()=>{
                        this.showPageLoading();
                        this.acceptCommunityApproval({processId}).then(()=> {
                            this.hidePageLoading();
                            this.approvals.items.length == 0 && this.refreshPage();

                        });
                }).catch(()=>{});
            },

            doReject(processId){
                this.$prompt('Please give the modification suggest.', 'Article Review',{
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
                    this.rejectCommunityApproval({processId, notes}).then(()=> {
                        this.hidePageLoading();
                        this.approvals.items.length == 0 && this.refreshPage();
                    }).catch(()=>{});
                }).catch(()=>{});

            },

            refreshPage(otherParams = {}){
                this.showPageLoading();
                this.getCommunityApprovalList(otherParams).then(()=> {
                    this.hidePageLoading();
                });
            },


            onPagination(pageNo){
                this.refreshPage({pageNo})
            },

            showCommunityArticle(processId){
                this.getCommunityArticle(processId).then( res => {
                    this.isArticleVisible = true;
                    this._currentProcessId = processId;
                    this.articleCategoryCode = res['categoryCode']
                })
            },

            applyCategoryCode(){
                this.showPageLoading();
                let item = this.articleCategories.filter( item => item.categoryCode == this.articleCategoryCode )[0];
                let {categoryCode, categoryName, description} = item;
                let params = {
                    categoryCode,
                    categoryName,
                    description,
                    processId:this._currentProcessId
                };
                this.applyCategoryToArticle(params).then(()=>{
                    this.hidePageLoading();
                    this.isArticleVisible = false;
                })


            },

            ...mapActions([
                "showPageLoading",
                "hidePageLoading",
                "getCommunityApprovalList",
                "acceptCommunityApproval",
                "rejectCommunityApproval",
                "getCommunityArticle",
                "getCommunityArticleCategory",
                'applyCategoryToArticle'
            ])
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

    .article-wrapper {

    }
</style>

