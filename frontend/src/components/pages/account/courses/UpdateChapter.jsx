import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { apiUrl, getToken } from '../../../common/Config'
import toast from 'react-hot-toast'

const UpdateChapter = ({ chapterDeta, showChapter, handleClose, setChapters }) => {
    const [loading, setLoading] = useState(false);
    const { handleSubmit, register, formState: { errors }, reset } = useForm();
    const token = getToken();

    const onSubmit = async (data) => {
        setLoading(true);

        await fetch(`${apiUrl}/chapters/${chapterDeta.id}`, {
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
                    setChapters({ type: "UPDATE_CHAPTER", payload: result.data })
                    toast.success(result.message);
                }
                else {
                    console.log("Something Went wrong");
                }
            })
    }

    useEffect(() => {
        if (chapterDeta) {
            reset({
                chapter: chapterDeta.title
            })
        }
    }, [chapterDeta, reset])

    return (
        <>
            <Modal size='lg' show={showChapter} onHide={handleClose} animation={false}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update chapter</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='mb-3'>
                            <label htmlFor="" className='title'>Update Chapter</label>
                            <input
                                {
                                ...register('chapter', {
                                    required: "The chapter field is required."
                                })
                                }
                                type="text"
                                className={`form-control ${errors.chapter && 'is-invalid'}`}
                                placeholder='Chapter'
                            />
                            {
                                errors.chapter && <p className='invalid-feedback'>{errors.chapter.message}</p>
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

export default UpdateChapter