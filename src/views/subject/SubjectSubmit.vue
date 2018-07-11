<template>
  <div class="app-wrapper">
    <div class="main-left">
      <p class="subject-name"> {{ $route.params.subjectId }}. {{ subjectData.name }}</p>
      <div class= "subject-content">
        <p>{{ subjectData.content }}</p>
      </div>
    </div>

    <div class="main-right">
      <div class="record-controller">
          录音controller
      </div>

      <div class="record-text-component">
        录音文本组件区域
      </div>

      <el-button class="record-btn-publish" type="info" @click="publish($route.params.subjectId)">发布</el-button>
    </div>

  </div>
</template>

<script>
import axios from 'axios' // 异步请求HTTP库

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:8800/api', // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  console.log(config)
  return config
}, error => {
  Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(response => {
  return response.data
}, error => {
  Promise.reject(error)
})

export default {
  name: 'index',
  data () {
    return {
      subjectData: {}
    }
  },
  components: {

  },
  computed: {},
  methods: {
    getSubjectData (subjectId) {
      service.get('/subjects/' + subjectId)
        .then((result) => {
          console.log('successful')
          console.log(result)
          this.subjectData = result
        })
        .catch((err) => {
          console.log(err)
        })
    },
    publish (subjectId) {
      console.log('发布成功')
      service.post('/subjects/' + subjectId + '/submissions', {
      })
        .then((response) => {
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mounted () {
    this.getSubjectData(this.$route.params.subjectId)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .app-wrapper {
      margin-top: 5px;
      display: flex;
    }

    .main-left {
      flex: 50%;
      padding: 10px;
      .subject-content {
        background: #EBEBEB;
        border: 2px solid #AAA;
        margin-top: 30px;
      }
    }

    .main-right {
      flex: 50%;
      padding: 10px;
      text-align: center;
      .record-controller {
        height: 80px;
        overflow: auto;
        background: #EBEBEB;
        border: 2px solid #AAA;
      }
      .record-text-component {
        height: 240px;
        overflow: auto;
        margin-top: 30px;
        background: #EBEBEB;
        border: 2px solid #AAA;
      }
      .record-btn-publish {
        margin-top: 10px;
      }
    }

</style>
