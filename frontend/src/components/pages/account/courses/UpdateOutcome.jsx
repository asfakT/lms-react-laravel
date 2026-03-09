import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { apiUrl, getToken } from '../../../common/Config'
import toast from 'react-hot-toast'

export const UpdateOutcome = ({ outcomeDeta, showOutcome, handleClose, outcomes, setOutcomes }) => {
    const [loading, setLoading] = useState(false);
    const { handleSubmit, register, formState: { errors }, reset } = useForm();
    const token = getToken();

    const onSubmit = async (data) => {
        setLoading(true);

        await fetch(`${apiUrl}/outcomes/${outcomeDeta.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                setLoading(false);
                if (result.status == 200) {
                    const updatedOutcomes = outcomes.map(outcome => outcome.id == result.data.id
                        ? {...outcome, text: result.data.text} : outcome
                    )
                    setOutcomes(updatedOutcomes);
                    toast.success(result.message);
                }
                else {
                    console.log("Something Went wrong");
                }
            })
    }

    useEffect(() => {
        if (outcomeDeta) {
            reset({
                outcome: outcomeDeta.text
            })
        }
    }, [outcomeDeta,reset])

    return (
        <>
            <Modal size='lg' show={showOutcome} onHide={handleClose} animation={false}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Outcome</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='mb-3'>
                            <label htmlFor="" className='title'>Outcome</label>
                            <input
                                {
                                ...register('outcome', {
                                    required: "The outcome field is required."
                                })
                                }
                                type="text"
                                className={`form-control ${errors.title && 'is-invalid'}`}
                                placeholder='outcome'
                            />
                            {
                                errors.outcome && <p className='invalid-feedback'>{errors.outcome.message}</p>
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                        <button className='btn btn-primary' disabled={loading}>
                            {
                                loading == false ? 'Save' : 'Please wait...'
                            }
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}
