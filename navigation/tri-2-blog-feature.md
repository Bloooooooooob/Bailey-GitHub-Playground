---
layout: post
title: Trimester 2 Blog Feature
comments: true
toc: true
permalink: /tri-2-blog-feature/
---

<html lang="en">
<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
    <script>hljs.highlightAll();</script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trimester 2 Blog Feature</title>
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
    <p>
        <a href="/Bailey-GitHub-Playground/tri-2-blog"> Back </a>
    </p>
    <div>
        <img src="/Bailey-GitHub-Playground//images/about.png"> 
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
        <img src="/Bailey-GitHub-Playground//images/add.png"> 
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
        <img src="/Bailey-GitHub-Playground//images/update.png"> 
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
        <img src="/Bailey-GitHub-Playground//images/delete.png"> 
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
        