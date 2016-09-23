<%=htmlWebpackPlugin.options.encoding%>
<%=htmlWebpackPlugin.options.taglib%>
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>VUE + VUEX + ELEMENT-UI PROJECT</title>
    <script>
        window.config = {
            currentUser: "<%=htmlWebpackPlugin.options.user%>",
            context: "<%=htmlWebpackPlugin.options.context%>"
        }
    </script>
    <% for (var css in htmlWebpackPlugin.files.css) { %>
    <link href="<%=htmlWebpackPlugin.options.context%>/static/<%= htmlWebpackPlugin.files.css[css] %>" rel="stylesheet">
    <% } %>
  </head>
  <body>
    <div id="root"></div>
    <% for (var chunk in htmlWebpackPlugin.files.chunks) { %>
    <script src="<%=htmlWebpackPlugin.options.context%>/static/<%= htmlWebpackPlugin.files.chunks[chunk].entry %>"></script>
    <% } %>
  </body>
</html>
