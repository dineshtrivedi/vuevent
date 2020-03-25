function createGlobalEvents(targetName, target, events) {
  Object.entries(events).forEach(([event, handler]) => {
    const newHandler = handler.bind(this)

    target.addEventListener(event, newHandler)

    this.$events = {
      ...this.$events,
      remove: {
        ...this.$events.remove,
        [targetName]: {
          ...this.$events[targetName],
          [event]: () => target.removeEventListener(event, newHandler)
        }
      }
    }
    
    this.$options.destroyed = [
      ...this.$options.destroyed,
      () => {
         Object.values(this.$events.remove[targetName]).forEach((cb) => cb())
      }
    ]
  })
}

const GlobalEvents = {
  install(Vue) {
    Vue.mixin({
      beforeCreate() {
        const vm = this

        const { events = {} } = this.$options
        const { document: documentEvents = {}, window: windowEvents = {} } = events
        
         if (!this.$events) {
            this.$events = {
              remove: {
                window: {}
              }
            }
        }
        
        if (!this.$options.destroyed) {
          this.$options.destroyed = []
        }
        
        createGlobalEvents.apply(this, ['window', window, windowEvents])
        createGlobalEvents.apply(this, ['document', document, documentEvents])
      },
    })
  }
}

export { GlobalEvents }