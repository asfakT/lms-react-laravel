import React, { useEffect, useReducer } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { apiUrl, getToken } from '../../../common/Config'
import toast from 'react-hot-toast'
import Accordion from 'react-bootstrap/Accordion';
import UpdateChapter from './UpdateChapter'
import CreateLesson from './CreateLesson'
import { Link } from 'react-router-dom'
import { FaPlus } from "react-icons/fa";
import { PiNotePencilBold } from "react-icons/pi";
import { FaTrashAlt } from "react-icons/fa";
import LessonsSort from './LessonsSort';
import SortChapter from './SortChapter';
import { TfiHandDrag } from "react-icons/tfi";
import { TbDragDrop } from "react-icons/tb";


const ManageChapter = ({ course, params }) => {

    const [loading, setLoading] = useState(false);
    const [chapterDeta, setChapterData] = useState(null);
    const token = getToken();
    const [lessonsData, setLessonsData] = useState([]);

    const { handleSubmit, register, formState: { errors }, reset } = useForm();

    //update Chapter Modal
    const [showChapter, setShowChapter] = useState(false);
    const handleClose = () => setShowChapter(false);
    const handleShow = (chapter) => {
        setShowChapter(true);
        setChapterData(chapter)
    }

    //Create lesson modal
    const [showLessonModal, setShowLessonModal] = useState(false);
    const handleShowLessonModal = () => setShowLessonModal(true);
    const handleCloseLessonModal = () => {
        setShowLessonModal(false);
    }

    //Sort Lesson Modal
    const [showLessonSortModal, setShowLessonSortModal] = useState(false);
    const handleShowLessonSortModal = () => setShowLessonSortModal(false);
    const handleCloseLessonSortModal = (lessons) => {
        setLessonsData(lessons)
        setShowLessonSortModal(false);
    }

    //Sort Lesson Modal
    const [showChapterSortModal, setShowChapterSortModal] = useState(false);
    const handleCloseChapterSortModal = () => setShowChapterSortModal(false);
    const handleShowChapterSortModal = () => {
        setShowChapterSortModal(true);
    }

    const chapterReducer = (state, action) => {
        switch (action.type) {

            case "SET_CHAPTERS":
                return action.payload;

            case "ADD_CHAPTER":
                return [...state, action.payload];

            // case "UPDATE_CHAPTER":
            //     return state.map(chapter =>
            //         chapter.id === action.payload.id
            //             ? action.payload
            //             : chapter
            //     );

            case "UPDATE_CHAPTER":
                if (!action.payload || !action.payload.id) return state;

                return state.map(chapter =>
                    chapter.id === action.payload.id
                    ? action.payload
                    : chapter
                );

            case "DELETE_CHAPTER":
                return state.filter(
                    chapter => chapter.id !== action.payload
                );

            default:
                return state;
        }
    };

    const [chapters, setChapters] = useReducer(chapterReducer, []);

    const onSubmit = async (data) => {
        setLoading(true);
        const formData = { ...data, course_id: params.id }

        await fetch(`${apiUrl}/chapters`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(result => {
                setLoading(false);
                console.log("chapters", result);
                if (result.status == 200) {
                    setChapters({
                        type: "ADD_CHAPTER",
                        payload: result.data
                    });

                    toast.success(result.message);
                    reset();
                }
                else {
                    console.log("Something Went wrong");
                }
            })
    }

    const deleteChapter = async (id) => {
        if (confirm("Are you sure you want to delete?")) {
            await fetch(`${apiUrl}/chapters/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
                .then(res => res.json())
                .then(result => {
                    setLoading(false);
                    if (result.status == 200) {
                        setChapters({ type: "DELETE_CHAPTER", payload: id })
                        toast.success(result.message);
                    }
                    else {
                        console.log("Something Went wrong");
                    }
                })
        }
    }

    const deleteLesson = async (id) => {
        if (confirm("Are you sure you want to delete?")) {
            await fetch(`${apiUrl}/lessons/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
                .then(res => res.json())
                .then(result => {
                    setLoading(false);
                    if (result.status == 200) {
                        setChapters({ type: "UPDATE_CHAPTER", payload: result.chapter })
                        toast.success(result.message);
                    }
                    else {
                        console.log("Something Went wrong");
                    }
                })
        }
    }

    useEffect(() => {
        if (course.chapters) {
            setChapters({ type: "SET_CHAPTERS", payload: course.chapters })
        }

    }, [course])

    return (
        <>
            <div className='card shadow-lg bprder-0'>
                <div className="card-body  p-4">
                    <div className='d-flex justify-content-between'>
                        <h4 className="h5 mb-3">Chapter</h4>

                        <div>
                            <Link className='me-2' onClick={() => handleShowLessonModal()}> <FaPlus size={12} />
                                <strong className='ps-1'>Add Lesson</strong></Link>

                            <Link onClick={() => handleShowChapterSortModal()}> <TfiHandDrag  size={16} />
                                <strong className='ps-1'>Reorder Chapter</strong></Link>
                        </div>

                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-3'>
                            <div className='mb-3'>
                                <input
                                    {
                                    ...register("chapter", {
                                        required: "The Chapter field is required."
                                    })
                                    }
                                    type="text"
                                    className={`form-control ${errors.chapter && 'is-invalid'}`}
                                    placeholder='chapter' />
                                {
                                    errors.chapter && <p className='invalid-feedback'>{errors.chapter.message}</p>
                                }
                            </div>
                            <button className='btn btn-primary' disabled={loading}>
                                {
                                    loading == false ? 'Save' : 'Please wait...'
                                }
                            </button>
                        </div>
                    </form>

                    <Accordion>
                        {
                            chapters.map((chapter, index) => {
                                return (
                                    <Accordion.Item eventKey={index}>
                                        <Accordion.Header>{chapter.title}</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="d-flex justify-content-between align-items-center mb-2 mt-1">
                                                        <h4 className="h5 mb-0">Lessons</h4>
                                                        <button
                                                            type="button"
                                                            className="btn btn-link p-0 text-decoration-none"
                                                        >
                                                            <Link className='h6' onClick={() => { handleCloseLessonSortModal(chapter.lessons); setShowLessonSortModal(true) }}>
                                                                <strong>Reorder Lessons</strong>
                                                            </Link>


                                                        </button>
                                                    </div>
                                                    <div className='col-md-12 mb-2'>
                                                        {
                                                            chapter.lessons && chapter.lessons.map(lesson => {
                                                                return (
                                                                    <div className='card shadow px-3 py-2 mb-2'>
                                                                        <div className='row'>
                                                                            <div className='col-md-7'>
                                                                                {lesson.title}
                                                                            </div>

                                                                            <div className='col-md-5 text-end'>
                                                                                {
                                                                                    lesson.duration > 0 && <small className='fw-bold test-muted me-2'>20 Mins</small>
                                                                                }
                                                                                {
                                                                                    lesson.is_free_preview == "yes" && <span className='badge bg-success'>Preview</span>
                                                                                }
                                                                                <Link to={`/account/courses/edit-lesson/${lesson.id}/${course.id}`} className='ms-2'> <PiNotePencilBold /></Link>
                                                                                <Link onClick={() => deleteLesson(lesson.id)} className='ms-2 text-danger'><FaTrashAlt /></Link>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                <div className='col-md-12 mt-2'>
                                                    <div className='d-flex'>
                                                        <button
                                                            onClick={() => deleteChapter(chapter.id)}
                                                            className='btn btn-danger btn-sm'>Delete Chapter</button>
                                                        <button
                                                            onClick={() => handleShow(chapter)}
                                                            className='btn btn-primary btm-sm ms-2'>Update Chapter</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                )
                            })
                        }
                    </Accordion>
                </div>
            </div>
            <UpdateChapter
                chapterDeta={chapterDeta}
                showChapter={showChapter}
                handleClose={handleClose}
                chapters={chapters}
                setChapters={setChapters}
            />

            <CreateLesson
                showLessonModal={showLessonModal}
                handleCloseLessonModal={handleCloseLessonModal}
                course={course}
                chapters={chapters}
                setChapters={setChapters}
            />

            <LessonsSort
                showLessonSortModal={showLessonSortModal}
                handleCloseLessonSortModal={() => setShowLessonSortModal(false)}
                lessonsData={lessonsData}
                setChapters={setChapters}
            />

            <SortChapter
                showChapterSortModal={showChapterSortModal}
                handleCloseChapterSortModal={handleCloseChapterSortModal}
                setChapters={setChapters}
                course={course}
                chapters={chapters}
            />

        </>
    )
}

export default ManageChapter