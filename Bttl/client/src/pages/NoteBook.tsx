import { useState, useRef, useEffect, useCallback } from 'react';
import {toast} from "react-toastify";
import Footer1 from "../components/Footer1.tsx";
import Header2 from "../components/Header2.tsx";
import handleLogout from "../components/handleLogout.tsx";

interface Page {
    id: number;
    content: string;
    no: string;
    date: string;
}

const MAX_LINES = 30;
const LINE_HEIGHT = 30;

const NoteBook = () => {
    const [pages, setPages] = useState<Page[]>([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const pageRefs = useRef<Map<number, HTMLDivElement>>(new Map());

    const createNewPage = useCallback((pageCount: number = pages.length): Page => {
        const now = new Date();
        const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1)
            .toString()
            .padStart(2, '0')}/${now.getFullYear()}`;
        return {
            id: Date.now(),
            content: '',
            no: (pageCount + 1).toString(),
            date: dateStr,
        };
    }, [pages.length]);

    useEffect(() => {
        const saved = localStorage.getItem('notebookPages');
        if (saved) {
            const loaded: Page[] = JSON.parse(saved);
            setPages(loaded);
            setCurrentPageIndex(0);
        } else {
            setPages([createNewPage(0)]);
        }
    }, []);

    useEffect(() => {
        const el = pageRefs.current.get(currentPageIndex);
        const current = pages[currentPageIndex];
        if (el && current) {
            if (el.innerHTML !== current.content) {
                el.innerHTML = current.content || '&nbsp;';
            }
        }
    }, [currentPageIndex, pages]);

    useEffect(() => {
        if (pages.length > 0)
            localStorage.setItem('notebookPages', JSON.stringify(pages));
    }, [pages]);

    const updatePageContent = (pageIndex: number, html: string) => {
        setPages(prev => prev.map((p, i) => (i === pageIndex ? { ...p, content: html } : p)));
    };

    const handleInput = (pageIndex: number) => {
        const el = pageRefs.current.get(pageIndex);
        if (!el) return;

        const totalLines = Math.ceil(el.scrollHeight / LINE_HEIGHT);
        if (totalLines > MAX_LINES) {
            const lines = el.innerText.split('\n');
            el.innerText = lines.slice(0, MAX_LINES).join('\n');
        }

        updatePageContent(pageIndex, el.innerHTML);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const el = pageRefs.current.get(currentPageIndex);
        if (!el) return;

        const totalLines = Math.ceil(el.scrollHeight / LINE_HEIGHT);
        if (e.key === 'Enter' && totalLines >= MAX_LINES) {
            e.preventDefault();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        const el = pageRefs.current.get(currentPageIndex);
        if (!el) return;

        const existing = el.innerText.split('\n');
        const newLines = text.split('\n');
        const allowed = MAX_LINES - existing.length;

        const insertText = newLines.slice(0, allowed > 0 ? allowed : 0).join('\n');
        document.execCommand('insertText', false, insertText);
    };

    const goToNextPage = () => {
        if (currentPageIndex < pages.length - 1) {
            setCurrentPageIndex(prev => prev + 1);
        } else {
            const newPage = createNewPage();
            setPages(prev => [...prev, newPage]);
            setTimeout(() => setCurrentPageIndex(pages.length), 0);
        }
    };

    const handleReset = () => {
        if (toast.info('Đã xóa toàn bộ nội dung !!')) {
            localStorage.removeItem('notebookPages');
            const first = createNewPage(0);
            setPages([first]);
            setCurrentPageIndex(0);
        }
    };

    const currentPage = pages[currentPageIndex] || createNewPage();

    const currentEl = pageRefs.current.get(currentPageIndex);
    const currentLines = currentEl ? Math.ceil(currentEl.scrollHeight / LINE_HEIGHT) : 0;

    return (
       <>
           <Header2 onLogout={handleLogout}/>
           <div className="notebook-container">
               <h1 className="notebook-title">Note book</h1>

               <div className="page-wrapper">
                   <div className="page">
                       <div className="page-header">
                           <div className="page-no">
                               <span>No:</span>
                               <input
                                   type="text"
                                   value={currentPage.no}
                                   onChange={(e) =>
                                       setPages(prev => prev.map((p, i) => (i === currentPageIndex ? { ...p, no: e.target.value } : p)))
                                   }
                                   className="no-input"
                               />
                           </div>
                           <div className="page-date">
                               <span>Date:</span>
                               <input
                                   type="text"
                                   value={currentPage.date}
                                   onChange={(e) =>
                                       setPages(prev => prev.map((p, i) => (i === currentPageIndex ? { ...p, date: e.target.value } : p)))
                                   }
                                   className="date-input"
                               />
                           </div>
                       </div>

                       <div
                           ref={(el) => {
                               if (el) pageRefs.current.set(currentPageIndex, el);
                               else pageRefs.current.delete(currentPageIndex);
                           }}
                           className="page-content"
                           contentEditable
                           suppressContentEditableWarning
                           onInput={() => handleInput(currentPageIndex)}
                           onKeyDown={handleKeyDown}
                           onPaste={handlePaste}
                       />

                       {/*<div className="line-counter">*/}
                       {/*    {currentLines}/{MAX_LINES} dòng*/}
                       {/*</div>*/}
                       <div className="page-footer">
                           <div className="line-footer">
                               _________________________________________________________________________________
                           </div>
                           <div className="page-number-footer">
                               {currentPageIndex + 1} | Page
                           </div>
                       </div>

                   </div>
               </div>

               <div className="page-navigation">
                   <button
                       onClick={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 1))}
                       disabled={currentPageIndex === 0}
                       className="nav-btn prev-btn"
                   >
                       Trước
                   </button>
                   <span className="page-info">Trang {currentPageIndex + 1} / {pages.length}</span>
                   <button onClick={goToNextPage} className="nav-btn next-btn">
                       Sau
                   </button>
               </div>

               <div className="controls">
                   <button onClick={handleReset} className="reset-btn">Xóa toàn bộ</button>
               </div>

               <style>
                   {`
                    .notebook-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 20px;
                        min-height: 100vh;
                        background: #FAFBFC;
                        font-family: 'Times New Roman', serif;
                    }
    
                    // .notebook-title {
                    //     font-size: 2.5rem;
                    //     color: #2c3e50;
                    //     margin-bottom: 20px;
                    //     font-weight: bold;
                    // }
                    .notebook-title {
                        font-family: 'Dancing Script', cursive; /* cần import từ Google Fonts */
                        font-size: 3rem;
                        color: #34495e;
                        font-weight: 700;
                        letter-spacing: 2px;
                        text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
                         margin-bottom: 20px;
                    }
    
    
                    .page-wrapper { perspective: 1000px; margin-bottom: 20px; }
    
                    .page {
                        width: 800px;
                        max-width: 95vw;
                        background: white;
                        border-radius: 12px;
                        box-shadow: 0 10px 20px rgba(0,0,0,0.15);
                        padding: 40px 60px;
                        position: relative;
                    }
    
                    .page-header {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 30px;
                        font-size: 1.1rem;
                        color: #2c3e50;
                        border-bottom: 2px solid #ddd;
                        padding-bottom: 8px;
                    }
    
                    .page-no, .page-date {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }
    
                    .no-input, .date-input {
                        border: none;
                        border-bottom: 1px dashed #999;
                        width: 80px;
                        font-size: 1rem;
                        text-align: center;
                        background: transparent;
                    }
    
                    .no-input:focus, .date-input:focus {
                        outline: none;
                        border-color: #48a999;
                    }
    
                    .page-content {
                        height: ${MAX_LINES * LINE_HEIGHT}px;
                        overflow: hidden; /* không cho thêm dòng ngoài 30 */
                        outline: none;
                        font-size: 1.25rem;
                        line-height: ${LINE_HEIGHT}px;
                        color: #222;
                        padding-left: 50px;
                        background: repeating-linear-gradient(
                            transparent,
                            transparent 29px,
                            #cfe7e2 29px,
                            #cfe7e2 30px
                        );
                        background-size: 100% ${LINE_HEIGHT}px;
                        position: relative;
                    }
    
                    .page-content::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 30px;
                        width: 2px;
                        height: 100%;
                        background: #e74c3c;
                        opacity: 0.7;
                    }
    
                    // .line-counter {
                    //     position: absolute;
                    //     bottom: 10px;
                    //     right: 20px;
                    //     font-size: 0.9rem;
                    //     color: #666;
                    // }
    
                    .page-navigation {
                        display: flex;
                        align-items: center;
                        gap: 16px;
                        margin: 20px 0;
                        flex-wrap: wrap;
                        justify-content: center;
                    }
    
                    .nav-btn {
                        padding: 10px 20px;
                        border: none;
                        border-radius: 6px;
                        background: #48a999;
                        color: white;
                        font-weight: 600;
                        cursor: pointer;
                        transition: 0.3s;
                    }
    
                    .nav-btn:hover:not(:disabled) { background: #3d8b80; }
    
                    .nav-btn:disabled {
                        background: #ccc;
                        cursor: not-allowed;
                        opacity: 0.6;
                    }
    
                    .page-info {
                        font-weight: bold;
                        color: #2c3e50;
                    }
    
                    .controls { margin-top: 10px; }
    
                    .reset-btn {
                        padding: 12px 24px;
                        background: #e74c3c;
                        color: white;
                        border: none;
                        border-radius: 6px;
                        font-weight: 600;
                        cursor: pointer;
                    }
    
                    .reset-btn:hover { background: #c0392b; }
    
                    .page-footer {
                        margin-top: 10px;
                        text-align: right;
                        font-family: 'Courier New', monospace;
                        color: #555;
                    }
                    
                    .line-footer {
                        font-size: 0.9rem;
                        line-height: 1rem;
                        color: #DDDDDD;
                    }
                    
                    .page-number-footer {
                        margin-top: 4px;
                        font-size: 0.9rem;
                        font-weight: bold;
                    }
    
                    @media (max-width: 768px) {
                        .page { padding: 30px 20px; }
                        .page-content { padding-left: 30px; font-size: 1.1rem; }
                        .page-header { flex-direction: column; gap: 10px; }
                    }
               `}
               </style>
           </div>
           <div className="mt-[-106px]"></div>
           <Footer1 />
       </>
    );
};

export default NoteBook;
