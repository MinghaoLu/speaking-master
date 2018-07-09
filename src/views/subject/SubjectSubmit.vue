<template>
  <div class="app-wrapper">
    <div class="main-left subject">
        <p class="subject_name"> {{ $route.params.subjectId }}. {{ subjectData.name }}</p>
        <div class= "subject_content">
            <p>{{ subjectData.content }}
            </p>
        </div>
    </div>

    <div class="main-right record">
        <div class="record_controller">
            录音controller
        </div>

        <div class="record_text_component">
            录音文本组件区域
        </div>

        <el-button class="record_btn_publish" type="info" @click="publish">发布</el-button>
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
      return {
        id: 1,
        name: 'Most attractive theme of children museum exhibition',
        content: 'What the fuck is that you are a fucking doubi',
        tags: [
          'Toefl',
          'one of three',
          'task 1'
        ],
        paticipants: 12
      }
    },
    publish () {
      console.log('发布成功')
    }
  },
  async mounted () {
    this.subjectData = this.getSubjectData(this.$route.params.subjectId)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .main-left {
        float: left;
        width: 47%;
    }

    .subject {
        .subject_content {
            background: #EBEBEB;
            border: 2px solid #AAA;
            margin-top:30px;
        }
    }

    .main-right {
      float: right;
      width: 47%;
      margin: 2%;
    }

    .record {
      text-align: center;
        .record_controller {
          height: 80px;
          overflow: auto;
          background: #EBEBEB;
          border: 2px solid #AAA;
        }
        .record_text_component {
          height: 240px;
          overflow: auto;
          margin-top: 30px;
          background: #EBEBEB;
          border: 2px solid #AAA;
        }
        .record_btn_publish {
          margin-top: 10px;
        }
    }

</style>
