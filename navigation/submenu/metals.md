---
layout: page
title: Metals
permalink: /elements/metals/
---
<button>What did the 30th element say when someone told it to drop out of school?</button> 

<i style="background-color: red;">I don't zinc that's a very good idea!</i>

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
    <button onclick="showText()">Click Me</button>

    <p id="hiddenText">Hello! This text appeared after you clicked the button.</p>

    <script>
        function showText() {
            document.getElementById("hiddenText").style.display = "block";
        }
    </script>
</body>
</html>
