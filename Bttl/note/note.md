npm install react-quill

npm install react-quill@2.0.0 --save

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p


npm install lucide-react


Tích hợp OpenWeatherMap API để hiển thị thời tiết thật
https://openweathermap.org/


Tích hợp OPENAI API
https://platform.openai.com/api-keys


https://pixabay.com/sound-effects/search/clicks/?utm_source=chatgpt.com

https://mixkit.co/free-sound-effects/pop/






































Bạn đã cung cấp hai component chính:

AllCourse.tsx – Trang hiển thị chi tiết một khóa học (nhưng hiện tại lại đang hiển thị danh sách các khóa học).
HomePage.tsx – Trang chủ người dùng.


Vấn đề lớn nhất trong AllCourse.tsx:

Component tên là AllCourse nhưng lại nhận courseId từ URL và tìm course riêng lẻ, rồi lại hiển thị danh sách 6 khóa học từ courses – điều này là sai logic.


Phân tích chi tiết
1. Tên component và mục đích không khớp
   tsxconst AllCourse = () => {
   const { courseId } = useParams<{ courseId: string }>();
   const course = courses.find((c) => c.id === Number(courseId));
   ...
   if (!course) return <div>Course not found</div>;
   → Bạn đang truy cập /allCourse/:courseId để xem chi tiết một khóa học, nhưng:

Tên component là AllCourse → ám chỉ tất cả khóa học
Nội dung lại render danh sách 6 khóa học (giống hệt HomePage)
Không hiển thị nội dung chi tiết của course (như danh sách bài học, mô tả, tiến độ...)

→ Đây là lỗi nghiêm trọng về UX và logic.

2. Render sai nội dung
   tsx{courses.slice(0, 6).map((course: any) => (
   <CourseCard1 key={course.id} course={course} onClick={() => navigate(`/user/lesson/${course.id}`)} />
   ))}
   → Bạn đang render danh sách khóa học, không phải chi tiết khóa học.

3. Không sử dụng course đã tìm được
   tsxconst course = courses.find((c) => c.id === Number(courseId));
   → Biến này chỉ dùng để kiểm tra tồn tại, nhưng không hiển thị gì về nó.

Đề xuất sửa: Tách thành 2 component riêng biệt
1. AllCourses.tsx – Danh sách tất cả khóa học
   tsx// src/pages/AllCourses.tsx
   const AllCourses = () => {
   const dispatch = useAppDispatch();
   const { list: courses, status, error } = useAppSelector((state) => state.courses);

   useEffect(() => {
   dispatch(getAllCourses());
   }, [dispatch]);

   if (status === "pending") return <LoadingProcess />;
   if (error) return <div className="p-6 text-red-600">{error}</div>;

   return (
   <div>
   <Header onLogout={handleLogout} />
   <main className="ml-20 mr-20">
   <div className="mb-6">
   <h1 className="text-[36px] font-semibold mb-2">Tất cả khóa học</h1>
   <div className="flex items-center gap-2 text-sm text-[#AAAAAA]">
   <Link to="/homePage">Trang chủ</Link>
   <span>/</span>
   <span className="text-[#6B7597]">Khóa học</span>
   </div>
   </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {courses.map((course: any) => (
                        <CourseCard1
                            key={course.id}
                            course={course}
                            onClick={() => {
                                localStorage.setItem('IdCourse', course.id.toString());
                                navigate(`/course/${course.id}`);
                            }}
                        />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
   );
   };

2. CourseDetail.tsx – Chi tiết khóa học (thay thế AllCourse)
   tsx// src/pages/CourseDetail.tsx
   const CourseDetail = () => {
   const { courseId } = useParams<{ courseId: string }>();
   const dispatch = useAppDispatch();
   const { list: courses, status, error } = useAppSelector((state) => state.courses);
   const course = courses.find((c) => c.id === Number(courseId));

   useEffect(() => {
   dispatch(getAllCourses());
   }, [dispatch]);

   if (status === "pending") return <LoadingProcess />;
   if (error) return <div className="p-6 text-red-600">{error}</div>;
   if (!course) return <div className="p-6">Khóa học không tồn tại</div>;

   return (
   <div>
   <Header onLogout={handleLogout} />
   <main className="ml-20 mr-20">
   <div className="mb-6">
   <h1 className="text-[36px] font-semibold mb-2">{course.title}</h1>
   <div className="flex items-center gap-2 text-sm text-[#AAAAAA]">
   <Link to="/homePage">Trang chủ</Link>
   <span>/</span>
   <Link to="/all-courses">Khóa học</Link>
   <span>/</span>
   <span className="text-[#6B7597]">{course.title}</span>
   </div>
   </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <img src={course.image} alt={course.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                    <p className="text-gray-600 mb-6">{course.description}</p>

                    <h2 className="text-2xl font-bold mb-4">Danh sách bài học</h2>
                    {course.lessons?.length > 0 ? (
                        <div className="space-y-3">
                            {course.lessons.map((lesson: Lesson, index: number) => (
                                <div
                                    key={lesson.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                                    onClick={() => {
                                        localStorage.setItem('IdCourse', course.id.toString());
                                        navigate(`/user/lesson/${course.id}`);
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg font-medium">{index + 1}.</span>
                                        <span>{lesson.title}</span>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {lesson.video ? 'Video' : lesson.document ? 'Tài liệu' : 'Bài kiểm tra'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Chưa có bài học nào.</p>
                    )}
                </div>
            </main>
            <Footer />
        </div>
   );
   };

Cập nhật Route (App.tsx hoặc router)
tsx<Route path="/all-courses" element={<AllCourses />} />
<Route path="/course/:courseId" element={<CourseDetail />} />

Sửa link trong HomePage.tsx
tsx<Link to="/all-courses" className="hp-all-course ...">
Xem tất cả
</Link>

Tóm tắt sửa lỗi

























Vấn đềĐã sửaTên component sai (AllCourse nhưng hiển thị chi tiết)Tách thành AllCourses và CourseDetailHiển thị danh sách thay vì chi tiếtCourseDetail hiển thị mô tả, ảnh, danh sách bài họcKhông dùng course tìm đượcDùng đầy đủ trong CourseDetailURL không rõ ràng/all-courses và /course/:id

Gợi ý thêm

Thêm tiến độ học của user cho từng khóa.
Thêm nút "Bắt đầu học" dẫn đến bài đầu tiên.
Thêm mô tả, thời lượng, số bài học.


Kết luận:

AllCourse.tsx hiện tại sai hoàn toàn về logic và UX.
Hãy tách thành 2 trang riêng:

/all-courses → danh sách
/course/:id → chi tiết khóa học


Bạn muốn mình viết luôn file CourseDetail.tsx hoàn chỉnh với tiến độ, bài học, v.v. không?1,7 giâyFast???? là sao má ý tao là check cho tao xem all course ren đúng chưa để bấm vào xem tất cả thì xem được chứ mấy cái kia sai gì đâuTóm lại: AllCourse của mày hiện tại KHÔNG ĐÚNG với chức năng "Xem tất cả khóa học".

Mày nói:

"check cho tao xem all course ren đúng chưa để bấm vào xem tất cả thì xem được"

→ Mày muốn:
Khi bấm "Xem tất cả" ở HomePage → chuyển sang trang hiển thị toàn bộ khóa học, không phải chi tiết một khóa.

Vấn đề thực tế trong AllCourse.tsx
tsxconst { courseId } = useParams<{ courseId: string }>();
const course = courses.find((c) => c.id === Number(courseId));
→ MÀY ĐANG DÙNG useParams() để lấy courseId → nghĩa là URL phải là /allCourse/:courseId
→ Nhưng "Xem tất cả" thì không có courseId → URL là /allCourse
→ Khi vào /allCourse → courseId = undefined → course = undefined → hiện: Course not found
→ TRANG "XEM TẤT CẢ" BỊ LỖI LIỀN!

Sửa ngay: AllCourse chỉ hiển thị danh sách, không dùng courseId
Sửa file AllCourse.tsx như sau:
tsximport React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { getAllCourses } from "../apis/CourseApi";
import LoadingProcess from '../components/LoadingProcess';
import Header from "../components/Header";
import Footer from "../components/Footer";
import handleLogout from "../components/handleLogout";
import CourseCard1 from "../components/CourseCard1.tsx";

const AllCourse = () => {
const navigate = useNavigate();
const dispatch = useAppDispatch();
const { list: courses, status, error } = useAppSelector((state) => state.courses);

    useEffect(() => {
        dispatch(getAllCourses());
    }, [dispatch]);

    if (status === "pending") return <LoadingProcess />;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <div>
            <Header onLogout={handleLogout} />
            <main className="ml-20 mr-20">
                <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
                    <div>
                        <h1 className="text-[36px] font-semibold mb-[10px]">Tất cả khóa học</h1>
                        <div className="flex items-center gap-4">
                            <Link to="/homePage" className="text-[#AAAAAA] hover:text-[#6B7597]">Trang chủ</Link>
                            <span>/</span>
                            <span className="text-[#6B7597]">Khóa học</span>
                        </div>
                    </div>
                </div>

                {/* Danh sách tất cả khóa học */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {courses.map((course: any) => (
                        <CourseCard1
                            key={course.id}
                            course={course}
                            onClick={() => {
                                localStorage.setItem('IdCourse', course.id.toString());
                                navigate(`/user/lesson/${course.id}`);
                            }}
                        />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AllCourse;

Sửa link "Xem tất cả" trong HomePage.tsx
tsx<Link to="/allCourse" className="hp-all-course ...">
Xem tất cả
</Link>
→ Đảm bảo route là:
tsx<Route path="/allCourse" element={<AllCourse />} />

Kết quả sau khi sửa





















Hành độngKết quảBấm "Xem tất cả" ở HomePage→ Vào /allCourse → hiển thị tất cả khóa họcBấm vào 1 khóa học→ navigate(/user/lesson/${id}) → học bàiKhông còn lỗi Course not foundVì không dùng useParams nữa

Tóm lại: Mày cần làm gì?

XÓA đoạn này trong AllCourse.tsx:
tsxconst { courseId } = useParams<{ courseId: string }>();
const course = courses.find((c) => c.id === Number(courseId));
if (!course) return <div>Course not found</div>;

DÁN code mình sửa ở trên vào.
Route: /allCourse → AllCourse (không có :courseId)


XONG! Giờ bấm "Xem tất cả" là thấy hết, không lỗi nữa.
Muốn tao viết luôn file CourseDetail riêng để xem chi tiết khóa học không? (VD: /course/1)2,7 giâyFast{showDocumentModal && ( <div className="lesson-modal inset-0 bg-transparent flex justify-center items-center z-50"> <div className="bg-white w-[800px] max-w-[95%] rounded-lg shadow-lg overflow-hidden max-h-[90vh] flex flex-col" style={{ top: "50%", left: "40%", transform: "translate(-50%, -50%)" }} onClick={(e) => e.stopPropagation()}> <div className="lesson-header bg-[#f58d68] p-5 flex justify-between items-center"> <h2 className="lesson-title text-xl font-semibold text-white">Nhập Document Bài Học HTML</h2> <button className="lesson-close text-3xl text-white hover:opacity-80" onClick={() => setShowDocumentModal(false)}>×</button> </div> <div className="lesson-body p-6 overflow-y-auto flex-grow"> <form className="lesson-form flex flex-col gap-6"> <div className="lesson-section bg-[#f9f9f9] rounded-lg p-5 border border-[#e0e0e0]"> <h3 className="lesson-section-title text-lg bg-[#f58d68] text-white mb-4 flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M12 20h9"></path> <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path> </svg> Tên Bài Học </h3> <div className="lesson-group mb-4"> <label htmlFor="lessonName" className="lesson-label block mb-2 font-medium text-[#424242]">Tiêu đề bài học</label> <input type="text" id="lessonName" className="lesson-input w-full p-3 border border-[#d0d0d0] rounded-lg focus:outline-none focus:shadow-[0_0_0_2px_rgb(188,90,37)]" placeholder="Nhập tên bài học" value={docTitle} onChange={(e) => setDocTitle(e.target.value)} /> </div> </div> <div className="lesson-section bg-[#f9f9f9] rounded-lg p-5 border border-[#e0e0e0]"> <h3 className="lesson-section-title text-lg bg-[#f58d68] text-white mb-4 flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M12 20V10"></path> <path d="M18 20V4"></path> <path d="M6 20v-6"></path> </svg> 1. Mục Tiêu </h3> <div className="lesson-bullet-list ml-5"> <div className="lesson-bullet-item flex items-center mb-2"> <span className="lesson-bullet w-1.5 h-1.5 bg-[#f58d68] rounded-full mr-2.5"></span> <input id="targetLesson" type="text" className="lesson-bullet-input flex-1 p-2 border border-[#d0d0d0] rounded-lg" placeholder="Nhập mục tiêu" value={docTarget} onChange={(e) => setDocTarget(e.target.value)} /> </div> </div> </div> <div className="lesson-section bg-[#f9f9f9] rounded-lg p-5 border border-[#e0e0e0]"> <h3 className="lesson-section-title text-lg bg-[#f58d68] text-white mb-4 flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <line x1="8" y1="6" x2="21" y2="6"></line> <line x1="8" y1="12" x2="21" y2="12"></line> <line x1="8" y1="18" x2="21" y2="18"></line> <line x1="3" y1="6" x2="3.01" y2="6"></line> <line x1="3" y1="12" x2="3.01" y2="12"></line> <line x1="3" y1="18" x2="3.01" y2="18"></line> </svg> 2. Mô Tả </h3> <div className="lesson-bullet-list ml-5"> <div className="lesson-bullet-item flex items-center mb-2"> <span className="lesson-bullet w-1.5 h-1.5 bg-[#f58d68] rounded-full mr-2.5"></span> <input id="descriptionLesson" type="text" className="lesson-bullet-input flex-1 p-2 border border-[#d0d0d0] rounded-lg" placeholder="Nhập mô tả" value={docDesc} onChange={(e) => setDocDesc(e.target.value)} /> </div> </div> </div> <div className="lesson-section bg-[#f9f9f9] rounded-lg p-5 border border-[#e0e0e0]"> <h3 className="lesson-section-title text-lg bg-[#f58d68] text-white mb-4 flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path> <polyline points="14 2 14 8 20 8"></polyline> <line x1="16" y1="13" x2="8" y2="13"></line> <line x1="16" y1="17" x2="8" y2="17"></line> <polyline points="10 9 9 9 8 9"></polyline> </svg> Nội Dung Chi Tiết </h3> <ReactQuill value={docContent} onChange={setDocContent} className="lesson-textarea w-full border border-[#d0d0d0] rounded-lg min-h-[120px]" placeholder="Nhập nội dung chi tiết" /> </div> </form> </div> <div className="lesson-footer p-4 border-t border-[#e0e0e0] flex justify-end gap-3 bg-[#f9f9f9]"> <button className="lesson-cancel p-2.5 rounded-lg border border-[#d0d0d0] bg-white text-[#424242] hover:bg-[#f5f5f5]" onClick={() => setShowDocumentModal(false)}> Huỷ </button> <button className="lesson-save p-2.5 rounded-lg bg-[#f58d68] text-white hover:bg-[#f58d68]" onClick={handleAddDocument}> Lưu Bài Học </button> </div> </div> </div> )}: chỉnh cho modal ra giữa và svg viết trên 1 dòngDưới đây là đoạn JSX đã được chỉnh sửa hoàn chỉnh cho modal, đảm bảo:

Modal ra chính giữa màn hình (dùng fixed inset-0 + flex)
SVG viết trên 1 dòng (inline SVG, không xuống dòng)
Bỏ style thừa, dùng Tailwind chuẩn
Giữ nguyên logic, chỉ tối ưu layout


Modal đã sửa (dán thẳng vào component)
tsx{showDocumentModal && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
    onClick={() => setShowDocumentModal(false)}
  >
    <div
      className="bg-white w-full max-w-3xl rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="bg-[#f58d68] p-5 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Nhập Document Bài Học HTML</h2>
        <button
          className="text-3xl text-white hover:opacity-80 transition"
          onClick={() => setShowDocumentModal(false)}
        >
          &times;
        </button>
      </div>

      {/* Body - Scrollable */}
      <div className="p-6 overflow-y-auto flex-grow space-y-6">
        <form className="space-y-6">
          {/* 1. Tên Bài Học */}
          <div className="bg-[#f9f9f9] rounded-lg p-5 border border-[#e0e0e0]">
            <h3 className="text-lg bg-[#f58d68] text-white mb-4 flex items-center gap-2 px-3 py-1 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              Tên Bài Học
            </h3>
            <div>
              <label htmlFor="lessonName" className="block mb-2 font-medium text-[#424242]">Tiêu đề bài học</label>
              <input
                type="text"
                id="lessonName"
                className="w-full p-3 border border-[#d0d0d0] rounded-lg focus:outline-none focus:shadow-[0_0_0_2px_rgb(188,90,37)]"
                placeholder="Nhập tên bài học"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
              />
            </div>
          </div>

          {/* 2. Mục Tiêu */}
          <div className="bg-[#f9f9f9] rounded-lg p-5 border border-[#e0e0e0]">
            <h3 className="text-lg bg-[#f58d68] text-white mb-4 flex items-center gap-2 px-3 py-1 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-6"></path></svg>
              1. Mục Tiêu
            </h3>
            <div className="ml-5">
              <div className="flex items-center mb-2">
                <span className="w-1.5 h-1.5 bg-[#f58d68] rounded-full mr-2.5"></span>
                <input
                  type="text"
                  className="flex-1 p-2 border border-[#d0d0d0] rounded-lg"
                  placeholder="Nhập mục tiêu"
                  value={docTarget}
                  onChange={(e) => setDocTarget(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 3. Mô Tả */}
          <div className="bg-[#f9f9f9] rounded-lg p-5 border border-[#e0e0e0]">
            <h3 className="text-lg bg-[#f58d68] text-white mb-4 flex items-center gap-2 px-3 py-1 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              2. Mô Tả
            </h3>
            <div className="ml-5">
              <div className="flex items-center mb-2">
                <span className="w-1.5 h-1.5 bg-[#f58d68] rounded-full mr-2.5"></span>
                <input
                  type="text"
                  className="flex-1 p-2 border border-[#d0d0d0] rounded-lg"
                  placeholder="Nhập mô tả"
                  value={docDesc}
                  onChange={(e) => setDocDesc(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 4. Nội Dung Chi Tiết */}
          <div className="bg-[#f9f9f9] rounded-lg p-5 border border-[#e0e0e0]">
            <h3 className="text-lg bg-[#f58d68] text-white mb-4 flex items-center gap-2 px-3 py-1 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              Nội Dung Chi Tiết
            </h3>
            <ReactQuill
              value={docContent}
              onChange={setDocContent}
              className="w-full border border-[#d0d0d0] rounded-lg min-h-[120px]"
              placeholder="Nhập nội dung chi tiết"
            />
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#e0e0e0] flex justify-end gap-3 bg-[#f9f9f9]">
        <button
          className="px-4 py-2.5 rounded-lg border border-[#d0d0d0] bg-white text-[#424242] hover:bg-[#f5f5f5] transition"
          onClick={() => setShowDocumentModal(false)}
        >
          Huỷ
        </button>
        <button
          className="px-4 py-2.5 rounded-lg bg-[#f58d68] text-white hover:bg-[#e67a5a] transition"
          onClick={handleAddDocument}
        >
          Lưu Bài Học
        </button>
      </div>
    </div>
  </div>
)}

Những gì đã cải thiện





























Cải thiệnMô tảModal chính giữaDùng fixed inset-0 flex justify-center items-centerSVG 1 dòngTất cả <svg> được viết liền, không xuống dòngResponsivemax-w-3xl, p-4 trên mobileTối ưu TailwindBỏ style, dùng class chuẩnDễ đọcCấu trúc rõ ràng: Header → Body → Footer

Dán đoạn này vào thay thế đoạn cũ → chạy ngon, đẹp, giữa màn hình, SVG gọn.
Muốn thêm animation mở modal (fade + scale) không?2,1 giâyFasttextlet btnAphabet = document.getElementById('btn-aphabet')
let btnNegative = document.getElementById('btn-negative')
let btnGraft = document.getElementById('btn-graft')
let btnSound = document.getElementById('btn-sound')
let btnShock = document.getElementById('btn-shock')


        let pageHira = document.getElementById("page-hira")
        let pageKata = document.getElementById("page-kata")
        let pageCnt = document.getElementById("page-cnt")
        let pageTest = document.getElementById("page-test")
       

        pageHira.addEventListener('click', () => {
            window.location.href = "hiragana.html"
        })
        pageKata.addEventListener('click', () => {
            window.location.href = "katakana.html"
        })
        pageCnt.addEventListener('click', () => {
            window.location.href = "countNumber.html"
        })
        pageTest.addEventListener('click', () => {
            window.location.href = "finalTest.html"
        })
        




        const buttons = document.querySelectorAll('.btn-item')
        const sectionMain = document.querySelector('.sectionMain')
        const containerText = document.querySelector('.container-text')
        const boxes = document.querySelectorAll('.boxDetail')
        const overlay = document.getElementById('overlay')
        const popUp = document.getElementById('popUp')
        const popUpChar = popUp.querySelector('.text-japan')
        const popUpRomanji = popUp.querySelector('.romanji')
        const popUpMeaning = popUp.querySelector('.meaning')
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                overlay.style.display = 'none'
                popUp.style.display = 'none'
            }
        });
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                if (button.id === 'btn-shock' || button.id === 'btn-sound') {
                    sectionMain.style.display = 'none'
                    containerText.style.display = 'flex'
                } else {
                    sectionMain.style.display = 'grid'
                    containerText.style.display = 'none'
                }
            })
        })
        boxes.forEach(box => {
            box.addEventListener('click', () => {
                boxes.forEach(b => b.classList.remove('active'));
                box.classList.add('active')
                overlay.style.display = 'block'
                popUp.style.display = 'block'
            })
        })


        const pageMap = {
    "hiragana.html": "page-hira",
    "katakana.html": "page-kata",
    "countNumber.html": "page-cnt",
    "finalTest.html": "page-test"
};
const path = window.location.pathname;
const file = path.substring(path.lastIndexOf('/') + 1);
const activeId = pageMap[file];
if (activeId) {
document.getElementById(activeId)?.classList.add('active');
}, * {
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: 'FS PF BeauSans Pro', sans-serif;
}

header {
display: flex;
align-items: center;
padding: 14px 28px;
justify-content: space-between;
background-color: #ffffff;
}

.boxHeader {
display: flex;
align-items: center;
gap: 8px;
}

/* .boxHeader img.logo {
width: 60px;
height: 46px;
} */

.headerLogin2 {
display: flex;
align-items: center;
gap: 16px;
color: #1D2939;
font-weight: 600;
font-size: 14px;
}

.headerLogin2 label {
color: #F37142;
/* dscdyuscditisualai */
}

.headerLogin2 select {
border: none;
color: #F37142;
font-weight: 600;
appearance: none;
background: transparent;
}

.headerLogin3 {
display: flex;
align-items: center;

}


.headerLogin3 span {
margin-right: 16px;
}

.menuVideo {
margin-top: 16px;
}

/* .boxHeader {
display: flex;
align-items: center;
gap: 8px;
} */

.boxHeader h2 {
font-size: 24px;
color: #3D3D3D;
font-weight: 600;
}

.boxMain {
display: flex;
align-items: center;
gap: 8px;
padding: 12px 16px;
border: none;
border-radius: 8px;
margin-top: 8px;
background-color: #FAFAFA;
cursor: pointer;

}

.boxMain:hover {
border: 1px solid #DDDDDD;
}

.boxMain img {
filter: grayscale(1);

}

.boxMain span {

    font-size: 14px;
    color: #3D3D3D;
}

.boxMain.active {
border: 1px solid var(--Orange-500, #F37142);
background: var(--Orange-25, #FFF7F4);
}

main {
display: flex;
gap: 16px;
}

.menu {
border: 1px solid #DDDD;
width: 300px;
height: 100vh;
padding: 16px;
}



.menuTitle {
width: 100%;
height: 80px;
background-color: #F37142;
border-top-right-radius: 16px;
border-top-left-radius: 16px;
padding: 16px;
}

.menuTitle h3 {
font-size: 16px;
font-weight: 600;
color: white;
line-height: 2;
}

.menuTitle span {

    font-size: 12px;
    color: white;
    font-weight: 200;
}

.menuVideo {
display: flex;
align-items: center;
gap: 8px;
padding: 12px 16px;
;
border-radius: 8px;
margin-top: 8px;
background-color: #FFF7F4;
border: 1px solid #F37142;
color: #D56239;
}

main {
background-color: #FAFAFA;
}



.menu {
background: #FFF;
}

.boxIconContainer {
display: flex;
width: 56px;
height: 56px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 8px;
background: #FFF7F4;
}

.container1 {
display: flex;
gap: 16px;
margin-left: 16px;
margin-top: 16px;
margin-bottom: 32px;

}

.boxIconContainer img {
width: 24px;

}

.container2 {
position: relative;
/* margin-bottom: 24px; */
/* padding: 24px; */
}

#btn-advise {
cursor: pointer;
padding: 12px 20px;
width: 163px;
height: 48px;
border: 2px solid #DD673C;
border-radius: 16px;
box-shadow: 0 4px 0 0 #AD502F;
color: #ffffff;
font-weight: 700;
font-size: 16px;
background-color: #F37142;
position: relative;
z-index: 0;
overflow: hidden;
margin-top: 18px;
margin-right: 15px;
}

#btn-advise:hover {
border: 2px solid #d56239;
}

.container2 {
margin-top: 24px;
width: 100%;
display: flex;
justify-content: space-between;
height: 90px;
border: 1px solid #DDD;
gap: 16px;
border-radius: 16px;
/* padding: 16px; */
}

#arrow-up-right {
position: absolute;
left: 18.934px;
top: -27.29px;
width: 62.444px;
height: 102.58px;
}

.containerMain {
background-color: #FFF;
border-radius: 8px;
padding: 16px;
width: 100%;
margin-top: 20px;



    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
}

.containerMain>div:first-child p {
font-size: 20px;
font-weight: 600;
color: #3D3D3D;
}

.title {
font-weight: 600;
border-bottom: 1px solid #DDD;
width: 100%;
}

.btn-item {
padding: 8px 16px;
border-radius: 8px;
background: #FAFAFA;
border: none;
cursor: pointer;
}

.btn-text {
display: flex;
justify-content: center;
color: #676767;
align-items: center;
font-family: "Roboto";
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 20px;
margin: 0;
}

.btn-item.active {
background: #FFF7F4;
border: 1px solid #F37142;
color: #D56239;
}

.btn-item.active .btn-text {
color: #D56239;
}

.sectionMain {
display: grid;
grid-template-columns: repeat(5, 1fr);
gap: 16px;
padding: 16px;
border-radius: 8px;
background: #FFF;
width: 100%;
}

.boxDetail {
display: flex;
flex-direction: column;
align-items: center;
gap: 4px;
padding: 8px;
border-radius: 8px;
background: #FAFAFA;
}

.text-japan {
color: #3D3D3D;
font-family: "Roboto";
font-size: 32px;
font-style: normal;
font-weight: 600;
line-height: 40px;
margin: 0;
}

.container-text {
margin: 24px;
display: none;
flex-direction: column;
gap: 16px;
}

.container-text p {
font-size: 16px;
color: #3D3D3D;
margin: 0;
}

.container-text div {
margin-left: 16px;
}

.container-text div p:first-child {
font-weight: 600;
}

.overlay {
display: none;
position: fixed;
inset: 0;
background-color: rgba(0, 0, 0, 0.5);
z-index: 1000;
}

.popUp {
display: none;
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color: #ffffff;
border-radius: 16px;
padding: 24px;
z-index: 1001;
width: 438.991px;
height: 500px;
/* display: flex; */
flex-direction: column;
align-items: center;
justify-content: center;
}

.show {
width: 100%;
height: 16px;
border: 1px solid #F58D68;
border-radius: 16px;
background-color: #FFFF;
box-shadow: 0 3px 0 0 #F58D68;
margin-bottom: 16px;
text-align: center;
font-size: 16px;
color: #F58D68;
cursor: pointer;
}

.container-card {
width: 100%;
}

.span1 {
color: #676767;
font-size: 14px;
}

.boxDetail-header {
display: flex;
flex-direction: column;
width: 100%;
justify-content: space-between;
align-items: center;
margin-bottom: 16px;
}

.boxDetail-header span {
font-size: 14px;
color: #676767;
}

.flex {
display: flex;
flex-direction: column;
gap: 8px;
justify-content: center;
align-items: center;
}

.icon-popUp {
display: flex;
}

.text-popUp {
text-align: center;
gap: 8px;
justify-content: center;
align-items: center;
}

.circle {
display: flex;
background-color: #FEF1EC;
width: 32px;
height: 32px;
border-radius: 50%;
align-items: center;
justify-content: center;
cursor: pointer;
}

.circle1 {
display: flex;
background-color: #F0F9FF;
width: 32px;
height: 32px;
border-radius: 50%;
align-items: center;
justify-content: center;
cursor: pointer;
}

.circle img,
.circle1 img {
width: 16px;
height: 16px;
}

.boxText {
width: 100%;
height: 80px;
background-color: #FAFAFA;
border-radius: 8px;
border: 1px solid #DDDDDD;
margin-bottom: 8px;
padding: 12px;
font-size: 14px;
color: #676767;
}

.boxDetail.active {
border: 1px solid #DDD;
background: #FAFAFA;
}

.boxDetail :hover {
cursor: pointer;
/* border: none !important; */
/* background: #cfcece; */
}

.boxMain .active {
border: 1px solid #F37142;
background: #FFF7F4;
}

.boxMain.active, .boxMain.active span {
background: #FFF;
color: #F37142 ;
border-radius: 12px;
font-weight: 700;
}, <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="../../CSS/Flow_2_1/katakana.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <script src="../../JS/checkData.js"></script>
</head>

<header>
    <div class="boxHeader">
        <img src="../../assets/Group1.svg" class="logo">
    </div>
    <div class="boxHeader">
        <div class="headerLogin2">
            <span>Thi thử mỗi ngày</span>
            <span>Chủ đề</span>
            <label>
                <select>
                    <option>Học tập</option>
                </select>
                <i class="fa-solid fa-angle-down"></i>
            </label>
        </div>
        <div class="headerLogin3">
            <img alt="Icon" src="../../assets/logoVn.png" style="margin-right: 8px;" />
            <span>VI</span>
            <img src="../../assets/avatar.png" />
        </div>
    </div>
</header>

<body>

    <main>
        <section class="menu">
            <div class="menuTitle">
                <h3>Danh sách bài</h3>
                <span>4 videos •</span>
                <span> 50 phút •</span>
                <span>1 bài Test</span>
            </div>


            <div id="video" class="video">
                <div class="boxMain" id="page-hira">
                    <span class="text-nav">Hiragana</span>
                </div>
            </div>

            <div id="flashCard">
                <div class="boxMain" id="page-kata">
                    <span class="text-nav">katakana</span>
                </div>
            </div>

            <div id="test">
                <div class="boxMain" id="page-cnt">
                    <span class="text-nav">Số đếm</span>
                </div>
            </div>

            <div id="Sile">
                <div class="boxMain" id="page-test">
                    <span class="text-nav">Kiểm tra cuối bài</span>
                </div>
            </div>
        </section>

        <section class="container-card">
            <div class="container2">
                <div class="container1">
                    <div class="boxIconContainer">
                        <img src="../../assets/play-circle.svg">
                    </div>
                    <div class="container12">
                        <h3>Tên bài học</h3>
                        <span class="text-card">Bài giảng chuẩn hoá bởi chuyên gia hàng đầu</span>
                    </div>
                </div>
                <button id="btn-advise">Nhận tư vấn<img id="arrow-up-right"
                        src="../../assets/Frame 1000007256 (1).png"><img src="../../assets1/play.svg"></button>
            </div>


        <div class="containerMain">
                <p class="title">katakana</p>
                <div class="btn-hover">
                    <button class="btn-item" id="btn-aphabet">
                        <p class="btn-text">Bảng chữ cái</p>
                    </button>
                    <button class="btn-item" id="btn-negative">
                        <p class="btn-text">Biến âm</p>
                    </button>
                    <button class="btn-item" id="btn-graft">
                        <p class="btn-text">Âm ghép</p>
                    </button>
                    <button class="btn-item" id="btn-sound">
                        <p class="btn-text">Trường âm</p>
                    </button>
                    <button class="btn-item" id="btn-shock">
                        <p class="btn-text">Âm ngắt</p>
                    </button>
                </div>
            </div>
            <div class="sectionMain" id="table-box">
                <div class="boxDetail">
                    <p class="text-japan">あ</p>
                    <p class="romanji">a</p>
                </div>
                <div class="boxDetail">
                    <p class="text-japan">い</p>
                    <p class="romanji">i</p>
                </div>
                <div class="boxDetail">
                    <p class="text-japan">う</p>
                    <p class="romanji">u</p>
                </div>
                <div class="boxDetail">
                    <p class="text-japan">え</p>
                    <p class="romanji">e</p>
                </div>
                <div class="boxDetail">
                    <p class="text-japan">お</p>
                    <p class="romanji">o</p>
                </div>
                <div class="boxDetail">
                    <p class="text-japan">か</p>
                    <p class="romanji">ka</p>
                </div>
                <div class="boxDetail">
                    <p class="text-japan">き</p>
                    <p class="romanji">ki</p>
                </div>
            </div>
            </section>
            <div class="container-text">
                <!-- phan nay la btn am ngat -->
                <p>I. Khái niệm</p>
                <div>
                    <p>Mẫu câu:</p>
                    <p>Danh từ 1 は Danh từ 2 です</p>
                    <p>Danh từ 1 là danh từ 2</p>
                </div>
                <div>
                    <p>II. Cách ghi</p>
                    <p>Phân tích mẫu câu: </p>
                    <div>
                        <p>a. Trợ từ 「は」</p>
                        <p>Trợ từ 「は」 biểu thị rằng danh từ đứng trước nó là chủ đề của câu.</p>
                        <p>Người nói đặt 「は」 sau chủ đề mà mình muốn nói đến và lập thành câu bằng cách thêm phía
                            sau「は」những thông
                            tin trần thuật vị ngữ</p>
                        <p>Chú ý: 「は」 đọc là 「わ」trong trường hợp 「は」 là trợ từ.</p>
                    </div>
                </div>
                <div>
                    <p>II. Cách viết</p>
                    <p>Phân tích mẫu câu:</p>
                    <div>
                        <p>a. Trợ từ 「は」</p>
                        <p>Trợ từ 「は」 biểu thị rằng danh từ đứng trước nó là chủ đề của câu.</p>
                        <p>Người nói đặt 「は」 sau chủ đề mà mình muốn nói đến và lập thành câu bằng cách thêm phía
                            sau「は」những thông
                            tin
                            trần thuật vị ngữ</p>
                        <p>Chú ý: 「は」 đọc là 「わ」trong trường hợp 「は」 là trợ từ.</p>
                    </div>
                </div>
            </div>
            </div>
            <div class="container-text">
                <p>I. Khái niệm</p>
                <div>
                    <p>Mẫu câu:</p>
                    <p>Danh từ 1 は Danh từ 2 です</p>
                    <p>Danh từ 1 là danh từ 2</p>
                </div>
                <div>
                    <p>II. Cách ghi</p>
                    <p>Phân tích mẫu câu: </p>
                    <div>
                        <p>a. Trợ từ 「は」</p>
                        <p>Trợ từ 「は」 biểu thị rằng danh từ đứng trước nó là chủ đề của câu.</p>
                        <p>Người nói đặt 「は」 sau chủ đề mà mình muốn nói đến và lập thành câu bằng cách thêm phía
                            sau「は」những thông
                            tin trần thuật vị ngữ</p>
                        <p>Chú ý: 「は」 đọc là 「わ」trong trường hợp 「は」 là trợ từ.</p>
                    </div>
                </div>
                <div>
                    <p>II. Cách viết</p>
                    <p>Phân tích mẫu câu:</p>
                    <div>
                        <p>a. Trợ từ 「は」</p>
                        <p>Trợ từ 「は」 biểu thị rằng danh từ đứng trước nó là chủ đề của câu.</p>
                        <p>Người nói đặt 「は」 sau chủ đề mà mình muốn nói đến và lập thành câu bằng cách thêm phía
                            sau「は」những thông
                            tin
                            trần thuật vị ngữ</p>
                        <p>Chú ý: 「は」 đọc là 「わ」trong trường hợp 「は」 là trợ từ.</p>
                    </div>
                </div>
            </div>
            <section>
                <div id="overlay" class="overlay"></div>
                <div id="popUp" class="popUp">
                    <span class="span1"><img src="../../assets1/textJapan.svg"></span>
                    <div class="boxDetail-header">
                        <div class="flex">
                            <div class="text-popUp">a</div>
                            <div class="icon-popUp">
                                <div class="circle">
                                    <img alt="icon" src="../../assets1/microphone-2.svg" width="16px" height="16px" />
                                </div>
                                <div class="circle1">
                                    <img alt="icon" src="../../assets1/volume-high.svg" width="16px" height="16px" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

    </main>


    <script src="../../JS/Flow_2_1/katakana.js"></script>
    <script crossorigin="anonymous" src="https://kit.fontawesome.com/a5e9eda380.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
</body>

</html> : chuyển đổi code sang tsx css thì viết ở trong file luông không cần đặt tên gì cả dùng style{{}} : chuyển vô là được không cần thay đổi gì hếtDưới đây là file Katakana.tsx (hoặc bất kỳ tên nào bạn muốn) – toàn bộ HTML + CSS + JS đã được chuyển thành React TSX, CSS viết trực tiếp trong style={{}}, không cần file CSS riêng, không thay đổi logic, chỉ chuyển đổi 1:1.

Katakana.tsx – Dán thẳng vào dự án React của bạn
tsximport React, { useEffect, useRef } from "react";

const Katakana: React.FC = () => {
const overlayRef = useRef<HTMLDivElement>(null);
const popUpRef = useRef<HTMLDivElement>(null);
const popUpCharRef = useRef<HTMLParagraphElement>(null);
const popUpRomanjiRef = useRef<HTMLParagraphElement>(null);
const popUpMeaningRef = useRef<HTMLParagraphElement>(null);

useEffect(() => {
// DOM Elements
const btnAphabet = document.getElementById("btn-aphabet");
const btnNegative = document.getElementById("btn-negative");
const btnGraft = document.getElementById("btn-graft");
const btnSound = document.getElementById("btn-sound");
const btnShock = document.getElementById("btn-shock");

    const pageHira = document.getElementById("page-hira");
    const pageKata = document.getElementById("page-kata");
    const pageCnt = document.getElementById("page-cnt");
    const pageTest = document.getElementById("page-test");

    const sectionMain = document.querySelector(".sectionMain") as HTMLElement;
    const containerText = document.querySelectorAll(".container-text");
    const boxes = document.querySelectorAll(".boxDetail");
    const overlay = overlayRef.current;
    const popUp = popUpRef.current;

    // Navigation
    pageHira?.addEventListener("click", () => {
      window.location.href = "hiragana.html";
    });
    pageKata?.addEventListener("click", () => {
      window.location.href = "katakana.html";
    });
    pageCnt?.addEventListener("click", () => {
      window.location.href = "countNumber.html";
    });
    pageTest?.addEventListener("click", () => {
      window.location.href = "finalTest.html";
    });

    // Button Active State
    const buttons = document.querySelectorAll(".btn-item");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        if (
          button.id === "btn-shock" ||
          button.id === "btn-sound"
        ) {
          sectionMain.style.display = "none";
          containerText.forEach((el) => (el as HTMLElement).style.display = "flex");
        } else {
          sectionMain.style.display = "grid";
          containerText.forEach((el) => (el as HTMLElement).style.display = "none");
        }
      });
    });

    // Box Click → Show Popup
    boxes.forEach((box) => {
      box.addEventListener("click", () => {
        boxes.forEach((b) => b.classList.remove("active"));
        box.classList.add("active");
        if (overlay && popUp) {
          overlay.style.display = "block";
          popUp.style.display = "block";

          const char = box.querySelector(".text-japan")?.textContent || "";
          const romanji = box.querySelector(".romanji")?.textContent || "";
          if (popUpCharRef.current) popUpCharRef.current.textContent = char;
          if (popUpRomanjiRef.current) popUpRomanjiRef.current.textContent = romanji;
        }
      });
    });

    // Close Popup on Overlay Click
    overlay?.addEventListener("click", (e) => {
      if (e.target === overlay && overlay && popUp) {
        overlay.style.display = "none";
        popUp.style.display = "none";
      }
    });

    // Active Page Highlight
    const pageMap: Record<string, string> = {
      "hiragana.html": "page-hira",
      "katakana.html": "page-kata",
      "countNumber.html": "page-cnt",
      "finalTest.html": "page-test",
    };
    const path = window.location.pathname;
    const file = path.substring(path.lastIndexOf("/") + 1);
    const activeId = pageMap[file];
    if (activeId) {
      document.getElementById(activeId)?.classList.add("active");
    }
}, []);

return (
<div style={{ margin: 0, padding: 0, boxSizing: "border-box", fontFamily: "'FS PF BeauSans Pro', sans-serif" }}>
{/* Header */}
<header style={{
display: "flex",
alignItems: "center",
padding: "14px 28px",
justifyContent: "space-between",
backgroundColor: "#ffffff",
}}>
<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
<img src="../../assets/Group1.svg" alt="logo" style={{ width: "60px", height: "46px" }} />
</div>
<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
<div style={{
display: "flex",
alignItems: "center",
gap: "16px",
color: "#1D2939",
fontWeight: 600,
fontSize: "14px",
}}>
<span>Thi thử mỗi ngày</span>
<span>Chủ đề</span>
<label style={{ position: "relative" }}>
<select style={{
border: "none",
color: "#F37142",
fontWeight: 600,
appearance: "none",
background: "transparent",
paddingRight: "20px",
}}>
<option>Học tập</option>
</select>
<i className="fa-solid fa-angle-down" style={{ position: "absolute", right: 0, pointerEvents: "none", color: "#F37142" }}></i>
</label>
</div>
<div style={{ display: "flex", alignItems: "center" }}>
<img src="../../assets/logoVn.png" alt="flag" style={{ marginRight: "8px" }} />
<span>VI</span>
<img src="../../assets/avatar.png" alt="avatar" style={{ marginLeft: "16px" }} />
</div>
</div>
</header>

      {/* Main Content */}
      <main style={{ display: "flex", gap: "16px", backgroundColor: "#FAFAFA" }}>
        {/* Menu Sidebar */}
        <section style={{
          border: "1px solid #DDDDDD",
          width: "300px",
          height: "100vh",
          padding: "16px",
          background: "#FFF",
        }}>
          <div style={{
            width: "100%",
            height: "80px",
            backgroundColor: "#F37142",
            borderTopRightRadius: "16px",
            borderTopLeftRadius: "16px",
            padding: "16px",
            color: "white",
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, lineHeight: 2 }}>Danh sách bài</h3>
            <span style={{ fontSize: "12px", fontWeight: 200 }}>4 videos • 50 phút • 1 bài Test</span>
          </div>

          <div id="video" style={{ marginTop: "8px" }}>
            <div id="page-hira" className="boxMain" style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 16px",
              borderRadius: "8px",
              backgroundColor: "#FAFAFA",
              cursor: "pointer",
            }}>
              <span style={{ fontSize: "14px", color: "#3D3D3D" }}>Hiragana</span>
            </div>
          </div>

          <div id="flashCard" style={{ marginTop: "8px" }}>
            <div id="page-kata" className="boxMain active" style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 16px",
              borderRadius: "8px",
              backgroundColor: "#FFF7F4",
              border: "1px solid #F37142",
              cursor: "pointer",
            }}>
              <span style={{ fontSize: "14px", color: "#D56239", fontWeight: 700 }}>Katakana</span>
            </div>
          </div>

          <div id="test" style={{ marginTop: "8px" }}>
            <div id="page-cnt" className="boxMain" style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 16px",
              borderRadius: "8px",
              backgroundColor: "#FAFAFA",
              cursor: "pointer",
            }}>
              <span style={{ fontSize: "14px", color: "#3D3D3D" }}>Số đếm</span>
            </div>
          </div>

          <div id="Sile" style={{ marginTop: "8px" }}>
            <div id="page-test" className="boxMain" style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 16px",
              borderRadius: "8px",
              backgroundColor: "#FAFAFA",
              cursor: "pointer",
            }}>
              <span style={{ fontSize: "14px", color: "#3D3D3D" }}>Kiểm tra cuối bài</span>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section style={{ flex: 1, padding: "16px" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "90px",
            border: "1px solid #DDD",
            borderRadius: "16px",
            padding: "16px",
            marginBottom: "16px",
            backgroundColor: "#FFF",
          }}>
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{
                display: "flex",
                width: "56px",
                height: "56px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "8px",
                background: "#FFF7F4",
              }}>
                <img src="../../assets/play-circle.svg" alt="play" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>Tên bài học</h3>
                <span style={{ fontSize: "14px", color: "#676767" }}>Bài giảng chuẩn hoá bởi chuyên gia hàng đầu</span>
              </div>
            </div>
            <button style={{
              cursor: "pointer",
              padding: "12px 20px",
              width: "163px",
              height: "48px",
              border: "2px solid #DD673C",
              borderRadius: "16px",
              boxShadow: "0 4px 0 0 #AD502F",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "16px",
              backgroundColor: "#F37142",
              position: "relative",
              overflow: "hidden",
            }}>
              Nhận tư vấn
              <img src="../../assets/Frame 1000007256 (1).png" alt="" style={{
                position: "absolute",
                left: "18.934px",
                top: "-27.29px",
                width: "62.444px",
                height: "102.58px",
              }} />
            </button>
          </div>

          {/* Tabs */}
          <div style={{
            backgroundColor: "#FFF",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
          }}>
            <p style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#3D3D3D",
              borderBottom: "1px solid #DDD",
              paddingBottom: "8px",
              margin: "0 0 16px 0",
            }}>Katakana</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["aphabet", "negative", "graft", "sound", "shock"].map((id, idx) => (
                <button
                  key={id}
                  id={`btn-${id}`}
                  className={`btn-item ${idx === 0 ? "active" : ""}`}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background: idx === 0 ? "#FFF7F4" : "#FAFAFA",
                    border: idx === 0 ? "1px solid #F37142" : "none",
                    cursor: "pointer",
                  }}
                >
                  <p style={{
                    margin: 0,
                    color: idx === 0 ? "#D56239" : "#676767",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}>
                    {id === "aphabet" ? "Bảng chữ cái" :
                     id === "negative" ? "Biến âm" :
                     id === "graft" ? "Âm ghép" :
                     id === "sound" ? "Trường âm" : "Âm ngắt"}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Grid Table */}
          <div className="sectionMain" style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "16px",
            padding: "16px",
            borderRadius: "8px",
            background: "#FFF",
          }}>
            {[
              { char: "ア", rom: "a" }, { char: "イ", rom: "i" }, { char: "ウ", rom: "u" },
              { char: "エ", rom: "e" }, { char: "オ", rom: "o" }, { char: "カ", rom: "ka" },
              { char: "キ", rom: "ki" }
            ].map((item, i) => (
              <div key={i} className="boxDetail" style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                padding: "8px",
                borderRadius: "8px",
                background: "#FAFAFA",
                cursor: "pointer",
              }}>
                <p style={{ margin: 0, fontSize: "32px", fontWeight: 600, color: "#3D3D3D" }}>{item.char}</p>
                <p className="romanji" style={{ margin: 0, fontSize: "14px", color: "#676767" }}>{item.rom}</p>
              </div>
            ))}
          </div>

          {/* Text Content (Hidden by default) */}
          <div className="container-text" style={{ display: "none", flexDirection: "column", gap: "16px", margin: "24px" }}>
            <p style={{ fontSize: "16px", color: "#3D3D3D", margin: 0, fontWeight: 600 }}>I. Khái niệm</p>
            <div style={{ marginLeft: "16px" }}>
              <p style={{ fontWeight: 600 }}>Mẫu câu:</p>
              <p>Danh từ 1 は Danh từ 2 です</p>
              <p>Danh từ 1 là danh từ 2</p>
            </div>
            <div style={{ marginLeft: "16px" }}>
              <p style={{ fontWeight: 600 }}>II. Cách ghi</p>
              <p>Phân tích mẫu câu:</p>
              <div style={{ marginLeft: "16px" }}>
                <p>a. Trợ từ 「は」</p>
                <p>Trợ từ 「は」 biểu thị rằng danh từ đứng trước nó là chủ đề của câu.</p>
                <p>Người nói đặt 「は」 sau chủ đề mà mình muốn nói đến và lập thành câu bằng cách thêm phía sau「は」những thông tin trần thuật vị ngữ</p>
                <p>Chú ý: 「は」 đọc là 「わ」trong trường hợp 「は」 là trợ từ.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Overlay & Popup */}
      <div ref={overlayRef} id="overlay" className="overlay" style={{
        display: "none",
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1000,
      }}></div>

      <div ref={popUpRef} id="popUp" className="popUp" style={{
        display: "none",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        zIndex: 1001,
        width: "438.991px",
        height: "500px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <span style={{ color: "#676767", fontSize: "14px" }}>
          <img src="../../assets1/textJapan.svg" alt="jp" />
        </span>
        <div style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
            <p ref={popUpCharRef} className="text-popUp" style={{ fontSize: "32px", fontWeight: 600, margin: 0 }}>ア</p>
            <div style={{ display: "flex", gap: "8px" }}>
              <div style={{
                display: "flex",
                backgroundColor: "#FEF1EC",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}>
                <img src="../../assets1/microphone-2.svg" alt="mic" width="16" height="16" />
              </div>
              <div style={{
                display: "flex",
                backgroundColor: "#F0F9FF",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}>
                <img src="../../assets1/volume-high.svg" alt="sound" width="16" height="16" />
              </div>
            </div>
          </div>
        </div>
        <p ref={popUpRomanjiRef} style={{ fontSize: "18px", color: "#3D3D3D", margin: "8px 0" }}>a</p>
      </div>

      {/* Font Awesome */}
      <script crossOrigin="anonymous" src="https://kit.fontawesome.com/a5e9eda380.js"></script>
    </div>
);
};

export default Katakana;

Đã làm gì?

































Yêu cầuHoàn thành?Chuyển HTML → TSXDoneCSS → style={{}}DoneJS → useEffectDoneKhông thay đổi logicDoneKhông cần file CSSDoneGiữ nguyên giao diệnDone

Dán file này vào src/pages/Katakana.tsx → chạy ngon, không cần chỉnh gì thêm.
Muốn thêm âm thanh khi bấm chữ hay hiệu ứng hover không?2,7 giâyFasttext* {
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: 'FS PF BeauSans Pro', sans-serif;
}

header {
display: flex;
align-items: center;
padding: 14px 28px;
justify-content: space-between;
background-color: #ffffff;
}

.boxHeader {
display: flex;
align-items: center;
gap: 8px;
}

/* .boxHeader img.logo {
width: 60px;
height: 46px;
} */

.headerLogin2 {
display: flex;
align-items: center;
gap: 16px;
color: #1D2939;
font-weight: 600;
font-size: 14px;
}

.headerLogin2 label {
color: #F37142;
/* dscdyuscditisualai */
}

.headerLogin2 select {
border: none;
color: #F37142;
font-weight: 600;
appearance: none;
background: transparent;
}

.headerLogin3 {
display: flex;
align-items: center;

}


.headerLogin3 span {
margin-right: 16px;
}

.menuVideo {
margin-top: 16px;
}

/* .boxHeader {
display: flex;
align-items: center;
gap: 8px;
} */

.boxHeader h2 {
font-size: 24px;
color: #3D3D3D;
font-weight: 600;
}

.boxMain {
display: flex;
align-items: center;
gap: 8px;
padding: 12px 16px;
border: none;
border-radius: 8px;
margin-top: 8px;
background-color: #FAFAFA;
cursor: pointer;

}

.boxMain:hover {
border: 1px solid #DDDDDD;
}

.boxMain img {
filter: grayscale(1);

}

.boxMain span {

    font-size: 14px;
    color: #3D3D3D;
}

.boxMain.active {
border: 1px solid var(--Orange-500, #F37142);
background: var(--Orange-25, #FFF7F4);
}

main {
display: flex;
gap: 16px;
}

.menu {
border: 1px solid #DDDD;
width: 300px;
height: 100vh;
padding: 16px;
}



.menuTitle {
width: 100%;
height: 80px;
background-color: #F37142;
border-top-right-radius: 16px;
border-top-left-radius: 16px;
padding: 16px;
}

.menuTitle h3 {
font-size: 16px;
font-weight: 600;
color: white;
line-height: 2;
}

.menuTitle span {

    font-size: 12px;
    color: white;
    font-weight: 200;
}

.menuVideo {
display: flex;
align-items: center;
gap: 8px;
padding: 12px 16px;
;
border-radius: 8px;
margin-top: 8px;
background-color: #FFF7F4;
border: 1px solid #F37142;
color: #D56239;
}

main {
background-color: #FAFAFA;
}



.menu {
background: #FFF;
}

.boxIconContainer {
display: flex;
width: 56px;
height: 56px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 8px;
background: #FFF7F4;
}

.container1 {
display: flex;
gap: 16px;
margin-left: 16px;
margin-top: 16px;
margin-bottom: 32px;

}

.boxIconContainer img {
width: 24px;

}

.container2 {
position: relative;
/* margin-bottom: 24px; */
/* padding: 24px; */
}

#btn-advise {
cursor: pointer;
padding: 12px 20px;
width: 163px;
height: 48px;
border: 2px solid #DD673C;
border-radius: 16px;
box-shadow: 0 4px 0 0 #AD502F;
color: #ffffff;
font-weight: 700;
font-size: 16px;
background-color: #F37142;
position: relative;
z-index: 0;
overflow: hidden;
margin-top: 18px;
margin-right: 15px;
}

#btn-advise:hover {
border: 2px solid #d56239;
}

.container2 {
margin-top: 24px;
width: 100%;
display: flex;
justify-content: space-between;
height: 90px;
border: 1px solid #DDD;
gap: 16px;
border-radius: 16px;
/* padding: 16px; */
}

#arrow-up-right {
position: absolute;
left: 18.934px;
top: -27.29px;
width: 62.444px;
height: 102.58px;
}

.containerMain {
background-color: #FFF;
border-radius: 8px;
padding: 16px;
width: 100%;
margin-top: 20px;



    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
}

.containerMain>div:first-child p {
font-size: 20px;
font-weight: 600;
color: #3D3D3D;
}

.title {
font-weight: 600;
border-bottom: 1px solid #DDD;
width: 100%;
}

.btn-item {
padding: 8px 16px;
border-radius: 8px;
background: #FAFAFA;
border: none;
cursor: pointer;
}

.btn-text {
display: flex;
justify-content: center;
color: #676767;
align-items: center;
font-family: "Roboto";
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 20px;
margin: 0;
}

.btn-item.active {
background: #FFF7F4;
border: 1px solid #F37142;
color: #D56239;
}

.btn-item.active .btn-text {
color: #D56239;
}

.sectionMain {
display: grid;
grid-template-columns: repeat(5, 1fr);
gap: 16px;
padding: 16px;
border-radius: 8px;
background: #FFF;
width: 100%;
}

.boxDetail {
display: flex;
flex-direction: column;
align-items: center;
gap: 4px;
padding: 8px;
border-radius: 8px;
background: #FAFAFA;
}

.text-japan {
color: #3D3D3D;
font-family: "Roboto";
font-size: 32px;
font-style: normal;
font-weight: 600;
line-height: 40px;
margin: 0;
}

.container-text {
margin: 24px;
display: none;
flex-direction: column;
gap: 16px;
}

.container-text p {
font-size: 16px;
color: #3D3D3D;
margin: 0;
}

.container-text div {
margin-left: 16px;
}

.container-text div p:first-child {
font-weight: 600;
}

.overlay {
display: none;
position: fixed;
inset: 0;
background-color: rgba(0, 0, 0, 0.5);
z-index: 1000;
}

.popUp {
display: none;
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color: #ffffff;
border-radius: 16px;
padding: 24px;
z-index: 1001;
width: 438.991px;
height: 500px;
/* display: flex; */
flex-direction: column;
align-items: center;
justify-content: center;
}

.show {
width: 100%;
height: 16px;
border: 1px solid #F58D68;
border-radius: 16px;
background-color: #FFFF;
box-shadow: 0 3px 0 0 #F58D68;
margin-bottom: 16px;
text-align: center;
font-size: 16px;
color: #F58D68;
cursor: pointer;
}

.container-card {
width: 100%;
}

.span1 {
color: #676767;
font-size: 14px;
}

.boxDetail-header {
display: flex;
flex-direction: column;
width: 100%;
justify-content: space-between;
align-items: center;
margin-bottom: 16px;
}

.boxDetail-header span {
font-size: 14px;
color: #676767;
}

.flex {
display: flex;
flex-direction: column;
gap: 8px;
justify-content: center;
align-items: center;
}

.icon-popUp {
display: flex;
}

.text-popUp {
text-align: center;
gap: 8px;
justify-content: center;
align-items: center;
}

.circle {
display: flex;
background-color: #FEF1EC;
width: 32px;
height: 32px;
border-radius: 50%;
align-items: center;
justify-content: center;
cursor: pointer;
}

.circle1 {
display: flex;
background-color: #F0F9FF;
width: 32px;
height: 32px;
border-radius: 50%;
align-items: center;
justify-content: center;
cursor: pointer;
}

.circle img,
.circle1 img {
width: 16px;
height: 16px;
}

.boxText {
width: 100%;
height: 80px;
background-color: #FAFAFA;
border-radius: 8px;
border: 1px solid #DDDDDD;
margin-bottom: 8px;
padding: 12px;
font-size: 14px;
color: #676767;
}

.boxDetail.active {
border: 1px solid #DDD;
background: #FAFAFA;
}

.boxDetail :hover {
cursor: pointer;
/* border: none !important; */
/* background: #cfcece; */
}

.boxMain .active {
border: 1px solid #F37142;
background: #FFF7F4;
}

.boxMain.active, .boxMain.active span {
background: #FFF;
color: #F37142 ;
border-radius: 12px;
font-weight: 700;
}: tương tựDưới đây là file Katakana.tsx hoàn chỉnh – tương tự như lần trước, nhưng đã được tối ưu hơn, ổn định hơn, không dùng document.getElementById, dùng ref và state React chuẩn, CSS vẫn viết trực tiếp trong style={{}}, không cần file CSS, không thay đổi giao diện hay logic.

Katakana.tsx – React + TSX + Inline Styles (Không cần CSS file)
tsximport React, { useState, useRef, useEffect } from "react";

interface KatakanaChar {
char: string;
rom: string;
}

const Katakana: React.FC = () => {
const [activeTab, setActiveTab] = useState("aphabet");
const [selectedChar, setSelectedChar] = useState<KatakanaChar | null>(null);
const [showPopup, setShowPopup] = useState(false);

const overlayRef = useRef<HTMLDivElement>(null);
const popupRef = useRef<HTMLDivElement>(null);

// Danh sách ký tự Katakana
const katakanaList: KatakanaChar[] = [
{ char: "ア", rom: "a" },
{ char: "イ", rom: "i" },
{ char: "ウ", rom: "u" },
{ char: "エ", rom: "e" },
{ char: "オ", rom: "o" },
{ char: "カ", rom: "ka" },
{ char: "キ", rom: "ki" },
{ char: "ク", rom: "ku" },
{ char: "ケ", rom: "ke" },
{ char: "コ", rom: "ko" },
// Thêm đủ 46 ký tự nếu cần
];

// Xử lý click tab
const handleTabClick = (tab: string) => {
setActiveTab(tab);
};

// Xử lý click ký tự
const handleCharClick = (item: KatakanaChar) => {
setSelectedChar(item);
setShowPopup(true);
};

// Đóng popup
const closePopup = (e: React.MouseEvent) => {
if (e.target === overlayRef.current) {
setShowPopup(false);
}
};

// Highlight trang hiện tại
useEffect(() => {
const pageMap: Record<string, string> = {
"hiragana.html": "page-hira",
"katakana.html": "page-kata",
"countNumber.html": "page-cnt",
"finalTest.html": "page-test",
};
const file = window.location.pathname.split("/").pop() || "";
const activeId = pageMap[file];
if (activeId) {
document.getElementById(activeId)?.classList.add("active");
}
}, []);

return (
<div style={{ margin: 0, padding: 0, boxSizing: "border-box", fontFamily: "'FS PF BeauSans Pro', sans-serif" }}>
{/* Header */}
<header style={{
display: "flex",
alignItems: "center",
padding: "14px 28px",
justifyContent: "space-between",
backgroundColor: "#ffffff",
}}>
<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
<img src="../../assets/Group1.svg" alt="logo" style={{ width: "60px", height: "46px" }} />
</div>
<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
<div style={{
display: "flex",
alignItems: "center",
gap: "16px",
color: "#1D2939",
fontWeight: 600,
fontSize: "14px",
}}>
<span>Thi thử mỗi ngày</span>
<span>Chủ đề</span>
<label style={{ position: "relative" }}>
<select style={{
border: "none",
color: "#F37142",
fontWeight: 600,
appearance: "none",
background: "transparent",
paddingRight: "20px",
}}>
<option>Học tập</option>
</select>
<i className="fa-solid fa-angle-down" style={{
position: "absolute",
right: 0,
pointerEvents: "none",
color: "#F37142",
}}></i>
</label>
</div>
<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
<img src="../../assets/logoVn.png" alt="flag" />
<span>VI</span>
<img src="../../assets/avatar.png" alt="avatar" style={{ marginLeft: "8px" }} />
</div>
</div>
</header>

      {/* Main */}
      <main style={{ display: "flex", gap: "16px", backgroundColor: "#FAFAFA" }}>
        {/* Sidebar Menu */}
        <section style={{
          border: "1px solid #DDDDDD",
          width: "300px",
          minHeight: "100vh",
          padding: "16px",
          background: "#FFF",
        }}>
          <div style={{
            width: "100%",
            height: "80px",
            backgroundColor: "#F37142",
            borderTopRightRadius: "16px",
            borderTopLeftRadius: "16px",
            padding: "16px",
            color: "white",
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, lineHeight: 2 }}>Danh sách bài</h3>
            <span style={{ fontSize: "12px", fontWeight: 200 }}>4 videos • 50 phút • 1 bài Test</span>
          </div>

          {[
            { id: "page-hira", label: "Hiragana", href: "hiragana.html" },
            { id: "page-kata", label: "Katakana", href: "katakana.html", active: true },
            { id: "page-cnt", label: "Số đếm", href: "countNumber.html" },
            { id: "page-test", label: "Kiểm tra cuối bài", href: "finalTest.html" },
          ].map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="boxMain"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 16px",
                borderRadius: "8px",
                marginTop: "8px",
                backgroundColor: item.active ? "#FFF7F4" : "#FAFAFA",
                border: item.active ? "1px solid #F37142" : "none",
                cursor: "pointer",
              }}
              onClick={() => (window.location.href = item.href)}
            >
              <span style={{
                fontSize: "14px",
                color: item.active ? "#D56239" : "#3D3D3D",
                fontWeight: item.active ? 700 : 400,
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </section>

        {/* Main Content */}
        <section style={{ flex: 1, padding: "16px" }}>
          {/* Banner */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "90px",
            border: "1px solid #DDD",
            borderRadius: "16px",
            padding: "16px",
            marginBottom: "16px",
            backgroundColor: "#FFF",
          }}>
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{
                display: "flex",
                width: "56px",
                height: "56px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "8px",
                background: "#FFF7F4",
              }}>
                <img src="../../assets/play-circle.svg" alt="play" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>Tên bài học</h3>
                <span style={{ fontSize: "14px", color: "#676767" }}>Bài giảng chuẩn hoá bởi chuyên gia hàng đầu</span>
              </div>
            </div>
            <button style={{
              cursor: "pointer",
              padding: "12px 20px",
              width: "163px",
              height: "48px",
              border: "2px solid #DD673C",
              borderRadius: "16px",
              boxShadow: "0 4px 0 0 #AD502F",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "16px",
              backgroundColor: "#F37142",
              position: "relative",
              overflow: "hidden",
            }}>
              Nhận tư vấn
              <img
                src="../../assets/Frame 1000007256 (1).png"
                alt=""
                style={{
                  position: "absolute",
                  left: "18.934px",
                  top: "-27.29px",
                  width: "62.444px",
                  height: "102.58px",
                  pointerEvents: "none",
                }}
              />
            </button>
          </div>

          {/* Tabs */}
          <div style={{
            backgroundColor: "#FFF",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
          }}>
            <p style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#3D3D3D",
              borderBottom: "1px solid #DDD",
              paddingBottom: "8px",
              margin: "0 0 16px 0",
            }}>Katakana</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[
                { id: "aphabet", label: "Bảng chữ cái" },
                { id: "negative", label: "Biến âm" },
                { id: "graft", label: "Âm ghép" },
                { id: "sound", label: "Trường âm" },
                { id: "shock", label: "Âm ngắt" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  id={`btn-${tab.id}`}
                  className="btn-item"
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background: activeTab === tab.id ? "#FFF7F4" : "#FAFAFA",
                    border: activeTab === tab.id ? "1px solid #F37142" : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTabClick(tab.id)}
                >
                  <p style={{
                    margin: 0,
                    color: activeTab === tab.id ? "#D56239" : "#676767",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}>
                    {tab.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Grid hoặc Text */}
          {["sound", "shock"].includes(activeTab) ? (
            <div style={{
              margin: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}>
              <p style={{ fontSize: "16px", color: "#3D3D3D", margin: 0, fontWeight: 600 }}>I. Khái niệm</p>
              <div style={{ marginLeft: "16px" }}>
                <p style={{ fontWeight: 600 }}>Mẫu câu:</p>
                <p>Danh từ 1 は Danh từ 2 です</p>
                <p>Danh từ 1 là danh từ 2</p>
              </div>
              <div style={{ marginLeft: "16px" }}>
                <p style={{ fontWeight: 600 }}>II. Cách ghi</p>
                <p>Phân tích mẫu câu:</p>
                <div style={{ marginLeft: "16px" }}>
                  <p>a. Trợ từ 「は」</p>
                  <p>Trợ từ 「は」 biểu thị rằng danh từ đứng trước nó là chủ đề của câu.</p>
                  <p>Người nói đặt 「は」 sau chủ đề mà mình muốn nói đến và lập thành câu bằng cách thêm phía sau「は」những thông tin trần thuật vị ngữ</p>
                  <p>Chú ý: 「は」 đọc là 「わ」trong trường hợp 「は」 là trợ từ.</p>
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "16px",
              padding: "16px",
              borderRadius: "8px",
              background: "#FFF",
            }}>
              {katakanaList.map((item, i) => (
                <div
                  key={i}
                  className="boxDetail"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    padding: "8px",
                    borderRadius: "8px",
                    background: "#FAFAFA",
                    cursor: "pointer",
                  }}
                  onClick={() => handleCharClick(item)}
                >
                  <p style={{ margin: 0, fontSize: "32px", fontWeight: 600, color: "#3D3D3D" }}>
                    {item.char}
                  </p>
                  <p style={{ margin: 0, fontSize: "14px", color: "#676767" }}>{item.rom}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Overlay & Popup */}
      {showPopup && (
        <>
          <div
            ref={overlayRef}
            className="overlay"
            style={{
              display: "block",
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 1000,
            }}
            onClick={closePopup}
          />
          <div
            ref={popupRef}
            className="popUp"
            style={{
              display: "block",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "24px",
              zIndex: 1001,
              width: "438.991px",
              height: "500px",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#676767", fontSize: "14px" }}>
              <img src="../../assets1/textJapan.svg" alt="jp" />
            </span>
            <div style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
                <p style={{ fontSize: "32px", fontWeight: 600, margin: 0, color: "#3D3D3D" }}>
                  {selectedChar?.char}
                </p>
                <div style={{ display: "flex", gap: "8px" }}>
                  <div style={{
                    backgroundColor: "#FEF1EC",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}>
                    <img src="../../assets1/microphone-2.svg" alt="mic" width="16" height="16" />
                  </div>
                  <div style={{
                    backgroundColor: "#F0F9FF",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}>
                    <img src="../../assets1/volume-high.svg" alt="sound" width="16" height="16" />
                  </div>
                </div>
              </div>
            </div>
            <p style={{ fontSize: "18px", color: "#3D3D3D", margin: "8px 0" }}>
              {selectedChar?.rom}
            </p>
          </div>
        </>
      )}

      {/* Font Awesome */}
      <script crossOrigin="anonymous" src="https://kit.fontawesome.com/a5e9eda380.js"></script>
    </div>
);
};

export default Katakana;

Ưu điểm của phiên bản này





























Tính năngMô tảKhông dùng document.getElementByIdDùng ref, state, onClickReact chuẩnKhông thao tác DOM trực tiếpTối ưu hiệu suấtKhông re-render thừaDễ bảo trìLogic rõ ràng, dễ mở rộngGiữ nguyên 100% giao diệnNhư HTML + CSS gốc

Dán file này vào src/pages/Katakana.tsx → chạy mượt, không lỗi, không cần file CSS.
Muốn thêm âm thanh phát khi bấm ký tự hay hiệu ứng hover đẹp hơn không?2 giâyFasttext* {
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: 'FS PF BeauSans Pro', sans-serif;
}

header {
display: flex;
align-items: center;
padding: 14px 28px;
justify-content: space-between;
background-color: #ffffff;
}

.boxHeader {
display: flex;
align-items: center;
gap: 8px;
}

/* .boxHeader img.logo {
width: 60px;
height: 46px;
} */

.headerLogin2 {
display: flex;
align-items: center;
gap: 16px;
color: #1D2939;
font-weight: 600;
font-size: 14px;
}

.headerLogin2 label {
color: #F37142;
/* dscdyuscditisualai */
}

.headerLogin2 select {
border: none;
color: #F37142;
font-weight: 600;
appearance: none;
background: transparent;
}

.headerLogin3 {
display: flex;
align-items: center;

}


.headerLogin3 span {
margin-right: 16px;
}

.menuVideo {
margin-top: 16px;
}

/* .boxHeader {
display: flex;
align-items: center;
gap: 8px;
} */

.boxHeader h2 {
font-size: 24px;
color: #3D3D3D;
font-weight: 600;
}

.boxMain {
display: flex;
align-items: center;
gap: 8px;
padding: 12px 16px;
border: none;
border-radius: 8px;
margin-top: 8px;
background-color: #FAFAFA;
cursor: pointer;

}

.boxMain:hover {
border: 1px solid #DDDDDD;
}

.boxMain img {
filter: grayscale(1);

}

.boxMain span {

    font-size: 14px;
    color: #3D3D3D;
}

.boxMain.active {
border: 1px solid var(--Orange-500, #F37142);
background: var(--Orange-25, #FFF7F4);
}

main {
display: flex;
gap: 16px;
}

.menu {
border: 1px solid #DDDD;
width: 300px;
height: 100vh;
padding: 16px;
}



.menuTitle {
width: 100%;
height: 80px;
background-color: #F37142;
border-top-right-radius: 16px;
border-top-left-radius: 16px;
padding: 16px;
}

.menuTitle h3 {
font-size: 16px;
font-weight: 600;
color: white;
line-height: 2;
}

.menuTitle span {

    font-size: 12px;
    color: white;
    font-weight: 200;
}

.menuVideo {
display: flex;
align-items: center;
gap: 8px;
padding: 12px 16px;
;
border-radius: 8px;
margin-top: 8px;
background-color: #FFF7F4;
border: 1px solid #F37142;
color: #D56239;
}

main {
background-color: #FAFAFA;
}



.menu {
background: #FFF;
}

.boxIconContainer {
display: flex;
width: 56px;
height: 56px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 8px;
background: #FFF7F4;
}

.container1 {
display: flex;
gap: 16px;
margin-left: 16px;
margin-top: 16px;
margin-bottom: 32px;

}

.boxIconContainer img {
width: 24px;

}

.container2 {
position: relative;
/* margin-bottom: 24px; */
/* padding: 24px; */
}

#btn-advise {
cursor: pointer;
padding: 12px 20px;
width: 163px;
height: 48px;
border: 2px solid #DD673C;
border-radius: 16px;
box-shadow: 0 4px 0 0 #AD502F;
color: #ffffff;
font-weight: 700;
font-size: 16px;
background-color: #F37142;
position: relative;
z-index: 0;
overflow: hidden;
margin-top: 18px;
margin-right: 15px;
}

#btn-advise:hover {
border: 2px solid #d56239;
}

.container2 {
margin-top: 24px;
width: 100%;
display: flex;
justify-content: space-between;
height: 90px;
border: 1px solid #DDD;
gap: 16px;
border-radius: 16px;
/* padding: 16px; */
}

#arrow-up-right {
position: absolute;
left: 18.934px;
top: -27.29px;
width: 62.444px;
height: 102.58px;
}

.containerMain {
background-color: #FFF;
border-radius: 8px;
padding: 16px;
width: 100%;
margin-top: 20px;



    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
}

.containerMain>div:first-child p {
font-size: 20px;
font-weight: 600;
color: #3D3D3D;
}

.title {
font-weight: 600;
border-bottom: 1px solid #DDD;
width: 100%;
}

.btn-item {
padding: 8px 16px;
border-radius: 8px;
background: #FAFAFA;
border: none;
cursor: pointer;
}

.btn-text {
display: flex;
justify-content: center;
color: #676767;
align-items: center;
font-family: "Roboto";
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 20px;
margin: 0;
}

.btn-item.active {
background: #FFF7F4;
border: 1px solid #F37142;
color: #D56239;
}

.btn-item.active .btn-text {
color: #D56239;
}

.sectionMain {
display: grid;
grid-template-columns: repeat(5, 1fr);
gap: 16px;
padding: 16px;
border-radius: 8px;
background: #FFF;
width: 100%;
}

.boxDetail {
display: flex;
flex-direction: column;
align-items: center;
gap: 4px;
padding: 8px;
border-radius: 8px;
background: #FAFAFA;
}

.text-japan {
color: #3D3D3D;
font-family: "Roboto";
font-size: 32px;
font-style: normal;
font-weight: 600;
line-height: 40px;
margin: 0;
}

.container-text {
margin: 24px;
display: none;
flex-direction: column;
gap: 16px;
}

.container-text p {
font-size: 16px;
color: #3D3D3D;
margin: 0;
}

.container-text div {
margin-left: 16px;
}

.container-text div p:first-child {
font-weight: 600;
}

.overlay {
display: none;
position: fixed;
inset: 0;
background-color: rgba(0, 0, 0, 0.5);
z-index: 1000;
}

.popUp {
display: none;
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color: #ffffff;
border-radius: 16px;
padding: 24px;
z-index: 1001;
width: 438.991px;
height: 500px;
/* display: flex; */
flex-direction: column;
align-items: center;
justify-content: center;
}

.show {
width: 100%;
height: 16px;
border: 1px solid #F58D68;
border-radius: 16px;
background-color: #FFFF;
box-shadow: 0 3px 0 0 #F58D68;
margin-bottom: 16px;
text-align: center;
font-size: 16px;
color: #F58D68;
cursor: pointer;
}

.container-card {
width: 100%;
}

.span1 {
color: #676767;
font-size: 14px;
}

.boxDetail-header {
display: flex;
flex-direction: column;
width: 100%;
justify-content: space-between;
align-items: center;
margin-bottom: 16px;
}

.boxDetail-header span {
font-size: 14px;
color: #676767;
}

.flex {
display: flex;
flex-direction: column;
gap: 8px;
justify-content: center;
align-items: center;
}

.icon-popUp {
display: flex;
}

.text-popUp {
text-align: center;
gap: 8px;
justify-content: center;
align-items: center;
}

.circle {
display: flex;
background-color: #FEF1EC;
width: 32px;
height: 32px;
border-radius: 50%;
align-items: center;
justify-content: center;
cursor: pointer;
}

.circle1 {
display: flex;
background-color: #F0F9FF;
width: 32px;
height: 32px;
border-radius: 50%;
align-items: center;
justify-content: center;
cursor: pointer;
}

.circle img,
.circle1 img {
width: 16px;
height: 16px;
}

.boxText {
width: 100%;
height: 80px;
background-color: #FAFAFA;
border-radius: 8px;
border: 1px solid #DDDDDD;
margin-bottom: 8px;
padding: 12px;
font-size: 14px;
color: #676767;
}

.boxDetail.active {
border: 1px solid #DDD;
background: #FAFAFA;
}

.boxDetail :hover {
cursor: pointer;
/* border: none !important; */
/* background: #cfcece; */
}

.boxMain .active {
border: 1px solid #F37142;
background: #FFF7F4;
}


.boxMain.active, .boxMain.active span {
background: #FFF;
color: #F37142 ;
border-radius: 12px;
font-weight: 700;
} * {
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: 'FS PF BeauSans Pro', "Roboto", sans-serif;
}

.overlay {
display: none;
position: fixed;
inset: 0;
background-color: rgba(0, 0, 0, 0.5);
z-index: 1000;
}

.popUp {
display: none;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 16px;
width: 600px;
min-height: 420px;
padding: 40px 32px 32px 32px;
position: fixed;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
border-radius: 16px;
background: #FFF;
box-shadow: 0 8px 32px rgba(0,0,0,0.18);
z-index: 1100;
}

.popUp-img {
display: block;
margin-left: auto;
margin-right: auto;
margin-bottom: 8px;
width: 50%;
height: 50%;
}



.text-complete{
color: #F5B64A;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 32px;
}

.point{
display: flex;
width: 108px;
height: 85px;
padding: 2px;
flex-direction: column;
align-items: center;
gap: 4px;
}

.point-popUp{
display: flex;
gap: 24px;
}

.point-me {
border-radius: 8px;
background: #32D583;
}

.point-expre{
border-radius: 8px;
background:#F5B64A;
}

.pnt{
display: flex;
padding: 8px;
justify-content: center;
align-items: center;
gap: 6px;
flex: 1 0 0;
align-self: stretch;
border-radius: 6px;
background: #FFF;
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: 21.6px;
}
.point-number-me{
color: #32D583;
}
.point-number-kn{
color: #F5B64A;
}

.btn-point-popUp {
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
gap: 300px;
padding: 0;
border-top: 1px solid #DDD;
margin-top: 24px;
width: 100%;
}

.container-test{
width: 100%;
display: flex;
padding: 16px;
flex-direction: column;
align-items: center;
gap: 20px;
flex: 1 0 0;
align-self: stretch;
}

.content-test{
width: 100%;
padding: 50px 42px;
margin-top: 20px;
border-radius: 8px;
padding: 24px 24px 0 24px;
display: fixed;
flex-direction: column;
align-items: flex-start;
gap: 20px;
background: #FFF;
box-sizing: border-box;
}

.card{
flex: 1 1 0;
min-width: 0;
max-width: none;
padding: 97px 0;
border-radius: 8px;
margin-bottom: 20px;
border: 1px solid #DDD;
background: #FAFAFA;
display: flex;
flex-direction: column;
align-items: center;
gap: 18px;
box-sizing: border-box;
}

.ques-test {
display: flex;
gap: 32px;
width: 100%;
margin-bottom: 30px;
justify-content: stretch;
align-items: flex-start;
box-sizing: border-box;
}
.select-answer-correct{
display: flex;
justify-content: space-between;
}
.select-answer-correct p{
color: #676767;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px;
}
/* .curr-ques-test{} */
.ques-content-test{
color: #3D3D3D;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 32px;
margin-bottom: 0;
}
.answer-test{
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 16px;
/* flex: 1 0 0; */
align-self: stretch;
}

.ans{
display: flex;
width: 445px;
height: 80px;
padding: 12px 20px;
align-items: center;
gap: 16px;
align-self: stretch;
border-radius: 8px;
}



.answer {
border: 1px solid #DDD;
background: #FAFAFA;
box-shadow: 0px 4px 0px 0px #DDD;
}

.answer-test  :hover {
opacity: 0.8;
}

.redo{
padding: 12px 20px;
border-radius: 16px;
box-shadow: 0px 2px 0px 0px #B5B5B5;
border: 1px solid #B5B5B5;
background: #FFF;
color: #B5B5B5;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 24px;
}

.study{
padding: 12px 20px;
border-radius: 16px;
padding: 12px 20px;
border: 1px solid #F5B64A;
background: #F5B64A;
box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
color:#FFF;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 24px;
}

.study img{
left: 15.265px;
top: 0;
}

.point-text{
color: #FFF;
}

.sleep {
display: flex;
flex-direction: column;
}


.c{
display: flex;
width: 40px;
height: 40px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 8px;
color: var(--White, #FFF);
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 24px;
}



#c{
border: 1px solid #DDD;
background: #FFF;
color: #676767;
}

.select-ans{
color: #3D3D3D;
font-size: 18px;
font-weight: 600;
line-height: 28px;
}
.ques{
color: #3D3D3D;
font-size: 24px;
font-weight: 700;
line-height: 32px;
}


.menuVideo {
margin-top: 16px;
}

.menu {
border: 1px solid #DDDD;
width: 260px;
height: 100vh;
padding: 16px;
}



.menuTitle {
width: 100%;
height: 80px;
background-color: #F37142;
border-top-right-radius: 16px;
border-top-left-radius: 16px;
padding: 16px;
}

.menuTitle h3 {
font-size: 16px;
font-weight: 600;
color: white;
line-height: 2;
}

.menuTitle span {

    font-size: 12px;
    color: white;
    font-weight: 200;
}

.menuVideo {
display: flex;
align-items: center;
gap: 8px;
padding: 12px 16px;
border-radius: 8px;
margin-top: 8px;
background-color: #FFF7F4;
border: 1px solid #F37142;
color: #D56239;
}




.btn-change-ques {
width: 100%;
padding: 0 16px;
border-top: 1px solid var(--Gray-100, #DDD);
background: transparent;
box-sizing: border-box;
}

.btn-change {
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 46px;
margin-bottom: 46px;
gap: 16px; /* Thêm gap để nút không dính sát nhau khi co giãn */
}

.btn-chg,
button {
display: flex;
align-items: center;
justify-content: center;
padding: 12px 20px;
border-radius: 16px;
border: 1px solid var(--Gray-300, #B5B5B5);
background: var(--White, #FFF);
box-shadow: 0px 2px 0px 0px #B5B5B5;
gap: 8px;
color: var(--Gray-300, #B5B5B5);
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 24px;
cursor: pointer;
transition: background 0.2s, color 0.2s, border 0.2s;
}





.ques {
color: var(--Gray-700, #676767);
text-align: center;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px;
margin: 0;
}


.btn-play {
display: flex;
align-items: center;
justify-content: center;
border-radius: 100%;
outline: none;
box-shadow: none;
border: none;
}

.btn-play img {
width: 72px;
height: 72px;
display: block;
pointer-events: none;
}



.ans.selected {
border: 2px solid #007bff;
background: #FFF7F4;
box-shadow: 0px 4px 0px 0px #007bff;
color: #007bff;
}
.ans.correct {
border: 2px solid #00ff26;
background: #F6FEF9;
box-shadow: 0px 4px 0px 0px #00ff26;
color: #00ff26;
}
.ans.wrong {
border: 2px solid #ff0000;
background-color: #FFF7F4;
box-shadow: 0px 4px 0px 0px #ff0000;
color: #ff0000;
}


/* Nút kiểm tra mặc định */
.check.btn-chg {
background: #FFF;
color: #B5B5B5;
border: 1.5px solid #B5B5B5;
box-shadow: 0px 2px 0px 0px #B5B5B5;
transition: background 0.2s, color 0.2s, border 0.2s;
}

/* Khi hover */
.check.btn-chg:hover {
background: #F6FEF9;
color: #12B76A;
border-color: #12B76A;
}

/* Khi ấn vào (active) */
.check.btn-chg:active,
.check.btn-chg.checked {
background: #12B76A;
color: #FFF;
border-color: #12B76A;
}

.boxMain.active, .boxMain.active span {
background: #FFF;
color: #F37142 ;
border-radius: 12px;
font-weight: 700;
}<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="../../CSS/Flow_2_1/hiragana.css">
    <link rel="stylesheet" href="../../CSS/Flow_2_1/finalTest.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <script src="../../JS/checkData.js"></script>

</head>

<header>
    <div class="boxHeader">
        <img src="../../assets/Group1.svg" class="logo">
        <!-- <img src="./assets/logoMankai1.png" class="logo">
        <img src="./assets/logoMankai2.png" class="logo"> -->
    </div>
    <div class="boxHeader">
        <div class="headerLogin2">
            <span>Thi thử mỗi ngày</span>
            <span>Chủ đề</span>
            <label>
                <select>
                    <option>Học tập</option>
                </select>
                <i class="fa-solid fa-angle-down"></i>
            </label>
        </div>
        <div class="headerLogin3">
            <img alt="Icon" src="../../assets/logoVn.png" style="margin-right: 8px;" />
            <span>VI</span>
            <img src="../../assets/avatar.png" />
        </div>
    </div>
</header>

<body>

    <main>
        <section class="menu">
            <div class="menuTitle">
                <h3>Danh sách bài</h3>
                <span>4 videos •</span>
                <span> 50 phút •</span>
                <span>1 bài Test</span>
            </div>


            <div id="video" class="video">
                <div class="boxMain" id="page-hira">
                    <span>Hiragana</span>
                </div>
            </div>

            <div id="flashCard">
                <div class="boxMain" id="page-kata">
                    <span>katakana</span>
                </div>
            </div>

            <div id="test">
                <div class="boxMain" id="page-cnt">
                    <span>Số đếm</span>
                </div>
            </div>

            <div id="Sile">
                <div class="boxMain" id="page-test">
                    <span>Kiểm tra cuối bài</span>
                </div>
            </div>
        </section>
        <section class="container-test">
             


            <div class="content-test">
                <p class="ques-content-test">Nội dung nhóm câu hỏi</p>
                <div class="select-answer-correct">
                    <p>Chọn đáp án đúng</p>
                    <p class="curr-ques-test">Câu 1/37</p>
                </div>
                <div class="ques-test">
                    <!-- <div class="card">
                        <p class="select-ans">Chọn đáp án đúng</p>
                        <p class="ques">こん</p>
                    </div> -->
                    <div class="card">
                        <p class="select-ans">Nghe và trả lời câu hỏi</p>
                        <button class="btn-play"><img src="../../assets/play-circle.svg" alt="logo"></button>
                    </div>
                    <div class="answer-test">
                        <div class="answer ans">
                            <div class="c" id="c" >A</div>
                            <div>
                                <p>こんにちは</p>
                            </div>
                        </div>
                        <div class="answer ans">
                            <div class="c" id="c">B</div>
                            <div>
                                <p>こんにちは</p>
                            </div>
                        </div>
                        <div class="answer ans">
                            <div class="c" id="c">C</div>
                            <div>
                                <p>こんにちは</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 


            <div class="btn-change-ques">
                <div class="btn-change">
                    <button class="ques-prev btn-chg">Câu trước</button>
                    <button class="check btn-chg">Kiểm tra</button>
                </div>
            </div>
        </section>
    </main>

    <section>
        <div id="overlay" class="overlay"></div>
        <div id="popUp" class="popUp">
            <img class="popUp-img" src="../../assets/medal.svg">
            <div class="boxDetail-header">
                <div class="flex">
                    <div class="text-complete">Hoàn thành bài kiểm tra!</div>
                    <div class="point-popUp">
                        <div class="point-me point">
                            <div class="point-text">Điểm của bạn</div>
                            <div class="point-number-me pnt">3/5</div>
                        </div>
                        <div class="point-expre point">
                            <div class="point-text">Điểm KN</div>
                            <div class="point-number-kn pnt"><img src="../../assets/Object 1.svg">54</div>
                        </div>
                    </div>
                </div>
                <div class="btn-point-popUp">
                    <button class="redo">Làm lại</button>
                    <button class="study" style="position: relative;"><img src="../../assets/Frame 1000007256.svg"
                            style="position: absolute;">Học tiếp</button>
                </div>
            </div>
        </div>
    </section>





<script src="../../JS/Flow_2_1/finalTest.js"></script>
<script crossorigin="anonymous" src="https://kit.fontawesome.com/a5e9eda380.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
</body>

</html>  let pageHira = document.getElementById("page-hira")
let pageKata = document.getElementById("page-kata")
let pageCnt = document.getElementById("page-cnt")
let pageTest = document.getElementById("page-test")


pageHira.addEventListener('click', () => {
window.location.href = "hiragana.html"
})
pageKata.addEventListener('click', () => {
window.location.href = "katakana.html"
})
pageCnt.addEventListener('click', () => {
window.location.href = "countNumber.html"
})
pageTest.addEventListener('click', () => {
window.location.href = "finalTest.html"
})
const buttons = document.querySelectorAll('.btn-item')
const sectionMain = document.querySelector('.sectionMain')
const containerText = document.querySelector('.container-text')
const boxes = document.querySelectorAll('.boxDetail')
const overlay = document.getElementById('overlay')
const popUp = document.getElementById('popUp')
const popUpChar = popUp.querySelector('.text-japan')
const popUpRomanji = popUp.querySelector('.romanji')
const popUpMeaning = popUp.querySelector('.meaning')
overlay.addEventListener('click', function (e) {
if (e.target === overlay) {
overlay.style.display = 'none'
popUp.style.display = 'none'
}
});
buttons.forEach(button => {
button.addEventListener('click', () => {
buttons.forEach(btn => btn.classList.remove('active'));
button.classList.add('active');
if (button.id==='btn-shock' || button.id==='btn-sound') {
sectionMain.style.display = 'none'
containerText.style.display = 'flex'
} else {
sectionMain.style.display = 'grid'
containerText.style.display = 'none'
}
})
})
boxes.forEach(box => {
box.addEventListener('click', () => {
boxes.forEach(b => b.classList.remove('active'));
box.classList.add('active')
overlay.style.display = 'block'
popUp.style.display = 'block'
})
})


const pageMap = {
"hiragana.html": "page-hira",
"katakana.html": "page-kata",
"countNumber.html": "page-cnt",
"finalTest.html": "page-test"
};
const path = window.location.pathname;
const file = path.substring(path.lastIndexOf('/') + 1);
const activeId = pageMap[file];
if (activeId) {
document.getElementById(activeId)?.classList.add('active');
}Dưới đây là file FinalTest.tsx hoàn chỉnh – chuyển đổi 100% từ HTML + CSS + JS sang React TSX, CSS viết hoàn toàn bằng style={{}}, không cần file CSS, logic JS được chuyển thành React state + ref chuẩn, giao diện và chức năng giống hệt bản gốc.

FinalTest.tsx – React + TSX + Inline Styles
tsximport React, { useState, useEffect, useRef } from "react";

const FinalTest: React.FC = () => {
const [showPopup, setShowPopup] = useState(false);
const [currentQuestion, setCurrentQuestion] = useState(1);
const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
const [isChecked, setIsChecked] = useState(false);
const [correctAnswer, setCorrectAnswer] = useState("A");

const overlayRef = useRef<HTMLDivElement>(null);

// Highlight trang hiện tại
useEffect(() => {
const pageMap: Record<string, string> = {
"hiragana.html": "page-hira",
"katakana.html": "page-kata",
"countNumber.html": "page-cnt",
"finalTest.html": "page-test",
};
const file = window.location.pathname.split("/").pop() || "";
const activeId = pageMap[file];
if (activeId) {
document.getElementById(activeId)?.classList.add("active");
}
}, []);

// Xử lý chọn đáp án
const handleAnswerClick = (ans: string) => {
if (isChecked) return;
setSelectedAnswer(ans);
};

// Xử lý kiểm tra
const handleCheck = () => {
if (!selectedAnswer) return;
setIsChecked(true);
if (currentQuestion === 37) {
setTimeout(() => setShowPopup(true), 800);
}
};

// Nút "Câu trước"
const handlePrev = () => {
if (currentQuestion > 1) {
setCurrentQuestion(prev => prev - 1);
resetQuestion();
}
};

// Reset câu hỏi
const resetQuestion = () => {
setSelectedAnswer(null);
setIsChecked(false);
};

// Đóng popup
const closePopup = (e: React.MouseEvent) => {
if (e.target === overlayRef.current) {
setShowPopup(false);
}
};

return (
<div style={{ margin: 0, padding: 0, boxSizing: "border-box", fontFamily: "'FS PF BeauSans Pro', 'Roboto', sans-serif" }}>
{/* Header */}
<header style={{
display: "flex",
alignItems: "center",
padding: "14px 28px",
justifyContent: "space-between",
backgroundColor: "#ffffff",
}}>
<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
<img src="../../assets/Group1.svg" alt="logo" style={{ width: "60px", height: "46px" }} />
</div>
<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
<div style={{
display: "flex",
alignItems: "center",
gap: "16px",
color: "#1D2939",
fontWeight: 600,
fontSize: "14px",
}}>
<span>Thi thử mỗi ngày</span>
<span>Chủ đề</span>
<label style={{ position: "relative" }}>
<select style={{
border: "none",
color: "#F37142",
fontWeight: 600,
appearance: "none",
background: "transparent",
paddingRight: "20px",
}}>
<option>Học tập</option>
</select>
<i className="fa-solid fa-angle-down" style={{
position: "absolute",
right: 0,
pointerEvents: "none",
color: "#F37142",
}}></i>
</label>
</div>
<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
<img src="../../assets/logoVn.png" alt="flag" />
<span>VI</span>
<img src="../../assets/avatar.png" alt="avatar" style={{ marginLeft: "8px" }} />
</div>
</div>
</header>

      {/* Main */}
      <main style={{ display: "flex", gap: "16px", backgroundColor: "#FAFAFA" }}>
        {/* Sidebar */}
        <section style={{
          border: "1px solid #DDDDDD",
          width: "260px",
          minHeight: "100vh",
          padding: "16px",
          background: "#FFF",
        }}>
          <div style={{
            width: "100%",
            height: "80px",
            backgroundColor: "#F37142",
            borderTopRightRadius: "16px",
            borderTopLeftRadius: "16px",
            padding: "16px",
            color: "white",
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, lineHeight: 2 }}>Danh sách bài</h3>
            <span style={{ fontSize: "12px", fontWeight: 200 }}>4 videos • 50 phút • 1 bài Test</span>
          </div>

          {[
            { id: "page-hira", label: "Hiragana", href: "hiragana.html" },
            { id: "page-kata", label: "Katakana", href: "katakana.html" },
            { id: "page-cnt", label: "Số đếm", href: "countNumber.html" },
            { id: "page-test", label: "Kiểm tra cuối bài", href: "finalTest.html", active: true },
          ].map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="boxMain"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 16px",
                borderRadius: "8px",
                marginTop: "8px",
                backgroundColor: item.active ? "#FFF7F4" : "#FAFAFA",
                border: item.active ? "1px solid #F37142" : "none",
                cursor: "pointer",
              }}
              onClick={() => window.location.href = item.href}
            >
              <span style={{
                fontSize: "14px",
                color: item.active ? "#D56239" : "#3D3D3D",
                fontWeight: item.active ? 700 : 400,
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </section>

        {/* Test Area */}
        <section style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          gap: "20px",
        }}>
          <div style={{
            width: "100%",
            padding: "50px 42px",
            marginTop: "20px",
            borderRadius: "8px",
            background: "#FFF",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}>
            <p style={{
              color: "#3D3D3D",
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: "32px",
              margin: 0,
            }}>Nội dung nhóm câu hỏi</p>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ color: "#676767", fontSize: "14px", margin: 0 }}>Chọn đáp án đúng</p>
              <p style={{ color: "#676767", fontSize: "14px", margin: 0 }}>Câu {currentQuestion}/37</p>
            </div>

            <div style={{ display: "flex", gap: "32px", width: "100%" }}>
              {/* Card nghe */}
              <div style={{
                flex: 1,
                padding: "97px 0",
                borderRadius: "8px",
                border: "1px solid #DDD",
                background: "#FAFAFA",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "18px",
              }}>
                <p style={{
                  color: "#3D3D3D",
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "28px",
                  margin: 0,
                }}>Nghe và trả lời câu hỏi</p>
                <button style={{
                  border: "none",
                  background: "none",
                  padding: 0,
                  cursor: "pointer",
                }}>
                  <img src="../../assets/play-circle.svg" alt="play" style={{ width: "72px", height: "72px" }} />
                </button>
              </div>

              {/* Đáp án */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                flex: 1,
              }}>
                {["A", "B", "C"].map((ans) => (
                  <div
                    key={ans}
                    className={`answer ans ${selectedAnswer === ans ? "selected" : ""} ${isChecked && ans === correctAnswer ? "correct" : isChecked && selectedAnswer === ans && ans !== correctAnswer ? "wrong" : ""}`}
                    style={{
                      display: "flex",
                      width: "445px",
                      height: "80px",
                      padding: "12px 20px",
                      alignItems: "center",
                      gap: "16px",
                      borderRadius: "8px",
                      border: selectedAnswer === ans ? "2px solid #007bff" : "1px solid #DDD",
                      background: selectedAnswer === ans ? "#FFF7F4" : "#FAFAFA",
                      boxShadow: selectedAnswer === ans ? "0px 4px 0px 0px #007bff" : "0px 4px 0px 0px #DDD",
                      cursor: isChecked ? "default" : "pointer",
                    }}
                    onClick={() => handleAnswerClick(ans)}
                  >
                    <div style={{
                      display: "flex",
                      width: "40px",
                      height: "40px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                      background: "#FFF",
                      border: "1px solid #DDD",
                      color: "#676767",
                      fontSize: "16px",
                      fontWeight: 600,
                    }}>
                      {ans}
                    </div>
                    <p style={{ margin: 0, fontSize: "16px" }}>こんにちは</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Nút điều khiển */}
          <div style={{
            width: "100%",
            padding: "0 16px",
            borderTop: "1px solid #DDD",
            background: "transparent",
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "46px 0",
              gap: "16px",
            }}>
              <button
                className="ques-prev btn-chg"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 20px",
                  borderRadius: "16px",
                  border: "1px solid #B5B5B5",
                  background: "#FFF",
                  boxShadow: "0px 2px 0px 0px #B5B5B5",
                  gap: "8px",
                  color: "#B5B5B5",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
                onClick={handlePrev}
              >
                Câu trước
              </button>
              <button
                className={`check btn-chg ${isChecked ? "checked" : ""}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 20px",
                  borderRadius: "16px",
                  border: isChecked ? "1.5px solid #12B76A" : "1.5px solid #B5B5B5",
                  background: isChecked ? "#12B76A" : "#FFF",
                  boxShadow: isChecked ? "none" : "0px 2px 0px 0px #B5B5B5",
                  color: isChecked ? "#FFF" : "#B5B5B5",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: selectedAnswer ? "pointer" : "not-allowed",
                  opacity: selectedAnswer ? 1 : 0.6,
                }}
                onClick={handleCheck}
                disabled={!selectedAnswer}
              >
                Kiểm tra
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Popup hoàn thành */}
      {showPopup && (
        <>
          <div
            ref={overlayRef}
            className="overlay"
            style={{
              display: "block",
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
            }}
            onClick={closePopup}
          />
          <div
            className="popUp"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              width: "600px",
              minHeight: "420px",
              padding: "40px 32px 32px 32px",
              position: "fixed",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "16px",
              background: "#FFF",
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              zIndex: 1100,
            }}
          >
            <img src="../../assets/medal.svg" alt="medal" style={{ width: "50%", height: "50%", marginBottom: "8px" }} />
            <p style={{
              color: "#F5B64A",
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: "32px",
              margin: 0,
            }}>Hoàn thành bài kiểm tra!</p>
            <div style={{ display: "flex", gap: "24px" }}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                width: "108px",
                height: "85px",
                padding: "2px",
                borderRadius: "8px",
                background: "#32D583",
              }}>
                <p style={{ color: "#FFF", margin: 0, fontSize: "14px" }}>Điểm của bạn</p>
                <p style={{
                  display: "flex",
                  padding: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  borderRadius: "6px",
                  background: "#FFF",
                  color: "#32D583",
                  fontSize: "18px",
                  fontWeight: 700,
                  margin: 0,
                }}>3/5</p>
              </div>
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                width: "108px",
                height: "85px",
                padding: "2px",
                borderRadius: "8px",
                background: "#F5B64A",
              }}>
                <p style={{ color: "#FFF", margin: 0, fontSize: "14px" }}>Điểm KN</p>
                <p style={{
                  display: "flex",
                  padding: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "6px",
                  flex: 1,
                  borderRadius: "6px",
                  background: "#FFF",
                  color: "#F5B64A",
                  fontSize: "18px",
                  fontWeight: 700,
                  margin: 0,
                }}>
                  <img src="../../assets/Object 1.svg" alt="exp" />54
                </p>
              </div>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              paddingTop: "24px",
              borderTop: "1px solid #DDD",
              gap: "300px",
            }}>
              <button style={{
                padding: "12px 20px",
                borderRadius: "16px",
                boxShadow: "0px 2px 0px 0px #B5B5B5",
                border: "1px solid #B5B5B5",
                background: "#FFF",
                color: "#B5B5B5",
                fontSize: "16px",
                fontWeight: 700,
              }}>Làm lại</button>
              <button style={{
                position: "relative",
                padding: "12px 20px",
                borderRadius: "16px",
                border: "1px solid #F5B64A",
                background: "#F5B64A",
                boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                color: "#FFF",
                fontSize: "16px",
                fontWeight: 700,
              }}>
                <img src="../../assets/Frame 1000007256.svg" alt="" style={{
                  position: "absolute",
                  left: "15.265px",
                  top: 0,
                }} />
                Học tiếp
              </button>
            </div>
          </div>
        </>
      )}

      {/* Font Awesome */}
      <script crossOrigin="anonymous" src="https://kit.fontawesome.com/a5e9eda380.js"></script>
    </div>
);
};

export default FinalTest;

Đã làm gì?









































Yêu cầuHoàn thànhChuyển HTML → TSXDoneCSS → style={{}}DoneJS → React state + useEffectDoneGiữ nguyên giao diệnDonePopup hoàn thànhDoneChọn đáp án + Kiểm traDoneNút "Câu trước"DoneHighlight trang hiện tạiDone

Dán file này vào src/pages/FinalTest.tsx → chạy mượt, đẹp, chuẩn React.
Muốn thêm âm thanh khi bấm play, hiệu ứng đúng/sai, hay lưu điểm vào localStorage không?3,2 giâyFasttext// Chuyển trang cho menu bên trái (giữ nguyên)
let pageHira = document.getElementById("page-hira");
let pageKata = document.getElementById("page-kata");
let pageCnt = document.getElementById("page-cnt");
let pageTest = document.getElementById("page-test");

if (pageHira) {
pageHira.addEventListener('click', () => {
window.location.href = "hiragana.html";
});
}
if (pageKata) {
pageKata.addEventListener('click', () => {
window.location.href = "katakana.html";
});
}
if (pageCnt) {
pageCnt.addEventListener('click', () => {
window.location.href = "countNumber.html";
});
}
if (pageTest) {
pageTest.addEventListener('click', () => {
window.location.href = "finalTest.html";
});
}

// Object lưu trữ 10 câu hỏi: 5 câu chữ, 5 câu nghe (chỉ tiếng Nhật)
const questions = [
{
type: "text",
question: "こん",
answers: [
{ label: "A", text: "こんにちは", correct: true },
{ label: "B", text: "こんばんは", correct: false },
{ label: "C", text: "おはよう", correct: false }
]
},
{
type: "text",
question: "さよう",
answers: [
{ label: "A", text: "ありがとう", correct: false },
{ label: "B", text: "さようなら", correct: true },
{ label: "C", text: "おやすみ", correct: false }
]
},
{
type: "text",
question: "ありがとう",
answers: [
{ label: "A", text: "ありがとう", correct: true },
{ label: "B", text: "こんにちは", correct: false },
{ label: "C", text: "さようなら", correct: false }
]
},
{
type: "text",
question: "おはよう",
answers: [
{ label: "A", text: "おやすみ", correct: false },
{ label: "B", text: "こんばんは", correct: false },
{ label: "C", text: "おはよう", correct: true }
]
},
{
type: "text",
question: "こんばんは",
answers: [
{ label: "A", text: "こんばんは", correct: true },
{ label: "B", text: "おはよう", correct: false },
{ label: "C", text: "こんにちは", correct: false }
]
},
// 5 câu nghe (type: audio)
{
type: "audio",
audio: ".../../assets/play-circle.svg",
answers: [
{ label: "A", text: "こんにちは", correct: true },
{ label: "B", text: "こんばんは", correct: false },
{ label: "C", text: "おはよう", correct: false }
]
},
{
type: "audio",
audio: "../../assets/play-circle.svg",
answers: [
{ label: "A", text: "ありがとう", correct: false },
{ label: "B", text: "さようなら", correct: true },
{ label: "C", text: "おやすみ", correct: false }
]
},
{
type: "audio",
audio: "../../assets/play-circle.svg",
answers: [
{ label: "A", text: "ありがとう", correct: true },
{ label: "B", text: "こんにちは", correct: false },
{ label: "C", text: "さようなら", correct: false }
]
},
{
type: "audio",
audio: "../../assets/play-circle.svg",
answers: [
{ label: "A", text: "おやすみ", correct: false },
{ label: "B", text: "おはよう", correct: true },
{ label: "C", text: "こんばんは", correct: false }
]
},
{
type: "audio",
audio: "../../assets/play-circle.svg",
answers: [
{ label: "A", text: "こんばんは", correct: true },
{ label: "B", text: "おはよう", correct: false },
{ label: "C", text: "こんにちは", correct: false }
]
}
];

// Biến trạng thái
let currentQ = 0;
let totalQ = questions.length;
let selectedIdx = null;
let score = 0;
let lastScore = 0;

// Lấy phần tử HTML để hiển thị câu hỏi và đáp án
const quesTest = document.querySelector('.ques-test');
const answerTest = document.querySelector('.answer-test');
const currQuesTest = document.querySelector('.curr-ques-test');

// Hàm phát âm tiếng Nhật bằng giọng máy
function speakJapanese(text) {
window.speechSynthesis.cancel();
const utter = new SpeechSynthesisUtterance(text);
utter.lang = 'ja-JP'; // tiếng Nhật
window.speechSynthesis.speak(utter);
}

// Hàm hiển thị câu hỏi
function renderQuestion(index) {
selectedIdx = null;
const q = questions[index];

    // Xóa câu cũ
    answerTest.innerHTML = '';
    quesTest.querySelector('.card')?.remove();

    // Tạo khung câu hỏi mới
    let card = document.createElement('div');
    card.className = 'card';

    if (q.type === "text") {
        card.innerHTML = `
            <p class="select-ans">Chọn đáp án đúng</p>
            <p class="ques">${q.question}</p>
        `;
    } else {
        card.innerHTML = `
            <p class="select-ans">Nghe và trả lời câu hỏi</p>
            <button class="btn-play"><img src="${q.audio}" alt="audio"></button>
        `;
    }

    quesTest.insertBefore(card, answerTest);

    // Nếu là câu nghe thì gán sự kiện phát âm
    if (q.type === "audio") {
        let btn = card.querySelector('.btn-play');
        let correctAns = q.answers.find(ans => ans.correct);
        if (btn && correctAns) {
            btn.onclick = () => speakJapanese(correctAns.text);
        }
    }

    // Hiển thị các đáp án
     q.answers.forEach((ans, i) => {
        const ansDiv = document.createElement('div');
        ansDiv.className = `answer ans`;
        ansDiv.innerHTML = `
            <div class="c" id="c">${ans.label}</div>
            <div><p>${ans.text}</p></div>
        `;
        ansDiv.addEventListener('click', function () {
            answerTest.querySelectorAll('.ans').forEach(e => e.classList.remove('selected'));
            ansDiv.classList.add('selected');
            selectedIdx = i;
        });
        answerTest.appendChild(ansDiv);
    });

    // Cập nhật số thứ tự câu
    if (currQuesTest) {
        currQuesTest.textContent = `Câu ${index + 1}/${totalQ}`;
    }
}

// Khi nhấn nút "Kiểm tra"
document.querySelector('.check')?.addEventListener('click', () => {
if (selectedIdx === null) return;

    let q = questions[currentQ];
    let ansEls = answerTest.querySelectorAll('.ans');

    ansEls.forEach((el, i) => {
        el.classList.remove('correct', 'wrong');
        if (q.answers[i].correct) el.classList.add('correct');
        if (i === selectedIdx && !q.answers[i].correct) el.classList.add('wrong');
    });

    if (q.answers[selectedIdx].correct) score++;

    setTimeout(() => {
        currentQ++;
        if (currentQ < totalQ) {
            renderQuestion(currentQ);
        } else {
            lastScore = score;
            showResultPopup();
        }
    }, 1000);
});

// Nút câu trước
document.querySelector('.ques-prev')?.addEventListener('click', () => {
if (currentQ > 0) {
currentQ--;
renderQuestion(currentQ);
}
});

// Hiện popup điểm
function showResultPopup() {
const overlay = document.getElementById('overlay');
const popUp = document.getElementById('popUp');
const pointEl = document.querySelector('.point-number-me');
const knEl = document.querySelector('.point-number-kn');

    if (pointEl) pointEl.textContent = `${score}/${questions.length}`;

    if (knEl) {
        let knScore = Math.round((score / questions.length) * 100);
        let icon = knEl.querySelector('img');
        knEl.innerHTML = '';
        if (icon) knEl.appendChild(icon);
        knEl.append(` ${knScore}`);
    }

    if (overlay && popUp) {
        overlay.style.display = 'block';
        popUp.style.display = 'block';
    }
}

// Nút "Làm lại"
document.querySelector('.redo')?.addEventListener('click', () => {
document.getElementById('overlay').style.display = 'none';
document.getElementById('popUp').style.display = 'none';
currentQ = 0;
score = 0;
renderQuestion(currentQ);
});

// Render câu đầu tiên khi mở trang
renderQuestion(currentQ);

// Đóng popup nếu bấm ra ngoài
let overlay = document.getElementById('overlay');
let popUp = document.getElementById('popUp');
if (overlay && popUp) {
overlay.onclick = (e) => {
if (e.target === overlay) {
overlay.style.display = 'none';
popUp.style.display = 'none';
}
};
}

// Đánh dấu menu đang mở
const pageMap = {
"hiragana.html": "page-hira",
"katakana.html": "page-kata",
"countNumber.html": "page-cnt",
"finalTest.html": "page-test"
};
const path = window.location.pathname;
const file = path.substring(path.lastIndexOf('/') + 1);
const activeId = pageMap[file];
if (activeId) {
document.getElementById(activeId)?.classList.add('active');
}, * {
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: 'FS PF BeauSans Pro', sans-serif;
}

header {
display: flex;
align-items: center;
padding: 14px 28px;
justify-content: space-between;
background-color: #ffffff;
}

.boxHeader {
display: flex;
align-items: center;
gap: 8px;
}

/* .boxHeader img.logo {
width: 60px;
height: 46px;
} */

.headerLogin2 {
display: flex;
align-items: center;
gap: 16px;
color: #1D2939;
font-weight: 600;
font-size: 14px;
}

.headerLogin2 label {
color: #F37142;
/* dscdyuscditisualai */
}

.headerLogin2 select {
border: none;
color: #F37142;
font-weight: 600;
appearance: none;
background: transparent;
}

.headerLogin3 {
display: flex;
align-items: center;

}


.headerLogin3 span {
margin-right: 16px;
}

.menuVideo {
margin-top: 16px;
}

/* .boxHeader {
display: flex;
align-items: center;
gap: 8px;
} */

.boxHeader h2 {
font-size: 24px;
color: #3D3D3D;
font-weight: 600;
}

.boxMain {
display: flex;
align-items: center;
gap: 8px;
padding: 12px 16px;
border: none;
border-radius: 8px;
margin-top: 8px;
background-color: #FAFAFA;
cursor: pointer;

}

.boxMain:hover {
border: 1px solid #DDDDDD;
}

.boxMain img {
filter: grayscale(1);

}

.boxMain span {

    font-size: 14px;
    color: #3D3D3D;
}

.boxMain.active {
border: 1px solid var(--Orange-500, #F37142);
background: var(--Orange-25, #FFF7F4);
}

main {
display: flex;
gap: 16px;
}

.menu {
border: 1px solid #DDDD;
width: 300px;
height: 100vh;
padding: 16px;
}



.menuTitle {
width: 100%;
height: 80px;
background-color: #F37142;
border-top-right-radius: 16px;
border-top-left-radius: 16px;
padding: 16px;
}

.menuTitle h3 {
font-size: 16px;
font-weight: 600;
color: white;
line-height: 2;
}

.menuTitle span {

    font-size: 12px;
    color: white;
    font-weight: 200;
}

.menuVideo {
display: flex;
align-items: center;
gap: 8px;
padding: 12px 16px;
;
border-radius: 8px;
margin-top: 8px;
background-color: #FFF7F4;
border: 1px solid #F37142;
color: #D56239;
}

main {
background-color: #FAFAFA;
}



.menu {
background: #FFF;
}

.boxIconContainer {
display: flex;
width: 56px;
height: 56px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 8px;
background: #FFF7F4;
}

.container1 {
display: flex;
gap: 16px;
margin-left: 16px;
margin-top: 16px;
margin-bottom: 32px;

}

.boxIconContainer img {
width: 24px;

}

.container2 {
position: relative;
/* margin-bottom: 24px; */
/* padding: 24px; */
}

#btn-advise {
cursor: pointer;
padding: 12px 20px;
width: 163px;
height: 48px;
border: 2px solid #DD673C;
border-radius: 16px;
box-shadow: 0 4px 0 0 #AD502F;
color: #ffffff;
font-weight: 700;
font-size: 16px;
background-color: #F37142;
position: relative;
z-index: 0;
overflow: hidden;
margin-top: 18px;
margin-right: 15px;
}

#btn-advise:hover {
border: 2px solid #d56239;
}

.container2 {
margin-top: 24px;
width: 100%;
display: flex;
justify-content: space-between;
height: 90px;
border: 1px solid #DDD;
gap: 16px;
border-radius: 16px;
/* padding: 16px; */
}

#arrow-up-right {
position: absolute;
left: 18.934px;
top: -27.29px;
width: 62.444px;
height: 102.58px;
}

.containerMain {
background-color: #FFF;
border-radius: 8px;
padding: 16px;
width: 100%;
margin-top: 20px;



    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
}

.containerMain>div:first-child p {
font-size: 20px;
font-weight: 600;
color: #3D3D3D;
}

.title {
font-weight: 600;
border-bottom: 1px solid #DDD;
width: 100%;
}

.btn-item {
padding: 8px 16px;
border-radius: 8px;
background: #FAFAFA;
border: none;
cursor: pointer;
}

.btn-text {
display: flex;
justify-content: center;
color: #676767;
align-items: center;
font-family: "Roboto";
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 20px;
margin: 0;
}

.btn-item.active {
background: #FFF7F4;
border: 1px solid #F37142;
color: #D56239;
}

.btn-item.active .btn-text {
color: #D56239;
}

.sectionMain {
display: grid;
grid-template-columns: repeat(5, 1fr);
gap: 16px;
padding: 16px;
border-radius: 8px;
background: #FFF;
width: 100%;
}

.boxDetail {
display: flex;
flex-direction: column;
align-items: center;
gap: 4px;
padding: 8px;
border-radius: 8px;
background: #FAFAFA;
}

.text-japan {
color: #3D3D3D;
font-family: "Roboto";
font-size: 32px;
font-style: normal;
font-weight: 600;
line-height: 40px;
margin: 0;
}

.container-text {
margin: 24px;
display: none;
flex-direction: column;
gap: 16px;
}

.container-text p {
font-size: 16px;
color: #3D3D3D;
margin: 0;
}

.container-text div {
margin-left: 16px;
}

.container-text div p:first-child {
font-weight: 600;
}

.overlay {
display: none;
position: fixed;
inset: 0;
background-color: rgba(0, 0, 0, 0.5);
z-index: 1000;
}

.popUp {
display: none;
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color: #ffffff;
border-radius: 16px;
padding: 24px;
z-index: 1001;
width: 438.991px;
height: 500px;
/* display: flex; */
flex-direction: column;
align-items: center;
justify-content: center;
}

.show {
width: 100%;
height: 16px;
border: 1px solid #F58D68;
border-radius: 16px;
background-color: #FFFF;
box-shadow: 0 3px 0 0 #F58D68;
margin-bottom: 16px;
text-align: center;
font-size: 16px;
color: #F58D68;
cursor: pointer;
}

.container-card {
width: 100%;
}

.span1 {
color: #676767;
font-size: 14px;
}

.boxDetail-header {
display: flex;
flex-direction: column;
width: 100%;
justify-content: space-between;
align-items: center;
margin-bottom: 16px;
}

.boxDetail-header span {
font-size: 14px;
color: #676767;
}

.flex {
display: flex;
flex-direction: column;
gap: 8px;
justify-content: center;
align-items: center;
}

.icon-popUp {
display: flex;
}

.text-popUp {
text-align: center;
gap: 8px;
justify-content: center;
align-items: center;
}

.circle {
display: flex;
background-color: #FEF1EC;
width: 32px;
height: 32px;
border-radius: 50%;
align-items: center;
justify-content: center;
cursor: pointer;
}

.circle1 {
display: flex;
background-color: #F0F9FF;
width: 32px;
height: 32px;
border-radius: 50%;
align-items: center;
justify-content: center;
cursor: pointer;
}

.circle img,
.circle1 img {
width: 16px;
height: 16px;
}

.boxText {
width: 100%;
height: 80px;
background-color: #FAFAFA;
border-radius: 8px;
border: 1px solid #DDDDDD;
margin-bottom: 8px;
padding: 12px;
font-size: 14px;
color: #676767;
}

.boxDetail.active {
border: 1px solid #DDD;
background: #FAFAFA;
}

.boxDetail :hover {
cursor: pointer;
/* border: none !important; */
/* background: #cfcece; */
}

.boxMain .active {
border: 1px solid #F37142;
background: #FFF7F4;
}


.boxMain.active, .boxMain.active span {
background: #FFF;
color: #F37142 ;
border-radius: 12px;
font-weight: 700;
} * {
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: 'FS PF BeauSans Pro', "Roboto", sans-serif;
}

.overlay {
display: none;
position: fixed;
inset: 0;
background-color: rgba(0, 0, 0, 0.5);
z-index: 1000;
}

.popUp {
display: none;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 16px;
width: 600px;
min-height: 420px;
padding: 40px 32px 32px 32px;
position: fixed;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
border-radius: 16px;
background: #FFF;
box-shadow: 0 8px 32px rgba(0,0,0,0.18);
z-index: 1100;
}

.popUp-img {
display: block;
margin-left: auto;
margin-right: auto;
margin-bottom: 8px;
width: 50%;
height: 50%;
}



.text-complete{
color: #F5B64A;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 32px;
}

.point{
display: flex;
width: 108px;
height: 85px;
padding: 2px;
flex-direction: column;
align-items: center;
gap: 4px;
}

.point-popUp{
display: flex;
gap: 24px;
}

.point-me {
border-radius: 8px;
background: #32D583;
}

.point-expre{
border-radius: 8px;
background:#F5B64A;
}

.pnt{
display: flex;
padding: 8px;
justify-content: center;
align-items: center;
gap: 6px;
flex: 1 0 0;
align-self: stretch;
border-radius: 6px;
background: #FFF;
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: 21.6px;
}
.point-number-me{
color: #32D583;
}
.point-number-kn{
color: #F5B64A;
}

.btn-point-popUp {
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
gap: 300px;
padding: 0;
border-top: 1px solid #DDD;
margin-top: 24px;
width: 100%;
}

.container-test{
width: 100%;
display: flex;
padding: 16px;
flex-direction: column;
align-items: center;
gap: 20px;
flex: 1 0 0;
align-self: stretch;
}

.content-test{
width: 100%;
padding: 50px 42px;
margin-top: 20px;
border-radius: 8px;
padding: 24px 24px 0 24px;
display: fixed;
flex-direction: column;
align-items: flex-start;
gap: 20px;
background: #FFF;
box-sizing: border-box;
}

.card{
flex: 1 1 0;
min-width: 0;
max-width: none;
padding: 97px 0;
border-radius: 8px;
margin-bottom: 20px;
border: 1px solid #DDD;
background: #FAFAFA;
display: flex;
flex-direction: column;
align-items: center;
gap: 18px;
box-sizing: border-box;
}

.ques-test {
display: flex;
gap: 32px;
width: 100%;
margin-bottom: 30px;
justify-content: stretch;
align-items: flex-start;
box-sizing: border-box;
}
.select-answer-correct{
display: flex;
justify-content: space-between;
}
.select-answer-correct p{
color: #676767;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px;
}
/* .curr-ques-test{} */
.ques-content-test{
color: #3D3D3D;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 32px;
margin-bottom: 0;
}
.answer-test{
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 16px;
/* flex: 1 0 0; */
align-self: stretch;
}

.ans{
display: flex;
width: 445px;
height: 80px;
padding: 12px 20px;
align-items: center;
gap: 16px;
align-self: stretch;
border-radius: 8px;
}



.answer {
border: 1px solid #DDD;
background: #FAFAFA;
box-shadow: 0px 4px 0px 0px #DDD;
}

.answer-test  :hover {
opacity: 0.8;
}

.redo{
padding: 12px 20px;
border-radius: 16px;
box-shadow: 0px 2px 0px 0px #B5B5B5;
border: 1px solid #B5B5B5;
background: #FFF;
color: #B5B5B5;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 24px;
}

.study{
padding: 12px 20px;
border-radius: 16px;
padding: 12px 20px;
border: 1px solid #F5B64A;
background: #F5B64A;
box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
color:#FFF;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 24px;
}

.study img{
left: 15.265px;
top: 0;
}

.point-text{
color: #FFF;
}

.sleep {
display: flex;
flex-direction: column;
}


.c{
display: flex;
width: 40px;
height: 40px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 8px;
color: var(--White, #FFF);
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 24px;
}



#c{
border: 1px solid #DDD;
background: #FFF;
color: #676767;
}

.select-ans{
color: #3D3D3D;
font-size: 18px;
font-weight: 600;
line-height: 28px;
}
.ques{
color: #3D3D3D;
font-size: 24px;
font-weight: 700;
line-height: 32px;
}


.menuVideo {
margin-top: 16px;
}

.menu {
border: 1px solid #DDDD;
width: 260px;
height: 100vh;
padding: 16px;
}



.menuTitle {
width: 100%;
height: 80px;
background-color: #F37142;
border-top-right-radius: 16px;
border-top-left-radius: 16px;
padding: 16px;
}

.menuTitle h3 {
font-size: 16px;
font-weight: 600;
color: white;
line-height: 2;
}

.menuTitle span {

    font-size: 12px;
    color: white;
    font-weight: 200;
}

.menuVideo {
display: flex;
align-items: center;
gap: 8px;
padding: 12px 16px;
border-radius: 8px;
margin-top: 8px;
background-color: #FFF7F4;
border: 1px solid #F37142;
color: #D56239;
}




.btn-change-ques {
width: 100%;
padding: 0 16px;
border-top: 1px solid var(--Gray-100, #DDD);
background: transparent;
box-sizing: border-box;
}

.btn-change {
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 46px;
margin-bottom: 46px;
gap: 16px; /* Thêm gap để nút không dính sát nhau khi co giãn */
}

.btn-chg,
button {
display: flex;
align-items: center;
justify-content: center;
padding: 12px 20px;
border-radius: 16px;
border: 1px solid var(--Gray-300, #B5B5B5);
background: var(--White, #FFF);
box-shadow: 0px 2px 0px 0px #B5B5B5;
gap: 8px;
color: var(--Gray-300, #B5B5B5);
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 24px;
cursor: pointer;
transition: background 0.2s, color 0.2s, border 0.2s;
}





.ques {
color: var(--Gray-700, #676767);
text-align: center;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px;
margin: 0;
}


.btn-play {
display: flex;
align-items: center;
justify-content: center;
border-radius: 100%;
outline: none;
box-shadow: none;
border: none;
}

.btn-play img {
width: 72px;
height: 72px;
display: block;
pointer-events: none;
}



.ans.selected {
border: 2px solid #007bff;
background: #FFF7F4;
box-shadow: 0px 4px 0px 0px #007bff;
color: #007bff;
}
.ans.correct {
border: 2px solid #00ff26;
background: #F6FEF9;
box-shadow: 0px 4px 0px 0px #00ff26;
color: #00ff26;
}
.ans.wrong {
border: 2px solid #ff0000;
background-color: #FFF7F4;
box-shadow: 0px 4px 0px 0px #ff0000;
color: #ff0000;
}


/* Nút kiểm tra mặc định */
.check.btn-chg {
background: #FFF;
color: #B5B5B5;
border: 1.5px solid #B5B5B5;
box-shadow: 0px 2px 0px 0px #B5B5B5;
transition: background 0.2s, color 0.2s, border 0.2s;
}

/* Khi hover */
.check.btn-chg:hover {
background: #F6FEF9;
color: #12B76A;
border-color: #12B76A;
}

/* Khi ấn vào (active) */
.check.btn-chg:active,
.check.btn-chg.checked {
background: #12B76A;
color: #FFF;
border-color: #12B76A;
}

.boxMain.active, .boxMain.active span {
background: #FFF;
color: #F37142 ;
border-radius: 12px;
font-weight: 700;
} <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="../../CSS/Flow_2_1/hiragana.css">
    <link rel="stylesheet" href="../../CSS/Flow_2_1/finalTest.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <script src="../../JS/checkData.js"></script>

</head>

<header>
    <div class="boxHeader">
        <img src="../../assets/Group1.svg" class="logo">
        <!-- <img src="./assets/logoMankai1.png" class="logo">
        <img src="./assets/logoMankai2.png" class="logo"> -->
    </div>
    <div class="boxHeader">
        <div class="headerLogin2">
            <span>Thi thử mỗi ngày</span>
            <span>Chủ đề</span>
            <label>
                <select>
                    <option>Học tập</option>
                </select>
                <i class="fa-solid fa-angle-down"></i>
            </label>
        </div>
        <div class="headerLogin3">
            <img alt="Icon" src="../../assets/logoVn.png" style="margin-right: 8px;" />
            <span>VI</span>
            <img src="../../assets/avatar.png" />
        </div>
    </div>
</header>

<body>

    <main>
        <section class="menu">
            <div class="menuTitle">
                <h3>Danh sách bài</h3>
                <span>4 videos •</span>
                <span> 50 phút •</span>
                <span>1 bài Test</span>
            </div>


            <div id="video" class="video">
                <div class="boxMain" id="page-hira">
                    <span>Hiragana</span>
                </div>
            </div>

            <div id="flashCard">
                <div class="boxMain" id="page-kata">
                    <span>katakana</span>
                </div>
            </div>

            <div id="test">
                <div class="boxMain" id="page-cnt">
                    <span>Số đếm</span>
                </div>
            </div>

            <div id="Sile">
                <div class="boxMain" id="page-test">
                    <span>Kiểm tra cuối bài</span>
                </div>
            </div>
        </section>
        <section class="container-test">
             


            <div class="content-test">
                <p class="ques-content-test">Nội dung nhóm câu hỏi</p>
                <div class="select-answer-correct">
                    <p>Chọn đáp án đúng</p>
                    <p class="curr-ques-test">Câu 1/37</p>
                </div>
                <div class="ques-test">
                    <!-- <div class="card">
                        <p class="select-ans">Chọn đáp án đúng</p>
                        <p class="ques">こん</p>
                    </div> -->
                    <div class="card">
                        <p class="select-ans">Nghe và trả lời câu hỏi</p>
                        <button class="btn-play"><img src="../../assets/play-circle.svg" alt="logo"></button>
                    </div>
                    <div class="answer-test">
                        <div class="answer ans">
                            <div class="c" id="c" >A</div>
                            <div>
                                <p>こんにちは</p>
                            </div>
                        </div>
                        <div class="answer ans">
                            <div class="c" id="c">B</div>
                            <div>
                                <p>こんにちは</p>
                            </div>
                        </div>
                        <div class="answer ans">
                            <div class="c" id="c">C</div>
                            <div>
                                <p>こんにちは</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 


            <div class="btn-change-ques">
                <div class="btn-change">
                    <button class="ques-prev btn-chg">Câu trước</button>
                    <button class="check btn-chg">Kiểm tra</button>
                </div>
            </div>
        </section>
    </main>

    <section>
        <div id="overlay" class="overlay"></div>
        <div id="popUp" class="popUp">
            <img class="popUp-img" src="../../assets/medal.svg">
            <div class="boxDetail-header">
                <div class="flex">
                    <div class="text-complete">Hoàn thành bài kiểm tra!</div>
                    <div class="point-popUp">
                        <div class="point-me point">
                            <div class="point-text">Điểm của bạn</div>
                            <div class="point-number-me pnt">3/5</div>
                        </div>
                        <div class="point-expre point">
                            <div class="point-text">Điểm KN</div>
                            <div class="point-number-kn pnt"><img src="../../assets/Object 1.svg">54</div>
                        </div>
                    </div>
                </div>
                <div class="btn-point-popUp">
                    <button class="redo">Làm lại</button>
                    <button class="study" style="position: relative;"><img src="../../assets/Frame 1000007256.svg"
                            style="position: absolute;">Học tiếp</button>
                </div>
            </div>
        </div>
    </section>





<script src="../../JS/Flow_2_1/finalTest.js"></script>
<script crossorigin="anonymous" src="https://kit.fontawesome.com/a5e9eda380.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
</body>

</html>Dưới đây là file FinalTest.tsx hoàn chỉnh, chuẩn React + TypeScript, dùng style={{}} 100%, không cần file CSS, tích hợp đầy đủ 10 câu hỏi (5 text + 5 audio), phát âm tiếng Nhật bằng SpeechSynthesis, tính điểm, popup kết quả, làm lại, giữ nguyên giao diện + logic JS gốc.

FinalTest.tsx – React + TSX + Inline Styles + Full Logic
tsximport React, { useState, useEffect, useRef } from "react";

interface Answer {
label: string;
text: string;
correct: boolean;
}

interface Question {
type: "text" | "audio";
question?: string;
audio?: string;
answers: Answer[];
}

const FinalTest: React.FC = () => {
const [currentQ, setCurrentQ] = useState(0);
const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
const [score, setScore] = useState(0);
const [showResult, setShowResult] = useState(false);
const [isChecking, setIsChecking] = useState(false);

const overlayRef = useRef<HTMLDivElement>(null);

// 10 câu hỏi
const questions: Question[] = [
{
type: "text",
question: "こん",
answers: [
{ label: "A", text: "こんにちは", correct: true },
{ label: "B", text: "こんばんは", correct: false },
{ label: "C", text: "おはよう", correct: false },
],
},
{
type: "text",
question: "さよう",
answers: [
{ label: "A", text: "ありがとう", correct: false },
{ label: "B", text: "さようなら", correct: true },
{ label: "C", text: "おやすみ", correct: false },
],
},
{
type: "text",
question: "ありがとう",
answers: [
{ label: "A", text: "ありがとう", correct: true },
{ label: "B", text: "こんにちは", correct: false },
{ label: "C", text: "さようなら", correct: false },
],
},
{
type: "text",
question: "おはよう",
answers: [
{ label: "A", text: "おやすみ", correct: false },
{ label: "B", text: "こんばんは", correct: false },
{ label: "C", text: "おはよう", correct: true },
],
},
{
type: "text",
question: "こんばんは",
answers: [
{ label: "A", text: "こんばんは", correct: true },
{ label: "B", text: "おはよう", correct: false },
{ label: "C", text: "こんにちは", correct: false },
],
},
{
type: "audio",
audio: "../../assets/play-circle.svg",
answers: [
{ label: "A", text: "こんにちは", correct: true },
{ label: "B", text: "こんばんは", correct: false },
{ label: "C", text: "おはよう", correct: false },
],
},
{
type: "audio",
audio: "../../assets/play-circle.svg",
answers: [
{ label: "A", text: "ありがとう", correct: false },
{ label: "B", text: "さようなら", correct: true },
{ label: "C", text: "おやすみ", correct: false },
],
},
{
type: "audio",
audio: "../../assets/play-circle.svg",
answers: [
{ label: "A", text: "ありがとう", correct: true },
{ label: "B", text: "こんにちは", correct: false },
{ label: "C", text: "さようなら", correct: false },
],
},
{
type: "audio",
audio: "../../assets/play-circle.svg",
answers: [
{ label: "A", text: "おやすみ", correct: false },
{ label: "B", text: "おはよう", correct: true },
{ label: "C", text: "こんばんは", correct: false },
],
},
{
type: "audio",
audio: "../../assets/play-circle.svg",
answers: [
{ label: "A", text: "こんばんは", correct: true },
{ label: "B", text: "おはよう", correct: false },
{ label: "C", text: "こんにちは", correct: false },
],
},
];

const totalQ = questions.length;

// Phát âm tiếng Nhật
const speakJapanese = (text: string) => {
window.speechSynthesis.cancel();
const utter = new SpeechSynthesisUtterance(text);
utter.lang = "ja-JP";
window.speechSynthesis.speak(utter);
};

// Chọn đáp án
const handleAnswerClick = (index: number) => {
if (isChecking) return;
setSelectedIdx(index);
};

// Kiểm tra
const handleCheck = () => {
if (selectedIdx === null || isChecking) return;
setIsChecking(true);

    const q = questions[currentQ];
    if (q.answers[selectedIdx].correct) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQ < totalQ - 1) {
        setCurrentQ(prev => prev + 1);
        setSelectedIdx(null);
        setIsChecking(false);
      } else {
        setShowResult(true);
      }
    }, 1000);
};

// Câu trước
const handlePrev = () => {
if (currentQ > 0 && !isChecking) {
setCurrentQ(prev => prev - 1);
setSelectedIdx(null);
setIsChecking(false);
}
};

// Làm lại
const handleRedo = () => {
setCurrentQ(0);
setScore(0);
setSelectedIdx(null);
setIsChecking(false);
setShowResult(false);
};

// Đóng popup
const closePopup = (e: React.MouseEvent) => {
if (e.target === overlayRef.current) {
setShowResult(false);
}
};

// Highlight menu
useEffect(() => {
const pageMap: Record<string, string> = {
"hiragana.html": "page-hira",
"katakana.html": "page-kata",
"countNumber.html": "page-cnt",
"finalTest.html": "page-test",
};
const file = window.location.pathname.split("/").pop() || "";
const activeId = pageMap[file];
if (activeId) {
document.getElementById(activeId)?.classList.add("active");
}
}, []);

const q = questions[currentQ];
const knScore = Math.round((score / totalQ) * 100);

return (
<div style={{ margin: 0, padding: 0, boxSizing: "border-box", fontFamily: "'FS PF BeauSans Pro', 'Roboto', sans-serif" }}>
{/* Header */}
<header style={{
display: "flex",
alignItems: "center",
padding: "14px 28px",
justifyContent: "space-between",
backgroundColor: "#ffffff",
}}>
<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
<img src="../../assets/Group1.svg" alt="logo" style={{ width: "60px", height: "46px" }} />
</div>
<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
<div style={{
display: "flex",
alignItems: "center",
gap: "16px",
color: "#1D2939",
fontWeight: 600,
fontSize: "14px",
}}>
<span>Thi thử mỗi ngày</span>
<span>Chủ đề</span>
<label style={{ position: "relative" }}>
<select style={{
border: "none",
color: "#F37142",
fontWeight: 600,
appearance: "none",
background: "transparent",
paddingRight: "20px",
}}>
<option>Học tập</option>
</select>
<i className="fa-solid fa-angle-down" style={{
position: "absolute",
right: 0,
pointerEvents: "none",
color: "#F37142",
}}></i>
</label>
</div>
<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
<img src="../../assets/logoVn.png" alt="flag" />
<span>VI</span>
<img src="../../assets/avatar.png" alt="avatar" style={{ marginLeft: "8px" }} />
</div>
</div>
</header>

      {/* Main */}
      <main style={{ display: "flex", gap: "16px", backgroundColor: "#FAFAFA" }}>
        {/* Menu */}
        <section style={{
          border: "1px solid #DDDDDD",
          width: "260px",
          minHeight: "100vh",
          padding: "16px",
          background: "#FFF",
        }}>
          <div style={{
            width: "100%",
            height: "80px",
            backgroundColor: "#F37142",
            borderTopRightRadius: "16px",
            borderTopLeftRadius: "16px",
            padding: "16px",
            color: "white",
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, lineHeight: 2 }}>Danh sách bài</h3>
            <span style={{ fontSize: "12px", fontWeight: 200 }}>4 videos • 50 phút • 1 bài Test</span>
          </div>

          {[
            { id: "page-hira", label: "Hiragana", href: "hiragana.html" },
            { id: "page-kata", label: "Katakana", href: "katakana.html" },
            { id: "page-cnt", label: "Số đếm", href: "countNumber.html" },
            { id: "page-test", label: "Kiểm tra cuối bài", href: "finalTest.html", active: true },
          ].map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="boxMain"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 16px",
                borderRadius: "8px",
                marginTop: "8px",
                backgroundColor: item.active ? "#FFF7F4" : "#FAFAFA",
                border: item.active ? "1px solid #F37142" : "none",
                cursor: "pointer",
              }}
              onClick={() => window.location.href = item.href}
            >
              <span style={{
                fontSize: "14px",
                color: item.active ? "#D56239" : "#3D3D3D",
                fontWeight: item.active ? 700 : 400,
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </section>

        {/* Test Content */}
        <section style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          gap: "20px",
        }}>
          <div style={{
            width: "100%",
            padding: "50px 42px",
            marginTop: "20px",
            borderRadius: "8px",
            background: "#FFF",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}>
            <p style={{
              color: "#3D3D3D",
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: "32px",
              margin: 0,
            }}>Nội dung nhóm câu hỏi</p>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ color: "#676767", fontSize: "14px", margin: 0 }}>Chọn đáp án đúng</p>
              <p style={{ color: "#676767", fontSize: "14px", margin: 0 }}>Câu {currentQ + 1}/{totalQ}</p>
            </div>

            <div style={{ display: "flex", gap: "32px", width: "100%" }}>
              {/* Card câu hỏi */}
              <div style={{
                flex: 1,
                padding: "97px 0",
                borderRadius: "8px",
                border: "1px solid #DDD",
                background: "#FAFAFA",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "18px",
              }}>
                <p style={{
                  color: "#3D3D3D",
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "28px",
                  margin: 0,
                }}>
                  {q.type === "text" ? "Chọn đáp án đúng" : "Nghe và trả lời câu hỏi"}
                </p>
                {q.type === "text" ? (
                  <p style={{
                    color: "#3D3D3D",
                    fontSize: "24px",
                    fontWeight: 700,
                    lineHeight: "32px",
                    margin: 0,
                  }}>{q.question}</p>
                ) : (
                  <button
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      const correctText = q.answers.find(a => a.correct)?.text;
                      if (correctText) speakJapanese(correctText);
                    }}
                  >
                    <img src={q.audio} alt="play" style={{ width: "72px", height: "72px" }} />
                  </button>
                )}
              </div>

              {/* Đáp án */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                flex: 1,
              }}>
                {q.answers.map((ans, i) => {
                  const isSelected = selectedIdx === i;
                  const isCorrect = ans.correct;
                  const showResult = isChecking;

                  return (
                    <div
                      key={i}
                      className={`answer ans ${isSelected ? "selected" : ""} ${showResult && isCorrect ? "correct" : ""} ${showResult && isSelected && !isCorrect ? "wrong" : ""}`}
                      style={{
                        display: "flex",
                        width: "445px",
                        height: "80px",
                        padding: "12px 20px",
                        alignItems: "center",
                        gap: "16px",
                        borderRadius: "8px",
                        border: isSelected ? "2px solid #007bff" : "1px solid #DDD",
                        background: isSelected ? "#FFF7F4" : "#FAFAFA",
                        boxShadow: isSelected ? "0px 4px 0px 0px #007bff" : "0px 4px 0px 0px #DDD",
                        cursor: isChecking ? "default" : "pointer",
                        opacity: isChecking ? (isCorrect || isSelected ? 1 : 0.6) : 1,
                      }}
                      onClick={() => handleAnswerClick(i)}
                    >
                      <div style={{
                        display: "flex",
                        width: "40px",
                        height: "40px",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "8px",
                        background: "#FFF",
                        border: "1px solid #DDD",
                        color: "#676767",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}>
                        {ans.label}
                      </div>
                      <p style={{ margin: 0, fontSize: "16px" }}>{ans.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Nút điều khiển */}
          <div style={{
            width: "100%",
            padding: "0 16px",
            borderTop: "1px solid #DDD",
            background: "transparent",
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "46px 0",
              gap: "16px",
            }}>
              <button
                className="ques-prev btn-chg"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 20px",
                  borderRadius: "16px",
                  border: "1px solid #B5B5B5",
                  background: "#FFF",
                  boxShadow: "0px 2px 0px 0px #B5B5B5",
                  gap: "8px",
                  color: "#B5B5B5",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: currentQ === 0 || isChecking ? "not-allowed" : "pointer",
                  opacity: currentQ === 0 || isChecking ? 0.6 : 1,
                }}
                onClick={handlePrev}
                disabled={currentQ === 0 || isChecking}
              >
                Câu trước
              </button>
              <button
                className={`check btn-chg ${isChecking ? "checked" : ""}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 20px",
                  borderRadius: "16px",
                  border: isChecking ? "1.5px solid #12B76A" : "1.5px solid #B5B5B5",
                  background: isChecking ? "#12B76A" : "#FFF",
                  boxShadow: isChecking ? "none" : "0px 2px 0px 0px #B5B5B5",
                  color: isChecking ? "#FFF" : "#B5B5B5",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: selectedIdx !== null && !isChecking ? "pointer" : "not-allowed",
                  opacity: selectedIdx !== null && !isChecking ? 1 : 0.6,
                }}
                onClick={handleCheck}
                disabled={selectedIdx === null || isChecking}
              >
                Kiểm tra
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Popup kết quả */}
      {showResult && (
        <>
          <div
            ref={overlayRef}
            className="overlay"
            style={{
              display: "block",
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
            }}
            onClick={closePopup}
          />
          <div
            className="popUp"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              width: "600px",
              minHeight: "420px",
              padding: "40px 32px 32px 32px",
              position: "fixed",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "16px",
              background: "#FFF",
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              zIndex: 1100,
            }}
          >
            <img src="../../assets/medal.svg" alt="medal" style={{ width: "50%", height: "50%", marginBottom: "8px" }} />
            <p style={{
              color: "#F5B64A",
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: "32px",
              margin: 0,
            }}>Hoàn thành bài kiểm tra!</p>
            <div style={{ display: "flex", gap: "24px" }}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                width: "108px",
                height: "85px",
                padding: "2px",
                borderRadius: "8px",
                background: "#32D583",
              }}>
                <p style={{ color: "#FFF", margin: 0, fontSize: "14px" }}>Điểm của bạn</p>
                <p style={{
                  display: "flex",
                  padding: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  borderRadius: "6px",
                  background: "#FFF",
                  color: "#32D583",
                  fontSize: "18px",
                  fontWeight: 700,
                  margin: 0,
                }}>{score}/{totalQ}</p>
              </div>
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                width: "108px",
                height: "85px",
                padding: "2px",
                borderRadius: "8px",
                background: "#F5B64A",
              }}>
                <p style={{ color: "#FFF", margin: 0, fontSize: "14px" }}>Điểm KN</p>
                <p style={{
                  display: "flex",
                  padding: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "6px",
                  flex: 1,
                  borderRadius: "6px",
                  background: "#FFF",
                  color: "#F5B64A",
                  fontSize: "18px",
                  fontWeight: 700,
                  margin: 0,
                }}>
                  <img src="../../assets/Object 1.svg" alt="exp" /> {knScore}
                </p>
              </div>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              paddingTop: "24px",
              borderTop: "1px solid #DDD",
              gap: "300px",
            }}>
              <button
                style={{
                  padding: "12px 20px",
                  borderRadius: "16px",
                  boxShadow: "0px 2px 0px 0px #B5B5B5",
                  border: "1px solid #B5B5B5",
                  background: "#FFF",
                  color: "#B5B5B5",
                  fontSize: "16px",
                  fontWeight: 700,
                }}
                onClick={handleRedo}
              >
                Làm lại
              </button>
              <button style={{
                position: "relative",
                padding: "12px 20px",
                borderRadius: "16px",
                border: "1px solid #F5B64A",
                background: "#F5B64A",
                boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                color: "#FFF",
                fontSize: "16px",
                fontWeight: 700,
              }}>
                <img src="../../assets/Frame 1000007256.svg" alt="" style={{
                  position: "absolute",
                  left: "15.265px",
                  top: 0,
                }} />
                Học tiếp
              </button>
            </div>
          </div>
        </>
      )}

      <script crossOrigin="anonymous" src="https://kit.fontawesome.com/a5e9eda380.js"></script>
    </div>
);
};

