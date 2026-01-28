const Loading: React.FC<{
  fullScreen?: boolean;
  className?: string;
}> = ({}) => {
  return (
    <div className="flex items-center justify-center h-[100dvh] bg-white dark:bg-black text-black dark:text-white text-[15px] font-medium">
      Loading...
    </div>
  );
};

export default Loading;
