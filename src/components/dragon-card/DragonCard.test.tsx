import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { DragonCard } from './DragonCard'
import { type IDragon } from '../../interfaces/dragon'

const mockDragon: IDragon = {
  id: 'dragon-123',
  name: 'Banguela',
  type: 'Dragão doméstico',
  createdAt: '2024-03-10T10:00:00Z',
  histories: [],
}

describe('DragonCard Component', () => {
  const mockOnEdit = vi.fn()
  const mockOnDelete = vi.fn()
  const mockOnViewDetails = vi.fn()

  it('deve chamar onViewDetails com o ID correto ao clicar na área do card', () => {
    render(
      <DragonCard
        dragon={mockDragon}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onViewDetails={mockOnViewDetails}
      />
    )

    const clickableArea = screen.getByText('Banguela')
    fireEvent.click(clickableArea)

    expect(mockOnViewDetails).toHaveBeenCalledWith('dragon-123')
  })

  it('deve chamar onEdit com o ID correto ao clicar no botão Editar', () => {
    render(
      <DragonCard
        dragon={mockDragon}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onViewDetails={mockOnViewDetails}
      />
    )

    const editButton = screen.getByLabelText('Editar')
    fireEvent.click(editButton)

    expect(mockOnEdit).toHaveBeenCalledWith('dragon-123')
  })

  it('deve chamar onDelete com o ID correto ao clicar no botão Excluir', () => {
    render(
      <DragonCard
        dragon={mockDragon}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onViewDetails={mockOnViewDetails}
      />
    )

    const deleteButton = screen.getByLabelText('Excluir')
    fireEvent.click(deleteButton)

    expect(mockOnDelete).toHaveBeenCalledWith('dragon-123')
  })
})
