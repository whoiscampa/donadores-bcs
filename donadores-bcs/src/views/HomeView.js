import { getItems } from '../services/itemsService.js';
import { createItemCard } from '../components/ItemCard.js';

export function HomeView() {
    const container = document.createElement('div');
    container.className = 'home-view';

    container.innerHTML = `
        <h2>Centros de Donación de Sangre en BCS</h2>
        <p>Conoce los centros disponibles en Baja California Sur para donación de sangre.</p>
        <div class="items-grid" id="items-grid"></div>
    `;

    const grid = container.querySelector('#items-grid');
    const items = getItems();

    items.forEach(item => {
        grid.appendChild(createItemCard(item));
    });

    return container;
}