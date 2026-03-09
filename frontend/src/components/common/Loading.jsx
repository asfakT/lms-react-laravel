import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
    return (
        <div className='w-full d-flex justify-content-center pb-10'>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>

    )
}

export default Loading