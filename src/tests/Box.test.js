import { render, screen } from '@testing-library/react';
import Box from '../src/components/Box';

it('Box test', () => {
    render(
        <Box color={'red'}/>
    )

    const text = screen.queryByText('zdarova')
    expect(text).toBeInTheDocument();
})