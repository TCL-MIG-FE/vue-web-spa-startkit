<template>
    <el-select v-model="value">
        <el-option
            @change="onChange"
            v-for="item,index in options"
            :key='index'
            :label="item.label"
            :value="item.value">
        </el-option>
    </el-select>
</template>

<script>

    export default{
        name: 'WmSelect',
        props:['value', 'options'],
        methods:{
            onChange( value ){
                this.$emit("input", value);
                this.$emit("onChange", value);
            }
        }
    }
</script>
