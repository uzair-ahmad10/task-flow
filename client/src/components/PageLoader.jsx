import { LoaderIcon } from "lucide-react";

const PageLoader = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-black'>
        <LoaderIcon className="size-10 animate-spin" />
    </div>
  )
};

export default PageLoader;