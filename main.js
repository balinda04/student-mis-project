const BASE_URL = "https://your-json-server.onrender.com/students";

document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const student = {
    regno: document.getElementById("regno").value,
    name: document.getElementById("name").value,
    level: document.getElementById("level").value,
    marks: parseInt(document.getElementById("marks").value)
  };

  fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(student)
  })
  .then(() => {
    loadStudents();
    this.reset();
  });
});

function loadStudents() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#studentTable tbody");
      tbody.innerHTML = "";
      data.forEach(student => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${student.regno}</td>
          <td>${student.name}</td>
          <td>${student.level}</td>
          <td>${student.marks}</td>
          <td>
            <button onclick="deleteStudent(${student.id})">Delete</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    });
}

function deleteStudent(id) {
  fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  }).then(() => loadStudents());
}

// Initial load
loadStudents();
