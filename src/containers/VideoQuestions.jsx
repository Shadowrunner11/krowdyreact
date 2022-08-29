import { Box, CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import useAxios from 'axios-hooks'
import clsx from 'clsx'
import { memo, useEffect, useState } from 'react'
import VideoFrame from '../components/VideoFrame'



// const { VITE_URL_API_QUESTIONS } = import.meta.env

const questions = [
  {
    "_id": "1132sdaasdsadsfdfsdasd",
    "text": "Cual fue tu primera experiencia laboral"
  },
  {
    "_id": "1132sdasfdfasdsd",
    "text": "Que tecnologias usaste"
  },
  {
    "_id": "1132sdasfdasdasfsd",
    "text": "Sabes sobre patrones de diseño"
  },
  {
    "_id": "1132sdasfdasdasfsasdasdd",
    "text": "Que es cognitive refactoring"
  }
]

const VideoQuestions  = () => {
  const classes  = useStyles()
  // const [{ data: questions, loading, error }, refetch] = useAxios(VITE_URL_API_QUESTIONS)
  const [ loading, setLoading ] = useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    })
  },[])

  return (
    <Box className={clsx(classes.flex, classes.flexCenter, classes.flexWrapped)}>
      { loading && 
        <CircularProgress />
      }
      {
        !loading &&
        questions?.map(({_id, text}) => 
         <VideoFrame key={_id} text={text}/>
        )
      }
    </Box>
  )
}

const useStyles  = makeStyles(({spacing})=>({
  flex:{
    display: 'flex',
    width: 'max(90vw, 240px)',
    minWidth: spacing(50),
    gap: spacing(2),
    height: '100vh',
    margin: spacing(2)
  },
  flexCenter:{
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  flexWrapped:{
    flexWrap: 'wrap'
  }
}),{name: 'VideosContainer'})

export default memo(VideoQuestions)