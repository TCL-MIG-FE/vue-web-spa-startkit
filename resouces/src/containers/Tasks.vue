<template>
    <div class='tasks-section'>

        <div class="pull-right mb10">
            <el-select class="mr5 inline-block vb" v-model='status' @change="onStatusChanged">
                <el-option v-for="item,index in options" :key='index'
                          :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button v-if="status == statusItems.UN_PUBLISHED"
                       @click="doPublish(selectedTaskIds)"
                       :disabled="!selectedTaskIds"
                       type="primary">Publish
            </el-button>

            <el-button v-if="status == statusItems.PUBLISHED"
                       @click="doUnPublish(selectedTaskIds)"
                       :disabled="!selectedTaskIds"
                       type="primary">Withdraw
            </el-button>
        </div>
        <wm-table @onSelected="onSelected"
                  @onPagination="onPagination"
                  :source="tasks.items"
                  :pageNo="tasks.pageNo"
                  :pageSize="tasks.pageSize"
                  :total="tasks.totalCount">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column label="Title" property="title" show-tooltip-when-overflow/>
            <el-table-column label="Source" property="source" show-tooltip-when-overflow/>
            <el-table-column label="Awards" width="120" inline-template>
                <span>${{row.reward}}</span>
            </el-table-column>
            <el-table-column  label="Status" property="status" width="120">
                <template scope='props'>
                    <span>
                        <span v-if="props.row.status == statusItems.UN_PUBLISHED">Unpublished</span>
                        <span v-if="props.row.status == statusItems.PUBLISHED">Published</span>
                        <span v-if="props.row.status == statusItems.HAVE_ACCEPTED">Accepted</span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column  label="Operation"  width="180" align='center'>
                <template scope="props">
                    <span>
                        <el-button size="small" @click="showArticle(props.row)" type='info'>View</el-button>
                        <el-button v-if="props.row.status == statusItems.UN_PUBLISHED" type="success" size="small"
                                   @click.native="doPublish(props.row.processId)">Publish
                        </el-button>
                        <el-button v-if="props.row.status == statusItems.PUBLISHED" type="danger" size="small"
                                   @click="doUnPublish(props.row.processId)">Withdraw
                        </el-button>
                    </span>
                </template>
            </el-table-column>
        </wm-table>

        <el-dialog title="Article Content" v-model="isArticleVisible" size="large" :close-on-click-modal="false">
            <div class='article-wrapper clearfix'>
                <!-- 原文 -->
                <div class='article'>
                    <h2 class='title' :title='article.title' v-html='article.title'></h2>
                    <div class='content' v-html='article.content'></div>
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
    import {UN_PUBLISHED, HAVE_ACCEPTED, PUBLISHED, MAX_CONTENTS_LENGTH} from '../constants/api'
    import WmTable from '../components/Table'
    import WmSelect from '../components/Select'

    export default {

        name: 'Tasks',

        components: {
            WmTable,
            WmSelect
        },

        data(){
            return {
                selectedTaskIds: [],

                // contents显示的最大长度
                MAX_CONTENTS_LENGTH,

                statusItems: {
                    UN_PUBLISHED,
                    PUBLISHED,
                    HAVE_ACCEPTED
                },

                status: '',

                // 是否显示文章详情对话框
                isArticleVisible:false,

                // 要查看的文章
                article: {},

                options: [{
                    label: 'All',
                    value: ''
                }, {
                    label: 'Unpublished',
                    value: UN_PUBLISHED
                }, {
                    label: 'Published',
                    value: PUBLISHED
                }, {
                    label: 'Accepted',
                    value: HAVE_ACCEPTED
                }]
            }
        },

        beforeMount(){
            this.refreshPage();
        },

        computed: mapState({
            tasks: ({tasks}) => tasks.tasksList,
            pageLoading: ({root}) => root.pageLoading
        }),


        methods: {


            _isShowingAllStatus(){
                return this.status === '';
            },


            doPublish(taskIds){
                this.showPageLoading();
                this.publishTasks({processIds: `${taskIds}`, reserveRecord: this._isShowingAllStatus()}).then(()=> {
                    this.hidePageLoading();
                    this.tasks.items.length == 0 && this.refreshPage();

                })
            },

            doUnPublish(taskIds){
                this.unPublishTasks({processIds: `${taskIds}`, reserveRecord: this._isShowingAllStatus()}).then(()=> {
                    this.hidePageLoading();
                    this.tasks.items.length == 0 && this.refreshPage();
                });
            },

            refreshPage(otherParams = {}){
                otherParams = {...otherParams, ...{status: this.status}};
                this.showPageLoading();
                this.getTasks(otherParams).then(()=> {
                    this.hidePageLoading();
                });
            },

            onSelected(values){
                this.selectedTaskIds = values.map(({processId}) => processId).join(',');
            },

            onPagination(pageNo){
                this.refreshPage({pageNo})
            },

            onStatusChanged(status){
                if (!this.pageLoading) {
                    this.status = status;
                    this.refreshPage();
                }

            },

            showArticle( article){
                this.isArticleVisible = true;
                this.article = article;
            },

            ...mapActions(["showPageLoading", "hidePageLoading", "getTasks", "publishTasks", "unPublishTasks"])
        },

    };
</script>


<style lang='less' >
    .article-wrapper {
        margin-bottom: -10px;
        .article {
            border: 1px solid #e0e6ed;
            border-radius: 4px;
            padding-top: 15px;
            position:relative;
            height: 550px;

            .title {
                text-align: center;
                margin-bottom: 10px;
                padding: 0 15px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .content {
                overflow-y: auto;
                padding: 0 15px;
                height:490px;
            }

            img{
                max-width:90%;
            }

        }

    }
</style>

