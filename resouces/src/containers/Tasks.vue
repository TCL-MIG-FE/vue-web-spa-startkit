<template>
    <div class='tasks-section'>
        <div v-if='tasks.totalCount > 0'>
            <div class="pull-right mb10">
                <el-select class="mr5 inline-block" v-model='status' @change="onStatusChanged">
                    <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-button v-if="status == statusItems.UN_PUBLISHED"
                           @click.native="doPublish(selectedTaskIds)"
                           :disabled="!selectedTaskIds"
                           type="primary">发布
                </el-button>

                <el-button v-if="status == statusItems.PUBLISHED"
                           @click.native="doUnPublish(selectedTaskIds)"
                           :disabled="!selectedTaskIds"
                           type="primary">撤销
                </el-button>
            </div>
            <wm-table @onSelected="onSelected"
                      @onPagination="onPagination"
                      :source="tasks.items"
                      :pageNo="tasks.pageNo"
                      :pageSize="tasks.pageSize"
                      :total="tasks.totalCount">
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column label="文章标题" property="title" show-tooltip-when-overflow/>
                <el-table-column label="二级源" property="source" show-tooltip-when-overflow />
                <el-table-column label="内容详情" show-tooltip-when-overflow inline-template>
                    <span>
                        <span v-if='row.content.length <= MAX_CONTENTS_LENGTH'>{{row.content}}</span>
                        <span v-else>{{ row.content.substring(0,MAX_CONTENTS_LENGTH) + ' ...' }}</span>
                    </span>
                </el-table-column>
                <el-table-column label="赏金" property="reward" width="80"/>
                <el-table-column label="状态" property="status" width="80" inline-template>
                    <span>
                        <span v-if="row.status == statusItems.UN_PUBLISHED">未发布</span>
                        <span v-if="row.status == statusItems.PUBLISHED">已发布</span>
                        <span v-if="row.status == statusItems.HAVE_ACCEPTED">已领取</span>
                    </span>
                </el-table-column>
                <el-table-column label="操作" inline-template width="100">
                    <span>
                        <el-button v-if="row.status == statusItems.UN_PUBLISHED" type="primary" size="small"
                                   @click.native="doPublish(row.processId)">发布
                        </el-button>
                        <el-button v-if="row.status == statusItems.PUBLISHED" type="primary" size="small"
                                   @click.native="doUnPublish(row.processId)">撤销
                        </el-button>
                    </span>
                </el-table-column>
            </wm-table>
        </div>
        <div v-else>
            <span>没有任何数据</span>
        </div>
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
                options: [{
                    label: '所有状态',
                    value: ''
                }, {
                    label: '未发布',
                    value: UN_PUBLISHED
                }, {
                    label: '已发布',
                    value: PUBLISHED
                }, {
                    label: '已领取',
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

            doPublish(taskIds){
                this.showPageLoading();
                this.publishTasks({processIds: `${taskIds}`}).then(()=> {
                    this.hidePageLoading();
                    this.tasks.items.length == 0 && this.refreshPage();

                })
            },

            doUnPublish(taskIds){
                this.unPublishTasks({processIds: `${taskIds}`}).then(()=> {
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

            ...mapActions(["showPageLoading", "hidePageLoading", "getTasks", "publishTasks", "unPublishTasks"])
        },

    };
</script>


