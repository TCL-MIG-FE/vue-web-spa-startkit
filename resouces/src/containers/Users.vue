<template>
    <div class='users-section'>
        <div v-if='users.totalCount > 0'>
            <wm-table
                @onPagination="onPagination"
                mode="none"
                :source="users.items"
                :pageNo="users.pageNo"
                :pageSize="users.pageSize"
                :total="users.totalCount">
                <el-table-column label="用户名" property="userName" />
                <el-table-column label="用户类型"  inline-template>
                    <span v-if='row.roleKey == 1'>翻译用户</span>
                </el-table-column>
                <el-table-column label="翻译文章数"  property='translateCount' />
                <el-table-column label="超时任务数"  property='overtimeCount' />
                <el-table-column label="注册时间"  property='createdDate' />
            </wm-table>
        </div>
        <div v-else>
            <span>没有任何数据</span>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import WmTable from '../components/Table'

    export default {

        name: 'Users',

        components: {
            WmTable,
        },


        beforeMount(){
            this.refreshPage();
        },

        computed: mapState({
            users: ({users}) => users.usersList
        }),


        methods: {


            refreshPage(otherParams = {}){
                this.showPageLoading();
                this.getUsers(otherParams).then(()=> {
                    this.hidePageLoading();
                });
            },


            onPagination(pageNo){
                this.refreshPage({pageNo})
            },


            ...mapActions(["showPageLoading", "hidePageLoading", "getUsers"])
        },

    };
</script>


