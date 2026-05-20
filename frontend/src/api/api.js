import axios from 'axios';

export const getProducts = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/products`, {
      withCredentials: true
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching products:", err)
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/products/${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching products:", err)
  }
}

export const registerUser = async (email, password, confirmPassword, firstName, lastName) => {
    const response = await axios.post(
        'http://localhost:3000/api/users/register',
        JSON.stringify({ firstName, lastName, email, password, confirmPassword }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    )
    return response.data
}

export const loginUser = async (email, password) => {
  const response = await axios.post(
    'http://localhost:3000/api/users/login', 
    JSON.stringify({email: email, password: password}),
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }
  );
  return response.data
}