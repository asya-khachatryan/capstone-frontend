import { Input, Select } from '@material-tailwind/react'
import React, { ChangeEvent, useState } from 'react'

interface Option {
  label: string
  value: string
}

interface Props {
  options: Option[]
  onChange: (selectedValue: string) => void
}

const SearchableSelect: React.FC<Props> = ({ options, onChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
  )

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Select
        value={selectedOption || ''}
        onChange={(e) => {
          setSelectedOption(e)
          // onChange(e);
        }}
      >
        {filteredOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  )
}

export default SearchableSelect
