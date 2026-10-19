import { getItems } from '../services/apiService.js';
import { createItemCard } from '../components/ItemCard.js';

export async function HomeView() {
    const container = document.createElement('div');
    container.className = 'home-view';
    container.innerHTML = `
        <h2>Centros de Donación de Sangre en BCS</h2>
        <p>Conoce los centros disponibles en Baja California Sur para donación de sangre.</p>
        <div class="items-grid" id="items-grid">
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
        </div>
    `;

    const grid = container.querySelector('#items-grid');

    try {
        const items = await getItems();

        grid.innerHTML = '';
        items.forEach(item => {
            grid.appendChild(createItemCard(item));
        });

    } catch (error) {
        grid.innerHTML = `
            <div style="background: #ffebee; color: #b71c1c; padding: 1.5rem; border-radius: 8px; grid-column: 1 / -1;">
                <p><strong>¡Ups! Ocurrió un error al cargar los datos de la API.</strong></p>
                <p>Por favor, verifica tu conexión a internet e intenta recargar la página.</p>
            </div>
        `;
    }

    return container;
}