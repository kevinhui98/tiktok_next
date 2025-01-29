"use client";
import { Stack, Box, Button, Typography } from "@mui/material";
import { UserButton } from "@clerk/nextjs";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SmsIcon from "@mui/icons-material/Sms";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ReplyIcon from "@mui/icons-material/Reply";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { React, useState, useEffect } from "react";
import { grey } from "@mui/material/colors";
import { createClient } from "@supabase/supabase-js";

// Supabase client
const supabase = createClient(
  "https://kdrzgbdooarclrcudpzj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkcnpnYmRvb2FyY2xyY3VkcHpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxMTM4MjMsImV4cCI6MjA1MzY4OTgyM30.KcO39OFW_lpMf284hmuCbCC6Y_QAO83K1ZaYf9WrvHE"
);

const CDNURL =
  "https://kdrzgbdooarclrcudpzj.supabase.co/storage/v1/object/public/videos";

// Video Component
function Video({ src }) {
  return (
    <video
      controls
      autoPlay
      loop
      muted
      className="round-xl object-cover h-full"
      width="33%"
      src={src}
      type="video/mp4"
    />
  );
}

const View = () => {
  const [videos, setVideos] = useState([]);

  // Fetch videos from Supabase
  async function getVideos() {
    const { data, error } = await supabase.storage.from("videos").list("");
    if (error) {
      console.error(error);
      alert("Error grabbing files from Supabase");
      return;
    }

    // Convert file names to full URLs
    const videoURLs = data.map((file) => `${CDNURL}/${file.name}`);
    setVideos(videoURLs);
  }

  useEffect(() => {
    getVideos();
  }, []);

  const actions = [
    { icon: <FavoriteIcon />, label: "Like", count: 16555 },
    {
      icon: <SmsIcon sx={{ transform: "scaleX(-1)" }} />,
      label: "Comment",
      count: 34,
    },
    { icon: <BookmarkIcon />, label: "Bookmark", count: 1456 },
    {
      icon: <ReplyIcon sx={{ transform: "scaleX(-1)" }} />,
      label: "Share",
      count: 2334,
    },
  ];

  const handleClick = (idx) => {
    const newActions = [...actions];
    newActions[idx].count += 1;
    console.log(
      `Action clicked: ${newActions[idx].label}, New Count: ${newActions[idx].count}`
    );
  };

  return (
    <Stack direction="row" width="90vw">
      <Stack direction="row" width="80vw" gap={2} justifyContent="center">
        {videos.length > 0 ? (
          videos.map((videoSrc, index) => <Video key={index} src={videoSrc} />)
        ) : (
          <Typography color="white">No videos found</Typography>
        )}

        <Stack direction="column" justifyContent="end" mb={1}>
          <Box
            mb={2}
            ml={2.68}
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "40px",
              width: "40px",
              transform: "scale(1.5)",
            }}
          >
            <UserButton />
          </Box>
          {actions.map((btn, idx) => (
            <Button
              key={idx}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              onClick={() => handleClick(idx)}
            >
              {btn.icon}
              <Typography color="white">{btn.count}</Typography>
            </Button>
          ))}
        </Stack>
      </Stack>

      <Stack direction="column" justifyContent="center" gap={2}>
        <Button>
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
        <Button>
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