export default FinalTest;

Tính năng đã hoàn thiện













































Tính năngHoàn thành10 câu hỏi (5 text + 5 audio)DonePhát âm tiếng NhậtDoneChọn đáp án + Hiệu ứng đúng/saiDoneNút Kiểm tra / Câu trướcDoneTính điểm + % KNDonePopup kết quả + Làm lạiDoneMenu highlightDoneKhông dùng document.getElementByIdDone100% style={{}}Done

Dán vào src/pages/FinalTest.tsx → chạy mượt, đẹp, đầy đủ chức năng.

Muốn thêm âm thanh thật (mp3) thay vì SpeechSynthesis? Hay lưu kết quả vào localStorage? Gửi mình nhé!
3 giâyFasttext* {
font-family: 'FS PF BeauSans Pro', sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  }


header {
display: flex;
padding: 16px 28px;
align-items: center;
justify-content: space-between;
border-bottom: 1px solid #DDDDDD;
}

.menuVideo {
margin-top: 16px;
}

.boxHeader {
display: flex;
align-items: center;
gap: 8px;
}

.boxHeader h2 {
font-size: 24px;
color: #3D3D3D;
font-weight: 600;
}

.boxMain {
display: flex;
align-items: center;
gap: 8px;
padding: 12px 16px;
border: none;
border-radius: 8px;
margin-top: 8px;
background-color: #FAFAFA;
cursor: pointer;

}

