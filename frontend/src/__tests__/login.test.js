// mock login
// Test Login Component
import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from "../Components/Login"
import { HashRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'

const server = setupServer(
    rest.post('/user/login', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                name: "Laxman",
                email: "hello@hey.com",
                token: "123456789",
                id: "5f58b8f8c9f3f04b8f8f8f8",
            })
        )
    }
    )
)
// Enter details on login page
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
test('enters email and password', async () => {
    await act(async () => {
        render(<Router><Login /></Router>)
    }
    )
    fireEvent.change(screen.getByPlaceholderText('email'), {
        target: {
            value: "hello@hey.com",
        },
    }
    )
    fireEvent.change(screen.getByPlaceholderText('Password'), {
        target: {
            value: "123456789",
        },
    }
    )
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => {
        expect(localStorage.getItem('token')).toBeTruthy()
    }
    )
}
)

test('handles server error', async () => {
    server.use(
        rest.post('/user/login', (req, res, ctx) => {
            return res(ctx.status(500))
        }
        ),
    )
    await act(async () => {
        render(<Router><Login /></Router>)
    }
    )
    fireEvent.change(screen.getByPlaceholderText('email'), {
        target: {
            value: "hello@hey.com",
        },
    }
    )
    fireEvent.change(screen.getByPlaceholderText('Password'), {
        target: {
            value: "123456789",
        },
    }
    )
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => {
        expect(screen.getByText('Login Error')).toBeInTheDocument()
    }
    )
}
)

