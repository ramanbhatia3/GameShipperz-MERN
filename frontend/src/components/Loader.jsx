const Loader = ({ text = "Loading..." }) => {
    return (
        <div className="flex flex-col justify-center items-center py-20 w-full min-h-[40vh] font-rajdhani">
            <div className="w-12 h-12 border-4 border-[#333] border-t-gs-red rounded-full animate-spin mb-4"></div>
            <p className="text-white text-xl">{text}</p>
        </div>
    );
};

export default Loader;