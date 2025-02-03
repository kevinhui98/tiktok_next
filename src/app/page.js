import Nav from "@/components/nav";
import View from "@/components/view"
import { Box, Stack } from "@mui/material";

export default function Home() {
  return (
    <Stack direction={'row'} bgcolor={'black'}>
      <Nav />
      <View />
    </Stack>
  );
}
