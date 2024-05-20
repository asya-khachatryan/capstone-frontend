import NavigationBar from '@components/Navbar'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
} from '@heroicons/react/24/solid'
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
import {
  PageableRequest,
  PageableResponse,
  SortCol,
  sortColToString,
  stringToSortCol,
} from '@services/types'
import { useCallback, useEffect, useState } from 'react'
import { RootState } from 'store'
import InterviewerModal from './InterviewerModal'
import Modal from './Modal'

const TABLE_HEAD = new Map<string, string>([
  ['firstName', 'Interviewer'],
  ['email', 'Email'],
  ['position', 'Position'],
  ['_actions', 'Actions'],
])

const Interviewers: React.FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [interviewerToDelete, setInterviewerToDelete] = useState<Interviewer>()
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [interviewerToUpdate, setInterviewerToUpdate] = useState<Interviewer>()

  const dispatch = useAppDispatch()

  const interviewerPage: PageableResponse<Interviewer> | undefined =
    useAppSelector((state: RootState) => state.interviewer.interviewersPageable)
  const interviewerPageableRequest: PageableRequest | undefined =
    useAppSelector(
      (state: RootState) => state.interviewer.interviewerPageableRequest,
    )

  const [sortCol, setSortCol] = useState<SortCol | null>(
    stringToSortCol(interviewerPageableRequest?.sort ?? null),
  )

  const selectSortCol = useCallback(
    (colName: string) => {
      if (sortCol?.name === colName) {
        setSortCol({ name: colName, directionAsc: !sortCol.directionAsc })
      } else {
        setSortCol({ name: colName, directionAsc: true })
      }
    },
    [sortCol, setSortCol],
  )

  const interviewers: Interviewer[] | undefined = useAppSelector(
    (state: RootState) => state.interviewer.interviewersPageable?.content,
  )

  const [page, setPage] = useState(interviewerPageableRequest.page)

  useEffect(() => {
    dispatch(
      getInterviewers({
        size: interviewerPageableRequest.size,
        page: page,
        sort: sortColToString(sortCol),
      }),
    )
  }, [sortCol, page])

  const handleDeleteButtonClick = (interviewer: Interviewer) => {
    setShowDeleteModal(true)
    setInterviewerToDelete(interviewer)
  }

  const handleDeleteInterviewer = () => {
    dispatch(deleteInterviewer(interviewerToDelete?.id!))
      .then(() => setShowDeleteModal(false))
      .then(() => dispatch(getInterviewers(interviewerPageableRequest)))
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
                {Array.from(TABLE_HEAD).map(([key, value]) => {
                  let isSortable = !key.startsWith('_')
                  let ascSort =
                    sortCol != null &&
                    key === sortCol.name &&
                    sortCol.directionAsc
                  return (
                    <th
                      key={key}
                      className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                      onClick={
                        isSortable ? () => selectSortCol(key) : undefined
                      }
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                        placeholder={undefined}
                      >
                        {value}{' '}
                        {isSortable && ascSort && (
                          <ChevronUpIcon strokeWidth={2} className="h-4 w-4" />
                        )}
                        {isSortable && !ascSort && (
                          <ChevronDownIcon
                            strokeWidth={2}
                            className="h-4 w-4"
                          />
                        )}
                      </Typography>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {interviewers?.map(
                ({ id, firstName, lastName, email, position }, index) => {
                  const isLast = index === interviewers.length - 1
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
        <CardFooter
          className="flex items-center justify-between border-t border-blue-gray-50 p-4"
          placeholder={undefined}
        >
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal"
            placeholder={undefined}
          >
            Page {(interviewerPage?.number ?? 0) + 1} of{' '}
            {interviewerPage?.totalPages}
          </Typography>
          <div className="flex gap-2">
            {!interviewerPage?.first && (
              <Button
                onClick={() => setPage(page - 1)}
                variant="outlined"
                size="sm"
                placeholder={undefined}
              >
                Previous
              </Button>
            )}

            {!interviewerPage?.last && (
              <Button
                onClick={() => setPage(page + 1)}
                variant="outlined"
                size="sm"
                placeholder={undefined}
              >
                Next
              </Button>
            )}
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
