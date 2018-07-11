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
import fetch from 'utils/fetch'

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
      console.log('getSubjectData')
      let result = fetch({
        url: `/subjects/${subjectId}`,
        method: 'get'
      })
      console.log(result)
      return result
    },
    publish (subjectId) {
      console.log('发布成功')
      return fetch({
        url: `/subjects/${subjectId}/submissions`,
        method: 'post',
        data: {

        },
        transformRequest: [function (data) {
          // Do whatever you want to transform the data
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(response => {

      }, error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getSubjectData(this.$route.params.subjectId)
      .then(response => {
        this.subjectData = response
      }, error => {
        console.log(error)
      })
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
      width: 360px;
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
