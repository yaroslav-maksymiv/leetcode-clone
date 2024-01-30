const Solution = ({activeTab}) => {
    return (
        <div style={{'height': '554px'}}
             className={`${activeTab === 'solution' ? '' : 'hidden'} solution layout-block__content flex-grow h-full overflow-auto px-4 py-5`}>
            Solution
        </div>
    )
}

export default Solution