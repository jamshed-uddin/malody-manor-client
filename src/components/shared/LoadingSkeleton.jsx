import CardSkeleton from "./CardSkeleton";

const LoadingSkeleton = ({ type }) => {
  return (
    <>
      {[1, 2, 3].map((item, index) => (
        <CardSkeleton key={index} type={type} />
      ))}
    </>
  );
};

export default LoadingSkeleton;
