---
layout: post
title: Sprint 5 Blog
comments: true
toc: true
permalink: /tri-2-blog/
---

<html lang="en">
<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
    <script>hljs.highlightAll();</script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trimester 2 Blog</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
            color: #333;
        }
        header {
            background: #007BFF;
            color: white;
            padding: 1rem 0;
            text-align: center;
        }
        .container {
            max-width: 800px;
            margin: 2rem auto;
            padding: 1rem;
            background: #301313;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }
        .blog-title {
            text-align: center;
            margin-bottom: 1rem;
        }
        .blog-section {
            margin-bottom: 2rem;
        }
        .code-block {
            background: #f5f5f5;
            border-left: 5px solid #007BFF;
            padding: 1rem;
            font-family: monospace;
            white-space: pre-wrap;
            overflow-x: auto;
            border-radius: 4px;
        }
        footer {
            text-align: center;
            padding: 1rem 0;
            margin-top: 2rem;
            background: #333;
            color: #f4f4f9        
        }
    </style>
</head>
<body>
    <header>
        <h1>About Us Page Feature</h1>
    </header>
    <div>
        <p> My feature was an about us page for the website showing who worked on it and things about each of us.</p>
    </div>
<div class="container">
        <h2 class="blog-title">Backend to Front End Communication</h2>

<div class="blog-section">
            <p>This sprint was focussed on different methods of backend to frontend communication. First we started with static data stored directly in an API on the backend which we would pull from to the frontend.</p>
        </div>

<div class="blog-section">
            <h3>Static Data Stored on Backend</h3>
            <div class="code-block">

<pre><code class="language-python">
#Python Code
class StudentAPI: #The class that functions in the API are defined under
    @staticmethod
    def get_student(name): #Function called to get data about student
        students = { #All of the students' static data stored
            "Ahmad": { #Name of the specific student called
                "name": "Ahmad", #Data about that student
                "age": 15,
                "grade": "Sophomore",
                "favorite_dish": "Pasta",
            },
        }
        return students.get(name) #Returning data listed for the student

    class _ahmad(Resource): #Class to call to get data
        def get(self): #Function to get data which calls above function
            student = StudentAPI.get_student("Ahmad")
            if student: #Checks for data under student's name
                return jsonify(student) #Returns the data from above
            return {"Data not found"}, 404 #Error if no data present
api.add_resource(StudentAPI._ahmad, '/student/ahmad') #Creates API
</code></pre>
</div>
        </div>
<div class="blog-section">
            <h3>Static Data Pulled to Frontend</h3>
            <div class="code-block">
<pre><code>
// Javascript Code
async function fetchStudentData(studentName) {
const apiUrl = `http://127.0.0.1:8887/api/student/${studentName}`;
    try {
        const response = await fetch(apiUrl);

        if (response.ok) {
            const data = await response.json();

            // Display data on the page
            const studentDataDiv = document.getElementById('student-data');
            studentDataDiv.innerHTML = `
                <p>${data.name}</p>
                <p><strong>Age:</strong> ${data.age}</p>
                <p><strong>Grade:</strong> ${data.grade}</p>
                <p><strong>Favorite Dish:</strong> ${data.favorite_dish}</p>
        `;
        } 
        else {
            document.getElementById('student-data').innerText = `Error: Could not fetch data for ${studentName}`;
        }
    } 
}
</code></pre>
            </div>
        </div>
    </div>
<div class="container">
        <h2 class="blog-title">Database Use</h2>

<div class="blog-section">
            <p>After having made the static data connection between frontend and backend we began using dynamic data on the backend.</p>
        </div>

<div class="blog-section">
            <h3>Backend Addition to Database</h3>
            <div class="code-block">

<pre><code class="language-python">
#Python Code
class _addStudent(Resource): #Function to add a student
    def post(self): #Calls a post to add to the database
        """
        Create a new Student.
        """
        body = request.get_json()
        # Validate name
        name = body.get('name')
        if name is None or len(name) < 2: #Checks for a proper name
        return {'message': 'Name is missing, 
        or is less than 2 characters'}, 400
        age = body.get('age')
        if age is None: #Checks for a written age
            return {'message': 'Age is missing'}, 400
        grade = body.get('grade')
        if grade is None: #Checks for a grade
            return {'message': 'Grade is missing'}, 400
        favorite_dish = body.get('favorite_dish')
        if favorite_dish is None or len(favorite_dish) < 2: 
        #Checks for proper dish
            return {'message': 'Favorite Dish is missing, 
            or is less than 2 characters'}, 400
        # Setup minimal Student OBJECT
        student_obj = Student(name=name, age=age, grade=grade, 
        favorite_dish=favorite_dish) #Creates a student with data
        # Add user to database
        student = student_obj.create()  
        # pass the body elements to be saved in the database
        if not student:  # failure returns error message
            return {'message': f'Processed {name}'}, 400
        return jsonify(student.read())
api.add_resource(StudentAPI._addStudent, '/student/add')
</code></pre>
</div>
        </div>
<div class="blog-section">
            <h3>New Student Add on Frontend</h3>
<form id="add-student-form">
    <h2 style="color: white;">Add a New Chef</h2>

    <label for="name" style="color: white;">Name:</label>
    <input type="text" id="name" name="name" placeholder="Enter Name" required style="color: black; background-color: white;">

    <label for="age" style="color: white;">Age:</label>
    <input type="number" id="age" name="age" placeholder="Enter Age" required style="color: black; background-color: white;">

    <label for="grade" style="color: white;">Grade:</label>
    <input type="text" id="grade" name="grade" placeholder="Enter Grade" required style="color: black; background-color: white;">

    <label for="favorite_dish" style="color: white;">Favorite Dish:</label>
    <input type="text" id="favorite_dish" name="favorite_dish" placeholder="Enter Favorite Dish" required style="color: black; background-color: white;">

    <button type="button" onclick="addStudent()" style="color: black;">Add Chef</button>
</form>
<div class="code-block">
<pre><code>
// Javascript Code
async function addOrUpdateStudent() {
    const form = document.getElementById('add-student-form');
    const name = form.name.value.trim();
    const age = form.age.value;
    const grade = form.grade.value;
    const favorite_dish = form.favorite_dish.value;

    const isEditing = document.getElementById("editing-chef-id");
    const editingName = isEditing ? isEditing.value : null;

    const apiUrl = editingName ? `${pythonURI}/api/student/update` : `${pythonURI}/api/student/add`;
    const method = editingName ? "PUT" : "POST";

    try {
        const response = await fetch(apiUrl, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, age, grade, favorite_dish }),
        });

        if (!response.ok) {
            throw new Error(`Error saving chef.`);
        }

        alert(`Chef ${editingName ? 'updated' : 'added'} successfully!`);

        // Do NOT reset the form here as it's already filled
        // form.reset();  // This would clear out the inputs!

        // Hide the form after submission (only if you want it hidden after submission)
        // form.style.display = "none";

    } catch (error) {
        alert(error.message);
    }
}
</code></pre>
            </div>
        </div>
