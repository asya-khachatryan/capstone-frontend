import { useAppDispatch, useAppSelector } from '@hooks/redux'
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react'
import { Specialization, getSpecializations } from '@redux/specializationSlice'
import React, { useEffect } from 'react'
import { RootState } from '../store'

interface ModalProps {
  closeModal: () => void
  size: any
}

const InterviewerModal: React.FC<ModalProps> = ({ closeModal, size }) => {
  const dispatch = useAppDispatch()

  const specializations: Specialization[] | undefined = useAppSelector(
    (state: RootState) => state.specialization.specializations,
  )

  useEffect(() => {
    if (specializations === undefined) {
      dispatch(getSpecializations())
    }
  }, [specializations])

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
        <DialogHeader placeholder={undefined}>Add Interviewer</DialogHeader>
        <DialogBody placeholder={undefined}>
          <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
                placeholder={undefined}
              >
                First Name
              </Typography>
              <Input
                size="lg"
                labelProps={{
                  className: 'hidden',
                }}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Last Name
              </Typography>
              <Input
                size="lg"
                labelProps={{
                  className: 'hidden',
                }}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
            </div>
          </div>
          <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Email
              </Typography>
              <Input
                size="lg"
                labelProps={{
                  className: 'hidden',
                }}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Position
              </Typography>
              <Select variant="outlined" placeholder={undefined}>
                text
                {specializations?.map((item) => (
                  <Option key={item.id.toString()} value={item.id.toString()}>
                    {item.specialization}
                  </Option>
                ))}
              </Select>
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
          <Button variant="gradient" color="green" placeholder={undefined}>
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default InterviewerModal
