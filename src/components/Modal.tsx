import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react'
import React from 'react'

interface ModalProps {
  title: string
  cancelButtonLabel?: string
  cancelButtonAction?: () => void
  submitButtonLabel?: string
  submitButtonAction?: () => void
  children: React.ReactNode
  size: any
}

const Modal: React.FC<ModalProps> = ({
  title,
  cancelButtonLabel,
  cancelButtonAction,
  submitButtonLabel,
  submitButtonAction,
  children,
  size,
}) => {
  const handleOpen = (value: any) => (size = value)

  return (
    <>
      <Dialog
        open={
          size === 'xs' ||
          size === 'sm' ||
          size === 'md' ||
          size === 'lg' ||
          size === 'xl' ||
          size === 'xxl'
        }
        size={size}
        handler={handleOpen}
        placeholder={undefined}
      >
        <DialogHeader placeholder={undefined}>{title}</DialogHeader>
        <DialogBody placeholder={undefined}>{children}</DialogBody>
        <DialogFooter placeholder={undefined}>
          {cancelButtonLabel && cancelButtonAction && (
            <Button
              variant="text"
              color="red"
              className="mr-1"
              placeholder={undefined}
              onClick={() => cancelButtonAction()}
            >
              <span>{cancelButtonLabel}</span>
            </Button>
          )}
          {submitButtonLabel && submitButtonAction && (
            <Button
              variant="gradient"
              color="green"
              placeholder={undefined}
              onClick={() => submitButtonAction()}
            >
              <span>{submitButtonLabel}</span>
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default Modal
