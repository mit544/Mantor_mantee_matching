import { Spinner } from "@heroui/spinner";

const LoadingPageRedirection = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col justify-center items-center gap-4 w-24 h-24 bg-primary bg-opacity-90 rounded-lg">
        <Spinner color="default" />
        <p className="text-white text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPageRedirection;
