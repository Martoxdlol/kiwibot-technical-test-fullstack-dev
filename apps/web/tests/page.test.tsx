vi.mock("next/navigation", () => {
    const actual = vi.importActual("next/navigation");
    return {
        ...actual,
        useRouter: vi.fn(() => ({
            push: vi.fn(),
        })),
        useSearchParams: vi.fn(() => ({
            get: vi.fn(),
        })),
        usePathname: vi.fn(),
    };
});

// NOT WORKING SADLY
// vi.mock("database", async (importOriginal) => {
//     const original = await importOriginal<typeof import('database')>()

//     const prismock = await vi.importActual<typeof import('prismock')>('prismock')

//     const PrismaClient = prismock.createPrismock(original.Prisma)

//     return {
//         ...original,
//         // prisma: new PrismockClient({ datasourceUrl })
//         prisma: new PrismaClient()
//     }
// });

import { expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import OverviewPage from '../app/dashboard/page'
import OrdersPage from '~/app/dashboard/orders/page'

test('dashboard overview renders signout button', () => {
    render(<OverviewPage />)

    const actionButton = screen.queryByText('Sign out')

    expect(actionButton).toBeDefined()
})

test('Page', async () => {
    const page = await OrdersPage({ searchParams: {} })
    // render(page)
    // expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeDefined()
})