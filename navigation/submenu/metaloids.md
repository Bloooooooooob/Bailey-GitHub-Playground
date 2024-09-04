---
layout: page
title: Metaloids
permalink: /elements/metaloids/
---


<style>
        #hiddenText {
            display: none;
            margin-top: 20px;
            font-size: 18px;
            color: green;
        }
    </style>
<body>
    <button onclick="showText()">What did the 5th element say about a place with a bunch of unintelligent elements?</button>

 <p id="hiddenText">This place if full of borons!</p>

 <script>
        function showText() {
            document.getElementById("hiddenText").style.display = "block";
        }
    </script>
</body>