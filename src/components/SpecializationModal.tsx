import { useAppDispatch } from '@hooks/redux'
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Switch,
  Typography,
} from '@material-tailwind/react'
import {
  Specialization,
  createSpecialization,
  updateSpecialization,
} from '@redux/specializationSlice'
import React, { useState } from 'react'

interface ModalProps {
  closeModal: () => void
  size: any
  isEdit: boolean
  specialization?: Specialization
}

const SpecializationModal: React.FC<ModalProps> = ({
  closeModal,
  size,
  isEdit,
  specialization,
}) => {
  const dispatch = useAppDispatch()

  const [id, setId] = useState(isEdit ? specialization?.id || 0 : 0)

  const [specializationName, setSpecializationName] = useState(
    isEdit ? specialization?.specializationName || '' : '',
  )
  const [active, setActive] = useState(isEdit ? specialization!.active : true)

  const handleOpen = (value: any) => (size = value)

  const handleSave = () => {
    const specializationToSave: Specialization = {
      specializationName,
      active,
    }
    dispatch(createSpecialization(specializationToSave))
      .then(() => {
        setSpecializationName('')
        setActive(true)
      })
      .then(() => closeModal())
    // .then(() => dispatch(getInterviewers()))
  }

  const handleUpdate = (id: number) => {
    setId(id)
    const specialization: Specialization = {
      specializationName,
      active,
    }
    dispatch(updateSpecialization({ id, specialization }))
      .then(() => {
        setSpecializationName('')
        setActive(true)
      })
      .then(() => closeModal())
    // .then(() => dispatch(getInterviewers()))
  }

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
        <DialogHeader placeholder={undefined}>
          Add a specialization
        </DialogHeader>
        <DialogBody placeholder={undefined}>
          <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
                placeholder={undefined}
              >
                Specialization Name
              </Typography>
              <Input
                size="lg"
                labelProps={{
                  className: 'hidden',
                }}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                onChange={(e) => setSpecializationName(e.target.value)}
                value={specializationName}
              />
            </div>
            <div className="w-full">
              <div className="flex flex-col items-center justify-center h-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Status
                </Typography>
                <Switch
                  id="custom-switch-component"
                  ripple={false}
                  className="h-full w-full checked:bg-[#2ec946]"
                  containerProps={{
                    className: 'w-16 h-8',
                  }}
                  circleProps={{
                    className:
                      'before:hidden left-0.5 right-0.5 border-none w-7 h-7',
                  }}
                  defaultChecked={!isEdit || active}
                  onChange={(e) => setActive(e.target.checked)}
                />
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter placeholder={undefined}>
          <Button
            variant="text"
            color="red"
            className="mr-1"
            placeholder={undefined}
            onClick={() => closeModal()}
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            placeholder={undefined}
            onClick={
              isEdit
                ? () => handleUpdate(specialization?.id!)
                : () => handleSave()
            }
          >
            <span>{isEdit ? 'Update' : 'Save'}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default SpecializationModal
