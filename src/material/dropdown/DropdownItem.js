import React from 'react'
import { useDispatch } from 'react-redux'
import { setSelected } from '../../state/actions/dropdown'

const DropdownItem = ({ id, website: { selected, domain } }) => {
  const dispatch = useDispatch()
  const itemClickHandler = () => {
    dispatch(setSelected(id))
  }
  return (
    <div className='dropdown__list--item'>
      <label className='pure-material-checkbox'>
        <input
          type='checkbox'
          checked={selected}
          name={domain}
          value={domain}
          onChange={itemClickHandler}
        />
        <span>{domain}</span>
      </label>
    </div>
  )
}

export default DropdownItem
