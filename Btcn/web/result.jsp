<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Kết quả</title>
</head>
<body>
    <h2>Nội dung file:</h2>
    <pre><%= request.getAttribute("content") %></pre>
    <a href="index.jsp">Trở lại</a>
</body>
</html>