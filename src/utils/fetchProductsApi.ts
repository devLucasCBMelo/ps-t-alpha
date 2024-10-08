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
      return { success: false, message: `Erro HTTP: ${response.status}` };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erro ao buscar API', error);
  }
}

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

export const fetchRegisterProducts = async (token: string, productName: string, productDescription: string, productPrice: number, productQuantity: number) => {
  try {
    const response = await fetch('https://interview.t-alpha.com.br/api/products/create-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: productName,
        description: productDescription,
        price: productPrice,
        stock: productQuantity
      })
    });

    if(!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = response.json();
    return data;
    
  } catch (error) {
    console.log('Erro ao executar o fetchRegisterProducts', error);
  }
}

export const getAllProducts = async (token: string) => {
  try {
    const response = await fetch('https://interview.t-alpha.com.br/api/products/get-all-products', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if(!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = response.json();
    return data;
    
  } catch (error) {
    console.log('Erro ao executar o getAllProducts', error);
  }
}

export const getProductById = async (token: string, id: number) => {
  try {
    const response = await fetch(`https://interview.t-alpha.com.br/api/products/get-one-product/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if(!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = response.json();
    return data;
    
  } catch (error) {
    console.log('Erro ao executar o getProductById', error);
  }
}

export const fetchUpdateProducts = async (token: string, id: number, productName: string, productDescription: string, productPrice: number, productQuantity: number) => {
  try {
    await fetch(`https://interview.t-alpha.com.br/api/products/update-product/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: productName,
        description: productDescription,
        price: productPrice,
        stock: productQuantity
      })
    });

    
  } catch (error) {
    console.log('Erro ao executar o fetchUpdateProducts', error);
  }
}

export const fetchDeleteProductById = async (token: string, id: number) => {
  try {
    fetch(`https://interview.t-alpha.com.br/api/products/delete-product/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

  } catch (error) {
    console.log('Erro ao executar o deleteProductById', error);
  }
} 