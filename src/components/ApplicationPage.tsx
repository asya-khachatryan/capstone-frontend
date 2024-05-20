import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import {
  Avatar,
  Button,
  CardBody,
  CardFooter,
  Chip,
  Typography,
} from '@material-tailwind/react'
import {
  Talent,
  TalentCreationRequest,
  getTalentCV,
  getTalentsPageable,
  talentStatusMap,
  updateTalentStatus,
} from '@redux/talentSlice'
import dayjs from 'dayjs'
import { useCallback, useEffect, useState } from 'react'
import {
  PageableRequest,
  PageableResponse,
  SortCol,
  sortColToString,
  stringToSortCol,
} from '@services/types'
import { RootState } from '../store'
import Modal from './Modal'
import ScheduleInterviewModal from './ScheduleInterviewModal'

const ApplicationPage: React.FC = () => {
  const TABLE_HEAD = new Map<string, string>([
    ['name', 'Talent'],
    ['specialization_id', 'Specialization'],
    ['talentStatus', 'Status'],
    ['dateApplied', 'Date Applied'],
    ['_cv', 'CV'],
    ['_actions', 'Actions'],
  ])

  const talentsPageableRequest: PageableRequest | undefined = useAppSelector(
    (state: RootState) => state.talent.talentsPageableRequest,
  )

  const talentsPage: PageableResponse<Talent> | undefined = useAppSelector(
    (state: RootState) => state.talent.talentsPageable,
  )

  const [sortCol, setSortCol] = useState<SortCol | null>(
    stringToSortCol(talentsPageableRequest?.sort ?? null),
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

  const dispatch = useAppDispatch()
  const talents: Talent[] | undefined = useAppSelector(
    (state: RootState) => state.talent.talents,
  )

  const [page, setPage] = useState(talentsPageableRequest.page)

  useEffect(() => {
    dispatch(
      getTalentsPageable({
        size: talentsPageableRequest.size,
        page: page,
        sort: sortColToString(sortCol),
      }),
    )
  }, [sortCol, page])

  const [modalOpen, setModalOpen] = useState(false)

  const [url, setUrl] = useState('')

  const dispatchAndSet = (id: number) => {
    dispatch(getTalentCV(id))
      .unwrap()
      .then((a) => setUrl(a))
      .catch((a) => console.log(a))
    setModalOpen(true)
  }

  const [inviteToInterview, setInviteToInterview] = useState(false)
  const [talentToInvite, setTalentToInvite] = useState<Talent>()

  const handleInviteToInterviewButtonClick = (talent: Talent) => {
    setInviteToInterview(true)
    setTalentToInvite(talent)
  }

  const [showRejectModal, setShowRejectModal] = useState(false)
  const [talentToReject, setTalentToReject] = useState<Talent>()

  const handleRejectButtonClick = (talent: Talent) => {
    setShowRejectModal(true)
    setTalentToReject(talent)
  }

  const handleRejectTalent = useCallback(() => {
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
  }, [talentToReject, updateTalentStatus])

  return (
    <>
      <CardBody className="overflow-scroll px-0" placeholder={undefined}>
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
                    onClick={isSortable ? () => selectSortCol(key) : undefined}
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
                        <ChevronDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {talents?.map(
              (
                {
                  id,
                  name,
                  surname,
                  email,
                  phoneNumber,
                  specialization,
                  status,
                  dateApplied,
                },
                index,
              ) => {
                const isLast = index === talents.length - 1
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50'

                return (
                  <tr key={name + ' ' + surname}>
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
                          value={talentStatusMap.get(status)}
                          color={status === 'REJECTED' ? 'red' : 'blue-gray'}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={undefined}
                        >
                          {dayjs(dateApplied).format('YYYY-MM-DD HH:mm:ss')}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={undefined}
                      >
                        <Button
                          variant="outlined"
                          size="sm"
                          placeholder={undefined}
                          onClick={() => dispatchAndSet(id)}
                        >
                          view cv
                        </Button>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex gap-2 mb-2">
                        {status !== 'REJECTED' ? (
                          <>
                            <Button
                              variant="filled"
                              color="green"
                              size="sm"
                              placeholder={undefined}
                              onClick={() =>
                                handleInviteToInterviewButtonClick(
                                  talents[index],
                                )
                              }
                            >
                              Invite to interview
                            </Button>
                            <Button
                              variant="filled"
                              size="sm"
                              color="red"
                              placeholder={undefined}
                              onClick={() =>
                                handleRejectButtonClick(talents[index])
                              }
                            >
                              Reject
                            </Button>
                          </>
                        ) : (
                          <>No applicable actions</>
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
          Page {(talentsPage?.number ?? 0) + 1} of {talentsPage?.totalPages}
        </Typography>
        <div className="flex gap-2">
          {!talentsPage?.first && (
            <Button
              onClick={() => setPage(page - 1)}
              variant="outlined"
              size="sm"
              placeholder={undefined}
            >
              Previous
            </Button>
          )}

          {!talentsPage?.last && (
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
      {modalOpen && (
        <Modal
          title="Applicant CV"
          submitButtonAction={() => setModalOpen(false)}
          size="xl"
          submitButtonLabel="OK"
        >
          <div>
            <iframe src={url} width="100%" height="500px" />
          </div>
        </Modal>
      )}
      {inviteToInterview && (
        <ScheduleInterviewModal
          closeModal={() => setInviteToInterview(false)}
          size="lg"
          isEdit={false}
          talent={talentToInvite!}
        />
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
    </>
  )
}

export default ApplicationPage
