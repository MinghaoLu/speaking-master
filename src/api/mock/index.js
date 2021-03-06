import moviesRule from './movies'
import replyRule from './reply'
import authRule from './auth'
import collecRule from './collection'
import searchRule from './search'

// import groupRule from './group'
export default function mockData (mockAdapter) {
  replyRule(mockAdapter)
  moviesRule(mockAdapter)
  authRule(mockAdapter)
  collecRule(mockAdapter)
  searchRule(mockAdapter)
}
