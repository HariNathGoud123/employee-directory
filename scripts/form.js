const form = document.getElementById("employeeForm");
const errors = document.getElementById("formErrors");

let employees = JSON.parse(localStorage.getItem("employees")) || [];
const editData = localStorage.getItem("editEmp");

if (editData) {
  const emp = JSON.parse(editData);
  document.getElementById("employeeId").value = emp.id;
  document.getElementById("firstName").value = emp.firstName;
  document.getElementById("lastName").value = emp.lastName;
  document.getElementById("email").value = emp.email;
  document.getElementById("department").value = emp.department;
  document.getElementById("role").value = emp.role;
  localStorage.removeItem("editEmp");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  errors.textContent = "";

  const id = document.getElementById("employeeId").value;
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const department = document.getElementById("department").value.trim();
  const role = document.getElementById("role").value.trim();

  if (!firstName || !lastName || !email || !department || !role) {
    errors.textContent = "All fields are required.";
    return;
  }

  if (!email.includes("@")) {
    errors.textContent = "Invalid email address.";
    return;
  }

  if (id) {
    const index = employees.findIndex(e => e.id == id);
    employees[index] = { id: parseInt(id), firstName, lastName, email, department, role };
  } else {
    const newId = employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    employees.push({ id: newId, firstName, lastName, email, department, role });
  }

  localStorage.setItem("employees", JSON.stringify(employees));
  window.location.href = "index.html";
});