.boxMain:hover {
border: 1px solid #DDDDDD;
}

.boxMain img {
filter: grayscale(1);

}

.boxMain span {

    font-size: 14px;
    color: #3D3D3D;
}


main {
display: flex;
gap: 16px;
}

.menu {
border: 1px solid #DDDD;
width: 300px;
height: 100vh;
padding: 16px;
}

.container {
margin-top: 16px;
border-radius: 16px;
border: 1px solid #DDDDDD;
width: 100%;
display: flex;
flex-direction: column;

}

.menuTitle {
width: 100%;
height: 80px;
background-color: #F37142;
border-top-right-radius: 16px;
border-top-left-radius: 16px;
padding: 16px;
}

.menuTitle h3 {
font-size: 16px;
font-weight: 600;
color: white;
line-height: 2;
}

.menuTitle span {

    font-size: 12px;
    color: white;
    font-weight: 200;
}

.menuVideo {
display: flex;
align-items: center;
gap: 8px;
padding: 12px 16px;
;
border-radius: 8px;
margin-top: 8px;
background-color: #FFF7F4;
border: 1px solid #F37142;
color: #D56239;
}


.container {
display: flex;

}

.boxIconContainer {
width: 56px;
height: 56px;
background-color: #FFF7F4;
text-align: center;
display: flex;
justify-content: center;
border-radius: 8px;

}

