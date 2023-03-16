import cn from 'clsx'
import { PureComponent } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export class Layout extends PureComponent {
  render() {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="shadow-md">
          <header className="mx-auto flex items-center justify-between px-12 py-5 text-lg font-semibold text-slate-600">
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
            <p>Current page: test</p>
          </header>
        </div>
        <Outlet />
      </div>
    )
  }
}
