// src/components/Header.test.jsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from './Header'
import { MemoryRouter } from 'react-router-dom' // ✅ use MemoryRouter for testing

describe('Header', () => {
  it('renders brand and login link when no user', () => {
    render(
      <MemoryRouter>
        <Header user={null} onLogout={() => {}} />
      </MemoryRouter>
    )
    expect(screen.getByText(/Vikash Education/)).toBeInTheDocument()
    expect(screen.getByText(/Login/)).toBeInTheDocument()
  })
})
