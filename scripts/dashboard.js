const defaultEmployees = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    department: "HR",
    role: "Manager"
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Smith",
    email: "bob.smith@example.com",
    department: "Engineering",
    role: "Developer"
  },
  {
    id: 3,
    firstName: "Carol",
    lastName: "Lee",
    email: "carol.lee@example.com",
    department: "Marketing",
    role: "Designer"
  }
];

// Load from localStorage or seed with default
let employees = JSON.parse(localStorage.getItem("employees"));
if (!employees || employees.length === 0) {
  employees = [...defaultEmployees]; // deep copy
  localStorage.setItem("employees", JSON.stringify(employees));
}

function saveEmployees() {
  localStorage.setItem("employees", JSON.stringify(employees));
}

function renderEmployees(list = employees) {
  const container = document.getElementById("employeeList");
  container.innerHTML = "";

  if (!list.length) {
    container.innerHTML = "<p>No employees to display.</p>";
    return;
  }

  list.forEach(emp => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    container.appendChild(card);
  });
}

function deleteEmployee(id) {
  employees = employees.filter(emp => emp.id !== id);
  saveEmployees();
  renderEmployees();
}

function editEmployee(id) {
  const emp = employees.find(e => e.id === id);
  if (emp) {
    localStorage.setItem("editEmp", JSON.stringify(emp));
    window.location.href = "form.html";
  }
}

document.getElementById("searchBar").addEventListener("input", function (e) {
  const keyword = e.target.value.toLowerCase();
  const filtered = employees.filter(emp =>
    emp.firstName.toLowerCase().includes(keyword) ||
    emp.lastName.toLowerCase().includes(keyword) ||
    emp.email.toLowerCase().includes(keyword)
  );
  renderEmployees(filtered);
});

document.getElementById("addEmployeeBtn").addEventListener("click", () => {
  localStorage.removeItem("editEmp");
  window.location.href = "form.html";
});

window.onload = () => {
  renderEmployees();
};
