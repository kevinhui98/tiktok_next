"use client";
import { TextField } from "@mui/material";
import { useState } from "react";

export const AVAILABLE_INTERESTS = {
  TECHNOLOGY: "Technology",
  SPORTS: "Sports",
  MUSIC: "Music",
  TRAVEL: "Travel",
  READING: "Reading",
  COOKING: "Cooking",
  GAMING: "Gaming",
  PHOTOGRAPHY: "Photography",
  FITNESS: "Fitness",
  MOVIES: "Movies",
  ART: "Art",
  WRITING: "Writing",
  GARDENING: "Gardening",
  FASHION: "Fashion",
  ANIMALS: "Animals",
  HISTORY: "History",
  SCIENCE: "Science",
  FOOD: "Food",
  OUTDOOR_ACTIVITIES: "Outdoor Activities",
  YOGA: "Yoga",
  DIY_PROJECTS: "DIY Projects",
  BUSINESS: "Business",
  EDUCATION: "Education",
  LANGUAGES: "Languages",
  VOLUNTEERING: "Volunteering",
  HEALTH: "Health",
  PSYCHOLOGY: "Psychology",
  LITERATURE: "Literature",
  CRAFTS: "Crafts",
  SOCIAL_MEDIA: "Social Media",
  CARS: "Cars",
  POKEMON: "Pokemon",
};

export function InterestSelector({
  onInterestsChange,
  initialInterests = [],
  maxSelections = 5,
}) {
  const [selectedInterests, setSelectedInterests] = useState(initialInterests);
  const [count, setCount] = useState(selectedInterests.length)
  const toggleInterest = (interest) => {
    setSelectedInterests((prev) => {
      const isSelected = prev.includes(interest);
      let updated = []
      if (isSelected) {
        updated = prev.filter((i) => i !== interest);
      } else if (prev.length < maxSelections) {
        updated = [...prev, interest];
      } else {
        return prev;
      }
      onInterestsChange(updated);
      setCount(updated.length)
      return updated;
    });
  };
  const [searchTerm, setSearchTerm] = useState('')
  const filteredInterest = Object.values(AVAILABLE_INTERESTS).filter((interest) => interest.toLowerCase().includes(searchTerm.toLowerCase()))
  return (
    <div>
      <h2>Select your interests (max {maxSelections}):</h2>
      <p>Select {5 - count} more</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {filteredInterest.map((interest, idx) => (
          <button
            key={idx}
            onClick={() => toggleInterest(interest)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: selectedInterests.includes(interest)
                ? "#007bff"
                : "#fff",
              color: selectedInterests.includes(interest) ? "#fff" : "#000",
              cursor: "pointer",
            }}
            data-value={interest}
          >
            {interest}
          </button>
        ))}
      </div>
      <div>
        <h3>Selected Interests:</h3>
        <ul>
          {selectedInterests.map((interest) => (
            <li key={interest}>{interest}</li>
          ))}
        </ul>

      </div>
    </div>
  );
}
