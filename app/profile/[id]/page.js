"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";
import { use } from "react"; // This is important for unwrapping the Promise

const UserProfile = ({ params }) => {
  // Unwrapping params using React.use()
  const unwrappedParams = use(params); 
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${unwrappedParams?.id}/posts`);
      const data = await response.json();
      setUserPosts(data);
    };

    // Fetch posts whenever the `id` or `name` changes
    if (unwrappedParams?.id) {
      fetchPosts();
    }
  }, [unwrappedParams?.id, userName]); // Adding dependencies to ensure re-fetch on name change

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
