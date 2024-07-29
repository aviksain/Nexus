
const VideoListingComp = ({children}:any) => {
  return (
    <div className="grid lg:grid-cols-[repeat(3,_minmax(300px,_1fr))] grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
      {children}
    </div>
  );
};

export default VideoListingComp;
