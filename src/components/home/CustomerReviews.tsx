import React, { useEffect, useState } from 'react';
import { Review } from '../../types';
import { apiService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Star, MessageSquare, Plus, ThumbsUp, CheckCircle, X } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { currentUser } = useAuth();

  // Form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [packageName, setPackageName] = useState('Gaya Sacred Pind Daan Package');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  useEffect(() => {
    apiService.getReviews().then((data) => setReviews(data));
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment) return;

    const newRev: Partial<Review> = {
      userId: currentUser ? currentUser.id : 'usr-guest',
      userName: currentUser ? currentUser.name : 'Pilgrim Guest',
      userAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      rating,
      comment,
      packageName,
      isApproved: true,
    };

    try {
      const created = await apiService.createReview(newRev);
      setReviews([created, ...reviews]);
      setSubmittedMessage(true);
      setTimeout(() => {
        setSubmittedMessage(false);
        setModalOpen(false);
        setComment('');
      }, 2000);
    } catch (e) {
      console.error('Error submitting review:', e);
    }
  };

  return (
    <section className="py-14 bg-amber-50/50 dark:bg-amber-950/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900 dark:text-amber-100 tracking-tight">
              Pilgrim Experiences & Reviews
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-amber-200/80 mt-1">
              Read authentic feedback from families who completed their Gaya Vishnupad Yatra and Pind Daan.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition-all flex items-center gap-2 self-start md:self-end"
          >
            <Plus className="w-4 h-4" /> Write a Review
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white dark:bg-amber-950 border border-amber-200/80 dark:border-amber-800/60 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        rev.userAvatar ||
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
                      }
                      alt={rev.userName}
                      className="w-10 h-10 rounded-full object-cover border border-amber-400"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-stone-900 dark:text-amber-100 font-serif">
                        {rev.userName}
                      </h4>
                      <p className="text-[11px] text-stone-500 dark:text-amber-400">
                        {rev.packageName || 'Gaya Pilgrim'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-stone-700 dark:text-amber-200/90 leading-relaxed italic">
                  "{rev.comment}"
                </p>

                {rev.images && rev.images.length > 0 && (
                  <div className="flex items-center gap-2 pt-1">
                    {rev.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="Pilgrim photo"
                        className="w-16 h-16 rounded-lg object-cover border border-amber-200"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Admin Reply if exists */}
              {rev.adminReply && (
                <div className="p-3 bg-amber-50 dark:bg-amber-900/40 rounded-xl border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                  <span className="font-bold text-[10px] uppercase text-amber-700 dark:text-amber-300 block">
                    Response from Purva Yatra Team:
                  </span>
                  <p className="italic text-[11px]">{rev.adminReply}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-amber-950 rounded-2xl max-w-md w-full p-6 border border-amber-200 dark:border-amber-800 shadow-2xl relative space-y-4">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 dark:text-amber-300"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-amber-100">
              Share Your Purva Yatra Experience
            </h3>

            {submittedMessage ? (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 rounded-xl text-center font-bold text-xs">
                ✓ Thank you! Your review has been submitted.
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                    Select Package
                  </label>
                  <select
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs text-stone-900 dark:text-amber-100"
                  >
                    <option value="Gaya Sacred Pind Daan Package">Gaya Sacred Pind Daan Package</option>
                    <option value="Complete Gaya & Bodh Gaya Yatra">Complete Gaya & Bodh Gaya Yatra</option>
                    <option value="Express Same-Day Yatra">Express Same-Day Yatra</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 text-amber-500"
                      >
                        <Star
                          className={`w-6 h-6 ${star <= rating ? 'fill-amber-500' : 'text-stone-300'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                    Your Review / Feedback
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your pilgrimage, Pandit service, hotel stay, and transport experience..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-3 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs text-stone-900 dark:text-amber-100"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs transition-colors"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
