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
import { Talent, getInterviewees } from '@redux/talentSlice'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { RootState } from '../store'
import Modal from './Modal'

const InterviewTabContent: React.FC = () => {
  const TABLE_HEAD = [
    'Talent',
    'Specialization',
    'Interviewer list',
    'Status',
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

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
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
              { name, surname, email, phoneNumber, specialization, status },
              index,
            ) => {
              const isLast = index === interviewwes.length - 1
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
                        value={status}
                        color={status === 'REJECTED' ? 'red' : 'blue-gray'}
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                    >
                      <div className="flex gap-2 mb-2">
                        <Button
                          variant="outlined"
                          size="sm"
                          placeholder={undefined}
                          onClick={() => setModalOpen(true)}
                          color="red"
                        >
                          Reject
                        </Button>
                        <Button
                          variant="outlined"
                          size="sm"
                          placeholder={undefined}
                          onClick={() => setModalOpen(true)}
                        >
                          view cv
                        </Button>
                      </div>
                      {modalOpen &&
                        createPortal(
                          <Modal closeModal={handleCloseModal} size="xl">
                            <div>
                              <iframe
                                src="public/CV - Asya Khachatryan.pdf"
                                width="100%"
                                height="500px"
                              />
                            </div>
                          </Modal>,
                          document.body,
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
      <script src="node_modules/@material-tailwind/html@latest/scripts/dialog.js"></script>
    </CardBody>
  )
}
;<script src="node_modules/@material-tailwind/html@latest/scripts/dialog.js"></script>

export default InterviewTabContent
