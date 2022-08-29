import { Box, IconButton } from "@mui/material"
import { 
  FiberManualRecordTwoTone as RecordIcon,
  PauseCircleFilledTwoTone as PauseIcon,
  StopCircleTwoTone  as StopRecordIcon
}  from '@mui/icons-material';
import { makeStyles } from "@mui/styles";



const Controls = ({isRecording, onRecord})=>{
  const classes = useStyles()

  return (
    <Box className={classes.flex}>
      <IconButton onClick={onRecord} size='large' color="secondary" >
      { !isRecording && <RecordIcon sx={{fontSize:40}} />}
      { isRecording && <StopRecordIcon sx={{fontSize:40}}/>}
      </IconButton>
    </Box>
  )
}

const useStyles  = makeStyles(()=>({
  flex:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))
export default Controls