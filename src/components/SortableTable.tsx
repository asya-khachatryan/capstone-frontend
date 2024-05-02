import {
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import { useAppDispatch } from '@hooks/redux';
import {
  Avatar,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Input,
  Tab,
  Tabs,
  TabsHeader,
  Typography
} from "@material-tailwind/react";
import { searchTalents } from '@redux/talentSlice';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationTabContent from "./ApplicationTabContent";
import InterviewTabContent from "./InterviewTabContent";
import OnboardingTabContent from "./OnboardingTabContent";

const tabs: { name: string, content: React.ReactNode }[] = [
  { name: 'Application', content: <ApplicationTabContent /> },
  { name: 'Interview', content: <InterviewTabContent /> },
  { name: 'Onboarding', content: <OnboardingTabContent /> },
];

const SortableTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <Card className="h-full w-full" placeholder={undefined}>
      <CardHeader floated={false} shadow={false} className="rounded-none" placeholder={undefined}>
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray" placeholder={undefined}>
              Members list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal" placeholder={undefined}>
              See information about all members
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {/* <ProfileDropDown /> */}
            <Avatar src="public/avatar.png" alt="avatar" placeholder={undefined} onClick={() => navigate("/profile")} />

          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value={activeTab} className="w-full md:w-max">
            <TabsHeader placeholder={undefined}>
              {tabs.map(({ name }, index) => (
                <Tab key={name}
                  value={name}
                  placeholder={undefined}
                  onClick={() => handleTabClick(index)}
                  className={index === activeTab ? 'active' : ''}>
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
              onChange={(e) => console.log(dispatch(searchTalents(e.target.value)))
              }
            />
          </div>
        </div>
      </CardHeader>

      <div className="tab-content overflow-visible" >{tabs[activeTab].content}</div>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" placeholder={undefined}>
        <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined}>
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm" placeholder={undefined}>
            Previous
          </Button>
          <Button variant="outlined" size="sm" placeholder={undefined}>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default SortableTable;

