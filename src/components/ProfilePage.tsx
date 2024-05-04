import { Input, Option, Select, Typography } from '@material-tailwind/react'

function ProfilePage() {
  return (
    <section className="px-8 py-20 container mx-auto">
      <Typography variant="h5" color="blue-gray" placeholder={undefined}>
        Basic Information
      </Typography>
      <Typography
        variant="small"
        className="text-gray-600 font-normal mt-1"
        placeholder={undefined}
      >
        Update your profile information below.
      </Typography>
      <div className="flex flex-col mt-8">
        <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
              placeholder={undefined}
            >
              First Name
            </Typography>
            <Input
              size="lg"
              placeholder="Emma"
              labelProps={{
                className: 'hidden',
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Last Name
            </Typography>
            <Input
              size="lg"
              placeholder="Roberts"
              labelProps={{
                className: 'hidden',
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
        </div>
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              I&apos;m
            </Typography>
            <Select
              size="lg"
              labelProps={{
                className: 'hidden',
              }}
              className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
            >
              <Option>Male</Option>
              <Option>Female</Option>
            </Select>
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Day
            </Typography>
            <Select
              size="lg"
              labelProps={{
                className: 'hidden',
              }}
              className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
            >
              <Option>1</Option>
              <Option>2</Option>
              <Option>3</Option>
              <Option>4</Option>
              <Option>5</Option>
              <Option>6</Option>
              <Option>7</Option>
              <Option>8</Option>
              <Option>9</Option>
              <Option>10</Option>
              <Option>11</Option>
              <Option>12</Option>
              <Option>13</Option>
              <Option>14</Option>
              <Option>15</Option>
              <Option>16</Option>
              <Option>17</Option>
              <Option>18</Option>
              <Option>19</Option>
              <Option>20</Option>
              <Option>21</Option>
              <Option>22</Option>
              <Option>23</Option>
              <Option>24</Option>
              <Option>25</Option>
              <Option>26</Option>
              <Option>27</Option>
              <Option>28</Option>
              <Option>29</Option>
              <Option>30</Option>
            </Select>
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Year
            </Typography>
            <Select
              size="lg"
              labelProps={{
                className: 'hidden',
              }}
              className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
            >
              <Option>2022</Option>
              <Option>2021</Option>
              <Option>2020</Option>
            </Select>
          </div>
        </div>
        <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="emma@mail.com"
              labelProps={{
                className: 'hidden',
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Confirm Email
            </Typography>
            <Input
              size="lg"
              placeholder="emma@mail.com"
              labelProps={{
                className: 'hidden',
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
        </div>
        <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Location
            </Typography>
            <Input
              size="lg"
              placeholder="Florida, USA"
              labelProps={{
                className: 'hidden',
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Phone Number
            </Typography>
            <Input
              size="lg"
              placeholder="+123 0123 456 789"
              labelProps={{
                className: 'hidden',
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
        </div>
        <div className="flex flex-col items-end gap-4 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Language
            </Typography>
            <Input
              size="lg"
              placeholder="Language"
              labelProps={{
                className: 'hidden',
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Skills
            </Typography>
            <Input
              size="lg"
              placeholder="Skills"
              labelProps={{
                className: 'hidden',
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
