import { ChangeEvent, Component } from 'react'

type PropertiesSearch = Record<string, string>

type StateSearch = {
  value: string
}

export class Search extends Component<PropertiesSearch, StateSearch> {
  constructor(properties: PropertiesSearch) {
    super(properties)
    this.state = {
      value: localStorage.getItem('value') ?? '',
    }
  }

  componentWillUnmount() {
    const { value } = this.state
    localStorage.setItem('value', value)
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value,
    })
  }

  render() {
    const { value } = this.state

    return (
      <input
        aria-label="search"
        className="w-72 appearance-none rounded-md border px-3 py-1 outline-none focus-within:border-violet-500 focus-within:ring focus-within:ring-violet-300 focus-within:ring-offset-1"
        type="search"
        onChange={this.handleChange}
        value={value}
      />
    )
  }
}
