"use client";
import {
  Box,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import PersonOutlineoutlinedIcon from "@mui/icons-material/PersonOutlineoutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { red } from "@mui/material/colors";
import React from "react";
import { useRouter } from "next/navigation";
const Nav = () => {
  const navbtn = [
    {
      name: "For You",
      icon: (
        <HomeOutlinedIcon
          sx={{
            fontSize: "20px",
            width: "2rem",
            height: "2rem",
            color: "white",
          }}
        />
      ),
    },
    {
      name: "Explore",
      icon: (
        <ExploreOutlinedIcon
          sx={{
            fontSize: "32px",
            width: "2rem",
            height: "2rem",
            color: "white",
          }}
        />
      ),
    },
    {
      name: "Following",
      icon: (
        <PersonAddAltOutlinedIcon
          sx={{
            fontSize: "32px",
            width: "2rem",
            height: "2rem",
            color: "white",
          }}
        />
      ),
    },
    {
      name: "Upload",
      icon: (
        <AddBoxOutlinedIcon
          sx={{
            fontSize: "32px",
            width: "2rem",
            height: "2rem",
            color: "white",
          }}
        />
      ),
    },
    {
      name: "Live",
      icon: (
        <VideoCallOutlinedIcon
          sx={{
            fontSize: "32px",
            width: "2rem",
            height: "2rem",
            color: "white",
          }}
        />
      ),
    },
    {
      name: "Profile",
      icon: (
        <PersonOutlineoutlinedIcon
          sx={{
            fontSize: "32px",
            width: "2rem",
            height: "2rem",
            color: "white",
          }}
        />
      ),
    },
    {
      name: "More",
      icon: (
        <MoreHorizOutlinedIcon
          sx={{
            fontSize: "32px",
            width: "2rem",
            height: "2rem",
            color: "white",
          }}
        />
      ),
    },
  ];
  const otherInfo = ["Company", "Program", "Terms & Policies"];
  const Router = useRouter();
  return (
    <Stack direction={"column"} ml={2} mt={3} gap={1}>
      <Box mb={2}>
        <Typography variant="h5" fontWeight={"bold"}>
          TikTak
        </Typography>
      </Box>
      <Button
        sx={{
          bgcolor: "rgb(31, 31, 31)",
          borderRadius: "30px",
          height: "2.5rem",
          width: "13rem",
          justifyContent: "start",
        }}
      >
        <SearchRoundedIcon
          sx={{
            color: "white",
            fontSize: "19px",
            width: "2rem",
            height: "2rem",
          }}
        />
        <Typography fontSize={"14px"} color="gray" ml={1}>
          Search
        </Typography>
      </Button>
      {/* </Stack> */}
      <Stack gap={1}>
        {navbtn.map((btn, idx) =>
          idx == 5 ? (
            <>
              <SignedIn>
                <Button
                  key={idx}
                  sx={{
                    height: "2.5rem",
                    width: "13rem",
                    justifyContent: "start",
                    transition: "background-color 0.3s ease",
                    "&:hover": { backgroundColor: "gray" },
                  }}
                  onClick={() => {
                    Router.push("/profile");
                  }}
                >
                  <Stack direction={"row"} alignItems={"center "} gap={1}>
                    <UserButton />
                    <Typography variant="body2" color="white">
                      {btn.name}
                    </Typography>
                  </Stack>
                </Button>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    key={idx}
                    sx={{
                      height: "2.5rem",
                      width: "13rem",
                      justifyContent: "start",
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: "gray",
                      },
                    }}
                  >
                    <Stack direction={"row"} alignItems={"center "} gap={1}>
                      {btn.icon}
                      <Typography variant="body2" color="white">
                        {btn.name}
                      </Typography>
                    </Stack>
                  </Button>
                </SignInButton>
              </SignedOut>
            </>
          ) : (
            <Button
              key={idx}
              sx={{
                height: "2.5rem",
                width: "13rem",
                justifyContent: "start",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "gray",
                },
              }}
              onClick={() => {
                if (idx == 3) {
                  <>
                    <SignedIn>{Router.push("/upload")}</SignedIn>
                  </>;
                } else if (idx == 1) {
                  {
                    Router.push("/explore");
                  }
                } else if (idx == 2) {
                  {
                    Router.push("/following");
                  }
                } else if (idx == 4 || idx == 6) {
                  {
                    alert("The feature will be implemented in the future");
                  }
                } else if (idx == 0) {
                  {
                    Router.push("/");
                  }
                }
              }}
            >
              <Stack direction={"row"} alignItems={"center "} gap={1}>
                {btn.icon}
                <Typography variant="body2" color="white">
                  {btn.name}
                </Typography>
              </Stack>
            </Button>
          )
        )}
      </Stack>
      <Box>
        <SignedOut>
          <SignInButton mode="modal">
            <Button
              sx={{
                bgcolor: red[500],
                color: "white",
                height: "2.5rem",
                width: "13rem",
                justifyContent: "center ",
              }}
            >
              Log In
            </Button>
          </SignInButton>
        </SignedOut>
      </Box>
      <Stack>
        {otherInfo.map((info, idx) => (
          <Typography key={idx} color="gray" variant="body3">
            {info}
          </Typography>
        ))}
        <Typography color="gray" variant="body3">
          © 2025 TikTak
        </Typography>
      </Stack>
    </Stack>
  );
};
export default Nav;
