import cn from 'clsx'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

const links = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Form', to: '/form' },
]

export function Layout() {
  const location = useLocation()

  return (
    <div className='relative min-h-screen'>
      <div className='sticky top-0 z-50 w-full'>
        <header className='mx-auto flex items-center justify-between bg-white px-12 py-5 text-lg font-semibold text-slate-600 shadow-sm'>
          <nav className='grid grid-cols-3 divide-x rounded-md border text-center'>
            {links.map(({ name, to }) => (
              <NavLink
                key={name}
                to={to}
                className={({ isActive }) =>
                  cn('px-6 py-2 hover:bg-slate-50', {
                    'text-violet-500': isActive,
                    'bg-slate-50': isActive,
                  })
                }
              >
                {name}
              </NavLink>
            ))}
          </nav>
          <p>Current page: {location.pathname}</p>
        </header>
      </div>
      <Outlet />
    </div>
  )
}
