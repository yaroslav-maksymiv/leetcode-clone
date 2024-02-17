import Popup from "reactjs-popup";


const DateTimeFormatter = ({dateTime, position}) => {
    const date = new Date(dateTime)
    const formattedDate = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    })
    const fullDate = formattedDate + ' ' + date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    })

    return (
        <Popup
            trigger={open => (
                <div>{formattedDate}</div>
            )}
            position={position ? position : "top center"}
            on={['hover']}
            className="date-popup"
        >
            <div className="rounded-lg text-gray-300 bg-neutral-700 w-fit text-sm py-1 px-3 shadow-2xl">{fullDate}</div>
        </Popup>
    )
}

export default DateTimeFormatter