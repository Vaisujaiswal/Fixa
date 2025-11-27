
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { confirmToast } from "../utility";
import { AiFillDelete } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";

const Star = ({ filled, onClick, onMouseEnter, onMouseLeave, size = 20 }) => (
  <FaStar
    size={size}
    className={`cursor-pointer ${filled ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  />
);

const ReviewSection = ({ providerId }) => {
  const { backendUrl, token, userData, darkMode } = useContext(AppContext);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false); // new: track if input box is open for updating

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/reviews/${providerId}`);
      if (data.success) {
        setReviews(data.reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (error) {
      console.error("fetchReviews:", error);
      toast.error(error.response?.data?.message || "Failed to load reviews", {
        theme: darkMode ? "dark" : "light",
      });
    }
  };

  useEffect(() => {
    if (providerId) fetchReviews();
  }, [providerId]);

  // Find current user's review
  const myReview = userData
    ? reviews.find(r => r.userId && (r.userId._id === userData._id || r.userId._id === userData.id))
    : null;

  // Pre-fill comment & rating if review exists
  useEffect(() => {
    if (myReview && editing) {
      setComment(myReview.comment);
      setRating(myReview.rating);
    } else if (!editing) {
      setComment("");
      setRating(0);
    }
  }, [myReview, editing]);

  // Submit or update review
  const submitReview = async () => {
    if (!token) return toast.error("Please login to leave a review", { theme: darkMode ? "dark" : "light" });
    if (!rating) return toast.error("Please select a rating", { theme: darkMode ? "dark" : "light" });

    setLoading(true);
    try {
      const payload = { providerId, rating, comment };
      const { data } = await axios.post(`${backendUrl}/api/reviews`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success(data.message, { theme: darkMode ? "dark" : "light" });
        await fetchReviews();
        setEditing(false); // hide input box after posting
      } else {
        toast.error(data.message || "Failed", { theme: darkMode ? "dark" : "light" });
      }
    } catch (err) {
      console.error("submitReview:", err);
      toast.error(err.response?.data?.message || err.message || "Failed to submit review", {
        theme: darkMode ? "dark" : "light",
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete review
  const deleteReview = async (reviewId) => {
    if (!token) return toast.error("Please login", { theme: darkMode ? "dark" : "light" });

    confirmToast("Delete your review?", async () => {
      try {
        const { data } = await axios.delete(`${backendUrl}/api/reviews/${reviewId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          toast.success(data.message, { theme: darkMode ? "dark" : "light" });
          await fetchReviews();
          setEditing(false); // hide input if deleted
        } else {
          toast.error(data.message || "Failed", { theme: darkMode ? "dark" : "light" });
        }
      } catch (err) {
        console.error("deleteReview:", err);
        toast.error(err.response?.data?.message || err.message || "Failed to delete", {
          theme: darkMode ? "dark" : "light",
        });
      }
    });
  };

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Reviews</h3>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-bold">
            {reviews.length ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0}
          </span>{" "}
          ★ · {reviews.length} reviews
        </div>
      </div>

      {/* Submit / Update Review */}
      {(!myReview || editing) && (
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-sm mb-4">
          <div className="mb-2 flex items-center gap-2">
            {[1, 2, 3, 4, 5].map(i => (
              <Star
                key={i}
                filled={(hoverRating || rating) >= i}
                onClick={() => setRating(i)}
                onMouseEnter={() => setHoverRating(i)}
                onMouseLeave={() => setHoverRating(0)}
              />
            ))}
            <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">{rating ? `${rating} / 5` : "Rate"}</span>
          </div>

          <textarea
            rows="3"
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
          />

          <div className="flex gap-2">
            <button
              onClick={submitReview}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-800 disabled:opacity-60 transition"
            >
              {myReview && editing ? "Update Review" : "Submit Review"}
            </button>

            {myReview && editing && (
              <button
                onClick={() => {
                  setEditing(false);
                  setComment(myReview.comment);
                  setRating(myReview.rating);
                }}
                className="px-4 py-2 bg-gray-400 dark:bg-gray-600 text-white rounded hover:bg-gray-500 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}

      {/* Review List */}
      <div className="space-y-3">
        {reviews.length === 0 && <p className="text-gray-500 dark:text-gray-400">No reviews yet.</p>}

        {reviews.map(r => {
          const isMine = userData && r.userId && (r.userId._id === userData._id || r.userId._id === userData.id);
          return (
            <div
              key={r._id}
              className={`p-4 border rounded-lg flex gap-4 transition-shadow ${
                isMine ? "bg-blue-100 dark:bg-blue-950 border-blue-400 dark:border-blue-500" : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
              } hover:shadow-md`}
            >
              <img
                src={r.userId?.image || "https://www.gravatar.com/avatar?d=mp&s=64"}
                alt={r.userId?.name || "user"}
                className="w-12 h-12 rounded-full border-2 border-yellow-400 object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-semibold ${isMine ? "text-blue-700 dark:text-blue-300" : "text-gray-800 dark:text-gray-200"}`}>
                      {r.userId?.name || "User"}
                    </p>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <FaStar
                          key={i}
                          size={isMine ? 16 : 14}
                          className={i <= r.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}
                        />
                      ))}
                      <span className="ml-2 text-xs">{new Date(r.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {isMine && !editing && (
                    <div className="flex gap-2 mb-8">
                      <button
                        onClick={() => setEditing(true)}
                        className="text-blue-600 dark:text-blue-400 hover:underline text-xl"
                      >
                        <MdUpdate />
                      </button>
                      <button
                        onClick={() => deleteReview(r._id)}
                        className="text-red-500 dark:text-red-400 hover:underline  text-xl"
                      >
                        <AiFillDelete />
                      </button>
                    </div>
                  )}
                </div>
                <p className={`mt-2 ${isMine ? "text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300"}`}>
                  {r.comment}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewSection;
