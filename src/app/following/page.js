'use client'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2'
import Nav from '@/components/nav';

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
    return (
        <Stack direction={'row'} >
            <Nav />
            <Box width={'100%'} display={'flex'} flexDirection={'column'} mt={2} ml={8} flexShrink={1} alignItems={'center'}>

                <Grid container width={'50vw'} spacing={2} justifyContent={'center'} >
                    {Array.from(Array(12)).map((_, index) => (
                        <Grid key={index} size={4} >
                            <Item sx={{ height: '200px' }}>size=4</Item>
                        </Grid>
                    ))}
                    <Grid size={3}>
                        <Item>size=3</Item>
                    </Grid>
                    <Grid size={3}>
                        <Item>size=3</Item>
                    </Grid>
                    <Grid size={3}>
                        <Item>size=3</Item>
                    </Grid>
                </Grid>
            </Box>
        </Stack>
    )
}