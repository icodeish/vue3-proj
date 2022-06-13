import axios from 'axios'
import Base64 from 'js-base64'
import{ElMessageBox} from 'element-plus'
//创建通用axios配置
let instance =axios.create({
    responseType:'json',
    headers:{
        'Content-Type':'application/json'
    }
})
//对token加密
function baseFun(){
    const token=localStorage.getItem('token')
    const base64=Base64.encode(token+'')
    return 'Basic '+base64
}
//请求拦截,携带token去后端校验身份
instance.interceptors.request.use(config=>{
    let token=localStorage.getItem('token')
    if(token){
        config.headers.Authorization=baseFun()
       
    }
    return config
},
err=>{
    return new Promise.reject(err)
}
)
//请求成功
instance.interceptors.response.use(
    response=>{
        return response
    },
    error=>{
        if(error.response){
            let ERRS=error.response.status
            let MSG=error.response.data.msg.msg
            let errdata=ERRS===401?MSG:'服务器发生错误'
            switch(ERRS){
                case 401:
                ElMessageBox.alert(errdata,'提示',{
                    confirmButtonText:'好的',
                    type:'error'
                })
                .then(res=>{
                    console.log(res)
                })
                .catch(err=>{
                    console.log(err)
                })
                break;
            }
        }
        return Promise.reject(error.response.data)
    }

)
export default instance
