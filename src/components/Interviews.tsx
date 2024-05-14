import NavigationBar from '@components/Navbar'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { PencilIcon } from '@heroicons/react/24/solid'
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
import dayjs from 'dayjs'
import { useState } from 'react'
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

const TABLE_ROWS = [
  {
    id: 1,
    startDate: '2024-05-20',
    endDate: '2024-05-21',
    interviewType: 'Technical',
    interviewStatus: 'Completed',
    interviewFeedback: undefined,
    // {
    //   id: 1,
    //   feedback: "Good performance"
    // },
    talent: {
      id: 1,
      name: 'Alice',
      surname: 'Smith',
      email: 'alice.smith@example.com',
      phoneNumber: '123-456-7890',
      specialization: {
        id: 1,
        name: 'Software Development',
      },
      status: 'Active',
      dateApplied: '2024-04-15',
    },
    interviewers: [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        position: 'Senior Software Engineer',
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        position: 'Software Developer',
      },
    ],
  },
]

const dateFormat = 'YYYY-MM-DD HH:mm:ss'

const Interviews: React.FC = () => {
  const [addFeedbackModalOpen, setAddFeedbackModalOpen] = useState(false)
  const [editFeedbackModalOpen, setEditFeedbackModalOpen] = useState(false)

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
              {TABLE_ROWS.map(
                (
                  {
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
                  const isLast = index === TABLE_ROWS.length - 1
                  const classes = isLast
                    ? 'p-4'
                    : 'p-4 border-b border-blue-gray-50'

                  return (
                    <tr key={talent.name}>
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
                            {talent.specialization.name}
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
                            {dayjs(startDate).format(dateFormat)}
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
                            {dayjs(endDate).format(dateFormat)}
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
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </IconButton>
                              </Tooltip>
                            </>
                          ) : (
                            <Button
                              variant="outlined"
                              size="sm"
                              onClick={() => setAddFeedbackModalOpen(true)}
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
          submitButtonAction={() => setAddFeedbackModalOpen(false)}
          children={<Textarea label="Feedback" />}
          size="lg"
        />
      )}
    </>
  )
}
export default Interviews
