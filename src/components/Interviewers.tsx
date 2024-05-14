import NavigationBar from '@components/Navbar'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { PencilIcon, TrashIcon, UserPlusIcon } from '@heroicons/react/24/solid'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from '@material-tailwind/react'
import {
  Interviewer,
  deleteInterviewer,
  getInterviewers,
} from '@redux/interviewerSlice'
import { useEffect, useState } from 'react'
import { RootState } from 'store'
import InterviewerModal from './InterviewerModal'
import Modal from './Modal'

const TABLE_HEAD = ['Interviewer', 'Email', 'Position', 'Actions']

const Interviewers: React.FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [interviewerToDelete, setInterviewerToDelete] = useState<Interviewer>()
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [interviewerToUpdate, setInterviewerToUpdate] = useState<Interviewer>()

  const interviewers: Interviewer[] | undefined = useAppSelector(
    (state: RootState) => state.interviewer.interviewers,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (interviewers === undefined) {
      dispatch(getInterviewers({ size: 2, page: 0, sort: 'email,ASC' }))
    }
  }, [interviewers])

  const handleDeleteButtonClick = (interviewer: Interviewer) => {
    setShowDeleteModal(true)
    setInterviewerToDelete(interviewer)
  }

  const handleDeleteInterviewer = () => {
    dispatch(deleteInterviewer(interviewerToDelete?.id!)).then(() =>
      setShowDeleteModal(false),
    )
    // .then(dispatch(getInterviewers()))
  }

  const handleUpdateInterviewer = (interviewer: Interviewer) => {
    setUpdateModalOpen(true)
    setInterviewerToUpdate(interviewer)
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
                Interviewers list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all interviewers
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={() => setAddModalOpen(true)}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                Add an interviewer
              </Button>
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
              {interviewers?.map(
                ({ firstName, lastName, email, position }, index) => {
                  const isLast = index === interviewers.length - 1
                  const classes = isLast
                    ? 'p-4'
                    : 'p-4 border-b border-blue-gray-50'

                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {firstName + ' ' + lastName}
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
                          >
                            {email}
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
                            {position}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Edit">
                          <IconButton
                            variant="text"
                            onClick={() =>
                              handleUpdateInterviewer(interviewers[index])
                            }
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete">
                          <IconButton
                            variant="text"
                            onClick={() =>
                              handleDeleteButtonClick(interviewers[index])
                            }
                          >
                            <TrashIcon className="h-4 w-4" />
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
      {showDeleteModal && (
        <Modal
          title="Delete Interviewer"
          size="xl"
          submitButtonLabel="Cancel"
          submitButtonAction={() => setShowDeleteModal(false)}
          cancelButtonLabel="Delete"
          cancelButtonAction={() => handleDeleteInterviewer()}
        >
          Are you sure you want to delete {interviewerToDelete?.firstName} from
          the interviewers' list?
        </Modal>
      )}
      {addModalOpen && (
        <InterviewerModal
          closeModal={() => setAddModalOpen(false)}
          size="lg"
          isEdit={false}
        />
      )}
      {updateModalOpen && (
        <InterviewerModal
          closeModal={() => setUpdateModalOpen(false)}
          size="lg"
          isEdit={true}
          interviewer={interviewerToUpdate}
        />
      )}
    </>
  )
}
export default Interviewers
