"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "./_actions";
import { InterestSelector } from "@/components/interestSelector";
import { Button, TextField } from "@mui/material";

export default function OnboardingComponent() {
    const [error, setError] = useState("");
    const [selectedInterests, setSelectedInterests] = useState([]);
    const { user } = useUser();
    const router = useRouter();
    const [count, setCount] = useState(0)
    const [username, SetUsername] = useState([])
    const toggleInterest = (interest) => {
        let update = []
        if (selectedInterests.includes(interest)) {
            update = selectedInterests.filter((i) => i !== interest)
        } else if (selectedInterests.length < 5) update = [...selectedInterests, interest]
        setSelectedInterests(update)
        setCount(update.length)
    };
    const AVAILABLE_INTERESTS = {
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
    const [searchTerm, setSearchTerm] = useState('')
    const filteredInterest = Object.values(AVAILABLE_INTERESTS).filter((interest) => interest.toLowerCase().includes(searchTerm.toLowerCase()))
    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await completeOnboarding({
            userName: username,
            interest: [...selectedInterests],
        });
        if (res?.message) {
            await user?.reload();
            console.log(res?.message)
            router.push("/");
        }
        if (res?.error) {
            setError(res?.error);
        }
    };
    return (
        <div>
            <h1>Welcome</h1>
            <div>
                <label>User Name</label>
                <p>Enter your username.</p>
                <TextField name="userName" required className='bg-white border rounded-xl' sx={{ color: 'black' }} label='User Name' onChange={(e) => SetUsername(e.target.value)} />
            </div>
            <h2>Select your interests (max 5):</h2>
            <p>Select {5 - count} more</p>
            <TextField onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} label="Search Interest" className='bg-white border rounded-xl' sx={{ color: 'black' }} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {filteredInterest.map((interest) => (
                    <button
                        key={interest}
                        onClick={() => {
                            toggleInterest(interest)
                            console.log([...selectedInterests])
                        }}
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
            <h3>Selected Interests:</h3>
            <ul>
                {selectedInterests.map((interest) => (
                    <li key={interest}>{interest}</li>
                ))}
            </ul>
            {/* Hidden input to submit array via form */}
            <input type="hidden" name="items" value={JSON.stringify(selectedInterests)} />

            {error && <p className="text-red-600">Error: {error}</p>}
            <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </div>
    );
}
