const API_URL = 'https://jsonplaceholder.typicode.com/users';


export async function getItems(retries = 1) {
    const timeoutMs = 5000; 

    for (let intento = 0; intento <= retries; intento++) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        try {
            const response = await fetch(API_URL, {
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const serverError = new Error(`Error del servidor: ${response.status} ${response.statusText}`);
                serverError.type = 'SERVER_ERROR';
                serverError.status = response.status;
                throw serverError;
            }

            const data = await response.json();

            return data.map(user => ({
                id: user.id,
                nombre: user.name,
                ciudad: user.address.city,
                tipo: "Centro Asociado / Hospital",
                horario: "Lunes a Viernes 8:00 AM - 3:00 PM"
            }));

        } catch (error) {
            clearTimeout(timeoutId);

            if (error.name === 'AbortError') {
                console.warn(`[Timeout] La petición tardó más de ${timeoutMs / 1000}s.`);
                error.type = 'TIMEOUT_ERROR';
            } 
            else if (error instanceof TypeError || !error.type) {
                console.warn(`[Error de Red / CORS] No se pudo conectar con el servidor.`);
                error.type = 'NETWORK_ERROR';
            }

            const esErrorDeServidor = error.type === 'SERVER_ERROR';

            if (intento < retries && !esErrorDeServidor) {
                console.log(`🔄 Reintentando petición (${intento + 1} de ${retries})...`);
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue; 
            }
            throw error;
        }
    }
}