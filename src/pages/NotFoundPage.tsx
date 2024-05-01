import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen mx-auto grid place-items-center text-center px-8">
      <div>
        <img className="w-60 mx-auto"
          src="public/mike_wazowski.png"
          alt="not found image" />
        <Typography
          variant="h1"
          color="blue-gray"
          className="mt-10 !text-3xl !leading-snug md:!text-4xl"
          placeholder={undefined}
        >
          Oops! <br /> 404 - Page not found
        </Typography>
        <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm" placeholder={undefined}>
          You didn't break the internet, but we can't find what you're looking for.
        </Typography>
        <Button color="gray" className="w-full px-4 md:w-[8rem]" placeholder={undefined} onClick={() => navigate('/apply')}>
          back to apply
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;