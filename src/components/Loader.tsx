import { Component } from 'react'

export class Loader extends Component {
  render() {
    return (
      <span className="block rounded-full border-2 border-t-transparent border-purple-500 w-10 h-10 animate-spin" />
    )
  }
}
