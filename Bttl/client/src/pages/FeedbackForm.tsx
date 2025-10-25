import React, { useState, useEffect } from "react";
import Header2 from "../components/Header2.tsx";
import Footer1 from "../components/Footer1.tsx";
import handleLogout from "../components/handleLogout.tsx";
import { useAppSelector } from "../hooks/Hook.ts";
import { toast } from "react-toastify";
import Pagination2 from "../components/Pagination2.tsx";
import { feedbackApi, type Feedback, type SubmitFeedbackData } from "../apis/feedbackApi.ts";

export const FeedbackForm = () => {
    const { currentUser } = useAppSelector((state) => state.user);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadFeedback();
    }, []);

    const loadFeedback = async () => {
        try {
            const feedbacks = await feedbackApi.getAllFeedback();
            console.log('feedbacks:', feedbacks);
            setFeedbackList(Array.isArray(feedbacks) ? feedbacks : []);
        } catch (error) {
            console.error('Error loading feedback:', error);
            toast.error('Lỗi tải đánh giá!');
        }
    };


    const [currPage, setCurrPage] = useState(1);
    const perPage = 4;
    const totalPages = Math.ceil(feedbackList.length / perPage);

    const start = (currPage - 1) * perPage;
    const end = start + perPage;
    const paginatedFeedback = feedbackList.slice(start, end);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrPage(page);
        }
    };

    const ratingStats = [5, 4, 3, 2, 1].map((star) => {
        const count = feedbackList.filter((fb) => fb.rating === star).length;
        const percentage = feedbackList.length
            ? Math.round((count / feedbackList.length) * 100)
            : 0;
        return { star, count, percentage };
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0 || !comment.trim()) {
            toast.warning("Vui lòng chọn số sao và nhập nội dung đánh giá!!", { autoClose: 2000 });
            return;
        }

        setLoading(true);

        try {
            const feedbackData: SubmitFeedbackData = {
                user_id: currentUser?.id ? Number(currentUser.id) : null,
                user_name: currentUser?.fullName || currentUser?.email || "Khách",
                user_avatar: currentUser?.avatar || null,
                rating,
                comment: comment.trim()
            };

            await feedbackApi.submitFeedback(feedbackData);

            await loadFeedback();

            setRating(0);
            setComment("");
            toast.success("Cảm ơn bạn đã gửi đánh giá!!", { autoClose: 1500 });

            setTimeout(() => {
                setShowModal(false);
            }, 1500);
        } catch (error) {
            console.error('Error submitting feedback:', error);
            toast.error('Lỗi gửi đánh giá! Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString("vi-VN");
    };

    return (
        <>
            <Header2 onLogout={handleLogout} />
            <div className="feedback-page bg-[#FAFBFC]">
                <p className="text-2xl font-bold">Hãy đánh giá trải nghiệm của bạn</p>
                <p style={{listStyleType: "none", paddingLeft: "2rem", margin: "1rem", fontFamily: "'Berkshire Swash', cursive", color: "#555", lineHeight: "1.8",}}>Đó là cách chúng tôi ghi nhận và cải tiến UniLife Hub ngày một thân thiện hơn</p>
                <button className="show-form-btn bg-amber-400" onClick={() => setShowModal(true)}>
                    Đánh giá ngay
                </button>

                <div className="rating-stats">
                    <h3>Thống kê đánh giá</h3>
                    {ratingStats.map((stat) => (
                        <div key={stat.star} className="stat-row">
                            <span>{stat.star} ★</span>
                            <div className="progress-bar">
                                <div
                                    className="progress"
                                    style={{ width: `${stat.percentage}%` }}
                                />
                            </div>
                            <span>
                                {stat.count} N
                            </span>
                        </div>
                    ))}
                </div>

                <div className="feedback-list">
                    <h3>Phản hồi của người dùng</h3>
                    {feedbackList.length === 0 ? (
                        <p className="empty">Chưa có đánh giá nào.</p>
                    ) : (
                        paginatedFeedback.map((fb) => (
                            <div className="feedback-item" key={fb.id}>
                                <div className="feedback-header">
                                    <div className="user-info">
                                        {fb.user_avatar && <img src={fb.user_avatar} alt="avatar" className="avatar" />}
                                        <span className="user">{fb.user_name}</span>
                                    </div>
                                    <span className="stars-show">{"★".repeat(fb.rating)}</span>
                                </div>
                                <p className="comment">{fb.comment}</p>
                                <span className="date">{formatDate(fb.created_at)}</span>
                            </div>
                        ))
                    )}
                    {totalPages > 1 && (
                        <Pagination2
                            currPage={currPage}
                            totalPages={totalPages}
                            onChangePage={handlePageChange}
                        />
                    )}
                </div>
            </div>

            <div className="mt-[-105px]"></div>

            <Footer1 />

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>Đánh giá website UniLife Hub</h2>

                        <div className="stars-section">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${star <= (hover || rating) ? "active" : ""}`}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                >
                                  ★
                                </span>
                            ))}
                            <p className="rating-text">
                                {rating ? `Bạn đã chọn: ${"★".repeat(rating)}` : "Vui lòng chọn số sao"}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
              <textarea
                  rows={5}
                  placeholder="Nhập nhận xét của bạn..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  disabled={loading}
              />
                            <button type="submit" disabled={loading}>
                                {loading ? 'Đang gửi...' : 'Gửi đánh giá'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
                .feedback-page {
                    min-height: 100vh;
                    color: #333;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 40px 10px;
                }

                .show-form-btn {
                    color: #142457;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    margin-bottom: 25px;
                    transition: 0.3s;
                }

                .show-form-btn:hover {
                    background: #e0a800;
                }

                .modal-overlay {
                    position: fixed;
                    top: 0; left: 0;
                    width: 100vw; height: 100vh;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }

                .modal-content {
                    background: white;
                    padding: 25px;
                    border-radius: 12px;
                    max-width: 500px;
                    width: 90%;
                    text-align: center;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
                }

                .stars-section {
                    font-size: 2rem;
                    margin-bottom: 10px;
                }

                .star {
                    cursor: pointer;
                    color: #ccc;
                    transition: 0.2s;
                    padding: 3px;
                }

                .star.active {
                    color: #ffc107;
                    text-shadow: 0 0 6px rgba(255, 193, 7, 0.6);
                }

                .rating-text {
                    font-size: 0.9rem;
                    color: #666;
                    margin-bottom: 15px;
                }

                .modal-content textarea {
                    width: 100%;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 10px;
                    font-size: 1rem;
                    resize: none;
                    margin-bottom: 15px;
                    outline: none;
                }

                .modal-content textarea:focus {
                    border: 2px solid #142457;
                }

                .modal-content button {
                    width: 100%;
                    background: #142457;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    padding: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: 0.3s;
                }

                .modal-content button:hover:not(:disabled) {
                    background: #1e3789;
                }

                .modal-content button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .feedback-list {
                    background: white;
                    margin-top: 25px;
                    border-radius: 12px;
                    padding: 20px;
                    max-width: 600px;
                    width: 100%;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }

                .feedback-list h3 {
                    color: #142457;
                    margin-bottom: 15px;
                }

                .feedback-item {
                    background: #f8f9fa;
                    border-radius: 8px;
                    padding: 12px 15px;
                    margin-bottom: 10px;
                }

                .feedback-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .user-info {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    object-fit: cover;
                }

                .user {
                    font-weight: bold;
                    color: #142457;
                }

                .stars-show {
                    color: #ffc107;
                    font-size: 1.1rem;
                }

                .comment {
                    margin-top: 6px;
                    font-size: 0.95rem;
                    color: #333;
                }

                .date {
                    font-size: 0.8rem;
                    color: #888;
                    display: block;
                    margin-top: 4px;
                    text-align: right;
                }

                .empty {
                    color: #777;
                    text-align: center;
                    font-style: italic;
                }

                .rating-stats {
                    background: #fff;
                    padding: 15px 20px;
                    border-radius: 12px;
                    margin-bottom: 20px;
                    max-width: 500px;
                    width: 100%;
                    max-width: 600px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }

                .stat-row {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 8px;
                }

                .progress-bar {
                    flex: 1;
                    height: 10px;
                    background: #eee;
                    border-radius: 5px;
                    overflow: hidden;
                }

                .progress {
                    height: 100%;
                    background: #ffc107;
                }
            `}</style>
        </>
    );
};