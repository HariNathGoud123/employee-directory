let employees = JSON.parse(localStorage.getItem("employees")) || [];

function saveEmployees() {
  localStorage.setItem("employees", JSON.stringify(employees));
}

function renderEmployees() {
  const list = document.getElementById("employeeList");
  list.innerHTML = "";
  employees.forEach(emp => {
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
    list.appendChild(card);
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

  const list = document.getElementById("employeeList");
  list.innerHTML = "";
  filtered.forEach(emp => {
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
    list.appendChild(card);
  });
});

document.getElementById("addEmployeeBtn").addEventListener("click", () => {
  localStorage.removeItem("editEmp");
  window.location.href = "form.html";
});

window.onload = renderEmployees;
