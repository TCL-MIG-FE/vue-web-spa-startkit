<template>
    <div class='table-wrapper'>
        <el-table
            :data="source"
            :selection-mode="mode"
            :border="true"
            @selectionchange="onSelected">
            <slot></slot>
        </el-table>

        <el-pagination
            ref="pagination"
            class="mt30 text-center"
            layout="prev, pager, next,jumper"
            @currentchange="onPagination"
            :current-page="pageNo"
            :page-size="pageSize"
            :total="total">
        </el-pagination>
    </div>


</template>


<script>
    export default {
        name: 'WmTable',
        props: {
            source: Array,
            pageNo: {
                type: Number,
                default: 1
            },

            pageSize: {
                type: Number,
                default: 10
            },
            total: {
                type: Number,
                default: 0
            },
            mode: {
                type: String,
                default: "multiple"
            }
        },

        methods: {
            onSelected(params){
                this.$emit("onSelected", params)
            },

            onPagination(pageNo){
                this.$emit("onPagination", pageNo);
            }
        },
    }
</script>
