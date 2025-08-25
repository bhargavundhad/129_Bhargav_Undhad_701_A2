// Get token from localStorage
let token = localStorage.getItem('token');

async function fetchOrders() {
  if (!token) {
    document.getElementById('order-list').innerHTML = '<li>Please login to view your orders</li>';
    return;
  }

  try {
    const res = await fetch('/api/orders/user', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (res.ok) {
      const orders = await res.json();
      renderOrders(orders);
    } else {
      document.getElementById('order-list').innerHTML = '<li>Failed to load orders</li>';
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    document.getElementById('order-list').innerHTML = '<li>Error loading orders</li>';
  }
}

function renderOrders(orders) {
  const list = document.getElementById('order-list');
  list.innerHTML = '';
  
  if (orders.length === 0) {
    list.innerHTML = '<li>No orders found</li>';
    return;
  }
  
  orders.forEach(order => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>Order #${order._id.slice(-8)}</strong><br>
      Status: ${order.status}<br>
      Total: ₹${order.totalAmount}<br>
      Date: ${new Date(order.createdAt).toLocaleDateString()}<br>
      Items: ${order.items.map(i => `${i.product.name} x ${i.quantity}`).join(', ')}
    `;
    list.appendChild(li);
  });
}

fetchOrders();
