<%-- 
    Document   : result1
    Created on : Aug 15, 2025, 9:16:13 PM
    Author     : TRANG
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head><title>Ghi file thành công</title></head>
<body>
<h2>Ghi file thành công!</h2>
<p>Bạn có thể tải file tại đây: 
<a href="<%= request.getAttribute("fileName") %>" download>Tải về Ghifile.txt</a>
</p>
<a href="index1.jsp">Trở lại</a>
</body>
</html>

