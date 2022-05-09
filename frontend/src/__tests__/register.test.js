// mock register
import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Register from "../Components/Register"
import { HashRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'

const server = setupServer(
    rest.post('/user/register', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                name: "Laxman",
                email: "hey@hello.com",
                token: "123456789",
                id: "5f58b8f8c9f3f04b8f8f8f8",
            })
        )
    }
    )
)
// Enter details on Register page
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
test('enters email, name and password', async () => {
    await act(async () => {
        render(<Router><Register /></Router>)
    }
    )
    fireEvent.change(screen.getByPlaceholderText('email'), {
        target: {
            value: "hey@hello.com",
        },
    }
    )
    fireEvent.change(screen.getByPlaceholderText('name'), {
        target: {
            value: "Laxman",
        },
    }
    )
    fireEvent.change(screen.getByPlaceholderText('password'), {
        target: {
            value: "123456789",
        },
    }
    )
    fireEvent.click(screen.getByRole('button'))
    // check if user is redirected
    await waitFor(() => {
        expect(window.location.hash).toBe('#/login')
    }
    )

}
)
test('handles server error', async () => {
    server.use(
        rest.post('/user/register', (req, res, ctx) => {
            return res(ctx.status(500))
        }
        ),
    )
    await act(async () => {
        render(<Router><Register /></Router>)
    }
    )
    fireEvent.change(screen.getByPlaceholderText('email'), {
        target: {
            value: "hey@hello.com",
        },
    }
    )
    fireEvent.change(screen.getByPlaceholderText('name'), {
        target: {
            value: "Laxman",
        },
    }
    )
    fireEvent.change(screen.getByPlaceholderText('password'), {
        target: {
            value: "123456789",
        },
    }
    )
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => {
        expect(screen.getByText('Registration Error')).toBeInTheDocument()
    }
    )
}
)



