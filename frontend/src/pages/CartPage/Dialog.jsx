function Dialog({ message, content, buttonContent, onClose, onYes }) {
    return (
        <div className="modal fixed top-0 animate-slideTopDown right-0 left-0 bottom-0 bg-black/30 z-[51] ">
            <div className="absolute py-6 px-6 top-[50%] translate-y-[-50%] overflow-hidden dark:bg-dark-flat w-[420px] right-[50%] rounded-xl translate-x-[50%] bg-white">
                <header className="text-2xl font-bold dark:text-dark-text">{message}</header>
                <p className="mt-5 dark:text-dark-text">{content}</p>
                <div className="flex items-center gap-6 mt-5">
                    <div
                        onClick={onClose}
                        className="hover:bg-gray-300 text-lg bg-gray-200 font-semibold px-6 cursor-pointer hover:opacity-80 transition-all py-2 rounded-lg"
                    >
                        Hủy bỏ
                    </div>
                    <div
                        onClick={onYes}
                        className="text-lg px-6 cursor-pointer py-2 rounded-lg font-semibold hover:opacity-80 transition-all bg-orange-400 text-white"
                    >
                        {buttonContent}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dialog;
