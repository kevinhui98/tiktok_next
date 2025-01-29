"use client";
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

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) => {
      const isSelected = prev.includes(interest);
      if (isSelected) {
        const updated = prev.filter((i) => i !== interest);
        onInterestsChange(updated);
        return updated;
      } else if (prev.length < maxSelections) {
        const updated = [...prev, interest];
        onInterestsChange(updated);
        return updated;
      }
      return prev;
    });
  };

  return (
    <div>
      <h2>Select your interests (max {maxSelections}):</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {Object.values(AVAILABLE_INTERESTS).map((interest) => (
          <button
            key={interest}
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
