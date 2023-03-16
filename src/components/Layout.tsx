import cn from 'clsx'
import { withRouter, WithRouterProperties } from 'hoc/withRouter'
import { PureComponent } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export class Layout extends PureComponent<WithRouterProperties> {
  render() {
    const { location } = this.props

    return (
      <div className="relative min-h-screen">
        <div className="fixed top-0 left-0 z-50 w-full">
          <header className="mx-auto flex items-center justify-between bg-white px-12 py-5 text-lg font-semibold text-slate-600 shadow-sm">
            <nav className="grid grid-cols-2 divide-x rounded-md border text-center">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  cn('px-6 py-2 hover:bg-slate-50', {
                    'text-violet-500': isActive,
                    'bg-slate-50': isActive,
                  })
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  cn('px-6 py-2 hover:bg-slate-50', {
                    'text-violet-500': isActive,
                    'bg-slate-50': isActive,
                  })
                }
              >
                About
              </NavLink>
            </nav>
            <p>Current page: {location.pathname}</p>
          </header>
        </div>
        <Outlet />
      </div>
    )
  }
}

export const LayoutWithRouter = withRouter(Layout)