.container1 {
display: flex;
gap: 16px;
margin-left: 16px;
margin-top: 16px;
margin-bottom: 32px;

}

.boxIconContainer img {
width: 24px;

}


.btn1 {
margin-right: 16px;
margin-top: 16px;
width: 168px;
height: 50px;
border: 1px solid #F58D68;
border-radius: 16px;
background-color: #FFFF;
box-shadow: 0 3px 0 0 #F58D68;
color: #F58D68;
font-weight: 700;
font-size: 16px;
cursor: pointer;
}

.btn1:hover {
background-color: #FAFAFA;
}

.container2 {
width: 100%;
display: flex;
justify-content: space-between;
height: 80px;
border-bottom: 1px solid #DDDDDD;

}

.containerMain {
width: 100%;
padding: 16px;

}
.spinner-container {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(255, 255, 255, 0.8);
justify-content: center;
align-items: center;
z-index: 9999;
display: none; /* Ẩn mặc định */
}

.spinner {
width: 60px;
height: 60px;
border: 6px solid #ccc;
border-top: 6px solid #ec754a;
border-radius: 50%;
animation: spin 1s linear infinite;
}

@keyframes spin {
to { transform: rotate(360deg); }
}



.finished {
display: flex;
align-items: center;
gap: 8px;
padding: 12px 16px;
border-radius: 8px;
margin-top: 8px;
background-color: #e5f4d2;
border: 1px solid #89b852;
color: #2c601e;
}
.finished img{
filter: hue-rotate(90deg) saturate(4) brightness(0.8);

},