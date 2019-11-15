import { VueConstructor } from 'vue'

interface NewVueConstructor extends VueConstructor {
  $events: {
    remove: {
      window: {
        [x: string]: Function
      };
      document: {
        [x: string]: Function
      }
    }
  }
}

function createEventsFromObject(this: NewVueConstructor, events: object, target: Document | Window, targetKey: string) {
  const eventKeys = Object.keys(events)

  for (const key of eventKeys) {
    // @ts-ignore
    const handler = events[key].bind(this)
    target.addEventListener(key, handler)

    this.$events = {
      remove: {
        ...this.$events.remove,
        [targetKey]: {
          // @ts-ignore
          ...this.$events.remove[targetKey],
          [key]: () => target.removeEventListener(key, handler),
        },
      },
    }
  }
}

const Vuevent = {
  install(vue: NewVueConstructor) {
    vue.mixin({
      beforeCreate() {
        // @ts-ignore
        const { events = {} } = this.$options
        const { document: documentEvents = {}, window: windowEvents = {} } = events

        createEventsFromObject.apply(this as unknown as NewVueConstructor, [documentEvents, document, 'document'])
        createEventsFromObject.apply(this as unknown as NewVueConstructor, [windowEvents, window, 'window'])
      }
    })
  }
}

export { Vuevent }