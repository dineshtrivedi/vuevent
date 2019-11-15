---
title: Vuevent - Handle global events in Vue
description: A nice way of handling global events in Vue components
---

# Vuevent

A nice way of handling global events in Vue components

![](https://img.shields.io/npm/v/vueventjs)

## Installation

```shell
$ yarn add vueventjs
```

```javascript
import Vue from 'vue'
import { Vuevent } from 'vueventjs'

Vue.use(Vuevent)
```

## Motivation

In Vue we have very easy access to events on **Elements** but it's not so easy to listen to global events within the context of Vue, if we wanted to add a event listener for *pause* we would have to do this:

```vue
<script>
export default {
  methods: {
    onPause() {
      console.log('Vue instance', this)
    }
  },
  mounted() {
    document.addEventListener('pause', this.onPause)
  }
}
</script>
```

For some reason, I just do not think that this looks and feels like a Vue way to add global event listeners and that's why I came up with **Vuevent**

## How to use

### Add listeners

Vuevent allows you to add a `event` property to any Vue component and you can target either the `document` or `window` globals, you just create a function with the same name as the event you want to listen to

```vue
<script>
export default {
  events: {
    document: {
      click(e) {
        console.log('Event data', e)
        console.log('Vue instance', this)
      },
    },
    window: {
      resize() {
        console.log('Event data', e)
        console.log('Vue instance', this)
      }
    }
  }
}
</script>
```

### Remove listeners

Vuevent wouldn't be as cool if it did not allow you to remove event listeners, you can do this:

```vue
<script>
export default {
  events: {
    document: {
      click(e) {
        console.log('Event data', e)
        console.log('Vue instance', this)
      },
    },
    window: {
      resize(e) {
        console.log('Event data', e)
        console.log('Vue instance', this)
      }
    }
  },
  mounted() {
    this.$events.remove.document.click()
    this.$events.remove.window.resize()
  }
}
</script>
```