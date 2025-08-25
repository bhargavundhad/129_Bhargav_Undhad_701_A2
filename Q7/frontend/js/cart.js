// Get token from localStorage
let token = localStorage.getItem('token');

async function fetchCart() {
  if (!token) {
    document.getElementById('cart-items').innerHTML = '<li>Please login to view your cart</li>';
    return;
  }
  
  try {
    const res = await fetch('/api/cart', { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    renderCart(data.items || []);
  } catch (error) {
    console.error('Error fetching cart:', error);
    document.getElementById('cart-items').innerHTML = '<li>Error loading cart</li>';
  }
}

function renderCart(items) {
  const cartList = document.getElementById('cart-items');
  const totalDisplay = document.getElementById('cart-total');
  cartList.innerHTML = '';
  let total = 0;

  items.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.product.name} - ₹${item.product.price} x ${item.quantity}
      <button onclick="removeItem('${item.product._id}')">Remove</button>
    `;
    cartList.appendChild(li);
    total += item.product.price * item.quantity;
  });

  totalDisplay.textContent = total;
}

async function removeItem(itemId) {
  if (!token) return;
  
  try {
    await fetch(`/api/cart/remove/${itemId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchCart();
  } catch (error) {
    console.error('Error removing item:', error);
    alert('Failed to remove item from cart');
  }
}

document.getElementById('checkout-btn').addEventListener('click', async () => {
  if (!token) {
    alert('Please login first');
    return;
  }
  
  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (res.ok) {
      const order = await res.json();
      alert('Order placed successfully!');
      fetchCart();
    } else {
      const error = await res.json();
      alert(error.message || 'Failed to place order');
    }
  } catch (error) {
    console.error('Error placing order:', error);
    alert('Network error occurred');
  }
});

fetchCart();
