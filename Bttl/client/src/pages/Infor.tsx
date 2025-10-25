import Footer1 from "../components/Footer1.tsx";
import Header2 from "../components/Header2.tsx";
import handleLogout from "../components/handleLogout.tsx";

export const Infor = () => {
    return (
      <>
          <Header2 onLogout={handleLogout}/>
          <div className="pt-5 flex flex-col items-center justify-center bg-[lightsteelblue] min-h-screen px-4">
              <h1 className="font-semibold text-6xl text-white font-[Berkshire_Swash] text-center mb-4">
                  HTML
              </h1>
              <h2 className="text-xl text-center font-mono mb-8">
                  Bạn có thể đọc thêm về HTML tại đây:
              </h2>

              <section className="w-full max-w-[80%] space-y-6 p-5">
                  <details open className="b w-full font-sans bg-white rounded-sm shadow-lg">
                      <summary
                          className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] hover:border-lightslategray focus:border-lightslategray open:bg-lightslategray open:border-lightslategray text-lg font-semibold transition-colors">
                          HTML là gì?
                      </summary>
                      <p className="p-5 leading-relaxed text-gray-800 text-base">
                          <b>HTML</b> (tiếng Anh, viết tắt cho <b>HyperText Markup Language</b>, hay là
                          "Ngôn ngữ Đánh dấu Siêu văn bản") là một ngôn ngữ đánh dấu được
                          thiết kế ra để tạo nên các trang web với các mẩu thông tin được
                          trình bày trên World Wide Web.
                          <br/><br/>
                          Cùng với <b>CSS</b> và <b>JavaScript</b>, <b>HTML</b> tạo ra bộ ba nền tảng kỹ thuật cho
                          World Wide Web.
                          <br/><br/>
                          <b>HTML</b> được định nghĩa như là một ứng dụng đơn giản của SGML và được
                          sử dụng trong các tổ chức cần đến các yêu cầu xuất bản phức tạp.
                          HTML đã trở thành một chuẩn Internet do tổ chức World Wide Web
                          Consortium (W3C) duy trì.
                          <br/><br/>
                          Phiên bản chính thức mới nhất của <b>HTML</b> là HTML 4.01 (1999). Sau đó,
                          các nhà phát triển đã thay thế nó bằng XHTML. Hiện nay, <b>HTML</b> đang
                          được phát triển tiếp với phiên bản HTML5 hứa hẹn mang lại diện mạo
                          mới cho Web.
                      </p>
                  </details>

                  <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                      <summary
                          className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] hover:border-lightslategray focus:border-lightslategray open:bg-lightslategray open:border-lightslategray text-lg font-semibold transition-colors">
                          Có 4 loại Markup
                      </summary>
                      <ol className="p-5 list-decimal list-inside space-y-4 text-gray-700">
                          <li><b>Đánh dấu có cấu trúc</b> miêu tả mục đích của phần văn bản.</li>
                          <li>
                              Đánh dấu trình bày miêu tả phần hiện hình trực quan của phần văn
                              bản bất kể chức năng của nó là gì (ví dụ, <b>boldface</b> sẽ hiển thị đoạn văn bản
                              boldface).
                              <br/>
                              (Chú ý: cách dùng đánh dấu trình bày này bây giờ không còn được
                              khuyên dùng mà nó được thay thế bằng cách dùng <b>CSS</b>).
                          </li>
                          <li>
                              Đánh dấu liên kết ngoài chứa phần liên kết từ trang này đến trang
                              kia (ví dụ,{" "}
                              <a
                                  href="http://www.wikipedia.org/"
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-blue-600 hover:text-blue-800 underline"
                              >
                                  Wikipedia
                              </a>
                              sẽ hiển thị từ <b>Wikipedia</b> như là một liên kết ngoài đến một URL
                              cụ thể).
                          </li>
                          <li>
                              Các phần tử điều khiển giúp tạo ra các đối tượng (ví dụ, các nút
                              và danh sách).
                          </li>
                      </ol>
                  </details>

                  <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                      <summary
                          className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] hover:border-lightslategray focus:border-lightslategray open:bg-lightslategray open:border-lightslategray text-lg font-semibold transition-colors">
                          Tách phần nội dung với phần trình bày
                      </summary>
                      <p className="p-5 leading-relaxed text-gray-800 text-base">
                          Nỗ lực tách phần nội dung ra khỏi phần hình thức trình bày của trang
                          <b>HTML</b> đã đưa đến sự xuất hiện của các chuẩn mới như <b>XHTML</b>. Các chuẩn
                          này nhấn mạnh vào việc sử dụng thẻ đánh dấu vào việc xác định cấu
                          trúc tài liệu như phần đề mục, đoạn văn, khối văn bản trích dẫn và
                          các bảng, chứ không khuyên dùng các thẻ đánh dấu mang tính chất
                          trình bày trực quan, như <code>&lt;font&gt;</code>,{" "}
                          <b>(in đậm)</b> và <i>in nghiêng</i>.
                          <br/><br/>
                          Những mã mang tính chất trình bày đó đã được loại bỏ khỏi HTML 4.01
                          Strict và các đặc tả XHTML nhằm tạo điều kiện cho <b>CSS</b>. <b>CSS</b> cung cấp
                          một giải pháp giúp tách cấu trúc <b>HTML</b> ra khỏi phần trình bày của
                          nội dung của nó.
                      </p>
                  </details>
              </section>
          </div>
          <div className="mt-[-105px]"></div>
          <Footer1 />
      </>
    );
};

