import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'
import { toBeDisabled } from '@testing-library/jest-dom/matchers'
 
/**
 * describe() groups a bunch of tests for the Home componenet.
 * For querying role, use getByRole if possible, refer to:
 * https://testing-library.com/docs/queries/about/#priority
 */
describe('Home', () => {
    // test() and it() are the same
    it('renders index page', () => {
        // arrange
        render(<Home />)

        const heading = screen.getByRole('heading', {
            name: /train on the cloud with confidence/i,
        })



        // act
        // await userEvent.click(screen.getByText('Load Greeting'))
        // await screen.findByRole('heading')

        // assert
        // expect(screen.getByRole('heading')).toHaveTextContent('hello there')
        // expect(screen.getByRole('button')).toBeDisabled()
        expect(heading).toBeInTheDocument()
    })

    it('renders links', () => {
        render(<Home />)

        const getStartedLink = screen.getByRole('link', {
            name: /get started/i,
        })

        const contactUsLink = screen.getByRole('link', {
            name: /contact us/i,
        })

        const loginButton = screen.getByRole('link', {
            name: /log in/i,
        })

        expect(getStartedLink).toBeInTheDocument()
        expect(contactUsLink).toBeInTheDocument()
        expect(loginButton).toBeInTheDocument()
    })
})