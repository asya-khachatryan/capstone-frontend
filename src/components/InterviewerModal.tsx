import { useAppDispatch, useAppSelector } from '@hooks/redux'
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from '@material-tailwind/react'
import { Interviewer, createInterviewer } from '@redux/interviewerSlice'
import { Specialization, getSpecializations } from '@redux/specializationSlice'
import React, { useEffect, useState } from 'react'
import { RootState } from '../store'

interface ModalProps {
  closeModal: () => void
  size: any
  isEdit: boolean
  interviewer?: Interviewer
}

const InterviewerModal: React.FC<ModalProps> = ({
  closeModal,
  size,
  isEdit,
  interviewer,
}) => {
  const dispatch = useAppDispatch()

  const specializations: Specialization[] | undefined = useAppSelector(
    (state: RootState) => state.specialization.specializations,
  )

  const [firstName, setFirstName] = useState(
    isEdit ? interviewer?.firstName || '' : '',
  )
  const [lastName, setLastName] = useState(
    isEdit ? interviewer?.lastName || '' : '',
  )
  const [email, setEmail] = useState(isEdit ? interviewer?.email || '' : '')
  const [position, setPosition] = useState(
    isEdit ? interviewer?.position || '' : '',
  )

  useEffect(() => {
    if (specializations === undefined) {
      dispatch(getSpecializations())
    }
  }, [specializations])

  const handleOpen = (value: any) => (size = value)

  const handleSave = () => {
    const interviewer: Interviewer = {
      firstName,
      lastName,
      email,
      position,
    }
    dispatch(createInterviewer(interviewer))
      .then(() => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPosition('')
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
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
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
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
              <Input
                size="lg"
                labelProps={{
                  className: 'hidden',
                }}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                onChange={(e) => setPosition(e.target.value)}
                value={position}
              />
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
            onClick={handleSave}
          >
            <span>{isEdit ? 'Update' : 'Save'}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default InterviewerModal
