import { RootState } from 'store'

export {}

declare global {
  interface Window {
    __PRELOADED_STATE__?: Partial<RootState>
  }
}
