import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { TalentRequestDTO, TalentResponseDTO, getTalents, searchTalents } from '@redux/talentSlice';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useEffect, useState } from "react";
import { RootState } from '../store';
import Modal from "./Modal";
import { createPortal } from "react-dom";
import React from "react";
import ApplicationTabContent from "./ApplicationTabContent";
import InterviewTabContent from "./InterviewTabContent";
import OnboardingTabContent from "./OnboardingTabContent";
import ProfileDropDown from "./ProfileDropdown";

const tabs: { name: string, content: React.ReactNode }[] = [
  { name: 'Application', content: <ApplicationTabContent /> },
  { name: 'Interview', content: <InterviewTabContent /> },
  { name: 'Onboarding', content: <OnboardingTabContent /> },
];

const SortableTable: React.FC = () => {
  const dispatch = useAppDispatch();

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
            <Avatar src="public/avatar.png" alt="avatar" placeholder={undefined} />

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

