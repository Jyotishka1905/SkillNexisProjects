// =========================
// GET HTML ELEMENTS
// =========================

const studentForm =
    document.getElementById("studentForm");

const studentId =
    document.getElementById("studentId");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const courseInput =
    document.getElementById("course");

const genderInput =
    document.getElementById("gender");

const ageInput =
    document.getElementById("age");

const submitBtn =
    document.getElementById("submitBtn");

const cancelBtn =
    document.getElementById("cancelBtn");

const formTitle =
    document.getElementById("formTitle");

const searchInput =
    document.getElementById("searchInput");

const courseFilter =
    document.getElementById("courseFilter");

const genderFilter =
    document.getElementById("genderFilter");

const tableBody =
    document.getElementById("studentTableBody");

const studentCount =
    document.getElementById("studentCount");

const noStudents =
    document.getElementById("noStudents");


// =========================
// LOAD STUDENTS
// =========================

let students =
    JSON.parse(
        localStorage.getItem("students")
    ) || [];


// =========================
// SAVE STUDENTS
// =========================

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}


// =========================
// DISPLAY STUDENTS
// =========================

function displayStudents() {

    tableBody.innerHTML = "";


    // Get search value

    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();


    // Get filter values

    const selectedCourse =
        courseFilter.value;

    const selectedGender =
        genderFilter.value;


    // Filter students

    const filteredStudents =
        students.filter(function(student) {

            const matchesSearch =
                student.name
                    .toLowerCase()
                    .includes(searchValue) ||

                student.email
                    .toLowerCase()
                    .includes(searchValue);


            const matchesCourse =
                selectedCourse === "All" ||
                student.course === selectedCourse;


            const matchesGender =
                selectedGender === "All" ||
                student.gender === selectedGender;


            return (
                matchesSearch &&
                matchesCourse &&
                matchesGender
            );

        });


    // Update count

    studentCount.textContent =
        filteredStudents.length;


    // No students found

    if (filteredStudents.length === 0) {

        noStudents.style.display = "block";

        return;

    }

    noStudents.style.display = "none";


    // Create table rows

    filteredStudents.forEach(function(student) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${student.id}
            </td>

            <td>
                ${student.name}
            </td>

            <td>
                ${student.email}
            </td>

            <td>
                ${student.age}
            </td>

            <td>
                ${student.gender}
            </td>

            <td>
                ${student.course}
            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent(${student.id})"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})"
                >
                    Delete
                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });
}


// =========================
// ADD / UPDATE STUDENT
// =========================

studentForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        // Get form values

        const name =
            nameInput.value.trim();

        const email =
            emailInput.value.trim();

        const course =
            courseInput.value;

        const gender =
            genderInput.value;

        const age =
            ageInput.value;


        // Check edit mode

        if (studentId.value !== "") {

            const id =
                Number(studentId.value);


            const student =
                students.find(function(student) {

                    return student.id === id;

                });


            if (student) {

                student.name = name;

                student.email = email;

                student.course = course;

                student.gender = gender;

                student.age = age;

            }


            resetForm();

        }

        else {

            // Create new student

            const newStudent = {

                id: Date.now(),

                name: name,

                email: email,

                course: course,

                gender: gender,

                age: age

            };


            students.push(newStudent);

        }


        // Save to localStorage

        saveStudents();


        // Refresh table

        displayStudents();


        // Clear form

        studentForm.reset();

    }
);


// =========================
// EDIT STUDENT
// =========================

function editStudent(id) {

    const student =
        students.find(function(student) {

            return student.id === id;

        });


    if (!student) {
        return;
    }


    // Fill form

    studentId.value =
        student.id;

    nameInput.value =
        student.name;

    emailInput.value =
        student.email;

    courseInput.value =
        student.course;

    genderInput.value =
        student.gender;

    ageInput.value =
        student.age;


    // Change form appearance

    formTitle.textContent =
        "Edit Student";

    submitBtn.textContent =
        "Update Student";

    cancelBtn.style.display =
        "block";


    // Scroll to form

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =========================
// DELETE STUDENT
// =========================

function deleteStudent(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmDelete) {
        return;
    }


    students =
        students.filter(function(student) {

            return student.id !== id;

        });


    // Save changes

    saveStudents();


    // Refresh table

    displayStudents();

}


// =========================
// CANCEL EDIT
// =========================

cancelBtn.addEventListener(
    "click",
    function() {

        resetForm();

    }
);


// =========================
// RESET FORM
// =========================

function resetForm() {

    studentForm.reset();

    studentId.value = "";

    formTitle.textContent =
        "Add Student";

    submitBtn.textContent =
        "Add Student";

    cancelBtn.style.display =
        "none";

}


// =========================
// SEARCH
// =========================

searchInput.addEventListener(
    "input",
    function() {

        displayStudents();

    }
);


// =========================
// COURSE FILTER
// =========================

courseFilter.addEventListener(
    "change",
    function() {

        displayStudents();

    }
);


// =========================
// GENDER FILTER
// =========================

genderFilter.addEventListener(
    "change",
    function() {

        displayStudents();

    }
);


// =========================
// INITIAL DISPLAY
// =========================

displayStudents();