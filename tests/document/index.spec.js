import { createLocalVue } from '@vue/test-utils'
import { VueventPlugin } from '../../src/plugin'

const LocalVue = createLocalVue()

LocalVue.config.silent = true

LocalVue.use(VueventPlugin)

describe('Test document events', () => {
  test('Dummy test', () => {
    expect(1).toBe(1)
  })
})
