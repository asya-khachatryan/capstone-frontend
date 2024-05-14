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
import { InterviewRequestDTO, createInterview } from '@redux/interviewSlice'
import { Interviewer } from '@redux/interviewerSlice'
import { Talent } from '@redux/talentSlice'
import React, { useState } from 'react'
import { RootState } from '../store'

interface ModalProps {
  closeModal: () => void
  size: any
  isEdit: boolean
  interviewer?: Interviewer
  talent: Talent
}

const ScheduleInterviewModal: React.FC<ModalProps> = ({
  closeModal,
  size,
  isEdit,
  interviewer,
  talent,
}) => {
  const dispatch = useAppDispatch()

  const talents: Talent[] | undefined = useAppSelector(
    (state: RootState) => state.talent.talents,
  )

  const [interviewerIds, setInterviewerIds] = useState<number[]>([])
  const [interviewType, setInterviewType] = useState<string>('')
  const [talentID, setTalentID] = useState<number>(talent.id)

  const handleOpen = (value: any) => (size = value)

  const handleSave = () => {
    setInterviewerIds([6])
    const interviewRequest: InterviewRequestDTO = {
      interviewerIds,
      interviewType,
      talentID,
    }
    console.log('here: ' + interviewRequest.interviewType)
    dispatch(createInterview(interviewRequest))
      .then(() => {
        setInterviewerIds([])
        setInterviewType('')
        setTalentID(0)
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
          Schedule an interview
        </DialogHeader>
        <DialogBody placeholder={undefined}>
          <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Talent
              </Typography>
              <Input
                size="lg"
                labelProps={{
                  className: 'hidden',
                }}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                disabled
                value={talent.name + ' ' + talent.surname}
              ></Input>
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
                placeholder={undefined}
              >
                Interview type
              </Typography>
              <Input
                size="lg"
                labelProps={{
                  className: 'hidden',
                }}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                onChange={(e) => setInterviewType(e.target.value)}
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
                Interviewers
              </Typography>
              {/* <Input
                                size="lg"
                                labelProps={{
                                    className: 'hidden',
                                }}
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                                onChange={(e) => setPosition(e.target.value)}
                            /> */}
              {/* <SearchableSelect options={options} onChange={handleChange} /> */}
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

export default ScheduleInterviewModal
