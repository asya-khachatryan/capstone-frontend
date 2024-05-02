import {
  ChevronUpDownIcon
} from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import {
  Avatar,
  Button,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
  Typography
} from "@material-tailwind/react";
import { TalentResponseDTO, getTalentCV, getTalents } from '@redux/talentSlice';
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { RootState } from '../store';
import Modal from "./Modal";



const ApplicationTabContent: React.FC = () => {
  const TABLE_HEAD = ["Member", "Specialization", "CV", "Status", "Date Applied", ""];

  const dispatch = useAppDispatch();
  const talents: TalentResponseDTO[] = useAppSelector((state: RootState) => state.talent.talents);

  useEffect(() => {
    if (talents.length === 0) {
      dispatch(getTalents())
      console.log(talents)
    }
    console.log(talents)
  }, [talents])

  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const cvURL: string = useAppSelector((state: RootState) => state.talent.cvURL);

  const dispatchAndSet = (id: number) => {
    dispatch(getTalentCV(id))
    setModalOpen(true)
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
                  {head}{" "}
                  {index !== TABLE_HEAD.length - 1 && (
                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                  )}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {talents.map(
            ({ id, name, surname, email, phoneNumber, specialization, status, dateApplied }, index) => {
              const isLast = index === talents.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={name + " " + surname}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar src="public/avatar.png" alt={name} size="sm" placeholder={undefined} />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={undefined}
                        >
                          {name + " " + surname}
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
                        {specialization.specialization}
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
                      <Button variant="outlined" size="sm" placeholder={undefined}
                        onClick={() => dispatchAndSet(id)}>
                        view cv
                      </Button>
                      {modalOpen &&
                        createPortal(
                          <Modal
                            closeModal={handleCloseModal}
                            size="xl"
                          >
                            <div>
                              <iframe src="public/avatar.png" width="100%" height="500px" />
                            </div>
                          </Modal>,
                          document.body
                        )}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={status}
                        color={status === "REJECTED" ? "red" : "blue-gray"}
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
                        {dateApplied}
                      </Typography>
                    </div>
                  </td>

                  <td className={classes}>
                    <Tooltip content="Edit User">
                      <IconButton variant="text" placeholder={undefined}>
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
    </CardBody>
  );
}

export default ApplicationTabContent;