"use client";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const BookmarkButton = ({ property }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();

  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const checkStatus = async () => {
      const res = await checkBookmarkStatus(property._id);

      if (res.error) {
        toast.error(error);
      }

      if (res.isBookmarked) {
        setIsBookmarked(res.isBookmarked);
      }

      setIsLoading(false);
    };
    checkStatus();
  }, [property._id, userId, checkBookmarkStatus]);

  const handleClick = () => {
    if (!userId) {
      toast.error("Sign in to bookmark a listing");
      return;
    }

    bookmarkProperty(property._id).then((res) => {
      if (res.error) {
        return toast.error(res.error);
      }
      setIsBookmarked(res.isBookmarked);

      toast.success(res.message);
    });
  };

  if (isLoading) {
    return (
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
        <FaBookmark className="mr-2" /> Loading...
      </button>
    );
  }
  return !isBookmarked ? (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={() => {
        handleClick();
      }}
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  ) : (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={() => {
        handleClick();
      }}
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  );
};

export default BookmarkButton;
