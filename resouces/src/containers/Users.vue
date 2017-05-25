<template>
    <div class='users-section'>
        <div class="pull-right mb10">
            <el-select class="mr5 inline-block vb" v-model='status' @change="onStatusChanged"
                       placeholder='Please choose'>
                <el-option v-for="item,index in options" :key='index' :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
        <div v-if='users.totalCount > 0'>
            <wm-table
                @onPagination="onPagination"
                mode="none"
                :source="users.items"
                :pageNo="users.pageNo"
                :pageSize="users.pageSize"
                :total="users.totalCount">
                <el-table-column label="User" property="userName"/>
                <el-table-column label="Role" property="roleKey">
                </el-table-column>
                <el-table-column label="Completed Tasks" property='translateCounts'/>
                <el-table-column label="Timeout Tasks" property='overtimeCount'/>
                <el-table-column label="Registration Time" property='createTime'/>
            </wm-table>
        </div>
        <div v-else>
            <span>No users are available</span>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import WmTable from '../components/Table'
    import {TRANSLATED_USER_ROLE, COMMUNITY_USER_ROLE} from '../constants/api'

    export default {

        name: 'Users',

        components: {
            WmTable,
        },

        data(){
            return {
                status: '',
                options:[
                    {label:'Translator Users', value:TRANSLATED_USER_ROLE},
                    {label:'Community Users', value:COMMUNITY_USER_ROLE}
                ]
            }

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
                const status = this.status;
                this.getUsers({ status, ...otherParams}).then(()=> {
                    this.hidePageLoading();
                });
            },

            onStatusChanged( status ){
                this.status = status;
                this.refreshPage({pageNo:1});
            },


            onPagination(pageNo){
                this.refreshPage({pageNo})
            },


            ...mapActions(["showPageLoading", "hidePageLoading", "getUsers"])
        },

    };






</script>


