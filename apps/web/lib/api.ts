export function fetchJSON<T>(path: string) {
    return fetch(path).then((res) => res.json()) as Promise<T>;
}

export type ActionResult = { message: string, entityId?: string }

export async function fetchWithBodyJSON(path: string, method: 'POST' | 'PATCH', body: any) {
    const r = await fetch(path, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    if(r.status < 200 || r.status >= 300) {

        if(r.status === 400) {
            const json = await r.json() as ActionResult;
            throw new Error(json.message);
        }

        throw new Error(`Error status code: ${r.status}`)
    }
    return r.json() as Promise<ActionResult>;
}

export function postJSON(path: string, body: any) {
    return fetchWithBodyJSON(path, 'POST', body);
}

export function patchJSON(path: string, body: any) {
    return fetchWithBodyJSON(path, 'PATCH', body);
}

export function fetchDelete(path: string) {
    return fetch(path, {
        method: 'DELETE',
    }).then((res) => res.json()) as Promise<ActionResult>;
}

export type Client = {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    phoneNumber: string;
}

export type Restaurant = {
    id: string;
    name: string;
    address: string;
    country: string;
    phoneNumber: string;
}

export type OrderItem = {
    key: string;
    description: string;
    unitPrice: number;
    quantity: number;
}

export async function fetchClients() {
    return (await fetchJSON<{ clients: Client[] }>('/api/clients')).clients;
}

export function createClient(client: Client) {
    return postJSON('/api/clients', client);
}

export function updateClient(client: Client) {
    return patchJSON(`/api/clients/${client.id}`, client);
}

export function deleteClient(id: number) {
    return fetchDelete(`/api/clients/${id}`);
}

export async function fetchRestaurants() {
    return (await fetchJSON<{ restaurants: Restaurant[] }>('/api/restaurants')).restaurants;
}

export function createRestaurant(restaurant: Restaurant) {
    return postJSON('/api/restaurants', restaurant);
}

export function updateRestaurant(restaurant: Restaurant) {
    return patchJSON(`/api/restaurants/${restaurant.id}`, restaurant);
}

export function deleteRestaurant(id: number) {
    return fetchDelete(`/api/restaurants/${id}`);
}

export function placeOrder(order: { customerId: string, restaurantId: string, items: OrderItem[] }) {
    return postJSON('/api/orders', order);
}