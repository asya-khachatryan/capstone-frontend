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
import React, { useEffect } from 'react'
import { RootState } from '../store'

const Form: React.FC = () => {
  const dispatch = useAppDispatch()

  const specializations: Specialization[] | undefined = useAppSelector(
    (state: RootState) => state.specialization.specializations,
  )

  useEffect(() => {
    console.log('fetvhing')
    if (specializations === undefined) {
      dispatch(getSpecializations())
    }
  }, [specializations])
  //bg-gradient-to-r from-cyan-500 to-blue-500 pt-2 pb-2

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
                  <form className="mt-2 flex flex-col gap-4">
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
                        type="email"
                        placeholder="name@mail.com"
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
                        type="email"
                        placeholder="name@mail.com"
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
                        placeholder="name@mail.com"
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
                        type="email"
                        placeholder="name@mail.com"
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
                      {/* <Select
                                            color="blue"
                                            variant="outlined" placeholder={undefined}                                        >
                                            {specializations?.map(item => (
                                                <Option key={item.id.toString()}>
                                                    {item.specialization}
                                                </Option>
                                            ))}
                                            {specializations === undefined && (
                                                <Option disabled>No positions are available at this time</Option>
                                            )}
                                        </Select> */}
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
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: 'before:content-none after:content-none',
                        }}
                        crossOrigin={undefined}
                      />
                    </div>
                    <Button size="lg" placeholder={undefined}>
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
export default Form
