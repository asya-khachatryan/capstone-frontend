import {
  Avatar,
  Button,
  Card,
  CardBody,
  Input,
  Typography
} from "@material-tailwind/react";

export function Profile() {
  return (
    <>
      <div className="relative mt-8 h-48 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="avatar.png"
                alt="bruce-mars"
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  Richard Davis
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  CEO / Co-Founder
                </Typography>
              </div>
            </div>
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
                        className: "hidden",
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
                        className: "hidden",
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
                      Email
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="emma@mail.com"
                      labelProps={{
                        className: "hidden",
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
                        className: "hidden",
                      }}
                      className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mb-2">
                <Button variant="outlined" size="sm" placeholder={undefined}>
                  Edit
                </Button>
                <Button size="sm" placeholder={undefined} color="black">
                  Save
                </Button>
              </div>
            </section>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;