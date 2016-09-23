<template>
    <div class='settings-section'>
        <div class='pwd-section'>
            <el-form :model="user" :rules="rules" ref='form' label-width="130px">
                <el-form-item label="新密码" prop='pwd'>
                    <el-input type='password' auto-complete="off" v-model="user.pwd"></el-input>
                </el-form-item>
                <el-form-item label="再次输入新密码" prop='confirmPwd'>
                    <el-input type='password' auto-complete="off" v-model="user.confirmPwd"></el-input>
                </el-form-item>
                <el-form-item class='text-center'>
                    <el-button class='btn-submit' type="primary" @click.native.prevent="submit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import isEmpty from 'lodash.isempty';

    export default {

        name: 'Settings',

        data(){
            const self = this;
            const validatePwd = (rule, value, callback)=> {
                if (isEmpty(value)) {
                    callback(new Error('请输入密码'));
                } else {
                    if (!isEmpty(self.user.confirmPwd)) {
                        self.$refs.form.validateField('confirmPwd');
                    }
                    callback();
                }

            };

            const validateConfirmedPwd = (rule, value, callback)=> {
                if (isEmpty(value)) {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.user.pwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                user: {
                    pwd: '',
                    confirmPwd: ''
                },

                rules: {

                    pwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {validator: validatePwd}
                    ],


                    confirmPwd: [
                        {required: true, message: '请再次输入密码', trigger: 'blur'},
                        {validator: validateConfirmedPwd}
                    ],

                }
            }
        },


        methods: {

            submit(){
                const self = this;
                this.$refs.form.validate(valid => {
                    if (valid) {
                        self.showPageLoading();
                        self.updateUserPwd(self.user).then(()=>{
                            self.hidePageLoading();
                            self.$message({
                                message: '更改密码成功！',
                                type: 'success'
                            });
                        });
                    }
                })
            },

            ...mapActions(["showPageLoading", "hidePageLoading", "updateUserPwd"])
        },

    };
</script>

<style lang='less' scoped>

    .pwd-section {
        width: 600px;
        margin: 0 auto;
    }

    .btn-submit {
        width: 150px;
    }

</style>


