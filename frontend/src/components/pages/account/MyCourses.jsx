import React, { useEffect, useState } from 'react'
import Layout from '../../common/Layout'
import UserSidebar from '../../common/UserSidebar'
import EditCourse from '../../common/EditCourse'
import { Link } from 'react-router-dom'
import { apiUrl, getToken } from '../../common/Config'


const MyCourses = () => {

  const token = getToken();
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {

    await fetch(`${apiUrl}/my-courses`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then(result => {
        if (result.status == 200) {
          setCourses(result.courses);
        }
        else {
          console.log("Something Went wrong");
        }
      })
  }

  const deleteCourse = async (id) => {

    if (confirm("Are you sure you want to delete?")) {
      await fetch(`${apiUrl}/courses/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then(res => res.json())
        .then(result => {
          if (result.status == 200) {
            console.log("mycourse", result);
            const newCourse = courses.filter(course => course.id != id)
            setCourses(newCourse);
          }
          else {
            console.log("Something Went wrong");
          }
        })
    }

  }
 
  useEffect(() => {
    fetchCourses();
  }, [])

  return (
    <>
      <Layout>

        <section className='section-4'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 mt-5 mb-3'>
                <div className='d-flex justify-content-between'>
                  <h2 className='h4 mb-0 pb-0'>My Courses</h2>
                  <Link to="/account/courses/create" className='btn btn-primary'>Create</Link>
                </div>
              </div>
              <div className='col-lg-3 account-sidebar'>
                <UserSidebar />
              </div>
              <div className='col-lg-9'>
                <div className='row gy-4'>
                  {
                    courses && courses.map(course => {
                      return (
                        <EditCourse course={course} deleteCourse={deleteCourse} />
                      )
                    })
                  }

                </div>
              </div>
            </div>
          </div>
        </section>

      </Layout>
    </>
  )
}

export default MyCourses