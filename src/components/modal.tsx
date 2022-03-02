import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface TypeProps {
  showModal: boolean;
  setShowModal: (status: boolean) => void;
  content: string;
}
const Modal = ({ showModal, setShowModal, content }: TypeProps) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-400 bg-opacity-80">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Readme</h3>
                </div>
                <div className="relative flex-auto overflow-scroll ">
                  <ReactMarkdown
                    className="markdown-body p-2"
                    children={content}
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                  />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
