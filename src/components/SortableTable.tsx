import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Input,
  Tab,
  Tabs,
  TabsHeader,
  Typography,
} from '@material-tailwind/react'
import {
  TalentResponseDTO,
  searchInterviewees,
  searchTalents,
} from '@redux/talentSlice'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageableResponse } from 'services/types'
import { RootState } from '../store'
import ApplicationTabContent from './ApplicationTabContent'
import InterviewTabContent from './InterviewTabContent'
import NavigationBar from './Navbar'
import OnboardingTabContent from './OnboardingTabContent'

const tabs: { name: string; content: React.ReactNode }[] = [
  { name: 'Application', content: <ApplicationTabContent /> },
  { name: 'Interview', content: <InterviewTabContent /> },
  { name: 'Onboarding', content: <OnboardingTabContent /> },
]

const SortableTable: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  const talentsPageable: PageableResponse<TalentResponseDTO> | undefined =
    useAppSelector((state: RootState) => state.talent.talentsPageable)

  const handlePrevious = () => {}

  const handleNext = () => {}

  return (
    <>
      <NavigationBar />
      <br></br>
      <Card className="h-full w-full" placeholder={undefined}>
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none"
          placeholder={undefined}
        >
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography
                variant="h5"
                color="blue-gray"
                placeholder={undefined}
              >
                Members list
              </Typography>
              <Typography
                color="gray"
                className="mt-1 font-normal"
                placeholder={undefined}
              >
                See information about all members
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value={activeTab} className="w-full md:w-max">
              <TabsHeader placeholder={undefined}>
                {tabs.map(({ name }, index) => (
                  <Tab
                    key={name}
                    value={name}
                    placeholder={undefined}
                    onClick={() => handleTabClick(index)}
                    className={index === activeTab ? 'active' : ''}
                  >
                    &nbsp;&nbsp;{name}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                crossOrigin={undefined}
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={(e) => {
                  if (activeTab === 0) {
                    dispatch(searchTalents(e.target.value))
                  } else if (activeTab === 1) {
                    dispatch(searchInterviewees(e.target.value))
                  }
                }}
              />
            </div>
          </div>
        </CardHeader>

        <div className="tab-content overflow-visible">
          {tabs[activeTab].content}
        </div>

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
            Page {(talentsPageable?.number ?? 0) + 1} of{' '}
            {talentsPageable?.totalPages}
          </Typography>
          <div className="flex gap-2">
            {!talentsPageable?.first && (
              <Button variant="outlined" size="sm" placeholder={undefined}>
                Previous
              </Button>
            )}

            {!talentsPageable?.last && (
              <Button variant="outlined" size="sm" placeholder={undefined}>
                Next
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

export default SortableTable
