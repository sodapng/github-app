import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export interface WithRouterProperties {
  location: ReturnType<typeof useLocation>
  params: Record<string, string>
  navigate: ReturnType<typeof useNavigate>
}

export const withRouter = <Properties extends WithRouterProperties>(
  Component: React.ComponentType<Properties>,
) => {
  // eslint-disable-next-line func-names
  return function (properties: Omit<Properties, keyof WithRouterProperties>) {
    const location = useLocation()
    const parameters = useParams()
    const navigate = useNavigate()

    return (
      <Component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(properties as Properties)}
        location={location}
        params={parameters}
        navigate={navigate}
      />
    )
  }
}
