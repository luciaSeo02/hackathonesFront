const Status = (props) => {
    return (
        <div className="p-4 bg-blue-50 border border-green-200 rounded-2xl">
            <p className="text-blue-600 text-sm text-center">{props.status}</p>
        </div>
    );
};

export default Status;