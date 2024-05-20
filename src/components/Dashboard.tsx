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
import { Talent, searchInterviewees, searchTalents } from '@redux/talentSlice'
import React, { useState } from 'react'
import { PageableRequest, PageableResponse } from 'services/types'
import { RootState } from '../store'
import ApplicationPage from './ApplicationPage'
import InterviewPage from './InterviewPage'
import NavigationBar from './Navbar'
import OnboardingPage from './OnboardingPage'
import { searchMentees } from '@redux/onboardingSlice'

const tabs: { name: string; content: React.ReactNode }[] = [
  { name: 'Application', content: <ApplicationPage /> },
  { name: 'Interview', content: <InterviewPage /> },
  { name: 'Onboarding', content: <OnboardingPage /> },
]

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch()

  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  const talentsPageable: PageableResponse<Talent> | undefined = useAppSelector(
    (state: RootState) => state.talent.talentsPageable,
  )
  const talentsPageableRequest: PageableRequest | undefined = useAppSelector(
    (state: RootState) => state.talent.talentsPageableRequest,
  )

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
                  } else if (activeTab === 2) {
                    dispatch(searchMentees(e.target.value))
                  }
                }}
              />
            </div>
          </div>
        </CardHeader>

        <div className="tab-content overflow-visible">
          {tabs[activeTab].content}
        </div>
      </Card>
    </>
  )
}

export default Dashboard
