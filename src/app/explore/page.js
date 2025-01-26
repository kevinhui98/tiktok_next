'use client'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2'
import Nav from '@/components/nav';
import { grey } from '@mui/material/colors';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function Explore() {
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
                <Typography fontWeight={'bold'} variant='h6'>You may like</Typography>
                <Stack direction={'row'} my={2} alignItems={'center'} >
                    <Button>
                        <KeyboardArrowLeftIcon fontSize='large' sx={{ bgcolor: grey[900], color: 'white', borderRadius: '20px', height: '40px', width: '40px', p: 1 }} />
                    </Button>
                    <Stack direction={'row'} overflow={'auto'} width={'75vw'} display={'flex'} whiteSpace={'nowrap'} flexWrap={'nowrap'} sx={{ scrollbarWidth: "thin" }} >
                        {genres.map((genre, idx) => (
                            <Button key={idx} whiteSpace={'nowrap'} sx={{ flexShrink: 0 }}>
                                <Typography bgcolor={grey[900]} px={2} py={1.5} color='white' borderRadius={'15px'} sx={{ fontSize: '15px', textTransform: 'none' }}>
                                    {genre}
                                </Typography>
                            </Button>
                        ))}
                    </Stack>
                    <Button>
                        <KeyboardArrowRightIcon fontSize='large' sx={{ bgcolor: grey[900], color: 'white', borderRadius: '20px', height: '40px', width: '40px', p: 1 }} />
                    </Button>
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
            </Box>
        </Stack>
    )
}