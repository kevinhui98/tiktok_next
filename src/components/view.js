"use client";
import { Stack, Box, Button, Typography } from "@mui/material";
import { UserButton, useUser } from "@clerk/nextjs";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SmsIcon from "@mui/icons-material/Sms";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ReplyIcon from "@mui/icons-material/Reply";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { React, useState, useEffect } from "react";
import { grey } from "@mui/material/colors";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const CDNURL =
  process.env.NEXT_PUBLIC_SUPABASE_CDNURL;

// Video Component
function Video({ src, direction }) {
  return (
    <video
      controls
      autoPlay
      loop
      muted
      className={`round-xl object-cover h-full ${direction}`}
      width="33%"
      src={src}
      type="video/mp4"
    />
  );
}

const View = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // Track current video index
  const [direction, setDirection] = useState("slide-in"); // Track slide direction
  const { user } = useUser()
  const [activeIndex, setActiveIndex] = useState([]);
  const handleInteraction = (index) => {
    setActiveIndex((prev) => prev.includes(index)
      ? prev.filter((b) => b !== index) // Remove if already active (pop)
      : [...prev, index] // Add if not active (push)
    );
  };
  const Router = useRouter();
  // Fetch videos from Supabase
  async function getVideos() {
    const { data, error } = await supabase.storage.from("videos").list("");
    if (error) {
      console.error(error);
      alert("Error grabbing files from Supabase");
      return;
    } else {
      // Convert file names to full URLs
      const videoURLs = data.map((file) => `${CDNURL}/${file.name}`);
      console.log(videoURLs)
      setVideos(videoURLs);
    }


  }
  useEffect(() => {
    getVideos();
  }, []);
  const actions = [
    {
      icon: <FavoriteIcon fontSize='small' sx={{ bgcolor: 'gray', borderRadius: '20px', height: '40px', width: '40px', p: 1 }} />,
      label: 'Like',
      count: 16555,
      clicked: false,
    },
    {
      icon: <SmsIcon sx={{ transform: 'scaleX(-1)', bgcolor: 'gray', borderRadius: '20px', height: '40px', width: '40px', p: 1 }} />,
      label: 'Comment',
      count: 34,
      clicked: false,
    },
    {
      icon: <BookmarkIcon sx={{ bgcolor: 'gray', borderRadius: '20px', height: '40px', width: '40px', p: 1 }} />,
      label: 'Bookmark',
      count: 1456,
      clicked: false,
    },
    {
      icon: <ReplyIcon sx={{ transform: 'scaleX(-1)', bgcolor: 'gray', borderRadius: '20px', height: '40px', width: '40px', p: 1 }} />,
      label: 'Share',
      count: 2334,
      clicked: false,
    }
  ]
  const handleClick = (idx) => {
    const newActions = [...actions];
    newActions[idx].count += 1;
    console.log(
      `Action clicked: ${newActions[idx].label}, New Count: ${newActions[idx].count}`
    );
  };

  const handleArrowClick = (direction) => {
    if (direction === "up") {
      // Navigate to previous video
      setDirection("slide-out-left");
      setTimeout(() => {
        setCurrentVideoIndex((prevIndex) =>
          prevIndex === 0 ? videos.length - 1 : prevIndex - 1
        );
        setDirection("slide-in-right");
      }, 300); // Match this with the transition duration
    } else if (direction === "down") {
      // Navigate to next video
      setDirection("slide-out-right");
      setTimeout(() => {
        setCurrentVideoIndex((prevIndex) =>
          prevIndex === videos.length - 1 ? 0 : prevIndex + 1
        );
        setDirection("slide-in-left");
      }, 300); // Match this with the transition duration
    }
  };

  // Handle keyboard arrow key presses
  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      handleArrowClick("up");
    } else if (event.key === "ArrowDown") {
      handleArrowClick("down");
    }
  };

  // Add event listener for keydown when component mounts
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  return (
    <Stack direction="row" width="90vw">
      <Stack direction="row" width="80vw" gap={2} justifyContent="center">
        {videos.length > 0 ? (
          <Video
            key={currentVideoIndex}
            src={videos[currentVideoIndex]}
            direction={direction}
          />
        ) : (
          <Typography color="white">No videos found</Typography>
        )}

        <Stack direction="column" justifyContent="end" gap={1} mb={1}>
          <Button onClick={() => Router.push('/profile')}>
            <img src={user?.imageUrl} alt='user' style={{
              width: '3rem', height: 'auto', borderRadius: '50%', display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }} />
          </Button>
          {actions.map((btn, idx) => (
            <Button
              key={idx}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              className={`${activeIndex.includes(idx) && idx === 0 ? ("text-red-500") : "text-white"} ${activeIndex.includes(idx) && idx === 2 ? "text-yellow-500" : "text-white"}`}
              onClick={() => {
                handleClick(idx)
                if (idx == 1) {
                  alert("messages are currently unavailable")
                } else if (idx == 3) {
                  alert("sharing is currently unavailable")
                } else {
                  handleInteraction(idx)
                }
              }}
            >
              {btn.icon}
              <Typography color="white">{btn.count}</Typography>
            </Button>
          ))}
        </Stack>
      </Stack>

      <Stack direction="column" justifyContent="center" gap={2}>
        <Button onClick={() => handleArrowClick("up")}>
          <ArrowUpwardIcon
            fontSize="large"
            sx={{
              bgcolor: grey[900],
              color: "white",
              borderRadius: "20px",
              height: "40px",
              width: "40px",
              p: 1,
            }}
          />
        </Button>
        <Button onClick={() => handleArrowClick("down")}>
          <ArrowDownwardIcon
            fontSize="large"
            sx={{
              bgcolor: grey[900],
              color: "white",
              borderRadius: "20px",
              height: "40px",
              width: "40px",
              p: 1,
            }}
          />
        </Button>
      </Stack>
    </Stack>
  );
};

export default View;
