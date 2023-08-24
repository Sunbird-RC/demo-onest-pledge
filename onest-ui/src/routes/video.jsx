const Video = (src) => {
    return (
      <video controls width="100%">
        <source src='https://www.youtube.com/watch?v=wvBYfE69U4A' type="video/webm" />
        {/* <source src={src} type="video/mp4" */}
        {/* /> */}
        Sorry, your browser doesn't support videos.
      </video>
    );
  };
  
  export default Video;