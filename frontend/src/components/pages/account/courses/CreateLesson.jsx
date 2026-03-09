import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { apiUrl, getToken } from '../../../common/Config'
import toast from 'react-hot-toast'

const CreateLesson = ({
    showLessonModal,
    handleCloseLessonModal,
    chapters,
    setChapters
}) => {

    const [loading, setLoading] = useState(false);
    const { handleSubmit, register, formState: { errors }, reset } = useForm();
    const token = getToken();

    const onSubmit = async (data) => {
        setLoading(true);

        await fetch(`${apiUrl}/lessons`, {
            method: 'POST',
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
                if (result.status === 200) {
                    toast.success(result.message);
                    setChapters({ type: "UPDATE_CHAPTER", payload: result.chapter })
                    reset({
                        chapter: '',
                        lesson:'',
                        status: 1
                    });
                    handleCloseLessonModal();
                }
            });
    };


    return (
        <>
            <Modal size='lg' show={showLessonModal} onHide={handleCloseLessonModal} animation={false}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Lesson</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='mb-3'>
                            <label className='title'>Chapter</label>

                            <select
                                {...register('chapter', {
                                    required: "Please select a Chapter."
                                })}
                                className={`form-select rounded-3 ${errors.chapter_id ? 'is-invalid' : ''}`}
                            >
                                <option value="">
                                    Select a chapter
                                </option>

                                {chapters && chapters.map(chapter => (
                                    <option key={chapter.id} value={chapter.id}>
                                        {chapter.title}
                                    </option>
                                ))}
                            </select>

                            {errors.chapter && (
                                <div className="invalid-feedback">
                                    {errors.chapter.message}
                                </div>
                            )}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="" className='form-label'>Lesson</label>
                            <input
                                {
                                ...register('lesson', {
                                    required: "The lesson field is required."
                                })
                                }
                                type="text"
                                className={`form-control ${errors.lesson && 'is-invalid'}`}
                                placeholder='Lesson'
                            />
                            {
                                errors.lesson && <p className='invalid-feedback'>{errors.lesson.message}</p>
                            }
                        </div>

                        <div>
                            <label className='title'>Status</label>
                            <select
                                {
                                ...register('status', {
                                    required: "The status field is required."
                                })
                                }
                                className='form-select rounded-3'>
                                <option value="1" selected>Active</option>
                                <option value="0">Block</option>
                            </select>
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

export default CreateLesson