<div class="blog-section">
            <h3>Backend Updating on Database</h3>
            <div class="code-block">

<pre><code class="language-python">
#Python Code
class _Update(Resource):
    def put(self):
        """
        Update a student.
        """
        body = request.get_json()

        # Get student name from the request body
        name = body.get('name')
        if not name:
            return {'message': 'Student name is required for updating.'}, 400

        # Find the student in the database
        student = Student.query.filter_by(name=name).first()
        if student is None:
            return {'message': f'Student {name} not found'}, 404

        # Update the student object with the new data
        student.update(body)

        return jsonify(student.read())
api.add_resource(StudentAPI._Update, '/student/update')
</code></pre>
</div>
        </div>
<div class="blog-section">
            <h3>Update Student on Frontend</h3>
<div class="code-block">
<pre><code>
// Javascript Code
async function updateChef(originalName) {
    const form = document.getElementById("edit-chef-form");
    const name = form["edit-name"].value.trim();
    const age = form["edit-age"].value;
    const grade = form["edit-grade"].value;
    const favorite_dish = form["edit-favorite-dish"].value;

    const apiUrl = `${pythonURI}/api/student/update`;

    try {
        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, age, grade, favorite_dish }),
        });

        if (!response.ok) {
            throw new Error("Error updating chef.");
        }

        alert("Chef updated successfully!");

        // Hide edit form after updating
        document.getElementById("edit-container").innerHTML = "";

    } catch (error) {
        alert(error.message);
    }
}
</code></pre>
</div>
<div class="blog-section">
            <h3>Backend Deleting from Database</h3>
            <div class="code-block">

