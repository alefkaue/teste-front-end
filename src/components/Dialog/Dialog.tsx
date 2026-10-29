import { useEffect, useRef, type ReactNode } from 'react'

export function Dialog({ children, className, labelledBy, describedBy, onClose, closeLabel = 'Fechar janela' }: {
  children: ReactNode; className: string; labelledBy: string; describedBy?: string; onClose: () => void; closeLabel?: string
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const element = dialog.current
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    element?.showModal()
    return () => {
      element?.close()
      document.body.style.overflow = overflow
      previousFocus?.focus({ preventScroll: true })
    }
  }, [])

  return <dialog ref={dialog} className={className} aria-labelledby={labelledBy} aria-describedby={describedBy}
    onCancel={event => { event.preventDefault(); onClose() }}
    onKeyDown={event => {
      if (event.key !== 'Tab') return
      const items = event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), [tabindex="0"]')
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }}
    onClick={event => {
      if (event.target !== event.currentTarget) return
      const box = event.currentTarget.getBoundingClientRect()
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) onClose()
    }}>
    <button className="product-modal__close" aria-label={closeLabel} onClick={onClose} autoFocus>×</button>
    {children}
  </dialog>
}

export function InfoDialog({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return <Dialog className="info-dialog" labelledBy="info-title" onClose={onClose}>
    <h2 id="info-title">{title}</h2><div>{children}</div>
  </Dialog>
}
