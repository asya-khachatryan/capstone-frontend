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
import { TalentCreationRequest, submitApplication } from '@redux/talentSlice'
import React, { useEffect, useState } from 'react'
import { RootState } from '../store'
import Modal from './Modal'

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

  const [submitTried, setSubmitTried] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitTried(true)
    e.preventDefault()

    if (
      name === '' ||
      surname === '' ||
      email === '' ||
      phoneNumber === '' ||
      specializationId === 0 ||
      cv === undefined
    ) {
      return
    }

    const talent: TalentCreationRequest = {
      name,
      surname,
      email,
      phoneNumber,
      specializationId,
    }

    const file = new FormData()
    file.append('file', cv)

    dispatch(submitApplication({ talent, file })).then(() => {
      setName('')
      setSurname('')
      setEmail('')
      setPhoneNumber('')
      setSpecializationId(0)
      setCv(undefined)
      setModalOpen(true)
      setSubmitTried(false)
    })
  }

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
              Apply to Talent Journey
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={submitTried && name === ''}
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
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        error={submitTried && surname === ''}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={submitTried && email === ''}
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
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        error={submitTried && phoneNumber === ''}
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
                        value=""
                        // label="position"
                        onChange={(e) => setSpecializationId(Number(e))}
                        placeholder={undefined}
                        error={submitTried && specializationId === 0}
                      >
                        {specializations === undefined ? (
                          <Option disabled>
                            No positions are available at this time
                          </Option>
                        ) : (
                          specializations?.map((item) => (
                            <Option
                              key={item.id?.toString()}
                              value={item.id?.toString()}
                            >
                              {item.specializationName}
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
                        error={submitTried && cv === undefined}
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
      {modalOpen && (
        <Modal
          title="Application Received"
          size="lg"
          submitButtonLabel="OK"
          submitButtonAction={() => {
            setModalOpen(false)
            setName('')
            setSurname('')
            setEmail('')
            setPhoneNumber('')
            setSpecializationId(0)
            setCv(undefined)
          }}
        >
          Thank you for applying to Talent Journey. Your application has been
          successfully received, you will now receive{' '}
          <b> a confirmation email</b>.<br></br>
          <br></br>
          We appreciate your interest in joining our team. Our hiring team will
          carefully review your application materials. If your qualifications
          align with the requirements of the position, our recruiters will get
          in contact with you.
        </Modal>
      )}
    </>
  )
}
export default ApplicationForm
