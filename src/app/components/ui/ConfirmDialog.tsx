import { useState, type ReactElement } from 'react'
import { Dialog } from '@base-ui-components/react/dialog'
import { Button } from './Button'

export interface ConfirmDialogProps {
  trigger: ReactElement<Record<string, unknown>>
  title: string
  body: string
  confirmLabel: string
  cancelLabel: string
  danger?: boolean
  onConfirm: () => void
}

/** Base UI dialog under our tokens — used for destructive confirmations. */
export function ConfirmDialog({
  trigger,
  title,
  body,
  confirmLabel,
  cancelLabel,
  danger = false,
  onConfirm,
}: ConfirmDialogProps) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger render={trigger} />
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-scrim" />
        <Dialog.Popup className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[390px] rounded-t-3xl border border-line-default bg-modal p-5 pb-8 shadow-xl outline-none sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-3xl">
          <Dialog.Title className="text-lg font-semibold text-fg-primary">{title}</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm leading-relaxed text-fg-secondary">{body}</Dialog.Description>
          <div className="mt-4 flex flex-col gap-2">
            <Button
              variant={danger ? 'danger' : 'primary'}
              block
              onClick={() => {
                onConfirm()
                setOpen(false)
              }}
            >
              {confirmLabel}
            </Button>
            <Dialog.Close className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-line-default bg-container text-sm font-medium text-fg-primary transition-colors hover:bg-component-hover">
              {cancelLabel}
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
