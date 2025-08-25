// Get token from localStorage
let token = localStorage.getItem('token');

async function loadView(view) {
  const content = document.getElementById('admin-content');
  content.innerHTML = '<p>Loading...</p>';

  if (view === 'products') {
    const res = await fetch('/api/products');
    const products = await res.json();
    content.innerHTML = renderProducts(products);
  }

  if (view === 'categories') {
    const res = await fetch('/api/categories');
    const categories = await res.json();
    content.innerHTML = renderCategories(categories);
  }

  if (view === 'orders') {
    const res = await fetch('/api/orders', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const orders = await res.json();
    content.innerHTML = renderOrders(orders);
  }
}

function renderProducts(products) {
  return `
    <h3>Manage Products</h3>
    <ul>
      ${products.map(p => `<li>${p.name} - ₹${p.price}</li>`).join('')}
    </ul>
  `;
}

function renderCategories(categories) {
  return `
    <h3>Manage Categories</h3>
    <ul>
      ${categories.map(c => `<li>${c.name}</li>`).join('')}
    </ul>
  `;
}

function renderOrders(orders) {
  return `
    <h3>Manage Orders</h3>
    <ul>
      ${orders.map(o => `
        <li>
          Order #${o._id} - ₹${o.totalAmount} - ${o.status}
          <button onclick="updateStatus('${o._id}', 'Shipped')">Ship</button>
          <button onclick="updateStatus('${o._id}', 'Delivered')">Deliver</button>
        </li>
      `).join('')}
    </ul>
  `;
}

async function updateStatus(orderId, status) {
  await fetch(`/api/orders/${orderId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  loadView('orders');
}

async function loadCategoryOptions() {
  const res = await fetch('/api/categories');
  const categories = await res.json();
  const select = document.getElementById('category-select');
  const parentSelect = document.getElementById('parent-category-select');

  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat._id;
    option.textContent = cat.name;
    select.appendChild(option);

    const parentOption = option.cloneNode(true);
    parentSelect.appendChild(parentOption);
  });
}

document.getElementById('product-form').addEventListener('submit', async e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const body = Object.fromEntries(formData.entries());

  await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

  showToast('Product added!');
  loadView('products');
});

document.getElementById('category-form').addEventListener('submit', async e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const body = Object.fromEntries(formData.entries());

  await fetch('/api/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

  showToast('Category added!');
  loadView('categories');
});

loadCategoryOptions();
