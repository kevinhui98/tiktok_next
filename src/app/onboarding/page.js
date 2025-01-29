"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "./_actions";
import { InterestSelector } from "@/components/interestSelector";
export default function OnboardingComponent() {
  const [error, setError] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData) => {
    const res = await completeOnboarding({
      ...formData,
      interests: selectedInterests,
    });
    if (res?.message) {
      await user?.reload();
      router.push("/");
    }
    if (res?.error) {
      setError(res?.error);
    }
  };
  return (
    <div>
      <h1>Welcome</h1>
      <form action={handleSubmit}>
        <div>
          <label>Application Name</label>
          <p>Enter the name of your application.</p>
          <input type="text" name="applicationName" required />
        </div>

        <div>
          <label>Application Type</label>
          <p>Describe the type of your application.</p>
          <input type="text" name="applicationType" required />
        </div>

        <div>
          <label>Interests</label>
          <p>Select your interests.</p>
          <InterestSelector
            onInterestsChange={setSelectedInterests}
            initialInterests={[]}
            maxSelections={5}
          />
        </div>

        {error && <p className="text-red-600">Error: {error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
