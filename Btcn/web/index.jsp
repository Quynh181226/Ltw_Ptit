<%-- 
    Document   : index
    Created on : Aug 11, 2025, 10:01:15 AM
    Author     : TRANG
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<html>
<head>
    <title>Upload file TXT</title>
</head>
<body>
<h2>Chọn file .txt để đọc</h2>
<form action="upload" method="post" enctype="multipart/form-data">
    <input type="file" name="file" accept=".txt">
    <input type="submit" value="Đọc file">
</form>
</body>
</html>