export const Infor1 = () => {
    return (
        <>
            <Header2 onLogout={handleLogout}/>
            <div className="pt-5 flex flex-col items-center justify-center bg-[lightsteelblue] min-h-screen px-4">
                <h1 className="font-semibold font-[Berkshire_Swash] text-6xl text-white text-center mb-4">
                    CSS
                </h1>
                <h2 className="text-xl text-center font-mono mb-8">
                    Bạn có thể đọc thêm về CSS tại đây:
                </h2>

                <section className="w-full max-w-[80%] space-y-6 p-5">
                    <details open className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            CSS là gì?
                        </summary>
                        <p className="p-5 leading-relaxed text-gray-800 text-base">
                            <b>CSS</b> (Cascading Style Sheets) là ngôn ngữ được sử dụng để mô tả cách trình bày các phần tử HTML trên trang web.
                            Nó cho phép bạn thay đổi màu sắc, kiểu chữ, kích thước, khoảng cách và bố cục hiển thị của trang web.
                            <br/><br/>
                            Cùng với <b>HTML</b> và <b>JavaScript</b>, CSS là một trong ba công nghệ cốt lõi của Web.
                            CSS giúp tách phần nội dung và phần trình bày, cho phép các nhà phát triển dễ dàng bảo trì và mở rộng trang web.
                            <br/><br/>
                            CSS được phát triển bởi <b>World Wide Web Consortium (W3C)</b> và hiện nay đã có nhiều cấp độ, phổ biến nhất là CSS3.
                        </p>
                    </details>

                    <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            Các thành phần chính trong CSS
                        </summary>
                        <ol className="p-5 list-decimal list-inside space-y-4 text-gray-700">
                            <li>
                                <b>Selector (Bộ chọn):</b> Xác định phần tử HTML mà bạn muốn áp dụng kiểu (ví dụ: <code>p</code>, <code>.class</code>, <code>#id</code>).
                            </li>
                            <li>
                                <b>Property (Thuộc tính):</b> Là các thuộc tính có thể thay đổi trong phần tử (ví dụ: <code>color</code>, <code>font-size</code>, <code>margin</code>).
                            </li>
                            <li>
                                <b>Value (Giá trị):</b> Giá trị của thuộc tính (ví dụ: <code>red</code>, <code>16px</code>, <code>center</code>).
                            </li>
                            <li>
                                <b>Box Model:</b> Là mô hình mô tả cách hiển thị của phần tử (gồm content, padding, border, margin).
                            </li>
                        </ol>
                    </details>

                    <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            Tách nội dung và trình bày bằng CSS
                        </summary>
                        <p className="p-5 leading-relaxed text-gray-800 text-base">
                            Việc tách nội dung (HTML) và trình bày (CSS) giúp mã dễ đọc, dễ bảo trì và cho phép bạn thay đổi giao diện toàn trang web chỉ bằng một file CSS.
                            <br/><br/>
                            Các chuẩn CSS mới như <b>Flexbox</b> và <b>Grid</b> giúp xây dựng bố cục linh hoạt và phản hồi (responsive) dễ dàng hơn.
                            <br/><br/>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noreferrer" className="text-blue-600 underline hover:text-blue-800">
                                Tham khảo thêm tại MDN Web Docs
                            </a>.
                        </p>
                    </details>
                </section>
            </div>
            <div className="mt-[-105px]"></div>
            <Footer1 />
        </>
    );
};

export const Infor2 = () => {
    return (
        <>
            <Header2 onLogout={handleLogout}/>
            <div className="pt-5 flex flex-col items-center justify-center bg-[lightsteelblue] min-h-screen px-4">
                <h1 className="font-semibold text-6xl text-white font-[Berkshire_Swash] text-center mb-4">
                    JavaScript
                </h1>
                <h2 className="text-xl text-center font-mono mb-8">
                    Ngôn ngữ lập trình cốt lõi của Web:
                </h2>

                <section className="w-full max-w-[80%] space-y-6 p-5">
                    <details open className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            JavaScript là gì?
                        </summary>
                        <p className="p-5 leading-relaxed text-gray-800 text-base">
                            <b>JavaScript</b> là ngôn ngữ lập trình được sử dụng để tạo ra các trang web động và tương tác.
                            Nó được chạy trực tiếp trong trình duyệt web, cho phép thay đổi nội dung, kiểm tra dữ liệu, tạo hoạt ảnh và xử lý sự kiện.
                            <br/><br/>
                            Được phát triển bởi <b>Netscape</b> vào năm 1995, JavaScript hiện là ngôn ngữ chính thức của Web, được chuẩn hóa bởi tổ chức <b>ECMA</b> (phiên bản chuẩn là <b>ECMAScript</b>).
                        </p>
                    </details>

                    <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            Các khái niệm cơ bản
                        </summary>
                        <ol className="p-5 list-decimal list-inside space-y-4 text-gray-700">
                            <li><b>Biến (Variables):</b> Dùng để lưu trữ giá trị dữ liệu, được khai báo bằng <code>var</code>, <code>let</code> hoặc <code>const</code>.</li>
                            <li><b>Hàm (Functions):</b> Là tập hợp các lệnh được định nghĩa để thực hiện một nhiệm vụ cụ thể.</li>
                            <li><b>Đối tượng (Objects):</b> Cho phép mô tả dữ liệu dưới dạng thuộc tính và phương thức.</li>
                            <li><b>DOM (Document Object Model):</b> Cấu trúc cây của tài liệu HTML mà JavaScript có thể thao tác.</li>
                        </ol>
                    </details>

                    <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            JavaScript trong phát triển hiện đại
                        </summary>
                        <p className="p-5 leading-relaxed text-gray-800 text-base">
                            JavaScript không chỉ hoạt động trên trình duyệt mà còn được sử dụng trong backend thông qua <b>Node.js</b>.
                            Ngoài ra, các framework hiện đại như <b>React</b>, <b>Vue</b>, và <b>Angular</b> giúp phát triển web nhanh hơn, hiệu quả hơn.
                            <br/><br/>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer" className="text-blue-600 underline hover:text-blue-800">
                                Tài liệu chính thức tại MDN
                            </a>.
                        </p>
                    </details>
                </section>
            </div>
            <div className="mt-[-105px]"></div>
            <Footer1 />
        </>
    );
};

export const Infor3 = () => {
    return (
      <>
          <Header2 onLogout={handleLogout}/>
          <div className="pt-5 flex flex-col items-center justify-center bg-[lightsteelblue] min-h-screen px-4">
              <h1 className="font-semibold text-6xl text-white font-[Berkshire_Swash] text-center mb-4">
                  React
              </h1>
              <h2 className="text-xl text-center font-mono mb-8">
                  Thư viện JavaScript mạnh mẽ cho giao diện người dùng:
              </h2>

              <section className="w-full max-w-[80%] space-y-6 p-5">
                  <details open className="w-full font-sans bg-white rounded-lg shadow-lg">
                      <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                          React là gì?
                      </summary>
                      <p className="p-5 leading-relaxed text-gray-800 text-base">
                          <b>React</b> là thư viện JavaScript mã nguồn mở được phát triển bởi <b>Facebook</b>,
                          giúp xây dựng giao diện người dùng (UI) bằng cách chia nhỏ thành các thành phần nhỏ gọi là <b>component</b>.
                          <br/><br/>
                          React chỉ tập trung vào tầng “View” trong mô hình MVC (Model–View–Controller) và cho phép tái sử dụng component dễ dàng.
                      </p>
                  </details>

                  <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                      <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                          JSX và Component
                      </summary>
                      <p className="p-5 leading-relaxed text-gray-800 text-base">
                          <b>JSX</b> là cú pháp mở rộng cho JavaScript cho phép viết HTML bên trong code JS.
                          <br/><br/>
                          Mỗi thành phần trong React (component) có thể là function hoặc class, và chúng nhận dữ liệu thông qua <b>props</b> (properties).
                          <br/><br/>
                          Ví dụ:
                          <code>{`const Hello = (props) => <h1>Xin chào, {props.name}!</h1>;`}</code>
                      </p>
                  </details>

                  <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                      <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                          React Hooks và Virtual DOM
                      </summary>
                      <p className="p-5 leading-relaxed text-gray-800 text-base">
                          <b>Hooks</b> (ví dụ: <code>useState</code>, <code>useEffect</code>) giúp viết component có trạng thái mà không cần class.
                          <br/><br/>
                          <b>Virtual DOM</b> là cơ chế giúp React cập nhật giao diện nhanh hơn bằng cách chỉ render lại những phần thay đổi.
                          <br/><br/>
                          <a href="https://react.dev/learn" target="_blank" rel="noreferrer" className="text-blue-600 underline hover:text-blue-800">
                              Xem tài liệu chính thức tại react.dev
                          </a>
                      </p>
                  </details>
              </section>
          </div>
          <div className="mt-[-105px]"></div>
          <Footer1 />
      </>
    );
};

export const Infor4 = () => {
    return (
        <>
            <Header2 onLogout={handleLogout}/>
            <div className="pt-5 flex flex-col items-center justify-center bg-[lightsteelblue] min-h-screen px-4">
                <h1 className="font-semibold text-6xl text-white font-[Berkshire_Swash] text-center mb-4">
                    TypeScript
                </h1>
                <h2 className="text-xl text-center font-mono mb-8">
                    Ngôn ngữ mở rộng mạnh mẽ của JavaScript:
                </h2>

                <section className="w-full max-w-[80%] space-y-6 p-5">
                    <details open className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            TypeScript là gì?
                        </summary>
                        <p className="p-5 leading-relaxed text-gray-800 text-base">
                            <b>TypeScript</b> là ngôn ngữ lập trình được phát triển bởi Microsoft,
                            mở rộng từ JavaScript với khả năng kiểm tra kiểu dữ liệu tĩnh (static type checking).
                            <br /><br />
                            Nó giúp lập trình viên phát hiện lỗi sớm ngay khi biên dịch, dễ bảo trì hơn và tăng hiệu suất làm việc nhóm.
                            <br /><br />
                            TypeScript được biên dịch (transpile) sang JavaScript thuần, nên có thể chạy trên bất kỳ trình duyệt hoặc môi trường nào hỗ trợ JS.
                        </p>
                    </details>

                    <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            Kiểu dữ liệu và Interface
                        </summary>
                        <p className="p-5 leading-relaxed text-gray-800 text-base">
                            TypeScript cung cấp các kiểu dữ liệu cơ bản như: <code>string</code>, <code>number</code>, <code>boolean</code>, <code>array</code> và <code>object</code>.
                            Ngoài ra, nó còn cho phép định nghĩa kiểu dữ liệu riêng thông qua <b>Interface</b> và <b>Type Alias</b>.
                            <br /><br />
                            Ví dụ:
                            <pre className="bg-gray-100 p-3 rounded-md text-sm mt-3">
                            {`interface User {
                              name: string;
                              age: number;
                            }
                            
                            const user: User = { name: "Taro", age: 20 };`}
                        </pre>
                            Kiểu dữ liệu rõ ràng giúp code dễ đọc, dễ phát hiện lỗi và hỗ trợ tốt hơn khi làm việc với IDE.
                        </p>
                    </details>

                    <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            TypeScript trong phát triển hiện đại
                        </summary>
                        <p className="p-5 leading-relaxed text-gray-800 text-base">
                            Ngày nay, TypeScript được sử dụng rộng rãi trong các framework như <b>React</b>, <b>Angular</b>, <b>Vue</b> và <b>Next.js</b>.
                            <br /><br />
                            Việc sử dụng TypeScript giúp hạn chế lỗi runtime, tăng độ tin cậy của hệ thống và dễ dàng mở rộng khi dự án lớn lên.
                            <br /><br />
                            <a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noreferrer" className="text-blue-600 underline hover:text-blue-800">
                                Tài liệu chính thức tại typescriptlang.org
                            </a>
                        </p>
                    </details>
                </section>
            </div>
            <div className="mt-[-105px]"></div>
            <Footer1 />
        </>
    );
};

export const Infor5 = () => {
    return (
        <>
            <Header2 onLogout={handleLogout}/>
            <div className="pt-5 flex flex-col items-center justify-center bg-[lightsteelblue] min-h-screen px-4">
                <h1 className="font-semibold text-6xl text-white font-[Berkshire_Swash] text-center mb-4">
                    REST API
                </h1>
                <h2 className="text-xl text-center font-mono mb-8">
                    Giao tiếp giữa Client và Server:
                </h2>

                <section className="w-full max-w-[80%] space-y-6 p-5">
                    <details open className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            REST API là gì?
                        </summary>
                        <p className="p-5 leading-relaxed text-gray-800 text-base">
                            <b>REST API</b> (Representational State Transfer) là tiêu chuẩn kiến trúc
                            dùng trong giao tiếp giữa Client và Server thông qua giao thức HTTP.
                            <br /><br />
                            Dữ liệu thường được trao đổi dưới dạng <b>JSON</b> hoặc <b>XML</b>,
                            và mỗi tài nguyên (resource) được định danh qua một URL cụ thể.
                        </p>
                    </details>

                    <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            Các phương thức HTTP cơ bản
                        </summary>
                        <ol className="p-5 list-decimal list-inside space-y-4 text-gray-700">
                            <li><b>GET</b> – Lấy dữ liệu từ server.</li>
                            <li><b>POST</b> – Gửi dữ liệu mới lên server.</li>
                            <li><b>PUT</b> – Cập nhật dữ liệu đã có.</li>
                            <li><b>DELETE</b> – Xóa dữ liệu khỏi server.</li>
                        </ol>
                        <p className="p-5 text-gray-700">
                            Ví dụ:
                            <code className="block bg-gray-100 p-2 rounded-md mt-2">
                                GET https://api.example.com/users
                            </code>
                            Trả về danh sách người dùng ở dạng JSON.
                        </p>
                    </details>

                    <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            Ưu điểm và ứng dụng của REST
                        </summary>
                        <p className="p-5 leading-relaxed text-gray-800 text-base">
                            REST đơn giản, dễ mở rộng và tương thích với nhiều nền tảng.
                            Nó là tiêu chuẩn phổ biến để xây dựng API trong các ứng dụng hiện đại như <b>React</b>, <b>Angular</b> hoặc <b>mobile app</b>.
                            <br /><br />
                            <a href="https://developer.mozilla.org/en-US/docs/Glossary/REST" target="_blank" rel="noreferrer" className="text-blue-600 underline hover:text-blue-800">
                                Xem thêm tại MDN Web Docs
                            </a>
                        </p>
                    </details>
                </section>
            </div>
            <div className="mt-[-105px]"></div>
            <Footer1 />
        </>
    );
};

export const Infor6 = () => {
    return (
       <>
           <Header2 onLogout={handleLogout}/>
           <div className="pt-5 flex flex-col items-center justify-center bg-[lightsteelblue] min-h-screen px-4">
               <h1 className="font-semibold text-6xl text-white font-[Berkshire_Swash] text-center mb-4">
                   Git & GitHub
               </h1>
               <h2 className="text-xl text-center font-mono mb-8">
                   Hệ thống quản lý phiên bản hiện đại:
               </h2>

               <section className="w-full max-w-[80%] space-y-6 p-5">
                   <details open className="w-full font-sans bg-white rounded-lg shadow-lg">
                       <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                           Git là gì?
                       </summary>
                       <p className="p-5 leading-relaxed text-gray-800 text-base">
                           <b>Git</b> là hệ thống quản lý phiên bản phân tán (Distributed Version Control System) do Linus Torvalds tạo ra năm 2005.
                           Nó cho phép theo dõi và quản lý lịch sử thay đổi của mã nguồn.
                           <br /><br />
                           Với Git, mỗi lập trình viên đều có một bản sao đầy đủ của repository,
                           giúp làm việc offline và dễ dàng hợp nhất (merge) các thay đổi.
                       </p>
                   </details>

                   <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                       <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                           Các lệnh Git cơ bản
                       </summary>
                       <ul className="p-5 list-disc list-inside space-y-3 text-gray-700">
                           <li><code>git init</code> – Tạo kho chứa Git mới.</li>
                           <li><code>git add .</code> – Thêm thay đổi vào khu vực chuẩn bị (staging).</li>
                           <li><code>git commit -m "message"</code> – Lưu thay đổi với mô tả.</li>
                           <li><code>git push</code> – Đẩy code lên GitHub hoặc server từ xa.</li>
                           <li><code>git pull</code> – Lấy và hợp nhất thay đổi từ server về local.</li>
                       </ul>
                   </details>

                   <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                       <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                           GitHub & Hợp tác nhóm
                       </summary>
                       <p className="p-5 leading-relaxed text-gray-800 text-base">
                           <b>GitHub</b> là nền tảng lưu trữ mã nguồn trực tuyến, cho phép chia sẻ, làm việc nhóm, và quản lý dự án dễ dàng hơn.
                           <br /><br />
                           Các tính năng như <b>Pull Request</b>, <b>Issue Tracking</b>, và <b>Action Workflow</b> hỗ trợ quy trình DevOps hiệu quả.
                           <br /><br />
                           <a href="https://docs.github.com/" target="_blank" rel="noreferrer" className="text-blue-600 underline hover:text-blue-800">
                               Xem thêm tài liệu chính thức tại docs.github.com
                           </a>
                       </p>
                   </details>
               </section>
           </div>
           <div className="mt-[-105px]"></div>
           <Footer1 />
       </>
    );
};

export const Infor7 = () => {
    return (
       <>
           <Header2 onLogout={handleLogout}/>
           <div className="pt-5 flex flex-col items-center justify-center bg-[lightsteelblue] min-h-screen px-4">
               <h1 className="font-semibold text-6xl text-white font-[Berkshire_Swash] text-center mb-4">
                   Next.js
               </h1>
               <h2 className="text-xl text-center font-mono mb-8">
                   Framework React mạnh mẽ cho ứng dụng Web hiện đại:
               </h2>

               <section className="w-full max-w-[80%] space-y-6 p-5">
                   <details open className="w-full font-sans bg-white rounded-lg shadow-lg">
                       <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                           Next.js là gì?
                       </summary>
                       <p className="p-5 leading-relaxed text-gray-800 text-base">
                           <b>Next.js</b> là framework mã nguồn mở được xây dựng dựa trên <b>React</b>,
                           giúp phát triển ứng dụng web nhanh, tối ưu SEO và có hiệu suất cao.
                           <br /><br />
                           Nó được phát triển bởi <b>Vercel</b> và hỗ trợ cả <b>Server-Side Rendering (SSR)</b>,
                           <b>Static Site Generation (SSG)</b> và <b>API Routes</b>.
                           <br /><br />
                           Next.js giúp kết hợp giữa frontend và backend trong cùng một dự án React.
                       </p>
                   </details>

                   <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                       <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                           Các tính năng nổi bật của Next.js
                       </summary>
                       <ol className="p-5 list-decimal list-inside space-y-4 text-gray-700">
                           <li>
                               <b>Routing tự động:</b> Tự động tạo route dựa vào cấu trúc thư mục <code>/app</code> hoặc <code>/pages</code>.
                           </li>
                           <li>
                               <b>SSR và SSG:</b> Hỗ trợ render phía server hoặc tạo trang tĩnh sẵn để tối ưu tốc độ tải và SEO.
                           </li>
                           <li>
                               <b>Image Optimization:</b> Giúp tải ảnh nhanh và hiệu quả với component <code>&lt;Image /&gt;</code>.
                           </li>
                           <li>
                               <b>API Routes:</b> Cho phép tạo endpoint backend trực tiếp trong dự án mà không cần server riêng.
                           </li>
                       </ol>
                   </details>

                   <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                       <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                           Cấu trúc dự án Next.js
                       </summary>
                       <p className="p-5 leading-relaxed text-gray-800 text-base">
                           Một dự án Next.js cơ bản gồm:
                           <ul className="list-disc list-inside mt-3 space-y-2">
                               <li><code>/app</code> – cấu trúc mới (App Router) cho Next.js 13 trở lên.</li>
                               <li><code>/pages</code> – chứa các file tương ứng với từng route (dành cho phiên bản cũ).</li>
                               <li><code>/public</code> – chứa ảnh và file tĩnh.</li>
                               <li><code>/api</code> – nơi viết các route API.</li>
                           </ul>
                           <br />
                           Next.js kết hợp TypeScript, Tailwind CSS và Prisma rất tốt cho các ứng dụng hiện đại.
                           <br /><br />
                           <a href="https://nextjs.org/docs" target="_blank" rel="noreferrer" className="text-blue-600 underline hover:text-blue-800">
                               Tài liệu chính thức tại nextjs.org
                           </a>
                       </p>
                   </details>
               </section>
           </div>
           <div className="mt-[-105px]"></div>
           <Footer1 />
       </>
    );
};

export const Infor8 = () => {
    return (
        <>
            <Header2 onLogout={handleLogout}/>
            <div className="pt-5 flex flex-col items-center justify-center bg-[lightsteelblue] min-h-screen px-4">
                <h1 className="font-semibold text-6xl text-white font-[Berkshire_Swash] text-center mb-4">
                    Cơ sở dữ liệu (Database)
                </h1>
                <h2 className="text-xl text-center font-mono mb-8">
                    Hệ thống lưu trữ và quản lý dữ liệu có cấu trúc:
                </h2>

                <section className="w-full max-w-[80%] space-y-6 p-5">
                    <details open className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            Cơ sở dữ liệu là gì?
                        </summary>
                        <p className="p-5 leading-relaxed text-gray-800 text-base">
                            <b>Database</b> là tập hợp có tổ chức của dữ liệu được lưu trữ và truy xuất một cách hiệu quả.
                            <br /><br />
                            Có hai loại chính:
                            <ul className="list-disc list-inside mt-3 space-y-2">
                                <li><b>Relational Database (CSDL quan hệ):</b> như MySQL, PostgreSQL, SQLite – dùng ngôn ngữ SQL.</li>
                                <li><b>NoSQL Database:</b> như MongoDB, Redis – lưu dữ liệu dạng linh hoạt (document, key-value,…).</li>
                            </ul>
                        </p>
                    </details>

                    <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            SQL cơ bản
                        </summary>
                        <p className="p-5 leading-relaxed text-gray-800 text-base">
                            <b>SQL (Structured Query Language)</b> là ngôn ngữ dùng để thao tác dữ liệu trong cơ sở dữ liệu quan hệ.
                            <br /><br />
                            Một số câu lệnh cơ bản:
                            <ul className="list-disc list-inside mt-3 space-y-2">
                                <li><code>SELECT</code> – Truy vấn dữ liệu.</li>
                                <li><code>INSERT</code> – Thêm dữ liệu mới.</li>
                                <li><code>UPDATE</code> – Cập nhật dữ liệu.</li>
                                <li><code>DELETE</code> – Xóa dữ liệu.</li>
                            </ul>
                            <br />
                            Ví dụ:
                            <pre className="bg-gray-100 p-3 rounded-md text-sm mt-3">
                            {`SELECT name, age FROM users WHERE age > 18;`}
                        </pre>
                        </p>
                    </details>

                    <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            Thiết kế cơ sở dữ liệu
                        </summary>
                        <p className="p-5 leading-relaxed text-gray-800 text-base">
                            Khi thiết kế một cơ sở dữ liệu, cần tuân thủ các nguyên tắc:
                            <ul className="list-disc list-inside mt-3 space-y-2">
                                <li><b>Chuẩn hóa (Normalization):</b> Giảm dư thừa dữ liệu.</li>
                                <li><b>Khóa chính (Primary Key):</b> Định danh duy nhất cho mỗi bản ghi.</li>
                                <li><b>Khóa ngoại (Foreign Key):</b> Tạo mối quan hệ giữa các bảng.</li>
                            </ul>
                            <br />
                            Cơ sở dữ liệu là nền tảng của hầu hết hệ thống phần mềm,
                            từ website thương mại điện tử cho đến ứng dụng di động và AI.
                            <br /><br />
                            <a href="https://www.w3schools.com/sql/" target="_blank" rel="noreferrer" className="text-blue-600 underline hover:text-blue-800">
                                Tài liệu học SQL tại W3Schools
                            </a>
                        </p>
                    </details>
                </section>
            </div>
            <div className="mt-[-105px]"></div>
            <Footer1 />
        </>
    );
};

export const Infor9 = () => {
    return (
        <>
            <Header2 onLogout={handleLogout}/>
            <div className="pt-5 flex flex-col items-center justify-center bg-[lightsteelblue] min-h-screen px-4">
                <h1 className="font-semibold text-6xl text-white font-[Berkshire_Swash] text-center mb-4">
                    Docker
                </h1>
                <h2 className="text-xl text-center font-mono mb-8">
                    Công cụ container hóa cho lập trình viên và DevOps:
                </h2>

                <section className="w-full max-w-[80%] space-y-6 p-5">
                    <details open className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            Docker là gì?
                        </summary>
                        <p className="p-5 leading-relaxed text-gray-800 text-base">
                            <b>Docker</b> là nền tảng giúp đóng gói ứng dụng và các phụ thuộc của nó vào trong một container — một môi trường độc lập, nhất quán trên mọi hệ thống.
                            <br /><br />
                            Mục tiêu của Docker là đảm bảo ứng dụng chạy “ở đâu cũng giống nhau” — từ máy lập trình viên đến server production.
                            <br /><br />
                            Mỗi container là một instance nhẹ của ứng dụng, hoạt động tách biệt nhưng có thể giao tiếp qua mạng Docker.
                        </p>
                    </details>

                    <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            Các khái niệm chính trong Docker
                        </summary>
                        <ul className="p-5 list-disc list-inside space-y-3 text-gray-700">
                            <li><b>Image:</b> Mẫu (template) chứa toàn bộ ứng dụng và môi trường của nó.</li>
                            <li><b>Container:</b> Phiên bản đang chạy của image.</li>
                            <li><b>Dockerfile:</b> File hướng dẫn Docker cách build image.</li>
                            <li><b>Docker Hub:</b> Kho lưu trữ image trực tuyến, tương tự như GitHub.</li>
                        </ul>
                        <p className="p-5">
                            Ví dụ lệnh cơ bản:
                            <pre className="bg-gray-100 p-3 rounded-md text-sm mt-2">
                            {`docker build -t myapp .  
docker run -p 3000:3000 myapp`}
                        </pre>
                        </p>
                    </details>

                    <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            Lợi ích và ứng dụng
                        </summary>
                        <p className="p-5 leading-relaxed text-gray-800 text-base">
                            Docker giúp:
                            <ul className="list-disc list-inside mt-3 space-y-2">
                                <li>Triển khai nhanh hơn.</li>
                                <li>Dễ dàng tích hợp CI/CD.</li>
                                <li>Giảm lỗi do khác biệt môi trường.</li>
                            </ul>
                            <br />
                            Docker được dùng rộng rãi trong phát triển web, microservices và cloud computing.
                            <br /><br />
                            <a href="https://docs.docker.com/" target="_blank" rel="noreferrer" className="text-blue-600 underline hover:text-blue-800">
                                Tài liệu chính thức tại docs.docker.com
                            </a>
                        </p>
                    </details>
                </section>
            </div>
            <div className="mt-[-105px]"></div>
            <Footer1 />
        </>
    );
};

export const Infor10 = () => {
    return (
        <>
            <Header2 onLogout={handleLogout}/>
            <div className="pt-5 flex flex-col items-center justify-center bg-[lightsteelblue] min-h-screen px-4">
                <h1 className="text-6xl font-[Berkshire_Swash] font-semibold text-white  text-center mb-4">
                    Cybersecurity
                </h1>
                <h2 className="text-xl text-center font-mono mb-8">
                    Bảo vệ hệ thống và dữ liệu trong môi trường số:
                </h2>

                <section className="w-full max-w-[80%] space-y-6 p-5">
                    <details open className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            Cybersecurity là gì?
                        </summary>
                        <p className="p-5 leading-relaxed text-gray-800 text-base">
                            <b>Cybersecurity</b> (An toàn thông tin) là lĩnh vực tập trung vào việc bảo vệ hệ thống, mạng và dữ liệu khỏi các cuộc tấn công hoặc truy cập trái phép.
                            <br /><br />
                            Mục tiêu chính là đảm bảo tính <b>bảo mật (Confidentiality)</b>, <b>toàn vẹn (Integrity)</b> và <b>sẵn sàng (Availability)</b> — còn gọi là mô hình <b>CIA</b>.
                        </p>
                    </details>

                    <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            Các loại tấn công phổ biến
                        </summary>
                        <ul className="p-5 list-disc list-inside space-y-3 text-gray-700">
                            <li><b>Phishing:</b> Giả mạo email hoặc website để đánh cắp thông tin cá nhân.</li>
                            <li><b>Malware:</b> Phần mềm độc hại như virus, trojan, ransomware.</li>
                            <li><b>DDoS:</b> Tấn công làm nghẽn tài nguyên server.</li>
                            <li><b>SQL Injection:</b> Chèn mã SQL vào truy vấn để chiếm quyền truy cập dữ liệu.</li>
                        </ul>
                    </details>

                    <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            Cách phòng ngừa và bảo vệ
                        </summary>
                        <p className="p-5 leading-relaxed text-gray-800 text-base">
                            <ul className="list-disc list-inside mt-3 space-y-2">
                                <li>Sử dụng mật khẩu mạnh và xác thực hai yếu tố (2FA).</li>
                                <li>Cập nhật phần mềm, hệ điều hành và trình duyệt thường xuyên.</li>
                                <li>Mã hóa dữ liệu nhạy cảm.</li>
                                <li>Giám sát log hệ thống và dùng tường lửa (firewall).</li>
                            </ul>
                            <br />
                            <a href="https://www.cisa.gov/" target="_blank" rel="noreferrer" className="text-blue-600 underline hover:text-blue-800">
                                Tìm hiểu thêm tại CISA.gov
                            </a>
                        </p>
                    </details>
                </section>
            </div>
            <div className="mt-[-105px]"></div>
            <Footer1 />
        </>
    );
};

export const Infor11 = () => {
    return (
        <>
            <Header2 onLogout={handleLogout}/>
            <div className="pt-5 flex flex-col items-center justify-center bg-[lightsteelblue] min-h-screen px-4">
                <h1 className="font-semibold text-6xl text-white font-[Berkshire_Swash] text-center mb-4">
                    Artificial Intelligence (AI)
                </h1>
                <h2 className="text-xl text-center font-mono mb-8">
                    Trí tuệ nhân tạo – công nghệ định hình tương lai:
                </h2>

                <section className="w-full max-w-[80%] space-y-6 p-5">
                    <details open className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            AI là gì?
                        </summary>
                        <p className="p-5 leading-relaxed text-gray-800 text-base">
                            <b>Artificial Intelligence</b> (AI) là lĩnh vực nghiên cứu và phát triển các hệ thống có khả năng mô phỏng tư duy, học hỏi và ra quyết định như con người.
                            <br /><br />
                            Các nhánh chính của AI gồm:
                            <ul className="list-disc list-inside mt-3 space-y-2">
                                <li><b>Machine Learning (ML):</b> Máy học – cho phép máy tính học từ dữ liệu.</li>
                                <li><b>Deep Learning:</b> Học sâu với mạng neuron nhiều tầng.</li>
                                <li><b>Natural Language Processing (NLP):</b> Xử lý ngôn ngữ tự nhiên – ví dụ: ChatGPT.</li>
                            </ul>
                        </p>
                    </details>

                    <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            Ứng dụng thực tế của AI
                        </summary>
                        <p className="p-5 leading-relaxed text-gray-800 text-base">
                            AI được ứng dụng rộng rãi trong nhiều lĩnh vực:
                            <ul className="list-disc list-inside mt-3 space-y-2">
                                <li>Trợ lý ảo (Google Assistant, Siri, ChatGPT).</li>
                                <li>Xe tự lái.</li>
                                <li>Phát hiện gian lận trong ngân hàng.</li>
                                <li>Dự đoán xu hướng trong thương mại điện tử.</li>
                            </ul>
                        </p>
                    </details>

                    <details className="w-full font-sans bg-white rounded-lg shadow-lg">
                        <summary className="cursor-pointer p-5 bg-[#9fb6ce] border border-[#9fb6ce] text-lg font-semibold hover:border-lightslategray open:bg-lightslategray">
                            Tương lai của AI
                        </summary>
                        <p className="p-5 leading-relaxed text-gray-800 text-base">
                            Trong tương lai, AI sẽ tiếp tục phát triển mạnh mẽ, góp phần tự động hóa công việc, tối ưu quy trình sản xuất và nâng cao chất lượng cuộc sống.
                            <br /><br />
                            Tuy nhiên, đi cùng với đó là những thách thức về đạo đức, quyền riêng tư và việc làm.
                            <br /><br />
                            <a href="https://ai.google/education/" target="_blank" rel="noreferrer" className="text-blue-600 underline hover:text-blue-800">
                                Tìm hiểu thêm về AI tại Google AI Education
                            </a>
                        </p>
                    </details>
                </section>
            </div>
            <div className="mt-[-105px]"></div>
            <Footer1 />
        </>
    );
};

