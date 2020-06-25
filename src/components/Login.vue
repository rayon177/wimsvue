<template>
    <div class="login-container">
        <!-- Form 组件提供了表单验证的功能
        ，只需要通过 rules 属性传入约定的验证规则，
        并将 Form-Item 的 prop 属性设置为需校验的字段名即可。 -->
        <el-form :model="ruleForm" :rules="rules"
         status-icon
         ref="ruleForm" 
         label-position="left" 
         label-width="0px" 
         class="demo-ruleForm login-page">
            <h3 class="title">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" 
                    v-model="ruleForm.username" 
                    auto-complete="off" 
                    placeholder="用户名"
                ></el-input>
            </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" 
                        v-model="ruleForm.password" 
                        auto-complete="off" 
                        placeholder="密码"
                    ></el-input>
                </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="loginSubmit" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import qs from 'qs';
export default {
    data(){
        return {
            logining: false,
            ruleForm: {
                username: '',
                password: '',
            },
            rules: {
                username: [{required: true, message: '请输入账号', trigger: 'blur'}],
                password: [{required: true, message: '请输入密码', trigger: 'blur'}]
            },
            


        }
    },
    methods: {
        loginSubmit(event){
            this.$refs.ruleForm.validate((valid) => {
                if(valid){
                    this.logining = true;
                    let params = {
                        'username': this.ruleForm.username,
                        'password': this.ruleForm.password
                    };
                    // console.log(qs.stringify(params));
                    this.$http.post(
                        'api/wims/user/login',      //生产环境  采用nginx代理 
                        // "http://localhost:8888/wims/user/login", //开发环境 后端直接解决跨域 但是跟自己写的interceptor冲突了 这个问题暂时没解决
                        qs.stringify(params) //转化成url参数的形式传过去，axios会直接把对象转化成json格式，
                                            // 后端采用FormData 形式 所以要转化成key1=value1&key2=value2的形式；
                        // params

                     ).then(res => {
                        //  console.log(res);
                         let token = res.data.token.userId+"_"+res.data.token.token;
                         let city
                        //  console.log(token);
                        //  console.log(localStorage);
                        //  todo：用vuex
                        localStorage.setItem("token", token);
                        localStorage.setItem("city", res.data.city);
                        localStorage.setItem("username", res.data.username);
                        localStorage.setItem("name", res.data.name);
                        localStorage.setItem("id", res.data.token.userId);
                        //全局变量
                        this.UserType.userType = res.data.usertype;
                        console.log(this.UserType.userType);
            
                        // console.log(localStorage.getItem("token"));
                        this.$router.push({path: '/top'});
                    }).catch(err =>{
                        this.logining = false;
                        this.$alert('账号密码错误!', 'info', {
                            // confirmButtonText: 'ok'
                        })
                    })
                }else{
                    console.log('错误提交!');
                    return false;
                }
            })
        }
    }
};
</script>

<style scoped>
.login-container {
    width: 100%;
    height: 100%;
}
.login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
}
</style>