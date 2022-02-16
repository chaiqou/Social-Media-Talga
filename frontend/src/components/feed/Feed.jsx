import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../client";
import MasonryLayout from "../MasonryLayout/MasonryLayout";
import Spinner from "../spinner/Spinner";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  if (loading)
    return <Spinner message="We are looking for new photos for your feed <3" />;

  return <div>Feed</div>;
};

export default Feed;
