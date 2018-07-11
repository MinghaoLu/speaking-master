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
      this.$ajax.get('http://localhost:8800/api/subjects/' + subjectId)
        .then((result) => {
          console.log('successful')
          console.log(result)
          console.log(result.status)
          this.subjectData = result.data
        }).catch((err) => {
          console.log(err)
        })
    },
    publish (subjectId) {
      console.log('发布成功')
      this.$ajax.post('http://localhost:8800/api/subjects/' + subjectId + '/submissions', {
      })
        .then((response) => {
        }).catch((error) => {
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
