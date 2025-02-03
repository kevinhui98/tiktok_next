// import { useUser } from "@clerk/nextjs";
// import supabase from './supabase'; // Assuming supabase is configured in a separate file

// const { user } = useUser()

// // Define all possible topics
// const allTopics = {
//   TECHNOLOGY: "Technology",
//   SPORTS: "Sports",
//   MUSIC: "Music",
//   TRAVEL: "Travel",
//   READING: "Reading",
//   COOKING: "Cooking",
//   GAMING: "Gaming",
//   PHOTOGRAPHY: "Photography",
//   FITNESS: "Fitness",
//   MOVIES: "Movies",
//   ART: "Art",
//   WRITING: "Writing",
//   GARDENING: "Gardening",
//   FASHION: "Fashion",
//   ANIMALS: "Animals",
//   HISTORY: "History",
//   SCIENCE: "Science",
//   FOOD: "Food",
//   OUTDOOR_ACTIVITIES: "Outdoor Activities",
//   YOGA: "Yoga",
//   DIY_PROJECTS: "DIY Projects",
//   BUSINESS: "Business",
//   EDUCATION: "Education",
//   LANGUAGES: "Languages",
//   VOLUNTEERING: "Volunteering",
//   HEALTH: "Health",
//   PSYCHOLOGY: "Psychology",
//   LITERATURE: "Literature",
//   CRAFTS: "Crafts",
//   SOCIAL_MEDIA: "Social Media",
//   CARS: "Cars",
//   POKEMON: "Pokemon",
// };

// // Function to encode topics (one-hot encoding)
// const encodeTopics = (topics) => {
//   return Object.values(allTopics).map(topic => topics.includes(topic) ? 1 : 0);
// };

// // Function to generate 10 videos per user interest topic
// const generateLikedVideosForEachInterest = (userInterests, numVideosPerInterest) => {
//   const videos = [];
  
//   userInterests.forEach(interest => {
//     for (let i = 0; i < numVideosPerInterest; i++) {
//       // Randomly select a few other topics for variety (optional)
//       const numAdditionalTopics = Math.floor(Math.random() * 2); // Add 0 or 1 random topics
//       const selectedTopics = [interest];
      
//       // Add random additional topics (not repeating the current interest)
//       while (selectedTopics.length <= 1 + numAdditionalTopics) {
//         const randomTopic = Object.values(allTopics)[Math.floor(Math.random() * Object.values(allTopics).length)];
//         if (!selectedTopics.includes(randomTopic)) {
//           selectedTopics.push(randomTopic);
//         }
//       }
      
//       // Create a new video object with the selected topics and mark it as liked
//       const video = {
//         id: videos.length + 1,
//         topics: selectedTopics,
//         liked: 1 // The user will like these videos based on their interests
//       };
      
//       // Encode the topics using one-hot encoding
//       const encodedTopics = encodeTopics(video.topics);
//       video.encodedTopics = encodedTopics;

//       videos.push(video);
//     }
//   });

//   return videos;
// };

// // Function to get user interests from Supabase
// export const getUserInterests = async (userId) => {
//   let { data, error } = await supabase
//     .from('users')
//     .select('*')
//     .eq('uuid', userId);

//   if (error) {
//     console.error("Error fetching user interests:", error);
//     return [];
//   }

//   return data[0]?.interests || [];
// };

// // Function to generate liked videos based on user interests
// export const generateLikedVideos = async (userId, numVideosPerInterest = 10) => {
//   const userInterests = await getUserInterests(userId);
  
//   if (userInterests.length === 0) {
//     console.log("User has no interests defined.");
//     return [];
//   }

//   return generateLikedVideosForEachInterest(userInterests, numVideosPerInterest);
// };