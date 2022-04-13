import Events from 'events'

export default class TagViewService extends Events {
  constructor() {
    super()
    if (!TagViewService._instance) {
      TagViewService._instance = this
    }
    return TagViewService._instance
  }
}
