import React, { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { apiUrl, getToken } from '../../../common/Config'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { MdDragIndicator } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { UpdateOutcome } from './UpdateOutcome'
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const ManageOutcome = () => {
    const [loading, setLoading] = useState(false);
    const [outcomes, setOutcomes] = useState([]);
    const [outcomeDeta, setOutcomeDeta] = useState(null);
    const token = getToken();
    const params = useParams();

    const [showOutcome, setShowOutcome] = useState(false);
    const handleClose = () => setShowOutcome(false);
    const handleShow = (outcome) => {
        setShowOutcome(true);
        setOutcomeDeta(outcome)

    }

    const { handleSubmit, register, formState: { errors }, reset } = useForm();

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedItems = Array.from(outcomes);
        const [movedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, movedItem);

        setOutcomes(reorderedItems);
        saveOrder(reorderedItems);
    };

    const saveOrder = async (updatedOutcomes) => {
        await fetch(`${apiUrl}/sort-outcomes`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({outcomes: updatedOutcomes})
        })
            .then(res => res.json())
            .then(result => {
                if (result.status == 200) {
                    toast.success(result.message);
                }
                else {
                    console.log("Something Went wrong");
                }
            })
    }

    const onSubmit = async (data) => {
        setLoading(true);
        const formData = { ...data, course_id: params.id }

        await fetch(`${apiUrl}/outcomes`, {
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
                if (result.status == 200) {
                    const newoutcomes = [...outcomes, result.data]
                    setOutcomes(newoutcomes);
                    toast.success(result.message);
                    reset();
                }
                else {
                    console.log("Something Went wrong");
                }
            })
    }

    const fetchOutcomes = async () => {

        await fetch(`${apiUrl}/outcomes?course_id=${params.id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(result => {
                console.log("Outcomes", result);
                if (result.status == 200) {
                    setOutcomes(result.data)
                }
                else {
                    console.log("Something Went wrong");
                }
            })
    }

    const deleteOutcome = async (id) => {
        if (confirm("Are you sure you want to delete?")) {
            await fetch(`${apiUrl}/outcomes/${id}`, {
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
                        const newOutcomes = outcomes.filter(outcome => outcome.id != id)
                        setOutcomes(newOutcomes);
                        toast.success(result.message);
                    }
                    else {
                        console.log("Something Went wrong");
                    }
                })
        }
    }

    useEffect(() => {
        fetchOutcomes();
    }, []);

    return (
        <>
            <div className='card shadow-lg bprder-0'>
                <div className="card-body  p-4">
                    <div className="d-flex justify-content-between">
                        <h4 className="h5 mb-3">Outcome</h4>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-3'>
                            <div className='mb-3'>
                                <input
                                    {
                                    ...register("outcome", {
                                        required: "The outcome field is required."
                                    })
                                    }
                                    type="text"
                                    className={`form-control ${errors.outcome && 'is-invalid'}`}
                                    placeholder='Outcome' />
                                {
                                    errors.outcome && <p className='invalid-feedback'>{errors.outcome.message}</p>
                                }
                            </div>
                            <button className='btn btn-primary' disabled={loading}>
                                {
                                    loading == false ? 'Save' : 'Please wait...'
                                }
                            </button>
                        </div>
                    </form>

                    <DragDropContext onDragEnd={handleDragEnd} >
                        <Droppable droppableId="list">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                                    {
                                        outcomes.map((outcomes, index) => (
                                            <Draggable key={outcomes.id} draggableId={`${outcomes.id}`} index={index}>

                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="mt-2 border px-3 py-2 bg-white shadow-lg  rounded"
                                                    >
                                                        <div className='card-body p-2 d-flex'>
                                                            <div><MdDragIndicator /></div>
                                                            <div className='d-flex justify-content-between w-100'>
                                                                <div className='ps-2'>{outcomes.text}</div>
                                                                <div className='d-flex'>
                                                                    <button type="button" onClick={() => handleShow(outcomes)} className='btn btn-link text-primary me-1 p-0'>
                                                                        <BsPencilSquare />
                                                                    </button>
                                                                    <button type="button" onClick={() => deleteOutcome(outcomes.id)} className='btn btn-link text-danger p-0'>
                                                                        <FaTrashAlt />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

                    {/* {
                        outcomes && outcomes.map(outcome => (
                            <div className='card shadow mb-2' key={outcome.id}>
                                <div className='card-body p-2 d-flex'>
                                    <div><MdDragIndicator /></div>
                                    <div className='d-flex justify-content-between w-100'>
                                        <div className='ps-2'>{outcome.text}</div>
                                        <div className='d-flex'>
                                            <button type="button" onClick={() => handleShow(outcome)} className='btn btn-link text-primary me-1 p-0'>
                                                <BsPencilSquare />
                                            </button>
                                            <button type="button" onClick={() => deleteOutcome(outcome.id)} className='btn btn-link text-danger p-0'>
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    } */}
                </div>
            </div>

            <UpdateOutcome
                outcomeDeta={outcomeDeta}
                showOutcome={showOutcome}
                handleClose={handleClose}
                outcomes={outcomes}
                setOutcomes={setOutcomes}
            />

        </>
    )
}

export default ManageOutcome