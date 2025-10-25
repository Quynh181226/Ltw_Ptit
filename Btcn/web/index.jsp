<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Đọc File</title>
</head>
<body>
    <h2>Chọn file .txt để đọc</h2>
    <form action="UploadServlet" method="post" enctype="multipart/form-data">
        <input type="file" name="file" accept=".txt" required><br><br>
        <input type="submit" value="Click rồi chọn file text">
    </form>
</body>
</html>