const CardSkeleton = ({ type }) => {
  return (
    <div
      className={` rounded-2xl  pt-2  ${
        type === "profile" ? "h-fit" : "h-[19rem] md:h-[27rem]"
      }`}
    >
      <div
        className={`${
          type === "item"
            ? "h-3/4  rounded-2xl"
            : " h-44 md:h-60 w-44  md:w-60 rounded-full mx-auto"
        } bg-slate-200 bg-opacity-50 animate-pulse `}
      ></div>

      <div
        className={`space-y-2 mt-8 ${type === "item" ? " " : "px-3 md:px-12"}`}
      >
        <p className="rounded h-4 w-full bg-slate-200 bg-opacity-50 animate-pulse "></p>
        <p className="rounded h-4 w-4/5 bg-slate-200 bg-opacity-50 animate-pulse"></p>
      </div>
    </div>
  );
};

export default CardSkeleton;
