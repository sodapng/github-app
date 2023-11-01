import { Component } from 'react'

interface ErrorBoundaryProps {
  fallback?: React.ReactNode
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static getDerivedStateFromError() {
    return { hasError: true }
  }

  state: ErrorBoundaryState = {
    hasError: false,
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  render() {
    const { hasError } = this.state
    const { children, fallback } = this.props
    let childToRender: React.ReactNode

    if (hasError) {
      if (fallback) {
        childToRender = fallback
      } else {
        childToRender = <h1>Sorry.. there was an error</h1>
      }

      return (
        <div className="h-screen w-screen grid place-items-center text-3xl">
          {childToRender}
        </div>
      )
    }

    return children
  }
}
