import React, { useState, useRef, useEffect } from 'react';
import Header2 from "../components/Header2.tsx";
import handleLogout from "../components/handleLogout.tsx";
import Footer1 from "../components/Footer1.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faUser, faRobot, faTrash, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

interface Message {
    id: number;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

const KaiwaAIChat = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "こんにちは！私はAIアシスタントです。日本語で会話の練習をしましょう！何について話したいですか？",
            isUser: false,
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getAIResponse = async (userMessage: string): Promise<string> => {
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

        const responses = [
            "はい、わかりました。それについてもっと詳しく教えてください。",
            "面白いですね！それについてどう思いますか？",
            "日本語で話す練習、頑張りましょう！",
            "その話題について、私の意見を聞きたいですか？",
            "もっと自然な言い方を教えましょうか？",
            "すみません、もう一度言っていただけますか？",
            "今日の天気はどうですか？それについて話しましょうか？",
            "日本の文化について何か質問はありますか？",
            "あなたの趣味は何ですか？それについて話しましょう！",
            "日本語の勉強は楽しいですか？"
        ];

        return responses[Math.floor(Math.random() * responses.length)];
    };

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        // Thêm tin nhắn người dùng
        const userMessage: Message = {
            id: Date.now(),
            text: inputText,
            isUser: true,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        try {
            const aiResponse = await getAIResponse(inputText);

            const aiMessage: Message = {
                id: Date.now() + 1,
                text: aiResponse,
                isUser: false,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Lỗi khi gửi tin nhắn:', error);
            const errorMessage: Message = {
                id: Date.now() + 1,
                text: "申し訳ありません、エラーが発生しました。もう一度お試しください。",
                isUser: false,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleClearChat = () => {
        setMessages([
            {
                id: Date.now(),
                text: "こんにちは！会話をリセットしました。何について話しましょうか？",
                isUser: false,
                timestamp: new Date()
            }
        ]);
    };

    const handleSpeak = (text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ja-JP';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
    };

    const formatTime = (date: Date): string => {
        return date.toLocaleTimeString('ja-JP', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <Header2 onLogout={handleLogout} />
            <div className="min-h-screen bg-[#FAFBFC] flex flex-col">
                <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-3">
                            Kaiwa AI
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Luyện tập hội thoại Tiếng Nhật mọi lúc mọi nơi với AI
                        </p>
                    </div>

                    {/* Chat Container */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                        {/* Chat Header */}
                        <div className="bg-gradient-to-r from-[#8B93AF] to-[#6B7597] p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                        <FontAwesomeIcon icon={faRobot} className="text-gray-700 text-xl" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold">AI日本語アシスタント</h2>
                                        <p className="text-fuchsia-100 text-sm">Online - いつでもご利用いただけます</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClearChat}
                                    className="cursor-pointer flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                                >
                                    {/*<FontAwesomeIcon icon={faTrash} />*/}
                                    <span>Clear Chat</span>
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`flex max-w-xs lg:max-w-md ${
                                            message.isUser ? 'flex-row-reverse' : 'flex-row'
                                        } items-start space-x-3`}
                                    >
                                        {/* Avatar */}
                                        {/*<div*/}
                                        {/*    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${*/}
                                        {/*        message.isUser*/}
                                        {/*            ? 'bg-blue-500 text-white'*/}
                                        {/*            : 'bg-gray-300 text-gray-600'*/}
                                        {/*    }`}*/}
                                        {/*>*/}
                                        {/*    <FontAwesomeIcon*/}
                                        {/*        icon={message.isUser ? faUser : faRobot}*/}
                                        {/*        className="text-sm"*/}
                                        {/*    />*/}
                                        {/*</div>*/}

                                        {/* Message Bubble */}
                                        <div
                                            className={`px-4 py-3 rounded-2xl ${
                                                message.isUser
                                                    ? 'bg-blue-400 text-white rounded-br-none'
                                                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                                            } shadow-sm`}
                                        >
                                            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                                            <div
                                                className={`flex items-center space-x-2 mt-2 text-xs ${
                                                    message.isUser ? 'text-blue-100' : 'text-gray-500'
                                                }`}
                                            >
                                                <span>{formatTime(message.timestamp)}</span>
                                                {!message.isUser && (
                                                    <button
                                                        onClick={() => handleSpeak(message.text)}
                                                        className="hover:text-blue-400 transition-colors"
                                                        title="Phát âm thanh"
                                                    >
                                                        <FontAwesomeIcon icon={faVolumeUp} className="cursor-pointer" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                            <FontAwesomeIcon icon={faRobot} className="text-gray-600 text-sm" />
                                        </div>
                                        <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="border-t border-gray-200 p-4 bg-white">
                            <div className="flex space-x-3">
                                <div className="flex-1">
                  <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="日本語でメッセージを入力してください... (Enterで送信、Shift+Enterで改行)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={2}
                      disabled={isLoading}
                  />
                                </div>
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!inputText.trim() || isLoading}
                                    className="cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl transition-colors flex items-center space-x-2 self-end"
                                >
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                    <span>Send</span>
                                </button>
                            </div>

                            {/* Quick Tips */}
                            <div className="mt-3 flex flex-wrap gap-2">
                                <span className="text-xs text-gray-500">Try:</span>
                                {["こんにちは", "元気ですか？", "天気について", "趣味は何ですか？"].map((tip) => (
                                    <button
                                        key={tip}
                                        onClick={() => setInputText(tip)}
                                        className="cursor-pointer text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                                    >
                                        {tip}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FontAwesomeIcon icon={faVolumeUp} className="text-blue-600 text-xl" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Phát Âm Chuẩn</h3>
                            <p className="text-gray-600 text-sm">Nghe phát âm chuẩn Nhật Bản</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
                            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FontAwesomeIcon icon={faRobot} className="text-green-700 text-xl" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">AI Thông Minh</h3>
                            <p className="text-gray-600 text-sm">Phản hồi tự nhiên, ngữ cảnh đa dạng</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
                            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FontAwesomeIcon icon={faUser} className="text-red-600 text-xl" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Mọi Lúc Mọi Nơi</h3>
                            <p className="text-gray-600 text-sm">Luyện tập 24/7 không giới hạn</p>
                        </div>
                    </div>
                </main>
            </div>
            <div className="mt-[-106px]"></div>
            <Footer1 />
        </>
    );
};

export default KaiwaAIChat;