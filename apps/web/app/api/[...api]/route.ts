import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { clientsApp } from './clients';
import { restaurantsApp } from './restaurants';
import { ordersApp } from './orders';
import { appOnErrorHandler } from './util';

export const runtime = 'nodejs';

const app = new Hono().basePath('/api')

app.mount('/clients', clientsApp.fetch)
app.mount('/restaurants', restaurantsApp.fetch)
app.mount('/orders', ordersApp.fetch)

app.onError(appOnErrorHandler)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)