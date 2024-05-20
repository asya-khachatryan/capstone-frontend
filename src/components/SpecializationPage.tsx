import NavigationBar from '@components/Navbar'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
  UserPlusIcon,
} from '@heroicons/react/24/solid'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from '@material-tailwind/react'
import { Specialization, getSpecializations } from '@redux/specializationSlice'
import {
  PageableRequest,
  PageableResponse,
  SortCol,
  sortColToString,
  stringToSortCol,
} from '@services/types'
import { useCallback, useEffect, useState } from 'react'
import { RootState } from 'store'
import SpecializationModal from './SpecializationModal'

const TABLE_HEAD = new Map<string, string>([
  ['specializationName', 'Specialization'],
  ['active', 'Status'],
  ['_actions', 'Actions'],
])

const SpecializationPage: React.FC = () => {
  const dispatch = useAppDispatch()

  const [addModalOpen, setAddModalOpen] = useState(false)
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [specializationToUpdate, setSpecializationToUpdate] =
    useState<Specialization>()

  const specPage: PageableResponse<Specialization> | undefined = useAppSelector(
    (state: RootState) => state.specialization.specPageable,
  )
  const specPageableRequest: PageableRequest | undefined = useAppSelector(
    (state: RootState) => state.specialization.specPageableRequest,
  )

  const [sortCol, setSortCol] = useState<SortCol | null>(
    stringToSortCol(specPageableRequest?.sort ?? null),
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

  const specializations: Specialization[] | undefined = useAppSelector(
    (state: RootState) => state.specialization.specPageable?.content,
  )

  const [page, setPage] = useState(specPageableRequest.page)

  useEffect(() => {
    dispatch(
      getSpecializations({
        size: specPageableRequest.size,
        page: page,
        sort: sortColToString(sortCol),
      }),
    )
  }, [sortCol, page])

  const handleUpdateSpecialization = (specialization: Specialization) => {
    setUpdateModalOpen(true)
    setSpecializationToUpdate(specialization)
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
                Specializations list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all specializations
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={() => setAddModalOpen(true)}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                Add a specialization
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
              {specializations?.map(
                ({ specializationName: specialization, active }, index) => {
                  const isLast = index === specializations.length - 1
                  const classes = isLast
                    ? 'p-4'
                    : 'p-4 border-b border-blue-gray-50'

                  return (
                    <tr key={specialization}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {specialization}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={active ? 'Active' : 'Inactive'}
                            color={active ? 'green' : 'red'}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Edit">
                          <IconButton
                            variant="text"
                            onClick={() =>
                              handleUpdateSpecialization(specializations[index])
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
            Page {(specPage?.number ?? 0) + 1} of {specPage?.totalPages}
          </Typography>
          <div className="flex gap-2">
            {!specPage?.first && (
              <Button
                onClick={() => setPage(page - 1)}
                variant="outlined"
                size="sm"
                placeholder={undefined}
              >
                Previous
              </Button>
            )}

            {!specPage?.last && (
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
      {addModalOpen && (
        <SpecializationModal
          closeModal={() => setAddModalOpen(false)}
          size="lg"
          isEdit={false}
        />
      )}
      {updateModalOpen && (
        <SpecializationModal
          closeModal={() => setUpdateModalOpen(false)}
          size="lg"
          isEdit={true}
          specialization={specializationToUpdate}
        />
      )}
    </>
  )
}
export default SpecializationPage
