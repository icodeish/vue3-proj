import axios from 'axios'
const api=axios.create({
    baseURL:'http://zxgc.sykj918.com/api',
    timeout:2000
})
export default api