<pre><code class="language-python">
#Python Code
class _Delete(Resource):
    def delete(self):
        """
        Delete a student.
        """
        body = request.get_json()

        # Check if 'name' is provided in the request
        if not body or 'name' not in body:
            return {'message': 'Missing student name'}, 400  # Bad request

        # Extract student details from the request body
        name = body['name']
        age = body.get('age')
        grade = body.get('grade')
        favorite_dish = body.get('favorite_dish')

        # Check if the student exists in the database
        student = Student.query.filter_by(name=name).first()

        if student is None:
            return {'message': f'Student {name} not found'}, 404  # Not found

        # Compare current student data with the data in the request body
        if age is not None and student.age != age:
            return {'message': f'Age mismatch. Student age is {student.age}, but received {age}.'}, 400
        if grade is not None and student.grade != grade:
            return {'message': f'Grade mismatch. Student grade is {student.grade}, but received {grade}.'}, 400
        if favorite_dish is not None and student.favorite_dish != favorite_dish:
            return {'message': f'Favorite color mismatch. Student color is {student.favorite_dish}, but received {favorite_dish}.'}, 400

        # Assuming student.read() returns a dictionary of their data
        try:
            json = student.read()
            if not isinstance(json, dict):
                raise ValueError("Student data is not serializable")
        except Exception as e:
            return {'message': str(e)}, 500  # Server error

        # Proceed to delete the student
        student.delete()

        return jsonify({'message': f'Student {name} deleted', 'data': json}), 200  # OK response
api.add_resource(StudentAPI._Delete, '/student/delete')
</code></pre>
</div>
        </div>
<div class="blog-section">
            <h3>Delete Student on Frontend</h3>
