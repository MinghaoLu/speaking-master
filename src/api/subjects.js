import fetch from 'utils/fetch'
// import store from 'vuex-store'

export function getSubjectById (id) {
  return fetch({
    url: `/subjects/${id}`,
    method: 'get'
  })
}

export function uploadFile (id, file) {
  let formData = new FormData()
  formData.append('file', file)

  return fetch({
    url: `/subjects/${id}/submissions`,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}

export function publishSubmission (id, {content, audioUrl}) {
  const data = {
    content: content,
    audio_url: audioUrl
  }
  return fetch({
    url: `/subjects/${id}/submissions`,
    method: 'post',
    data: data
  })
}

export function createSubject ({name, content}) {
  const data = {
    name: name,
    content: content
  }

  return fetch({
    url: '/subjects',
    method: 'post',
    data: data
  })
}
