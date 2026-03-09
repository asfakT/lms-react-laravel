import React, { useEffect } from 'react'
import Course from '../common/Course'
import Layout from '../common/Layout'
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { apiUrl, getToken } from '../common/Config'
import Loading from '../common/Loading'
import NotFound from '../common/NotFound'

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('desc');
  const [levels, setLevels] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryChecked, setCategoryChecked] = useState(() => {
    const category = searchParams.get('category');
    return category ? category.split(',') : [];
  });

  const [lavelChecked, setLavelChecked] = useState(() => {
    const level = searchParams.get('level');
    return level ? level.split(',') : [];
  });

  const [languageChecked, setLanguageChecked] = useState(() => {
    const language = searchParams.get('language');
    return language ? language.split(',') : [];
  });

  const handeLanguage = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setLanguageChecked(prev => [...prev, value])
    } else {
      setLanguageChecked(languageChecked.filter(id => id != value))
    }
  }

  const handeLevel = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setLavelChecked(prev => [...prev, value])
    } else {
      setLavelChecked(lavelChecked.filter(id => id != value))
    }
  }

  const handleCategory = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setCategoryChecked(prev => [...prev, value])
    } else {
      setCategoryChecked(categoryChecked.filter(id => id != value))
    }
  }

  const token = getToken();

  const fetchCourses = async () => {
    setLoading(true);
    let search = [];
    let params = "";

    if (categoryChecked.length > 0) {
      search.push(['category', categoryChecked]);
    }

    if (lavelChecked.length > 0) {
      search.push(['level', lavelChecked]);
    }

    if (languageChecked.length > 0) {
      search.push(['language', languageChecked]);
    }

    if (keyword.length > 0) {
      search.push(['keyword', keyword])
    }

    search.push(['sort', sort])

    if (search.length > 0) {
      params = new URLSearchParams(search);
      setSearchParams(params)
    } else {
      setSearchParams([])
    }

    await fetch(`${apiUrl}/fetch-courses?${params}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then(result => {
        setLoading(false)
        if (result.status == 200) {
          console.log("courses", result);
          setCourses(result.data)
        }
        else {
          console.log("Something Went wrong");
        }
      })
  }

  const fetchCategories = async () => {

    await fetch(`${apiUrl}/fetch-categories`, {
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
          console.log("category", result);
          setCategories(result.data);
        }
        else {
          console.log("Something Went wrong");
        }
      })
  }

  const fetchLavels = async () => {
    await fetch(`${apiUrl}/fetch-lavels`, {
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
          console.log("levels", result);
          setLevels(result.data);
        }
        else {
          console.log("Something Went wrong");
        }
      })
  }

  const fetchLanguages = async () => {
    await fetch(`${apiUrl}/fetch-languages`, {
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
          console.log("Languages", result);
          setLanguages(result.data);
        }
        else {
          console.log("Something Went wrong");
        }
      })
  }

  const clearFilters = () => {
    setLavelChecked([])
    setCategoryChecked([])
    setLanguageChecked([])
    setKeyword('')

    document.querySelectorAll('.form-check-input').forEach(element => element.checked = false)
  }

  useEffect(() => {
    fetchCategories();
    fetchLavels();
    fetchLanguages();
    fetchCourses();
  }, [categoryChecked, lavelChecked, languageChecked, keyword, sort])

  return (
    <>
      <Layout>
        <div className='container pb-5 pt-3'>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Courses</li>
            </ol>
          </nav>
          <div className='row'>
            <div className='col-lg-3'>
              <div className='sidebar mb-5 card border-0'>
                <div className='card-body shadow'>

                  <div className="mb-3 input-group">
                    <input
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      type="text"
                      className='form-control'
                      placeholder='Search by keyword' />
                    <button className='btn btn-primary btn-sm'>
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M443.5 420.2L336.7 312.4c20.9-26.2 33.5-59.4 33.5-95.5 0-84.5-68.5-153-153.1-153S64 132.5 64 217s68.5 153 153.1 153c36.6 0 70.1-12.8 96.5-34.2l106.1 107.1c3.2 3.4 7.6 5.1 11.9 5.1 4.1 0 8.2-1.5 11.3-4.5 6.6-6.3 6.8-16.7.6-23.3zm-226.4-83.1c-32.1 0-62.3-12.5-85-35.2-22.7-22.7-35.2-52.9-35.2-84.9 0-32.1 12.5-62.3 35.2-84.9 22.7-22.7 52.9-35.2 85-35.2s62.3 12.5 85 35.2c22.7 22.7 35.2 52.9 35.2 84.9 0 32.1-12.5 62.3-35.2 84.9-22.7 22.7-52.9 35.2-85 35.2z"></path></svg>
                      Seract
                    </button>
                  </div>

                  <div className='pt-3'>
                    <h3 className='h5 mb-2'>Category</h3>
                    <ul>
                      {
                        categories && categories.map(category => {
                          return (
                            <li key={category.id}>
                              <div className="form-check">
                                <input
                                  defaultChecked={searchParams.get('category') ? searchParams.get('category').includes(category.id) : false}
                                  onClick={(e) => handleCategory(e)}
                                  className="form-check-input"
                                  type="checkbox"
                                  value={category.id}
                                  id={`category-${category.id}`}
                                />
                                <label className="form-check-label" htmlFor={`category-${category.id}`}>
                                  {category?.name}
                                </label>
                              </div>
                            </li>
                          )
                        })
                      }

                    </ul>
                  </div>
                  <div className='mb-3'>
                    <h3 className='h5  mb-2'>Level</h3>
                    <ul>
                      {
                        levels && levels.map(level => {
                          return (
                            <li key={level.id}>
                              <div className="form-check">
                                <input
                                  defaultChecked={searchParams.get('level') ? searchParams.get('level').includes(level.id) : false}
                                  onClick={(e) => handeLevel(e)}
                                  className="form-check-input"
                                  type="checkbox"
                                  value={level.id}
                                  id={`levels-${level.id}`}
                                />
                                <label className="form-check-label" htmlFor={`level-${level.id}`}>
                                  {level?.name}
                                </label>
                              </div>
                            </li>
                          )
                        })
                      }

                    </ul>

                  </div>
                  <div className='mb-3'>
                    <h3 className='h5 mb-2'>Language</h3>
                    <ul>
                      {
                        languages && languages.map(language => {
                          return (
                            <li key={language.id}>
                              <div className="form-check">
                                <input
                                  defaultChecked={searchParams.get('language') ? searchParams.get('language').includes(language.id) : false}
                                  onClick={(e) => handeLanguage(e)}
                                  className="form-check-input"
                                  type="checkbox"
                                  value={language.id}
                                  id={`levels-${language.id}`}
                                />
                                <label className="form-check-label" htmlFor={`language-${language.id}`}>
                                  {language.name}
                                </label>
                              </div>
                            </li>
                          )
                        })
                      }

                    </ul>
                  </div>
                  <Link onClick={() => clearFilters()} className='clear-filter'>Clear All Filters</Link>
                </div>
              </div>
            </div>
            <div className='col-lg-9'>
              <section className='section-3'>
                <div className='d-flex justify-content-between mb-3 align-items-center'>
                  <div className='h5 mb-0'>
                    {/* 10 courses found */}
                  </div>
                  <div>
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className='form-select'>
                      <option value="desc">Newset First</option>
                      <option value="asc">Oldest First</option>
                    </select>
                  </div>
                </div>
                <div className="row gy-4">
                  {
                    loading == false && courses.length == 0 && <NotFound/>
                  }
                  {
                    loading == true && <Loading/>
                  }
                  {
                    loading == false && courses && courses.map(course => {
                      return (
                        <Course
                          key={course.id}
                          course={course}
                          customClasses="col-lg-4 col-md-6"
                        />
                      )
                    })
                  }

                </div>
              </section>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Courses