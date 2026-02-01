export const Loader = ({ fullScreen = false }) => {
  const loaderContent = (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};

export default Loader;
