const ErrorDiv = (props) => {
    return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
            <p className="text-red-600 text-sm text-center">{props.error}</p>
        </div>
    );
};

export default ErrorDiv;