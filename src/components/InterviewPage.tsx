import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { PencilIcon } from '@heroicons/react/24/solid'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import {
  Avatar,
  Button,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from '@material-tailwind/react'
import {
  Talent,
  TalentCreationRequest,
  getInterviewees,
  getTalentCV,
  updateTalentStatus,
} from '@redux/talentSlice'
import { useEffect, useState } from 'react'
import { RootState } from '../store'
import Modal from './Modal'
import ScheduleInterviewModal from './ScheduleInterviewModal'

const InterviewPage: React.FC = () => {
  const TABLE_HEAD = [
    'Talent',
    'Specialization',
    'Interviewer list',
    'Actions',
    'Next Step',
  ]

  const dispatch = useAppDispatch()

  const interviewwes: Talent[] | undefined = useAppSelector(
    (state: RootState) => state.talent.interviewees,
  )

  useEffect(() => {
    if (interviewwes === undefined) {
      dispatch(getInterviewees())
      console.log(interviewwes)
    }
    console.log(interviewwes)
  }, [interviewwes])

  const [modalOpen, setModalOpen] = useState(false)
  const [cvUrl, setCvUrl] = useState('')

  const dispatchAndSet = (id: number) => {
    dispatch(getTalentCV(id))
      .unwrap()
      .then((a) => setCvUrl(a))
      .catch((a) => console.log(a))
    setModalOpen(true)
  }

  const [showRejectModal, setShowRejectModal] = useState(false)
  const [talentToReject, setTalentToReject] = useState<Talent>()

  const handleRejectButtonClick = (talent: Talent) => {
    setShowRejectModal(true)
    setTalentToReject(talent)
  }

  const handleRejectTalent = () => {
    const id = talentToReject!.id
    const request: TalentCreationRequest = {
      name: talentToReject!.name,
      surname: talentToReject!.surname,
      email: talentToReject!.email,
      phoneNumber: talentToReject!.phoneNumber,
      specializationId: talentToReject!.specialization.id!,
      status: 'REJECTED',
    }
    dispatch(updateTalentStatus({ id, request })).then(() =>
      setShowRejectModal(false),
    )
    // .then(dispatch(getInterviewers()))
  }
  const [showNextStepModal, setShowNextStepModal] = useState(false)
  const [talentNextStep, setTalentNextStep] = useState<Talent>()

  const handleNextSteptButtonClick = (talent: Talent) => {
    setShowNextStepModal(true)
    setTalentNextStep(talent)
  }

  const [inviteToInterview, setInviteToInterview] = useState(false)

  const handleHireTalent = () => {
    const id = talentNextStep!.id
    const request: TalentCreationRequest = {
      name: talentNextStep!.name,
      surname: talentNextStep!.surname,
      email: talentNextStep!.email,
      phoneNumber: talentNextStep!.phoneNumber,
      specializationId: talentNextStep!.specialization.id!,
      status: 'HIRED',
    }
    dispatch(updateTalentStatus({ id, request })).then(() =>
      setShowRejectModal(false),
    )
    // .then(dispatch(getInterviewers()))
  }

  return (
    <>
      <CardBody className="overflow-scroll px-0" placeholder={undefined}>
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    placeholder={undefined}
                  >
                    {head}{' '}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {interviewwes?.map(
              (
                {
                  id,
                  name,
                  surname,
                  email,
                  phoneNumber,
                  specialization,
                  status,
                },
                index,
              ) => {
                const isLast = index === interviewwes.length - 1
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50'

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src="public/avatar.png"
                          alt={name}
                          size="sm"
                          placeholder={undefined}
                        />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            placeholder={undefined}
                          >
                            {name + ' ' + surname}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                            placeholder={undefined}
                          >
                            {email}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                            placeholder={undefined}
                          >
                            {phoneNumber}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={undefined}
                        >
                          {specialization.specializationName}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={status}
                          color={status === 'REJECTED' ? 'red' : 'blue-gray'}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex gap-2 mb-2">
                        {status != 'REJECTED' ? (
                          <>
                            <Button
                              variant="outlined"
                              size="sm"
                              color="red"
                              placeholder={undefined}
                              onClick={() =>
                                handleRejectButtonClick(interviewwes[index])
                              }
                            >
                              Reject
                            </Button>
                          </>
                        ) : (
                          <></>
                        )}
                        <Button
                          variant="outlined"
                          size="sm"
                          placeholder={undefined}
                          onClick={() => dispatchAndSet(id)}
                        >
                          view cv
                        </Button>
                      </div>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton
                          variant="text"
                          placeholder={undefined}
                          onClick={() =>
                            handleNextSteptButtonClick(interviewwes[index])
                          }
                        >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                )
              },
            )}
          </tbody>
        </table>
      </CardBody>
      {modalOpen && (
        <Modal
          title="Applicant CV"
          submitButtonAction={() => setModalOpen(false)}
          size="xl"
          submitButtonLabel="OK"
        >
          <div>
            <iframe src={cvUrl} width="100%" height="500px" />
          </div>
        </Modal>
      )}
      {showRejectModal && (
        <Modal
          title="Reject Applicant"
          size="xl"
          submitButtonLabel="Cancel"
          submitButtonAction={() => setShowRejectModal(false)}
          cancelButtonLabel="Reject"
          cancelButtonAction={() => handleRejectTalent()}
        >
          Are you sure you want to reject{' '}
          {talentToReject?.name + ' ' + talentToReject?.surname}?
        </Modal>
      )}
      {showNextStepModal && (
        <Modal
          title="Next step"
          size="md"
          submitButtonLabel="OK"
          submitButtonAction={() => setShowNextStepModal(false)}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Button
              variant="outlined"
              size="sm"
              color="green"
              placeholder={undefined}
              onClick={() => setInviteToInterview(true)}
            >
              Invite to another interview
            </Button>

            <Button
              variant="filled"
              size="sm"
              color="green"
              placeholder={undefined}
              onClick={() => handleHireTalent()}
            >
              Change status to hired
            </Button>
          </div>
        </Modal>
      )}
      {inviteToInterview && (
        <ScheduleInterviewModal
          closeModal={() => setInviteToInterview(false)}
          size="lg"
          isEdit={false}
          talent={talentNextStep!}
        />
      )}
    </>
  )
}

export default InterviewPage
