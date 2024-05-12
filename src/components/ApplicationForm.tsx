import { BriefcaseIcon } from '@heroicons/react/24/solid'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Option,
  Select,
  TabPanel,
  Tabs,
  TabsBody,
  Typography,
} from '@material-tailwind/react'
import { Specialization, getSpecializations } from '@redux/specializationSlice'
import { TalentRequestDTO, submitApplication } from '@redux/talentSlice'
import React, { useEffect, useState } from 'react'
import { RootState } from '../store'

const ApplicationForm: React.FC = () => {
  const dispatch = useAppDispatch()

  const specializations: Specialization[] | undefined = useAppSelector(
    (state: RootState) => state.specialization.specializations,
  )

  useEffect(() => {
    if (specializations === undefined) {
      dispatch(getSpecializations())
    }
  }, [specializations])

  const [modalOpen, setModalOpen] = useState(false)

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [specializationId, setSpecializationId] = useState(0)
  const [cv, setCv] = useState<File>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const talent: TalentRequestDTO = {
      name,
      surname,
      email,
      phoneNumber,
      specializationId,
    }

    if (!cv) {
      console.error('No file selected')
      return
    }
    const file = new FormData()
    file.append('file', cv)

    dispatch(submitApplication({ talent, file }))

    setName('')
    setSurname('')
    setEmail('')
    setPhoneNumber('')
    setSpecializationId(0)
    setCv(undefined)

    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const isDisabled = false

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[url('/background.jpg')]">
        <Card className="w-full max-w-[36rem]" placeholder={undefined}>
          <CardHeader
            color="gray"
            floated={false}
            shadow={false}
            className="m-0 grid place-items-center px-4 py-4 text-center"
            placeholder={undefined}
          >
            <div className="mb-4 h-10 p-4 text-white">
              <BriefcaseIcon className="h-10 w-10 text-white" />
            </div>
            <Typography variant="h5" color="white" placeholder={undefined}>
              Apply
            </Typography>
          </CardHeader>
          <CardBody placeholder={undefined}>
            <Tabs value="card" className="overflow-visible">
              <TabsBody
                className="!overflow-x-hidden !overflow-y-visible"
                placeholder={undefined}
              >
                <TabPanel value="card" className="p-0">
                  <form
                    className="mt-2 flex flex-col gap-4"
                    onSubmit={handleSubmit}
                  >
                    <div className="my-6 space-y-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                        placeholder={undefined}
                      >
                        Name
                      </Typography>
                      <Input
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        required
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: 'before:content-none after:content-none',
                        }}
                        crossOrigin={undefined}
                      />
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                        placeholder={undefined}
                      >
                        Surname
                      </Typography>
                      <Input
                        type="text"
                        placeholder="Surname"
                        onChange={(e) => setSurname(e.target.value)}
                        required
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: 'before:content-none after:content-none',
                        }}
                        crossOrigin={undefined}
                      />
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                        placeholder={undefined}
                      >
                        Email
                      </Typography>
                      <Input
                        type="email"
                        placeholder="example@email.com"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: 'before:content-none after:content-none',
                        }}
                        crossOrigin={undefined}
                      />
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                        placeholder={undefined}
                      >
                        Phone number
                      </Typography>
                      <Input
                        type="tel"
                        placeholder="123456789"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: 'before:content-none after:content-none',
                        }}
                        crossOrigin={undefined}
                      />
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                        placeholder={undefined}
                      >
                        Position
                      </Typography>
                      <Select
                        color="blue"
                        variant="outlined"
                        onChange={(e) => setSpecializationId(Number(e))}
                        placeholder={undefined}
                      >
                        {specializations === undefined ? (
                          <Option disabled>
                            No positions are available at this time
                          </Option>
                        ) : (
                          specializations?.map((item) => (
                            <Option
                              key={item.id.toString()}
                              value={item.id.toString()}
                            >
                              {item.specialization}
                            </Option>
                          ))
                        )}
                      </Select>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                        placeholder={undefined}
                      >
                        CV
                      </Typography>
                      <Input
                        type="file"
                        id="cv"
                        name="cv"
                        accept=".pdf,.doc,.docx"
                        required
                        onChange={(e) => {
                          const file = e.target.files ? e.target.files[0] : null
                          if (file) {
                            setCv(file)
                          }
                        }}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: 'before:content-none after:content-none',
                        }}
                        crossOrigin={undefined}
                      />
                    </div>
                    <Button size="lg" type="submit" placeholder={undefined}>
                      Submit application
                    </Button>
                  </form>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </>
  )
}
export default ApplicationForm
