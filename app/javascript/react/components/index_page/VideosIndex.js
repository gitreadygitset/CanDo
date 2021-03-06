import React, { useState, useEffect } from "react"
import VideoTile from './VideoTile'
import VideoUploadForm from './VideoUploadForm'
import destroyVideo from '../../apiClient/destroyVideo'
import editVideoTitle from '../../apiClient/editVideoTitle'
import SearchBar from './SearchBar'


const VideosIndexContainer = (props) => {
  const [displayedVideoCount, setDisplayedVideoCount] = useState(0)
  const [videos, setVideos] = useState([])
  const [displayedVideos, setDisplayedVideos] = useState([])
  const [userRole, setUserRole] = useState(null);
  const [videoFormData, setVideoFormData] = useState({
    title: "",
    video_url: "",
    thumbnail: "",
  })
 
  const fetchVideos = async() => {
    try {
      let videosResponse = await fetch('/api/v1/videos')
      if(videosResponse.ok){
        videosResponse = await videosResponse.json()
        setVideos(videosResponse.videos);
        setDisplayedVideos(videosResponse.videos);
        setUserRole(videosResponse.role);
        setDisplayedVideoCount(videosResponse.videos.length) 
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
      setVideoCount(remainingVideos.length)
    }
  }

  const editTitle = async(videoTitle, videoId) => {
    const editTitleResponse = await editVideoTitle(videoTitle.trim(), videoId)
    const changeIndex = videos.findIndex(video => {return video.video.id === editTitleResponse.video.id});
    const videosCopy = videos.map(video => video);
    videosCopy[changeIndex] = editTitleResponse;
    setVideos(videosCopy)
  }

  const videoComponents = displayedVideos.map(video => {
    return (
      <VideoTile 
      key={video.video.id} 
      video={video.video} 
      deleteVideo={deleteVideo}
      userRole={userRole}
      editTitle={editTitle}
      />
    )
  })

  const fillGrid = () => {
    const numTiles = 9 - displayedVideoCount;
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
         
        <div className="video-form">
          <SearchBar 
            videos={videos} 
            setDisplayedVideos={setDisplayedVideos}
            setDisplayedVideoCount = {setDisplayedVideoCount}
          />
          {userRole === "supported user" ? null : 
          <VideoUploadForm 
          setVideoFormData={setVideoFormData} 
          videoFormData={videoFormData} 
          addVideo={addVideo}
          />
        }
        </div>
      </div>
    </div>
  )
}
export default VideosIndexContainer
