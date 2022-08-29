import { Box, Card, CardMedia, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import ObjectID from "bson-objectid"
import { useLiveQuery } from "dexie-react-hooks"
import { useCallback, useRef, useState } from "react"
import Webcam from "react-webcam"
import { indexdb } from "../../data/indexdb"
import Controls from "./Controls"


const VideoFrame = ({text}) => {
  const classes = useStyles()
  
  const [isRecording, setIsRecording] = useState(false)

  const videoRecordedRef  = useRef(null)
  const videoRef = useRef(null)
  const videoIdRef = useRef(ObjectID().toHexString())

  const videos = useLiveQuery(
    () => indexdb.videos
      .where('id')
      .equals(videoIdRef.current)
      .toArray()
  );
  
  const _handleRecord = useCallback(() =>{
    setIsRecording(true)

    videoRecordedRef.current = new MediaRecorder(videoRef.current.stream, {
      mimeType: "video/webm"
    });

    videoRecordedRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
  
    videoRecordedRef.current.start();
  }, [videoRef, setIsRecording, videoRecordedRef])

  const handleDataAvailable = useCallback(async ({ data }) => {
      if (data.size > 0) 
          await indexdb.videos.add({id: videoIdRef.current, chunk: data})
    }, [])

  const _handleStop = useCallback(() => {
    videoRecordedRef.current.stop();
    setIsRecording(false);
  }, [videoRecordedRef, videoRef, setIsRecording])

  return (
    <Card className={classes.card}>
      { Boolean(videos && videos?.length) && 
      <CardMedia
        component="video"
        alt="Paella dish"
        controls
        src={URL.createObjectURL(videos[0]?.chunk)}
      />}
      {
        !Boolean(videos && videos?.length) &&
        <Webcam
        audio
        muted
        ref={videoRef}
      />
      }
      <Box className={classes.cardContent}>
        <Typography variant="body1" componet='h3'>
          {text}
        </Typography>
        <Controls 
          isRecording={isRecording}
          onRecord={!isRecording ? _handleRecord : _handleStop}
        />
      </Box>
    </Card>
  )
}

const useStyles = makeStyles(({spacing, palette})=>({
  card:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: spacing(40),
    margin: 'auto',
    height: spacing(50),
    boxShadow: `${spacing(2, 2)} ${palette.action.hover}`
  },
  cardContent:{
    padding: spacing(2)
  }
}), {name:'VideoFrame'})

export default VideoFrame