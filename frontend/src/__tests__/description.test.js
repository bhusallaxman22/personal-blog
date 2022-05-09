// Test Home Component
import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Description from "../Components/Description"
import { HashRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'

const server = setupServer(
    rest.get('/blogs/:id', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                _id: "5f58b8f8c9f3f04b8f8f8f8",
                title: "test",
                body: "Hello World",
                uid: "5f58b8f8c9f3f04b8f8f8f8",
                author: "Laxman",
                createdAt: "2020-05-05T00:00:00.000Z",
            })
        )
    }
    )
)

beforeAll(() => {
    server.listen()
}
)
afterEach(() => {
    server.resetHandlers()
}
)

afterAll(() => {
    server.close()
}
)
test('loads and displays blog description', async () => {
    await act(async () => {
        render(<Router><Description url={'/blogs/:id'} /></Router>)
    }
    )
    await waitFor(() => {
        expect(screen.getByText('Laxman')).toBeInTheDocument()
    }
    )
}
)

test('handles server error', async () => {
    server.use(
        rest.get('/blogs/:id', (req, res, ctx) => {
            return res(ctx.status(500))
        }
        )
    )
    await act(async () => {
        render(<Router><Description url={'/blogs/:id'} /></Router>)
    }
    )
    await waitFor(() => {
        expect(screen.getByText('Server Error')).toBeInTheDocument()
    }
    )
}
)

