import React, { useState, useEffect } from "react"
import VideoTile from './VideoTile'
import NewVideoForm from './NewVideoForm'
import destroyVideo from '../../apiClient/destroyVideo'

const VideosIndexContainer = (props) => {
  const [videoCount, setVideoCount] = useState(0)
  const [videos, setVideos] = useState([])
  const [userRole, setUserRole] = useState(null);
  const [videoFormData, setVideoFormData] = useState({
    title: "",
    video_url: "",
    thumbnail: ""
  })
 
  const fetchVideos = async() => {
    try {
      let videosResponse = await fetch('/api/v1/videos')
      if(videosResponse.ok){
        videosResponse = await videosResponse.json()
        setVideos(videosResponse.videos);
        setUserRole(videosResponse.role);
        setVideoCount(videosResponse.videos.length)
      } else {
        throw new Error(`${videosResponse.status}: ${videosResponse.statusText}`)
      }
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  const addVideo = async() => {
    let body = new FormData()
    body.append('title', videoFormData.title)
    body.append('thumbnail', videoFormData.thumbnail)
    body.append('video_url', videoFormData.video_url)
    try {
      const addVideoResponse = await fetch('api/v1/videos', {
        method: "POST",
        headers: {
          credentials: "include",
        },
        body: body
      })
      if(addVideoResponse.ok) {
        const parsedAddVideoResponse = await addVideoResponse.json();
        setVideos([...videos, parsedAddVideoResponse]);
      } else {
        throw new Error(`${addVideoResponse.status}: ${addVideoResponse.statusText}`)
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const deleteVideo = async(videoId) => {
    if(await destroyVideo(videoId)){
      const remainingVideos = videos.filter(
        existingVideo => existingVideo.video.id !== videoId);
      
      setVideos(remainingVideos);
    }
  }
  
  const videoComponents = videos.map(video => {
    return (
      <VideoTile 
      key={video.video.id} 
      video={video.video} 
      deleteVideo={deleteVideo}
      />
    )
  })

  const fillGrid = () => {
    const numTiles = 9 - videoCount;
    const emptyTiles = [];
    for(let i=0; i < numTiles; i++){
      emptyTiles.push(<div className="video-tile empty"></div>)
    }
    return emptyTiles;
  }

  const emptyTiles = fillGrid();

  return (
    <div>
      <h1>Your Videos</h1>
      <div className="videos-index"> 
          <div className="video-grid">
            {videoComponents}
            {emptyTiles}
          </div> 
        {userRole === "supported user" ? null :  
        <div className="video-form">
          <NewVideoForm 
          setVideoFormData={setVideoFormData} 
          videoFormData={videoFormData} 
          addVideo={addVideo}/>
        </div>
        }
      </div>
    </div>
  )
}
export default VideosIndexContainer
