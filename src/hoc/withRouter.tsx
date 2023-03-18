import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export type WithRouterProperties = {
  location: ReturnType<typeof useLocation>
  params: ReturnType<typeof useParams>
  navigate: ReturnType<typeof useNavigate>
}

export const withRouter = <Properties extends WithRouterProperties>(
  Component: React.ComponentType<Properties>,
) => {
  return function (properties: Omit<Properties, keyof WithRouterProperties>) {
    const location = useLocation()
    const parameters = useParams()
    const navigate = useNavigate()

    return (
      <Component
        {...(properties as Properties)}
        location={location}
        params={parameters}
        navigate={navigate}
      />
    )
  }
}
