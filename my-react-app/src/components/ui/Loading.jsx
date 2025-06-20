import loadingGif from '../../assets/ZKZg.gif';

const Loading = ({ size = 'medium' }) => {
    const sizes = {
        small: '30px',
        medium: '50px',
        large: '70px',
    };

    return (
        <div className="flex justify-center items-center">
            <img
                src={loadingGif}
                alt="Loading..."
                style={{
                    width: sizes[size],
                    height: sizes[size],
                }}
            />
        </div>
    );
};

export default Loading;
