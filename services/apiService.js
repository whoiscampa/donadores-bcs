// Usamos una API REST pública y gratuita (JSONPlaceholder para simular registros o usuarios/sucursales)
const API_URL = 'https://jsonplaceholder.typicode.com/users';

export async function getItems() {
    try {
        const response = await fetch(API_URL);
        
        // Validar que la respuesta sea exitosa (response.ok)
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Mapeamos los datos de la API para que coincidan con la estructura que ya usa tu proyecto (nombre, ciudad, etc.)
        return data.map(user => ({
            id: user.id,
            nombre: user.name,
            ciudad: user.address.city,
            tipo: "Centro Asociado / Hospital",
            horario: "Lunes a Viernes 8:00 AM - 3:00 PM"
        }));

    } catch (error) {
        console.error("Fallo al obtener los datos de la API:", error);
        throw error; // Lo lanzamos para que el bloque try/catch de la vista active el Estado de Error
    }
}

export async function getItemById(id) {
    try {
        // Hacemos el fetch al recurso específico de la API pública
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        
        if (!response.ok) {
            throw new Error(`No se pudo encontrar el elemento con ID ${id}`);
        }
        
        const user = await response.json();
        
        return {
            id: user.id,
            nombre: user.name,
            ciudad: user.address.city,
            tipo: "Centro Asociado / Hospital",
            horario: "Lunes a Viernes 8:00 AM - 3:00 PM",
            contacto: user.email,
            telefono: user.phone
        };
    } catch (error) {
        console.error("Error al buscar el elemento por ID:", error);
        return null;
    }
}