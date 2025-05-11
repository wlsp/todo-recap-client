const SkeletonTodoItem = () => {
    return (
        <div className="p-4 border rounded-md shadow-sm animate-pulse space-y-4 bg-white w-full">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="flex space-x-2">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="px-4 py-2 bg-gray-200 rounded-md w-20 h-8" />
                ))}
            </div>
        </div>
    );
};

export default SkeletonTodoItem;
