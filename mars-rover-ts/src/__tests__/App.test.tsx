import { fireEvent, render, screen } from '@testing-library/react';
import { App } from '../App';

describe('App', () => {
    it('renders a Mars Rover screen', () => {
        render(<App />);

        const gridElement = screen.getByTestId('mars-rover-grid');
        expect(gridElement).toBeInTheDocument();

        const moveButton = screen.getByText('Move');
        expect(moveButton).toBeInTheDocument();
    });

    it ('should command rover to move and display the updated location in a label', () => {
        render(<App />);

        const moveButton = screen.getByText('Move');
        fireEvent.click(moveButton);

        const locationLabel = screen.getByText('0:1:N');
        expect(locationLabel).toBeInTheDocument();
    });

    it ('should command rover to turn and display updated position in a label', () => {
        render(<App />);

        const turnRightButton = screen.getByText('R');
        fireEvent.click(turnRightButton);

        const locationLabel = screen.getByText('0:0:E');
        expect(locationLabel).toBeInTheDocument();
    });

    it ('should command rover to turn twice and display rover facing South', () => {
        render(<App />);

        const turnRightButton = screen.getByText('R');
        fireEvent.click(turnRightButton);
        fireEvent.click(turnRightButton);

        const locationLabel = screen.getByText('0:0:S');
        expect(locationLabel).toBeInTheDocument();

        const roverFacingSouth = screen.getByText('V');
        expect(roverFacingSouth).toBeInTheDocument();
    });

    it ('should command rover to turn thrice and display rover facing West', () => {
        render(<App />);

        const turnRightButton = screen.getByText('R');
        fireEvent.click(turnRightButton);
        fireEvent.click(turnRightButton);
        fireEvent.click(turnRightButton);

        const locationLabel = screen.getByText('0:0:W');
        expect(locationLabel).toBeInTheDocument();

        const roverFacingSouth = screen.getByText('<');
        expect(roverFacingSouth).toBeInTheDocument();
    });

    it ('should command rover to turn four times and display rover facing North', () => {
        render(<App />);

        const turnRightButton = screen.getByText('R');
        fireEvent.click(turnRightButton);
        fireEvent.click(turnRightButton);
        fireEvent.click(turnRightButton);
        fireEvent.click(turnRightButton);

        const locationLabel = screen.getByText('0:0:N');
        expect(locationLabel).toBeInTheDocument();

        const roverFacingNorth = screen.getByText('^');
        expect(roverFacingNorth).toBeInTheDocument();
    });
});