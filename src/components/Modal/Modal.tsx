import type { MouseEventHandler, ReactNode } from 'react'
import { createPortal } from 'react-dom'

type ModalProperties = {
  isOpen: boolean
  onClose: MouseEventHandler<HTMLDivElement>
  children: ReactNode
}

export function Modal({ children, onClose, isOpen }: ModalProperties) {
  return isOpen ? (
    createPortal(
      <div className='fixed left-1/2 top-1/2 z-50 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center'>
        {children}
        <div
          onClick={onClose}
          className='absolute z-40 h-full w-full cursor-pointer bg-violet-200 opacity-60'
        />
      </div>,
      document.body,
    )
  ) : (
    <></>
  )
}
