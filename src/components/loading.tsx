interface TypeProps {
  showLoading: boolean;
}
const Loading = ({showLoading}: TypeProps) => {
  return (
    <>
      {showLoading ? (
        <>
          <div className="justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-400 bg-opacity-80">
            <div className="relative items-center w-auto mt-96 mx-auto max-w-3xl">
              <div className="flex items-center justify-center ">
                <div className="w-24 h-24 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Loading;
