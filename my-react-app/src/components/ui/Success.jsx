const Success = (props) => {
    return (
        <div className="p-4 bg-green-50 border border-green-200 rounded-2xl">
            <p className="text-green-600 text-sm text-center">{props.success}</p>
        </div>
    );
};

export default Success;