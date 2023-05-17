import React from 'react';
import { render, screen } from '@testing-library/react';
import CategoriesSort from './CategoriesSort';

describe('CategoriesSort', () => {
    it('renders the CategoriesSort component', () => {
        render(<CategoriesSort />);

        expect(screen.getByPlaceholderText('Search categories')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
        expect(screen.queryByText('Reset')).toBeNull();
        expect(screen.getByText('Sort categories by:')).toBeInTheDocument();
        expect(screen.getByText('Select a sorting option')).toBeInTheDocument();
    });
});
