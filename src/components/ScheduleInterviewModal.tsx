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
import {
  InterviewRequestDTO,
  createInterview,
  getInterviewTypes,
} from '@redux/interviewSlice'
import { Interviewer, getInterviewers } from '@redux/interviewerSlice'
import { Talent } from '@redux/talentSlice'
import React, { useEffect, useState } from 'react'

import { PageableResponse } from 'services/types'
import { RootState } from '../store'

interface ModalProps {
  closeModal: () => void
  size: any
  isEdit: boolean
  talent: Talent
}

const ScheduleInterviewModal: React.FC<ModalProps> = ({
  closeModal,
  size,
  isEdit,
  talent,
}) => {
  const dispatch = useAppDispatch()

  const talents: Talent[] | undefined = useAppSelector(
    (state: RootState) => state.talent.talents,
  )

  const [interviewerIds, setInterviewerIds] = useState<number[]>([])
  const [interviewType, setInterviewType] = useState('')
  const [talentID, setTalentID] = useState<number>(talent.id)
  const [selectedInterviewerId, setSelectedInterviewerId] = useState<number>(0)

  const interviewers: Interviewer[] | undefined = useAppSelector(
    (state: RootState) => state.interviewer.interviewersPageable?.content,
  )

  const interviewTypes: string[] | undefined = useAppSelector(
    (state: RootState) => state.interview.interviewTypes,
  )

  useEffect(() => {
    if (interviewers === undefined) {
      dispatch(getInterviewers({ size: 2, page: 0, sort: 'email,ASC' }))
    }
  }, [interviewers])

  useEffect(() => {
    if (interviewTypes === undefined) {
      dispatch(getInterviewTypes())
    }
  }, [interviewTypes])

  const handleOpen = (value: any) => (size = value)

  const handleSave = () => {
    const interviewRequest: InterviewRequestDTO = {
      interviewerIds,
      interviewType,
      talentID,
    }
    dispatch(createInterview(interviewRequest))
      .then(() => {
        setInterviewerIds([])
        setInterviewType('')
        setTalentID(0)
      })
      .then(() => closeModal())
    // .then(() => dispatch(getInterviewers()))
  }
  const interviewersPageable: PageableResponse<Interviewer> | undefined =
    useAppSelector((state: RootState) => state.interviewer.interviewersPageable)

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
              <Select
                color="blue"
                variant="outlined"
                value=""
                // label="position"
                onChange={(e) => setInterviewType(e!)}
                placeholder={undefined}
              >
                {interviewTypes === undefined ||
                interviewTypes?.length === 0 ? (
                  <Option disabled>No interview types available</Option>
                ) : (
                  interviewTypes.map((item) => (
                    <Option key={item.toString()} value={item.toString()}>
                      {item}
                    </Option>
                  ))
                )}
              </Select>
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
              <Select
                color="blue"
                variant="outlined"
                value=""
                onChange={(e) => interviewerIds.push(Number(e))}
                placeholder={undefined}
              >
                {interviewers === undefined || interviewers.length === 0 ? (
                  <Option disabled>No interviewers added</Option>
                ) : (
                  interviewers?.map((item) => (
                    <Option
                      key={item.id?.toString()}
                      value={item.id?.toString()}
                    >
                      {item.firstName + ' ' + item.lastName}
                    </Option>
                  ))
                )}
              </Select>
              {/* <Select
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                isSearchable
                value={interviewerIds}
                onChange={(e: any) => interviewerIds.push(Number(e))}
                options={interviewers?.map(interviewer => ({
                  value: interviewer.id,
                  label: `${interviewer.firstName} ${interviewer.lastName}`
                }))}
              /> */}
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
