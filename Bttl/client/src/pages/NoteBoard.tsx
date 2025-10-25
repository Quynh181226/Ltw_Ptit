import React, { useState, useEffect, useRef } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faTimes} from "@fortawesome/free-solid-svg-icons";
import Footer1 from "../components/Footer1.tsx";
import Header2 from "../components/Header2.tsx";
import handleLogout from "../components/handleLogout.tsx";

type NoteType = {
    id: string;
    content: string;
    color: string;
};

const pastelColors = ["#FDE2E4", "#E2F0CB", "#FFF2CC", "#CCE5FF", "#EAD7FF"];

const NoteBoard = () => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const noteRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    // Load notes from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("notes");
        if (stored) {
            const parsedNotes = JSON.parse(stored);
            setNotes(parsedNotes);

            // Set content after a small delay to ensure DOM is ready
            setTimeout(() => {
                parsedNotes.forEach((note: NoteType) => {
                    const element = noteRefs.current.get(note.id);
                    if (element && element.innerHTML !== note.content) {
                        element.innerHTML = note.content;
                    }
                });
            }, 0);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    const addNote = () => {
        const newNote: NoteType = {
            id: Date.now().toString(),
            content: "",
            color: pastelColors[Math.floor(Math.random() * pastelColors.length)],
        };
        setNotes([newNote, ...notes]);
    };

    const updateNote = (id: string, content: string) => {
        setNotes(notes.map(n => (n.id === id ? { ...n, content } : n)));
    };

    const deleteNote = (id: string) => {
        setNotes(notes.filter(n => n.id !== id));
    };

    const handleInput = (id: string, event: React.FormEvent<HTMLDivElement>) => {
        updateNote(id, event.currentTarget.innerHTML);
    };

    const handleFocus = (id: string, event: React.FocusEvent<HTMLDivElement>) => {
        const element = event.currentTarget;
        if (element.innerHTML === "" || element.innerHTML === "<br>") {
            element.innerHTML = "";
            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(element);
            range.collapse(true);
            selection?.removeAllRanges();
            selection?.addRange(range);
        }
    };

    return (
        <>
            <Header2 onLogout={handleLogout}/>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 pt-20">
                <h1 className="text-3xl font-bold mb-6 text-teal-700">Sticky Note Board</h1>
                <button
                    onClick={addNote}
                    className="cursor-pointer mb-6 px-4 py-2 bg-[#7F88A8] text-white rounded shadow hover:bg-[#6B7597] transition flex items-center gap-2"
                >
                    <FontAwesomeIcon icon={faPlusSquare} />
                    Thêm note
                </button>
                <div className="w-full sm:w-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            className={`relative p-4 rounded shadow min-h-[150px] transition-all duration-200 hover:shadow-lg group`}
                            style={{ backgroundColor: note.color }}
                        >
                            <button
                                onClick={() => deleteNote(note.id)}
                                className="cursor-pointer absolute top-2 right-3 text-gray-500 font-bold hover:text-gray-700 transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                            <div
                                ref={(el) => {
                                    if (el) noteRefs.current.set(note.id, el);
                                    else noteRefs.current.delete(note.id);
                                }}
                                contentEditable
                                suppressContentEditableWarning
                                className="w-full h-full outline-none text-gray-800 resize-none bg-transparent cursor-text"
                                onInput={(e) => handleInput(note.id, e)}
                                onFocus={(e) => handleFocus(note.id, e)}
                                onClick={(e) => e.stopPropagation()}
                                onBlur={(e) => handleInput(note.id, e)}
                                style={{
                                    cursor: 'text',
                                    minHeight: '120px'
                                }}
                            />
                        </div>
                    ))}
                </div>

                {notes.length === 0 && (
                    <div className="text-gray-500 text-center mt-10">
                        <p>Chưa có note nào. Hãy thêm note mới!!</p>
                    </div>
                )}
            </div>
            <div className="mt-[-106px]"></div>
            <Footer1 />
        </>
    );
};

export default NoteBoard;