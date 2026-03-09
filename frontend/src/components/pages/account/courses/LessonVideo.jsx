// import React, { useState } from 'react'
// import { FilePond, registerPlugin } from 'react-filepond'
// import 'filepond/dist/filepond.min.css'
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
// import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType)
// import { apiUrl, getToken } from '../../../common/Config'
// import toast from 'react-hot-toast'
// import ReactPlayer from 'react-player'

// const LessonVideo = ({ lesson }) => {
//     const token = getToken();
//     const [files, setFiles] = useState([]);
//     const [videoUrl, setVideoUrl] = useState([]);

//     if (!lesson) return null;
//     return (
//         <>
//             <div className="card shadow-lg border-0">
//                 <div className="card-body p-4">
//                     <div className="d-flex">
//                         <h4 className="h5 mb-3">Lesson Video</h4>
//                     </div>
//                     <FilePond
//                         acceptedFileTypes={['video/mp4']}
//                         credits={false}
//                         files={files}
//                         onupdatefiles={setFiles}
//                         allowMultiple={false}
//                         maxFiles={1}
//                         server={{
//                             process: {
//                                 url: `${apiUrl}/save-lesson-video/${lesson.id}`,
//                                 method: 'POST',
//                                 headers: {
//                                     'Authorization': `Bearer ${token}`
//                                 },
//                                 onload: (response) => {
//                                     response = JSON.parse(response);
//                                     toast.success(response.message);
//                                     setVideoUrl(response.data.video_url);
//                                     setFiles([]);
//                                 },
//                                 onerror: (errors) => {
//                                     console.log(errors)
//                                 },
//                             },
//                         }}
//                         name="video"
//                         labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
//                     />
//                     {videoUrl && (
//                         <ReactPlayer
//                             width="100%"
//                             height="300px"
//                             // url={videoUrl}
//                              src='http://localhost:8000/uploads/course/videos/1770048605-8.mp4'

//                             controls
//                         />
//                     )}

//                 </div>
//             </div>
//         </>
//     )
// }

// export default LessonVideo;


import React, { useEffect, useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import { apiUrl, getToken } from '../../../common/Config'
import toast from 'react-hot-toast'
import ReactPlayer from 'react-player'

registerPlugin(FilePondPluginFileValidateType)

const LessonVideo = ({ lesson }) => {
    const token = getToken()

    const [files, setFiles] = useState([])
    const [videoUrl, setVideoUrl] = useState(null);

    useEffect(() => {
        if (lesson?.video_url) {
            console.log('Video URL:', lesson.video_url);
            setVideoUrl(lesson.video_url);
        }
    }, [lesson]);

    if (!lesson) return null

    return (
        <div className="card shadow-lg border-0">
            <div className="card-body p-4">
                <h4 className="h5 mb-3">Lesson Video</h4>

                <FilePond
                    acceptedFileTypes={['video/mp4']}
                    files={files}
                    onupdatefiles={setFiles}
                    allowMultiple={false}
                    maxFiles={1}
                    name="video"
                    server={{
                        process: {
                            url: `${apiUrl}/save-lesson-video/${lesson.id}`,
                            method: 'POST',
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            onload: (res) => {
                                const response = JSON.parse(res)
                                toast.success(response.message)
                                setVideoUrl(response.data.video_url)
                                //console.log("video url", response.data.video_url)
                                setFiles([])
                            },
                        },
                    }}
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                />

                {/* {videoUrl && (
                    <div className="mt-4">
                        <ReactPlayer
                             url={videoUrl}
                           // src='http://localhost:8000/uploads/course/videos/1770053702-7.mp4'
                            controls
                            width="100%"
                            height="100%"
                        />
                    </div>
                )} */}

                {videoUrl && (
                    <div className="mt-4">
                        <video
                            src={videoUrl}
                            controls
                            width="100%"
                            height="100%"
                            style={{ background: '#000' }}
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}


            </div>
        </div>
    )
}

export default LessonVideo
