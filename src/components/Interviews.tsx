import NavigationBar from '@components/Navbar'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { PencilIcon } from '@heroicons/react/24/solid'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  IconButton,
  Textarea,
  Tooltip,
  Typography,
} from '@material-tailwind/react'
import {
  Interview,
  getAllInterviews,
  submitFeedback,
} from '@redux/interviewSlice'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { RootState } from 'store'
import Modal from './Modal'

const TABLE_HEAD = [
  'Talent',
  'Interviewers',
  'Specialization',
  'Status',
  'Type',
  'Start',
  'End',
  'Feedback',
]

const dateFormat = 'YYYY-MM-DD HH:mm:ss'

const Interviews: React.FC = () => {
  const [addFeedbackModalOpen, setAddFeedbackModalOpen] = useState(false)
  const [editFeedbackModalOpen, setEditFeedbackModalOpen] = useState(false)
  const [interviewId, setInterviewId] = useState<number>(0)
  const [feedback, setFeedback] = useState<string>('')

  const dispatch = useAppDispatch()
  const interviews: Interview[] | undefined = useAppSelector(
    (state: RootState) => state.interview.interviews,
  )

  useEffect(() => {
    if (interviews === undefined) {
      dispatch(getAllInterviews())
    }
  }, [interviews])

  const handleSubmitFeedback = () => {
    dispatch(submitFeedback({ interviewId, feedback })).then(() =>
      setAddFeedbackModalOpen(false),
    )
  }

  const handleAddFeedbackButtonClick = (id: number) => {
    setInterviewId(id)
    setAddFeedbackModalOpen(true)
  }

  const handleEditFeedbackButtonClick = (id: number, feedback: string) => {
    setFeedback(feedback)
    setInterviewId(id)
    setEditFeedbackModalOpen(true)
  }

  return (
    <>
      <NavigationBar />
      <br></br>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Interviews list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all interviews
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
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
                    >
                      {head}{' '}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {interviews?.map(
                (
                  {
                    id,
                    talent,
                    interviewers,
                    interviewStatus,
                    interviewType,
                    startDate,
                    endDate,
                    interviewFeedback,
                  },
                  index,
                ) => {
                  const isLast = index === interviews.length - 1
                  const classes = isLast
                    ? 'p-4'
                    : 'p-4 border-b border-blue-gray-50'

                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {talent.name + ' ' + talent.surname}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {talent.email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          {interviewers.map((interviewer, index) => (
                            <Typography
                              key={index}
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {interviewer.firstName +
                                ' ' +
                                interviewer.lastName}
                            </Typography>
                          ))}
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {talent.specialization.specializationName}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={interviewStatus}
                            color={
                              interviewStatus === 'REJECTED'
                                ? 'red'
                                : 'blue-gray' || interviewStatus === 'COMPLETED'
                                  ? 'green'
                                  : 'blue-gray'
                            }
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {interviewType}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {startDate ? (
                              dayjs(startDate).format(dateFormat)
                            ) : (
                              <>No date chosen</>
                            )}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {endDate ? (
                              dayjs(endDate).format(dateFormat)
                            ) : (
                              <>No date chosen</>
                            )}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          {interviewFeedback != undefined ? (
                            <>
                              <Typography
                                key={index}
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {interviewFeedback}
                              </Typography>
                              <Tooltip content="Edit Feedback">
                                <IconButton
                                  variant="text"
                                  placeholder={undefined}
                                  onClick={() =>
                                    handleEditFeedbackButtonClick(
                                      id!,
                                      interviewFeedback,
                                    )
                                  }
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </IconButton>
                              </Tooltip>
                            </>
                          ) : (
                            <Button
                              variant="outlined"
                              size="sm"
                              onClick={() => handleAddFeedbackButtonClick(id!)}
                            >
                              Add feedback
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                },
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
      {addFeedbackModalOpen && (
        <Modal
          title="Add feedback"
          cancelButtonLabel="Cancel"
          cancelButtonAction={() => setAddFeedbackModalOpen(false)}
          submitButtonLabel="Save"
          submitButtonAction={() => handleSubmitFeedback()}
          children={
            <Textarea
              label="Feedback"
              onChange={(e) => setFeedback(e.target.value)}
            />
          }
          size="lg"
        />
      )}
      {editFeedbackModalOpen && (
        <Modal
          title="Edit feedback"
          cancelButtonLabel="Cancel"
          cancelButtonAction={() => setEditFeedbackModalOpen(false)}
          submitButtonLabel="Update"
          submitButtonAction={() => handleSubmitFeedback()}
          children={
            <Textarea
              label="Feedback"
              onChange={(e) => setFeedback(e.target.value)}
              value={feedback}
            />
          }
          size="lg"
        />
      )}
    </>
  )
}
export default Interviews
