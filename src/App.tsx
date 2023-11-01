import { Component, createRef } from 'react'
import { CatBreed, catClient } from './api/CatClient'

type AppProps = Record<string, unknown>

interface AppState {
  breeds: CatBreed[]
  searchName: string
  isError: boolean
}

export class App extends Component<AppProps, AppState> {
  state: Readonly<AppState> = {
    breeds: [],
    searchName: localStorage.getItem('searchName') ?? '',
    isError: false,
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(_prevProps: AppProps, prevState: AppState) {
    const { searchName } = this.state

    if (prevState.searchName !== searchName) {
      this.fetchData()
    }
  }

  inputRef = createRef<HTMLInputElement>()

  async fetchData() {
    const searchName = this.inputRef.current?.value.trim() || undefined
    const { items: breeds } = await catClient.getBreeds({
      name: searchName,
    })

    this.setState({ breeds })
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const searchName = this.inputRef.current?.value ?? ''
    localStorage.setItem('searchName', searchName)
    this.setState({
      searchName,
    })
  }

  render() {
    const { breeds, searchName, isError } = this.state

    if (isError) {
      throw new Error('Sorry.. there was an error')
    }

    return (
      <div className="flex flex-col gap-4 container mx-auto px-4 py-4">
        <button onClick={() => this.setState({ isError: true })}>
          Вызвать ошибку! 😈
        </button>
        <div>
          <form
            onSubmit={this.handleSubmit}
            className="flex gap-1 items-center"
          >
            <input
              className="border rounded-md"
              ref={this.inputRef}
              type="text"
              defaultValue={searchName}
            />
            <button type="submit">🔍</button>
          </form>
        </div>
        <div className="border rounded-md">
          <ul className="grid grid-cols-3 p-2 gap-2">
            {breeds.map(({ id, name, description }) => {
              return (
                <li key={id} className="border p-2 rounded-md">
                  <p>Name: {name}</p>
                  <p>Description: {description}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
