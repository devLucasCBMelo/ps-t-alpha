export const fetchRegister = async (name: string, taxnumber: string, email: string, phone: string, password: string) => {
  try {
    const response = await fetch('https://interview.t-alpha.com.br/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        taxNumber: taxnumber,
        mail: email,
        phone: phone,
        password: password
      })
    });

    if(!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = response.json();
    return data;

  } catch (error) {
    console.log('Erro ao executar o fetchRegister', error)
  }
}

export const fetchProducts = async () => {
  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzksImlhdCI6MTcyMzI1MjkyNH0.WgxA41e1lOjHJjZhbwU-OgoFoZcUMu9UrX2OJXxpM6k"
    const response = await fetch('https://interview.t-alpha.com.br/api/products/get-all-products', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erro ao buscar API', error);
  }
}

export const fetchLogin = async (taxnumber: string, password: string) => {
  try {
    const response = await fetch('https://interview.t-alpha.com.br/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taxNumber: taxnumber,
        password: password
      })
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log('Erro ao buscar API', error);
  }
}
