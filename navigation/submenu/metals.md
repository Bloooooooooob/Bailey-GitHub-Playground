---
layout: page
title: Metals
permalink: /elements/metals/
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Show Text on Button Click</title>
    <style>
        #hiddenText {
            display: none;
            margin-top: 20px;
            font-size: 18px;
            color: green;
        }
    </style>
</head>
<body>
    <button onclick="showText()">What did the 30th element say when someone told it to drop out of school?</button>

    <p id="hiddenText">I don't zinc that's a very good idea!</p>

    <script>
        function showText() {
            document.getElementById("hiddenText").style.display = "block";
        }
    </script>
</body>
</html>
