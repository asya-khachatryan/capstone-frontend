import { useAppDispatch, useAppSelector } from '@hooks/redux'
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react'
import { MentorDto, getMentors } from '@redux/onboardingSlice'
import React, { useEffect } from 'react'
import { RootState } from '../store'

interface ModalProps {
  closeModal: () => void
  size: any
}

const MentorAssignmentModal: React.FC<ModalProps> = ({ closeModal, size }) => {
  const dispatch = useAppDispatch()

  const mentors: MentorDto[] | undefined = useAppSelector(
    (state: RootState) => state.onboarding.mentors,
  )

  useEffect(() => {
    if (mentors === undefined) {
      dispatch(getMentors())
    }
  }, [mentors])

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
        <DialogHeader placeholder={undefined}>Assign mentor</DialogHeader>
        <DialogBody placeholder={undefined}>
          <Select
            color="blue"
            label="Select Mentor"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {mentors?.map((mentor) => (
              <Option key={mentor.id.toString()}>
                {mentor.firstName + ' ' + mentor.lastName}
              </Option>
            ))}
          </Select>
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
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default MentorAssignmentModal
