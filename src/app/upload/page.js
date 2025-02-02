"use client";
import Nav from "@/components/nav";
import { Box, Stack, Button, Typography, TextField } from "@mui/material";
import React, { useState, useCallback, useEffect } from "react";
// import "../node_modules/video-react/dist/video-react.css";
// import { Player } from "video-react";
import VideocamIcon from "@mui/icons-material/Videocam";
import SourceIcon from "@mui/icons-material/Source";
import HighQualityIcon from "@mui/icons-material/HighQuality";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Upload() {
  const fileReq = [
    {
      title: "Size and duration",
      icon: <VideocamIcon />,
      description: "Maximum size: 50 MB.",
    },
    {
      title: "File formats",
      icon: <SourceIcon />,
      description: "Recommended: “.mp4”. Other major formats are supported.",
    },
    {
      title: "Video resolutions",
      icon: <HighQualityIcon />,
      description: "High-resolution recommended: 1080p, 1440p, 4K.",
    },
    {
      title: "Aspect ratios",
      icon: <LightbulbIcon />,
      description: "Recommended: 16:9 for landscape, 9:16 for vertical.",
    },
  ];
  const [uploadVideo, setUploadVideo] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null);
  const [uploadDescription, setUploadDescription] = useState('')
  const Router = useRouter();
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      console.log("New file selected:", file);

      // Reset preview to force React to recognize the change
      setVideoPreview(null);
      setTimeout(() => {
        setUploadVideo(file);
        setVideoPreview(URL.createObjectURL(file));
      }, 0);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "video/mp4", // Accept only video files
    maxSize: 500 * 1024 * 1024, // Limit file size to 500MB
  });
  const uploadFile = async () => {
    const videoFile = uploadVideo
    console.log("Upload!");
    console.log(videoFile.size); // 50MB limit
    const { error } = await supabase.storage
      .from("videos")
      .upload(uuidv4() + ".mp4", videoFile);

    if (error) {
      console.log(error);
      alert("error uploading file to supabase");
    } else {
      ßß
      alert("successful upload")
      Router.push('/')
    }
  }
  return (
    <Stack direction={"row"}>
      <Nav />
      <Stack
        width={"80vw"}
        height={"90vh"}
        mt={6}
        ml={5}
        sx={{ bgcolor: "gray", borderRadius: "20px" }}
        justifyContent={'space-evenly'}
      >
        {!uploadVideo && (
          <label
            {...getRootProps()}
            htmlFor="fileInput"
            style={{ width: "78vw", }}
            className="
                mx-auto
                mt-8
                mb-10
                flex
                flex-col
                items-center
                justify-center
                text-center
                p-3
                border-2
                border-dashed
                border-gray-300
                rounded-lg
                hover:bg-gray-100
                hover:cursor-pointer"
          >
            <Typography mt={4} className="text-[17px] text-black" sx={{ fontSize: '20px' }}>
              Select video to upload
            </Typography>
            <Typography mt={1.5} className="text-gray-900 text-[13px]">
              Or drag and drop a file
            </Typography>
            <Typography
              px={2}
              py={1.5}
              mt={3}
              className="text-white text-[15px] rounded-md"
              bgcolor={"#F02C56"}
            >
              Select file
            </Typography>
            {/* <input
            type="file"
            id="fileInput"
            hidden
            accept=".mp4"
            onChange={(e) => uploadFile(e)}
          /> */}
            <input
              type="file"
              id="fileInput"
              hidden
              accept=".mp4"
              {...getInputProps()}
            />
          </label>
        )}
        {/* {uploadVideo && (
          <div className="md:mx-0 mx-auto mt-10 md:mb-12 mb-16 flex items-center justify-center w-full max-w-[270px] h-[540] p-4 rounded-2xl cursor-pointer relative bg-white" >
            {/* <div className='bg-white h-full w-full' /> */}
        {/* <img src='mobile-case.png' className="absolute z-20 pointer-event-none" style={{ position: 'absolute', marginTop: '-1' }} alt="image" /> */}
        {/* <Image src='../../../assets/images/mobile-case.png' className="absolute z-20 pointer-event-none" alt="image" width={100} height={100} /> */}
        {/* <video autoPlay loop muted className="absolute rounded-xl object-cover z-10 p-[13px] w-full h-full" src={uploadVideo} /> */}
        {/* </div> */}
        {/* )} */}
        {uploadVideo && (
          <Stack direction={'row'} ml={4} my={2} justifyContent={'space-evenly'}>
            <video video width="25%" autoPlay loop muted controls style={{ borderRadius: '10px' }}>
              <source src={videoPreview} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <Stack justifyContent={'space-around'} width={'40%'}>
              <Typography >Descriptions</Typography>
              <TextField required autoComplete label='descriptions' width={'100%'} fullWidth height={'100px'} minRows={10} multiline onChange={(e) => setUploadDescription(e.target.value)} />
              <Stack direction={'row'} display={'flex'} justifyContent={'space-between'}>
                <button
                  onClick={uploadFile}
                  disabled={!uploadVideo}
                  style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    background: uploadVideo ? "blue" : "gray",
                    color: "white",
                    border: "none",
                    cursor: uploadVideo ? "pointer" : "not-allowed",
                    borderRadius: '10px'
                  }}
                >
                  Upload Video
                </button>
                <button
                  style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: '10px'
                  }}
                  onClick={() => {
                    const confirmDiscard = window.confirm(
                      "Are you sure you want to discard this video?"
                    );

                    if (confirmDiscard) {
                      setUploadVideo(null)
                      if (videoPreview) URL.revokeObjectURL(videoPreview);
                      setVideoPreview(null)
                    }

                  }}>Discard</button>
              </Stack>
            </Stack>
          </Stack>
        )}
        <Stack direction={"row"}>
          {fileReq.map((text, idx) => (
            <Stack direction={"row"} key={idx} gap={2} mx={2}>
              <Box alignContent={"center"} justifyContent={"center"}>
                {text.icon}
              </Box>
              <Stack direction={"column"}>
                <Typography fontWeight={"bold"} sx={{ fontSize: '1.5em' }}>
                  {text.title}
                </Typography>
                <Typography color="white">
                  {text.description}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
