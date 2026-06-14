import axios from 'axios';

export const getProducts = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/products`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Error fetching products');
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/products/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Error fetching product');
  }
};

export const registerUser = async (email, password, confirmPassword, firstName, lastName) => {
  const response = await axios.post(
    'http://localhost:3000/api/users/register',
    JSON.stringify({ firstName, lastName, email, password, confirmPassword }),
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axios.post(
    'http://localhost:3000/api/users/login',
    JSON.stringify({ email: email, password: password }),
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );
  return response.data;
};

export const logoutUser = async () => {
  await axios.post('http://localhost:3000/api/users/logout', null, {
    withCredentials: true,
  });
};

export const getToken = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/users/get-token', null, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      return null;
    }
    const message = error.response?.data?.err || 'Something went wrong';
    throw new Error(message);
  }
};

export const getUser = async (token) => {
  try {
    const response = await axios.get('http://localhost:3000/api/users/get', {
      headers: { Authorization: token },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.err || 'Something went wrong';
    throw new Error(message);
  }
};

export const updateAddress = async (addressData) => {
  const response = await axios.put(
    'http://localhost:3000/api/users/address',
    JSON.stringify(addressData),
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );
  return response.data;
};

export const addToCart = async (productId, variantSize, quantity) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/users/cart/add',
      { productId, variantSize, quantity },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Error adding to cart');
  }
};

export const removeFromCart = async (productId, variantSize) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/users/cart/remove',
      { productId, variantSize },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Error removing from cart');
  }
};

export const getCart = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/users/cart', {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Error fetching cart');
  }
};

export const addToWishlist = async (productId) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/users/wishlist/add',
      { productId },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Error adding to Wishlist');
  }
};

export const removeFromWishlist = async (productId) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/users/wishlist/remove',
      { productId },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Error removing from wishlist');
  }
};

export const getWishlist = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/users/wishlist', {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Error fetching wishlist');
  }
};

export const updateCartQuantity = async (productId, variantSize, quantity) => {
  try {
    const response = await axios.put(
      'http://localhost:3000/api/users/cart/update',
      { productId, variantSize, quantity },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Error updating cart quantity');
  }
};

export const contact = async (data) => {
  try {
    const response = await axios.post('http://localhost:3000/api/users/contact', data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.err || 'Something went wrong';
    throw new Error(message);
  }
};

export const newsletter = async (email) => {
  const response = await axios.post(
    'http://localhost:3000/api/users/newsletter',
    { email },
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axios.post(
    'http://localhost:3000/api/users/forgot',
    { email },
    { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
  );
  return response.data;
};

export const resetPassword = async (token, password) => {
  const response = await axios.post(
    'http://localhost:3000/api/users/reset',
    { password },
    { headers: { 'Content-Type': 'application/json', Authorization: token }, withCredentials: true }
  );
  return response.data;
};

export const googleAuth = () => {
  window.location.href = 'http://localhost:3000/api/users/auth/google';
};

export const addReview = async (productId, reviewData) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/products/${productId}/reviews`,
      reviewData,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Error submitting review');
  }
};
