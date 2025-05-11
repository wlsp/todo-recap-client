const DualRingSpinner = () => {
    return (
        <div className="w-6 h-6 relative">
            <svg className="w-full h-full" viewBox="0 0 50 50">
                <circle
                    className="text-gray-300"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="7"
                />
                <path
                    className={"origin-center [animation:spin-path_1s_linear_infinite]"}
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="7"
                    d="M 25 5 A 20 20 0 0 1 45 25"
                />
            </svg>
        </div>
    );
};

export default DualRingSpinner;
