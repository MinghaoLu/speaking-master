<template>
  <div class="app-wrapper">
    <div style="float: left;width: 47%;">
        <p> {{ $route.params.subjectId }}. {{ getSubjectData($route.params.subjectId).name }}</p>
        <div class= "subjectContent" style="background: #EBEBEB;border: 2px solid #AAAAAA;margin-top:30px;">
            <p style="text-indent: 2;">{{ getSubjectData($route.params.subjectId).content }}
            </p>

        </div>
    </div>

    <div style="float: right;width: 47%;margin: 2%;text-align: center;">
        <div style="height: 80px;overflow: auto;background: #EBEBEB;border: 2px solid #AAAAAA;">
            录音controller
        </div>

        <div style="height: 240px;overflow: auto;margin-top: 30px;background: #EBEBEB;border: 2px solid #AAAAAA;">
            录音文本组件区域
        </div>

        <el-button type="info" style="margin-top: 10px;" @click="publish">发布</el-button>
    </div>

  </div>
</template>

<script>

export default {
  name: 'index',
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
  mounted () {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .app-wrapper {
        margin-top: 10px;
        overflow: scroll;
    }
</style>
