import React, { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { client, urlFor } from "../../client";
import MasonryLayout from "../MasonryLayout/MasonryLayout";
import { pinDetailQuery, pinDetailMorePinQuery } from "../../utils/data";
import Spinner from "../spinner/Spinner";
import { IoMdHeartEmpty } from "react-icons/io";

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetails, setPinDetails] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setaddingComment] = useState(false);
  const { pinId } = useParams();

  const addComment = () => {
    if (comment) {
      setaddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: "postedBy",
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetail();
          setComment("");
          setaddingComment(false);
        });
    }
  };

  const fetchPinDetail = () => {
    const query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPinDetails(data[0]);

        if (data[0]) {
          const query1 = pinDetailMorePinQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPins(res);
          });
        }
      });
    }
  };

  // useEffect gaeshveba mashin rodesac sheicvleba pinId
  useEffect(() => {
    fetchPinDetail();
  }, [pinId]);

  // tu pinDetails aris falsy value mashin daabrune spinner
  if (!pinDetails) return <Spinner message="Loading..." />;

  return (
    <>
      <div
        className="flex xl-flex-row flex-col m-auto bg-white "
        style={{ maxWidth: "1500px", borderRadius: "23px" }}
      >
        <div className="flex justify-center items-center md:items-start flex-initial ">
          <img
            src={pinDetails?.image && urlFor(pinDetails?.image).url()}
            alt="pin"
            className="rounded-t-3xl rounded-b-3xl"
          />
        </div>
        <div className="p-5 w-full flex-1 xl:min-w-620">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <a
                href={`${pinDetails.image?.asset?.url}?dl=`}
                download
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a href={pinDetails.destination} target="_blank" rel="noreferrer">
              {pinDetails.destination}
            </a>
          </div>
          <div>
            <h1 className="text-4xl mt-3 break-words font-bold">
              {pinDetails.title}
            </h1>
            <p className="mt-3">{pinDetails.about}</p>
          </div>
          <Link
            to={`/user-profile/${pinDetails.postedBy?._id}`}
            className="flex gap-2 mt-5 items-center bg-white rounded-lg"
          >
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={pinDetails.postedBy?.image}
              alt="user-profile"
            />
            <p className="font-semibold capitalize">
              {pinDetails.postedBy?.userName}
            </p>
          </Link>
          <h2 className="mt-5 text-2xl">Comments</h2>
          <div className="max-h-370 overflow-y-auto">
            {pinDetails?.comments?.map((comment, i) => (
              <div
                key={i}
                className="flex gap-2 mt-5 items-center bg-white rounded-lg"
              >
                <img
                  src={comment.postedBy.image}
                  alt="comments"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="flex flex-col">
                  <p className="font-bold">{comment.postedBy.userName}</p>
                  {comment.comment}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-6 gap-3">
            <Link to={`/user-profile/${pinDetails.postedBy?._id}`}>
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                src={pinDetails.postedBy?.image}
                alt="user-profile"
              />
            </Link>
            <input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 border-gray-100 outline-none border-2 rounded-2xl p-2 focus:border-gray-500"
            />
            <button
              type="button"
              onClick={addComment}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {addingComment ? "Posting comment..." : "Comment"}
            </button>
          </div>
        </div>
      </div>
      {pins?.length > 0 ? (
        <>
          <h2 className="text-center text-2xl font-bold mb-4 mt-8 ">
            Suggested for you
          </h2>
          <MasonryLayout pins={pins} />
        </>
      ) : (
        <Spinner message="Loading" />
      )}
    </>
  );
};

export default PinDetail;
