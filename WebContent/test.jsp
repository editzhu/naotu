<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>Insert title here</title>
<meta http-equiv=Content-Type content="text/html;charset=utf-8">
</head>
<body>
<table>
    <th>
      <td>序号</td>
      <td>姓名</td>
      <td>性别</td>
      <td>年龄</td>
      <td>电话</td>
    </th>
  <c:forEach var="item" items="${request.list}">
    <tr>
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.sex}</td>
      <td>${item.age}</td>
      <td>${item.phone}</td>
    </tr>
  </c:forEach>
</table>


</body>
</html>