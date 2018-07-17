<template>
  <div>
    <button ref="recordBtn" :disabled="start" @click="startRecording">record</button>
    <button ref="stopBtn" :disabled="stop" @click="stopRecording">stop</button>

    <h2>Recordings</h2>
    <ul id="recordings-list">

    </ul>
  </div>
</template>

<script>
import Recorder from './recorder.js'

export default {
  name: 'recorder',
  props: {
  },
  data () {
    return {
      recorder: null,
      start: null,
      stop: 'disabled'
    }
  },
  computed: {
  },
  mounted () {
    try {
      // TODO: webkit shim
      window.AudioContext = window.AudioContext || window.webkitAudioContext
      navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia
      window.URL = window.URL || window.webkitURL

      this.audio_context = new AudioContext()
      console.log('Audio context set up.')
      console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'))
    } catch (e) {
      alert('No web audio support in this browser!')
    }

    navigator.mediaDevices.getUserMedia({audio: true})
      .then(this.startUserMedia)
      .catch(e => {
        console.error('No live audio input: ' + e)
      })
  },
  methods: {
    startRecording () {
      this.start = 'disabled'
      this.stop = null
      this.recorder && this.recorder.record()
      console.log('Recording...')
    },
    stopRecording (button) {
      this.stop = 'disabled'
      this.start = null
      this.recorder && this.recorder.stop()
      console.log('Stopped recording.')
      this.createDownloadLink()
    },
    createDownloadLink () {
      let _self = this
      this.recorder && this.recorder.exportWAV(function (blob) {
        var url = URL.createObjectURL(blob)
        var li = document.createElement('li')
        var au = document.createElement('audio')
        var hf = document.createElement('a')

        au.controls = true
        au.src = url
        hf.href = url
        hf.download = new Date().toISOString() + '.wav'
        hf.innerHTML = hf.download
        li.appendChild(au)
        li.appendChild(hf)
        document.getElementById('recordingslist').appendChild(li)

        // deliver to parent
        _self.$emit('record-completed', blob, hf.download)
      })
    },
    startUserMedia (stream) {
      // use microphone for Web Audio API source
      var input = this.audio_context.createMediaStreamSource(stream)
      console.log('Media stream created.')

      this.recorder = new Recorder(input)
      console.log('Recorder initialised.')
    }
  }
}
</script>
