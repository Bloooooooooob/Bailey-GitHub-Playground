---
layout: post
title: Sprint 5 Blog
comments: true
toc: true
permalink: /sprint-5-blog/
---

<html lang="en">
<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
    <script>hljs.highlightAll();</script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sprint 5 Blog</title>
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
                "favorite_color": "Blue",
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
                <h2>${data.name}</h2>
                <p><strong>Age:</strong> ${data.age}</p>
                <p><strong>Grade:</strong> ${data.grade}</p>
                <p><strong>Favorite Color:</strong> ${data.favorite_color}</p>
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
        favorite_color = body.get('favorite_color')
        if favorite_color is None or len(favorite_color) < 2: 
        #Checks for proper color
            return {'message': 'Favorite Color is missing, 
            or is less than 2 characters'}, 400
        # Setup minimal Student OBJECT
        student_obj = Student(name=name, age=age, grade=grade, 
        favorite_color=favorite_color) #Creates a student with data
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

    <label for="favorite_color" style="color: white;">Favorite Color:</label>
    <input type="text" id="favorite_color" name="favorite_color" placeholder="Enter Favorite Color" required style="color: black; background-color: white;">

    <button type="button" onclick="addStudent()" style="color: black;">Add Chef</button>
</form>
<div class="code-block">
<pre><code>
// Javascript Code
async function addStudent() {
  const form = document.getElementById('add-student-form');
  const name = form.name.value.trim();
  const age = form.age.value;
  const grade = form.grade.value;
  const favorite_color = form.favorite_color.value;

  const apiUrl = `http://127.0.0.1:8887/api/student/add`; 
  // API to add a new student

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, age, grade, favorite_color }),
    });

    if (response.ok) {
      alert(`Student added successfully!`);
      form.reset();
    } else {
      alert(`Error adding student.`);
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
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
async function addOrUpdateStudent() {
  const form = document.getElementById('add-student-form');
  const name = form.name.value.trim(); // Trim spaces to avoid mismatches
  const age = form.age.value;
  const grade = form.grade.value;
  const favorite_color = form.favorite_color.value;

  const getApiUrl = `http://127.0.0.1:8887/api/studentGet/`; // API to fetch existing students
  const addApiUrl = `http://127.0.0.1:8887/api/student/add`; // API to add a new student
  const updateApiUrl = `http://127.0.0.1:8887/api/student/update`; // API to update an existing student

  try {
    // Fetch existing students
    const response = await fetch(getApiUrl);
    if (!response.ok) throw new Error('Failed to fetch student data.');

    const data = await response.json();

    // Check if the student already exists
    const existingStudent = data.find((student) => student.name.toLowerCase() === name.toLowerCase());

    const apiUrl = existingStudent ? updateApiUrl : addApiUrl; // Determine API endpoint
    const method = existingStudent ? 'PUT' : 'POST'; // Use PUT for updates, POST for new entries

    // Send request to add or update the student
    const saveResponse = await fetch(apiUrl, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, age, grade, favorite_color }),
    });

    if (!saveResponse.ok) {
      const errorData = await saveResponse.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const responseData = await saveResponse.json();
    alert(`Student ${responseData.name} ${existingStudent ? 'updated' : 'added'} successfully!`);
    form.reset();

  } catch (error) {
    alert(`Error: ${error.message}`);
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
        favorite_color = body.get('favorite_color')

        # Check if the student exists in the database
        student = Student.query.filter_by(name=name).first()

        if student is None:
            return {'message': f'Student {name} not found'}, 404  # Not found

        # Compare current student data with the data in the request body
        if age is not None and student.age != age:
            return {'message': f'Age mismatch. Student age is {student.age}, but received {age}.'}, 400
        if grade is not None and student.grade != grade:
            return {'message': f'Grade mismatch. Student grade is {student.grade}, but received {grade}.'}, 400
        if favorite_color is not None and student.favorite_color != favorite_color:
            return {'message': f'Favorite color mismatch. Student color is {student.favorite_color}, but received {favorite_color}.'}, 400

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
<form id="add-student-form">
    <h2 style="color: white;">Delete a Chef</h2>

    <label for="name" style="color: white;">Name:</label>
    <input type="text" id="name" name="name" placeholder="Enter Name" required style="color: black; background-color: white;">

    <label for="age" style="color: white;">Age:</label>
    <input type="number" id="age" name="age" placeholder="Enter Age" required style="color: black; background-color: white;">

    <label for="grade" style="color: white;">Grade:</label>
    <input type="text" id="grade" name="grade" placeholder="Enter Grade" required style="color: black; background-color: white;">

    <label for="favorite_color" style="color: white;">Favorite Color:</label>
    <input type="text" id="favorite_color" name="favorite_color" placeholder="Enter Favorite Color" required style="color: black; background-color: white;">

    <button type="button" onclick="addStudent()" style="color: black;">Delete Chef</button>
</form>
<div class="code-block">
<pre><code>
// Javascript Code
async function deleteStudent() {
  const form = document.getElementById('delete-student-form');
  const name = form.name.value.trim(); // Trim spaces to avoid mismatches
  const age = parseInt(form.age.value); // Convert age to number
  const grade = form.grade.value;
  const favorite_color = form.favorite_color.value;

  const getApiUrl = `http://127.0.0.1:8887/api/studentGet/`; // API to fetch existing students
  const deleteApiUrl = `http://127.0.0.1:8887/api/student/delete`; // API to delete a student

  try {
    // Fetch existing students
    const response = await fetch(getApiUrl);
    if (!response.ok) throw new Error('Failed to fetch student data.');

    const data = await response.json();

    // Find the student by name
    const student = data.find((student) => student.name.toLowerCase() === name.toLowerCase());

    if (!student) {
      alert(`Student with name "${name}" not found.`);
      return;
    }

    // Check if the data matches
    if (student.age !== age || student.grade !== grade || student.favorite_color !== favorite_color) {
      alert(`Data mismatch. Please ensure the data matches the student information.`);
      return;
    }

    // Send DELETE request to delete the student
    const deleteResponse = await fetch(deleteApiUrl, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, age, grade, favorite_color }),
    });

    if (!deleteResponse.ok) {
      const errorData = await deleteResponse.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const responseData = await deleteResponse.json();
    alert(`Student ${responseData.name} deleted successfully!`);
    form.reset();

  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}
</code></pre>
            </div>
        </div>
            </div>
        </div>
        <div class="blog-section">
            <p>Overall this sprint has been very helpful in allowing me to learn about backend and frontend interactions and how to use both static and dynamic data in website creation.</p>
        </div>
</body>
</html>
