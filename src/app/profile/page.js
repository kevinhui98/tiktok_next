'use client'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2'
import Nav from '@/components/nav';
import { grey } from '@mui/material/colors';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import { useUser } from '@clerk/nextjs'
export default function Profile() {
    const { isLoaded, isSignedIn, user } = useUser()
    let usrImg = user.imageUrl
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));
    const genres = ['All', 'Singing & Dancing', 'Comedy', 'Sports', 'Anime & Comics', 'Relationship', 'Shows', 'Lipsync', 'Daily Life', 'Beauty Care', 'Game', 'Society', 'Outfit', 'Cars', 'Food', 'Animals', 'Family', 'Drama', 'Fitness & Health', 'Education', 'Technology'];
    return (
        <Stack direction={'row'} >
            <Nav />
            <Box width={'75vw'} display={'flex'} flexDirection={'column'} mt={5} ml={8}>
                <Box>
                    <img src={usrImg} style={{ width: '20%', height: 'auto', borderRadius: '50%' }} />
                </Box>
                <Stack direction={'row'} my={2} alignItems={'center'} >
                    <Stack direction={'row'} overflow={'auto'} width={'75vw'} display={'flex'} whiteSpace={'nowrap'} flexWrap={'nowrap'} sx={{ scrollbarWidth: "thin" }} >
                        <Button sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: '20px' }}>Video</Button>
                        <Button sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: '20px' }}>Reposts</Button>
                        <Button sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: '20px' }}>Favorites</Button>
                        <Button sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: '20px' }}>Liked</Button>
                    </Stack>
                    <Box whiteSpace={'nowrap'} flexWrap={'nowrap'}>
                        <Button startIcon={<ControlPointOutlinedIcon />} color='white' whiteSpace={'nowrap'} flexWrap={'nowrap'} sx={{ textTransform: 'none' }}
                            onClick={console.log('user', user)}>Create new collection</Button>
                    </Box>
                </Stack>
                <Grid container spacing={2} columns={{ xs: 1, sm: 2, md: 6, lg: 12 }}>
                    <Grid size={3}>
                        <Item>size=4</Item>
                    </Grid>
                    <Grid size={3}>
                        <Item>size=4</Item>
                    </Grid>
                    <Grid size={3}>
                        <Item>size=2</Item>
                    </Grid>
                    <Grid size={3}>
                        <Item>size=8</Item>
                    </Grid>
                </Grid>
            </Box >
        </Stack >
    )
}