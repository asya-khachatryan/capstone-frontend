import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
} from '@heroicons/react/24/solid'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import {
  Avatar,
  Button,
  CardBody,
  CardFooter,
  Chip,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from '@material-tailwind/react'
import {
  Mentee,
  getMentees,
  sendOnboardingDocument,
} from '@redux/onboardingSlice'
import {
  PageableRequest,
  PageableResponse,
  SortCol,
  sortColToString,
  stringToSortCol,
} from '@services/types'
import { useCallback, useEffect, useState } from 'react'
import { RootState } from '../store'
import Modal from './Modal'

const OnboardingPage: React.FC = () => {
  const TABLE_HEAD = new Map<string, string>([
    ['firstName', 'Talent'],
    ['specialization_id', 'Specialization'],
    ['onboardingDocumentSent', 'Required Documents'],
    ['_actions', 'Actions'],
  ])

  const dispatch = useAppDispatch()
  const menteesPage: PageableResponse<Mentee> | undefined = useAppSelector(
    (state: RootState) => state.onboarding.menteesPageable,
  )
  const menteesPageableRequest: PageableRequest | undefined = useAppSelector(
    (state: RootState) => state.talent.talentsPageableRequest,
  )

  const [sortCol, setSortCol] = useState<SortCol | null>(
    stringToSortCol(menteesPageableRequest?.sort ?? null),
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

  const mentees: Mentee[] | undefined = useAppSelector(
    (state: RootState) => state.onboarding.mentees,
  )

  const [page, setPage] = useState(menteesPageableRequest.page)

  useEffect(() => {
    dispatch(
      getMentees({
        size: menteesPageableRequest.size,
        page: page,
        sort: sortColToString(sortCol),
      }),
    )
  }, [sortCol, page])

  const [menteeId, setMenteeId] = useState<number>()
  const [documentURL, setDocumentURL] = useState<string>()

  const handleDocumentSend = () => {
    dispatch(
      sendOnboardingDocument({ id: menteeId!, documentURL: documentURL! }),
    )
      .then(() => {
        setModalOpen(false)
        setMenteeId(undefined)
        setDocumentURL(undefined)
      })
      .then(() => dispatch(getMentees(menteesPageableRequest)))
  }

  const [modalOpen, setModalOpen] = useState(false)

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
            {mentees?.map(
              (
                {
                  id,
                  firstName,
                  lastName,
                  email,
                  phoneNumber,
                  onboardingDocumentSent,
                  specialization,
                },
                index,
              ) => {
                const isLast = index === mentees.length - 1
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50'

                return (
                  <tr key={firstName + ' ' + lastName}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src="public/avatar.png"
                          alt={firstName}
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
                            {firstName + ' ' + lastName}
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
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {onboardingDocumentSent ? (
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value="Sent"
                              color="green"
                            />
                          </div>
                        ) : (
                          <Button
                            variant="outlined"
                            size="sm"
                            onClick={() => {
                              setMenteeId(id)
                              setModalOpen(true)
                            }}
                          >
                            Send
                          </Button>
                        )}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton variant="text" placeholder={undefined}>
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
          Page {(menteesPage?.number ?? 0) + 1} of {menteesPage?.totalPages}
        </Typography>
        <div className="flex gap-2">
          {!menteesPage?.first && (
            <Button
              onClick={() => setPage(page - 1)}
              variant="outlined"
              size="sm"
              placeholder={undefined}
            >
              Previous
            </Button>
          )}

          {!menteesPage?.last && (
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
          title="Send onboarding document"
          cancelButtonLabel="Cancel"
          cancelButtonAction={() => setModalOpen(false)}
          submitButtonLabel="Send"
          submitButtonAction={() => handleDocumentSend()}
          children={
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Document URL
              </Typography>
              <Input
                size="lg"
                onChange={(e) => setDocumentURL(e.target.value)}
                labelProps={{
                  className: 'hidden',
                }}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
            </div>
          }
          size="md"
        />
      )}
    </>
  )
}

export default OnboardingPage
