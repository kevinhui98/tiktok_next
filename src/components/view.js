import { Stack, Box } from '@mui/material'

function Video() {
    return (
        <video width="1080" height="1920" controls autoPlay display='block' >
            <source src="../1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    )
}

const View = () => {
    return (
        <Stack direction='column' height={'100vh'} width={'80vw'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box height={'100px'}>

                <Video />
            </Box>
            {/* <img src='../group-pic.png' /> */}
        </Stack>
    )
}
export default View