import React, {useEffect, useState} from 'react'
import {monthDictionary} from "../../misc";

const BirthdaySelects = ({setEditedUser, handleSubmit, cancelEditing, birthday}) => {
    const days = Array.from({length: 31}, (_, index) => index + 1)
    const currentYear = new Date().getFullYear()
    const years = Array.from({length: currentYear - 1899}, (_, index) => currentYear - index)

    const [selectedMonth, setSelectedMonth] = useState('')
    const [selectedDay, setSelectedDay] = useState('')
    const [selectedYear, setSelectedYear] = useState('')

    useEffect(() => {
        if (birthday) {
            const [year, month, day] = birthday.split('-')
            setSelectedYear(year)
            setSelectedMonth(parseInt(month, 10).toString())
            setSelectedDay(parseInt(day, 10).toString())
        }
    }, [birthday])

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value)
    }

    const handleDayChange = (e) => {
        setSelectedDay(e.target.value)
    }

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value)
    }

    const formatDate = () => {
        if (selectedMonth && selectedDay && selectedYear) {
            const paddedMonth = selectedMonth.padStart(2, '0')
            const paddedDay = selectedDay.padStart(2, '0')
            return `${selectedYear}-${paddedMonth}-${paddedDay}`
        }
        return null
    }

    useEffect(() => {
        const resultDate = formatDate()
        if (resultDate) {
            setEditedUser((prevUser) => ({ ...prevUser, birthday: resultDate }))
        }
    }, [selectedMonth, selectedDay, selectedYear])

    const handleBirthdayCancel = (e) => {
        setSelectedMonth('')
        setSelectedDay('')
        setSelectedYear('')
        cancelEditing()
    }

    return (
        <form style={{width: "400px"}}>
            <div className="mb-3 flex items-center gap-2">
                <select
                    id="month" name="month" autoComplete="month"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="block  mb-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                    <option value="" selected disabled>Month</option>
                    {Object.entries(monthDictionary).map(element => {
                        return (
                            <option value={element[0]}>{element[1]}</option>
                        )
                    })}
                </select>
                <select
                    id="day" name="day" autoComplete="day"
                    value={selectedDay}
                    onChange={handleDayChange}
                    className="block mb-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                    <option value="" selected disabled>Day</option>
                    {days.map((day) => (
                        <option key={day} value={day}>
                            {day}
                        </option>
                    ))}
                </select>
                <select
                    id="year" name="year" autoComplete="year"
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="block mb-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                    <option value="" selected disabled>Year</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <button
                onClick={handleSubmit}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 mr-2 border border-blue-500 hover:border-transparent rounded"
                type="submit"
            >
                Set
            </button>
            <button
                onClick={handleBirthdayCancel}
                className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-1 px-4 border border-gray-500 hover:border-transparent rounded">
                Cancel
            </button>
        </form>
    )
}

export default BirthdaySelects
