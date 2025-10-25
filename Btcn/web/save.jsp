<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Ghi File</title>
</head>
<body>
    <h2>Nhập nội dung để ghi vào file:</h2>
    <form action="SaveTextServlet" method="post">
        <textarea name="content" rows="10" cols="60" placeholder="Mã SV: B24DTCN442\nHọ tên: Pham Huong Quy\n..."></textarea><br><br>
        <input type="submit" value="Click ghi file">
    </form>
</body>
</html>