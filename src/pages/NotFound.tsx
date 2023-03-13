import { PureComponent } from 'react'

export class NotFound extends PureComponent {
  public render() {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center space-y-10 font-mono">
        <h1 className="text-9xl font-bold">Oops🔥</h1>
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl">Sorry, an unexpected error has occurred.</p>
          <p>
            <i className="text-slate-600">Not Found</i>
          </p>
        </div>
      </div>
    )
  }
}
