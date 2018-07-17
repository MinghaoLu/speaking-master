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
          <recorder v-on:get-audio="getAudio" ></recorder>
      </div>

      <div class="record-text-component">
        录音文本组件区域
      </div>

      <el-button class="record-btn-publish" type="info" @click="publish($route.params.subjectId)">发布</el-button>

    </div>

  </div>
</template>

<script>
import Recorder from '@/components/SpeakingRecorder'
import { getSubjectById, publishSubmission, uploadFile } from 'api/subjects'

export default {
  name: 'index',
  data () {
    return {
      subjectData: {},
      audio_url: ''
    }
  },
  components: {
    Recorder
  },
  computed: {},
  methods: {
    publish () {
      console.log('publish')
      publishSubmission(this.$route.params.subjectId, {
        content: this.subjectData.content,
        audioUrl: this.audio_url
      })
    },
    getAudio: function (blob, fileName) {
      console.log('getAudio:' + blob)
      let record = new File([blob], fileName)
      this.uploadRecord(record)
    },
    // upload the record to the server and return audio_rul
    uploadRecord: function (record) {
      console.log('uploadRecord')
      uploadFile(this.$route.params.subjectId, record)
        .then(response => {
          this.audio_url = response.audioUrl
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  async mounted () {
    this.subjectData = await getSubjectById(this.$route.params.subjectId)
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .app-wrapper {
      margin-top: 5px;
      display: flex;
    }

    .main-left {
      flex: 1;
      padding: 10px;
      width: 360px;
      .subject-content {
        background: #EBEBEB;
        border: 2px solid #AAA;
        margin-top: 30px;
      }
    }

    .main-right {
      flex: 1;
      padding: 10px;
      text-align: center;
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
