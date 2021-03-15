/* ++++++++++ --------------- IMPORTS --------------- ++++++++++ */
// libraries
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getList, search } from '../../state/actions/dropdown'
import { WEBSITE_LIST_SELECT } from '../../state/constants/dropdown'
import clsx from 'clsx'
//components
import DropdownItem from './DropdownItem'
// import DropdownButton from './DropdownButton'
// styles
import './dropdown.scss'

/* ========== ~~~~~~~~~~ DROPDOWN ~~~~~~~~~~ ========== */

const DropDown = () => {
  const dispatch = useDispatch()

  const websiteList = useSelector((state) => state.websiteList)
  const { loading, websites } = websiteList

  const [active, setDropdownActive] = useState(false)
  const [filtered, setFiltered] = useState(false)
  const [selectedItem, setSelectedItem] = useState(0)

  useEffect(() => {
    dispatch(getList())
  }, [dispatch])

  useEffect(() => {
    setSelectedItem(websites?.filter((website) => website.selected).length)
  }, [websites])

  const dropdownClickHandler = (e) => {
    setDropdownActive(!active)
  }

  const searchHandler = (e) => {
    if (e.target.value.length > 0) {
      dispatch(search(e.target.value))
    } else {
      dispatch(getList())
    }
  }

  const selectAllHandler = (e) => {
    e.preventDefault()
    dispatch({
      type: WEBSITE_LIST_SELECT,
      payload: websites?.map((website) => ({ ...website, selected: true })),
    })
  }
  const selectNoneHandler = (e) => {
    e.preventDefault()
    setFiltered(false)
    dispatch({
      type: WEBSITE_LIST_SELECT,
      payload: websites?.map((website) => ({ ...website, selected: false })),
    })
  }
  const filterHandler = () => {
    console.table(websites)
    setDropdownActive(false)
    setFiltered(true)
  }
  return (
    <>
      <div
        className={`dropdown ${clsx(active && 'active')}`}
        onClick={dropdownClickHandler}
      >
        <div className='dropdown__label'>
          <i className='fas fa-link'></i>
          <div className='dropdown__label--wrap'>
            <span>Sites</span>
            <p
              className={`dropdown__noOfSites ${clsx(
                selectedItem > 0 && filtered && 'filtered'
              )}`}
            >{`${
              selectedItem > 0 && filtered ? selectedItem : 'All'
            } Sites`}</p>
          </div>
        </div>
        <i className='fas fa-caret-down'></i>
        <div className='dropdown__list' onClick={(e) => e.stopPropagation()}>
          <div className='dropdown__search'>
            <div>
              <i className='fas fa-search'></i>
              <input
                type='text'
                placeholder='Search Site'
                onChange={searchHandler}
              />
            </div>
          </div>
          <div className='dropdown__select'>
            <a
              className='dropdown__select--all'
              href='#!'
              onClick={selectAllHandler}
            >
              <i className='fas fa-plus-circle'></i>Select all
            </a>
            <a
              className='dropdown__select--none'
              href='#!'
              onClick={selectNoneHandler}
            >
              <i className='fas fa-times-circle'></i> Select none
            </a>
            <div className='dropdown__list-items'>
              {/* <div class='spinner'></div> */}
              {loading ? (
                <div className='spinner'></div>
              ) : (
                websites?.map((website, i) => (
                  <DropdownItem id={i} key={i} website={website} />
                ))
              )}
            </div>
          </div>
          <div className='dropdown__btn'>
            <button
              type='button'
              disabled={selectedItem > 0 ? false : true}
              onClick={filterHandler}
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

/* ++++++++++ --------------- EXPORTS --------------- ++++++++++ */
export default DropDown
