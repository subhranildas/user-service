const table = document.getElementById('userTable');

async function loadUsers() {
  const res = await fetch('/users');
  const data = await res.json();
  table.innerHTML = '';

  data.users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.role}</td>
    `;
    table.appendChild(row);
  });
}

document.getElementById('fetchUsersBtn').addEventListener('click', loadUsers);

document.getElementById('addUserBtn').addEventListener('click', async () => {
  const name = document.getElementById('name').value;
  const role = document.getElementById('role').value;

  await fetch('/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, role })
  });

  loadUsers(); // refresh table
});