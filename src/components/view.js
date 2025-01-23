'use client'
import { Stack, Box, Button, Typography } from '@mui/material'
import { UserButton } from '@clerk/nextjs'
import FavoriteIcon from '@mui/icons-material/Favorite';
import SmsIcon from '@mui/icons-material/Sms';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ReplyIcon from '@mui/icons-material/Reply';
import { React, useState } from 'react'
function Video() {
    return (
        <video
            controls autoPlay display='block' width={'33%'}
            loop
            muted
            className="round-xl object-cover h-full"
            src="../1.mp4"
            type="video/mp4"
        />

    )
}

const View = () => {
    const action = [
        {
            icon: <FavoriteIcon color='white' fontSize='small' sx={{ bgcolor: 'gray', color: 'white', borderRadius: '20px', height: '40px', width: '40px', p: 1 }} />,
            count: 16555,
            clicked: false,
        },
        {
            icon: <SmsIcon sx={{ transform: 'scaleX(-1)', bgcolor: 'gray', color: 'white', borderRadius: '20px', height: '40px', width: '40px', p: 1 }} />,
            count: 34,
            clicked: false,
        },
        {
            icon: <BookmarkIcon sx={{ bgcolor: 'gray', color: 'white', borderRadius: '20px', height: '40px', width: '40px', p: 1 }} />,
            count: 1456,
            clicked: false,
        },
        {
            icon: <ReplyIcon sx={{ transform: 'scaleX(-1)', bgcolor: 'gray', color: 'white', borderRadius: '20px', height: '40px', width: '40px', p: 1 }} />,
            count: 2334,
            clicked: false,
        }
    ]

    const [likeClick, SetLikeClick] = useState(action[0].count)
    const [msgClick, SetMsgClick] = useState(false)
    const [bookmarkClick, SetBookmarkClick] = useState(false)
    const [shareClick, SetShareClick] = useState(false)

    return (
        <Stack direction='row' width={'80vw'} gap={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Video />
            <Stack direction={'column'} justifyContent={'end'} mb={1} >
                <Box mb={2} ml={2.68} sx={{ display: 'flex', 'flex-direction': 'column', justifyContent: 'center', height: '40px', width: '40px', transform: 'scale(1.5)' }}>
                    <UserButton />
                </Box>
                {action.map((btn, idx) => (
                    <Button key={idx} width={'10px'} height={'200px'} sx={{ display: 'flex', 'flex-direction': 'column', justifyContent: 'center' }} onClick={() => {
                        if (btn.idx == 0) {
                            btn.clicked = !btn.clicked
                            btn.clicked ? SetLikeClick(btn.count++) : SetLikeClick(btn.count--)
                            alert("You liked this video")
                            // SetLikeClick(!likeClick)
                            // btn.clicked = likeClick
                        } else if (btn.idx == 1) {
                            btn.clicked = !btn.clicked
                            btn.clicked ? SetMsgClick(btn.count++) : SetMsgClick(btn.count--)
                            SetMsgClick(!msgClick)
                            btn.clicked = likeClick
                            alert("You messaged this video")
                        } else if (btn.idx == 2) {
                            btn.clicked = !btn.clicked
                            btn.clicked ? SetBookmarkClick(btn.count++) : SetBookmarkClick(btn.count--)
                            alert("You bookmarked this video")
                            // SetBookmarkClick(!bookmarkClick)
                            // btn.clicked = likeClick
                        } else {
                            btn.clicked = !btn.clicked
                            btn.clicked ? SetShareClick(btn.count++) : SetShareClick(btn.count--)
                            alert("You shared this video")
                            // SetShareClick(!shareClick)
                            // btn.clicked = likeClick
                        }
                        btn.clicked == true ? btn.count++ : btn.count--
                        // btn.clicked = !btn.clicked
                        // console.log(btn.clicked)
                        // if (btn.clicked == true) {
                        //     btn.count++
                        // } else {
                        //     btn.count--
                        // }
                        console.log(idx, btn.count)
                    }}>
                        {btn.icon}
                        <Typography color='white'>{btn.count}</Typography>
                    </Button>

                ))}
                {/* <Button startIcon={<FavoriteIcon color='white' />} width={'200px'} height={'200px'} sx={{ bgcolor: 'gray', color: 'white' }} />
                <Button startIcon={<SmsIcon sx={{ transform: 'scaleX(-1)' }} />} sx={{ bgcolor: 'gray', color: 'white' }} />
                <Button startIcon={<BookmarkIcon />} sx={{ bgcolor: 'gray', color: 'white' }} />
                <Button startIcon={<ReplyIcon sx={{ transform: 'scaleX(-1)' }} />} sx={{ bgcolor: 'gray', color: 'white' }} /> */}

            </Stack>
            {/* <img src='../group-pic.png' /> */}
        </Stack>
    )
}
export default View