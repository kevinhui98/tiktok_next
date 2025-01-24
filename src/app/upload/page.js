'use client'
import Nav from '@/components/nav'
import { Box, Stack, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
// import "../node_modules/video-react/dist/video-react.css";
// import { Player } from "video-react";
import VideocamIcon from '@mui/icons-material/Videocam';
import SourceIcon from '@mui/icons-material/Source';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
export default function Upload() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            console.log('File uploaded successfully:', data);
        } else {
            console.error('Failed to upload file');
        }
    };
    const fileReq = [
        {
            title: 'Size and duration',
            icon: <VideocamIcon />,
            description: 'Maximum size: 10 GB, video duration: 60 minutes.'
        }, {
            title: 'File formats',
            icon: <SourceIcon />,
            description: 'Recommended: “.mp4”. Other major formats are supported.'
        }, {
            title: 'Video resolutions',
            icon: <HighQualityIcon />,
            description: 'High-resolution recommended: 1080p, 1440p, 4K.'
        }, {
            title: 'Aspect ratios',
            icon: <LightbulbIcon />,
            description: 'Recommended: 16:9 for landscape, 9:16 for vertical.'
        }
    ]
    return (
        <Stack direction={'row'}>
            <Nav />
            <Stack width={'80vw'} height={'75vh'} mt={10} ml={5} sx={{ alignItems: 'center', bgcolor: 'gray', borderRadius: '20px' }}>
                {/* <form onSubmit={handleSubmit}>
                    <Stack alignItems={'center'} justifyContent={'center'}>
                        <input type="file" onChange={handleFileChange} />
                        <Button type='submit' >Upload</Button>
                    </Stack>
                </form> */}
                <label
                    htmlFor='fileInput'
                    style={{ width: '78vw' }}
                    className='
                mx-auto
                mt-8
                mb-10
                flex
                flex-col
                items-center
                justify-center
                h-[450px]
                text-center
                p-3
                border-2
                border-dashed
                border-gray-300
                rounded-lg
                hover:bg-gray-100
                cursor-pointer'

                >
                    <Typography mt={4}
                        className='text-[17px] text-black'>Select video to upload</Typography>
                    <Typography mt={1.5} className='text-gray-500 text-[13px]'>Or drag and drop a file</Typography>
                    <Typography px={2} py={1.5} mt={8} className='text-white text-[15px] rounded-md' bgcolor={'#F02C56'}>Select file</Typography>
                    <input type='file' id='fileInput' hidden accept='.mp4' onChange={handleFileChange} />
                </label>
                <Stack direction={'row'}>
                    {fileReq.map((text, idx) => (
                        <Stack direction={'row'} key={idx} gap={2} mx={2} >
                            <Box alignContent={'center'} justifyContent={'center'}>
                                {text.icon}
                            </Box>
                            <Stack direction={'column'}>
                                <Typography variant='body1' fontWeight={'bold'}>{text.title}</Typography>
                                <Typography variant='body2' color='white'>{text.description}</Typography>
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </Stack>
    )

}