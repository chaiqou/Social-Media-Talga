import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../client";
import { feedQuery, searchQuery } from "../../utils/data";
import MasonryLayout from "../MasonryLayout/MasonryLayout";
import Spinner from "../spinner/Spinner";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  // urdan mogvcems urls zust parametrs (ID) romlis mixedvitac vixelmdzgvanelebt useEffect hookshi, tu es url sheicvleba useEffect tavidan gaeshveba
  const { categoryId } = useParams();

  // tu arsebobs categoryId anu momxmarebeli edzebs photoebs sanity.io_dan vaketebt search query fetch, yoveli category cvlilebaze vaketebt axal fetchs
  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading)
    return <Spinner message="We are looking for new photos for your feed <3" />;

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