<div class="code-block">
<pre><code>
// Javascript Code
async function deleteChef(name) {
    const apiUrl = `${pythonURI}/api/student/delete`;

    try {
        const response = await fetch(apiUrl, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        });

        alert(`Chef ${name} deleted successfully!`);

        // Optionally, refresh the student list after deletion
        fetchStudentData();

    } catch (error) {
        alert(error.message);
    }
}
</code></pre>
            </div>
        </div>
            </div>
        </div>
        <div class="blog-section">
            <h2>Collegeboard MCQ</h2>
            <div>
                <img src="/Bailey-GitHub-Playground//images/college_board.png"> 
                <p> Overall I feel pretty good about how I did on this MC. I got 59/67 which is an 88%. There were definitely a few questions I feel like I need more help with.</p>
            </div>
            <div>
                <h3> 2.1 </h3>
                <img src="/Bailey-GitHub-Playground//images/2.1(1).png"> 
                <p> I put light yellow as the answer when it was actually ivory. Both have 255 or red and green, the only difference is the value of blue. Light yellow has a smaller blue value than ivory. Since the given binary has four 0s at the end of the blue value we can take 255 and subtract 1, 2, 4, and 8. In essense we are doing 255 - 15 which gives 240, the blue value for ivory.</p>
                <img src="/Bailey-GitHub-Playground//images/2.1(2).png"> 
                <p> For this question, all digital data at its most broken down level is encoded with binary or bits meaning that all three of these, an integer, an alphanumeric character, and even a machine learning instruction can be represented with a series of bits.</p>
            </div>
            <div>
            <h3> 3.11 </h3>
                <img src="/Bailey-GitHub-Playground//images/3.11.png"> 
                <p> I put the target being -1 as something that would cause the procedure to work incorrectly. This is not true as it will still output correctly it will just be -1 either way. The true answer is that the values have to be in sorted order as this is a requirement for a binary search.</p>
            </div>
            <div>
            <h3> 3.17 </h3>
                <img src="/Bailey-GitHub-Playground//images/3.17.png"> 
                <p> Reasonable time is anything that runs within a polynomial function of the number of values. This means that 10, 2n, and n squared all run in reasonable time so all three are correct answers.</p>
            </div>
            <div>
            <h3> 4.1 </h3>
                <img src="/Bailey-GitHub-Playground//images/4.1(1).png"> 
                <p> While two of my answers were correct, answer 1 was not since the internet has no central device controlling it.</p>
                <img src="/Bailey-GitHub-Playground//images/4.1(2).png"> 
                <p> IP and TCP are designed to set a standard format for sending messages across the internet and are not designed to be completely secure.</p>
            </div>
            <h3> 5.5 </h3>
                <img src="/Bailey-GitHub-Playground//images/5.5.png"> 
                <p> Creative Commons is designed to allow copyright owners to determine the ways in which their works can be used or distributed. Any previously copyrighted works are subject to tratitional copyright rules.</p>
            </div>
            <div>
            <h3> 5.6 </h3>
                <img src="/Bailey-GitHub-Playground//images/5.6.png"> 
                <p> Certificate authorities issue digit certificates which can be used to verify ownership of public keys. They do not issue passwords.</p>
            </div>
        <div class = "blog section">
            <h2>CPT Requirements</h2>
            <div>
                <h3> Lists </h3>
                <img src="/Bailey-GitHub-Playground//images/lists.png"> 
                <p> I used lists to store a set of data together in a database. </p>
            </div>
            <div>
                <h3> A Procedure </h3>
                <img src="/Bailey-GitHub-Playground//images/procedure.png"> 
                <p> I used procedures to define the methods of CRUD in my model. Create, Read, Update, and Delete. </p>
            </div>
            <div>
                <h3> Calling a Procedure </h3>
                <img src="/Bailey-GitHub-Playground//images/calling_procedure.png"> 
                <p> I then called these procedures in my api to cause them to occur when needed. </p>
            </div>
            <div>
                <h3> Selection </h3>
                <img src="/Bailey-GitHub-Playground//images/selection.png"> 
                <p> I used selection to test and see if there is a chef/student with that name in the database currently when attempting to update or delete. </p>
            <div>
                <h3> Iteration </h3>
                <img src="/Bailey-GitHub-Playground//images/iteration.png"> 
                <p> I used iteration when creating my function to read all of the data currently in the database by going through each chef/student. </p>
            </div>
        </div>
        <div class = "blog section">
        <h2> Self Grade </h2>
            <div>
                <h3> 5 Accomplishments </h3>
                <img src="/Bailey-GitHub-Playground//images/5_accomplishments.png"> 
                <p> I believe that I deserve 5 points on my five big accomplishments. Early on in the trimester I was able to get my static data stored on a backend api to show up on frontend and helped the rest of my group get to that point as well. Similarly, for the database I was the first member of my group to have all of my CRUD actions working and assisted my group members fromt there. As the deployment admin for my group, I was in charge of getting our deployed website working as well as updating the deployed backend whenever necessary and using the cockpit terminal to determine whether or not changes were actually being made to the deployed backend database. Finally, on our frontend I created a UI for performing all of the actions of CRUD and iterated through different designs for it to arrive at one that is clean and easy to use.</p>
                <h3> Full Stack Demo, CPT Requirements, and N@tM Feedback </h3>
                <p> I believe that I deserve 1.8 points on the full stack demo, CPT requirements, and N@tM Feedback. My demo had a fully working about page with frontend to deployed backend connection using a PythonURI to still work locally if necessary. As shown above, my code meets all of the CPT requirements. As a group we recieved good feedback from N@tM from several different viewers. While we have not yet had the time to implement all of these changes, we have begun work on making improvements to mostly the design of our project off of the given feedback.</p>
                <h3> Project Feature Blog Writeup </h3>
                <p> I believe that I deserve 1 point on this blog write-up as I have included descriptive comments on everything that I have done throughout the trimester with images to supplement it in an organized fashion.</p>
                <h3> MCQ </h3>
                <img src="/Bailey-GitHub-Playground//images/college_board.png"> 
                <p> I believe that I deserve 1 point on the collegeboard MCQ. I tried my best on this MCQ and believe I got a very good score. I also went through all of the questions that I got wrong and gave an explanation for why they were wrong above.</p>
                <h3> 10th Point </h3>
                <p> For this 10th point, I believe that I deserve 0.5. During N@tM I went around and looked at another CSP project, a CSA project, and even a CSSE project giving advice to each on ways that I believe they could improve their projects. I also believe this is an area in which my continous effort to help the rest of my group members get all of their features working should be recognized. I think that one of my strengths that has developed through this CompSci class is developing an understanding of how the code actually works. I've seen a lot of people in this class either copy code or simply ask ChatGPT any time anything doesn't work exactly right, but I've made an effort to try to understand where the issue is coming from and problem solve on my own which has allowed me to fix other issues that my groupmates come to me with.</p>
                <h3> Total </h3>
                <p> In total, my self-grade brings me to a 9.3/10 which I believe is reasonable for the growth I have shown over this trimester and what I have been able to accomplish. </p>
            </div>
        </div>

