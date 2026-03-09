<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Course;
use App\Models\Category;
use App\Models\Level;
use App\Models\Language;
use App\Models\Chapter;
use App\Models\Lesson;
use App\Models\Outcome;
use App\Models\Requirement;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create or get an Instructor (User)
        $user = User::firstOrCreate(
            ['email' => 'instructor@example.com'],
            [
                'name' => 'Prof. CSE Instructor',
                'password' => bcrypt('password'),
            ]
        );

        // 2. Create Categories
        $categoriesNames = ['Computer Science', 'Web Development', 'Machine Learning', 'Software Engineering', 'Cyber Security', 'Cloud Computing', 'Data Science', 'Mobile App Development', 'DevOps', 'Blockchain'];
        $categoryIds = [];
        foreach ($categoriesNames as $cat) {
            $categoryIds[] = Category::firstOrCreate(['name' => $cat], ['status' => 1])->id;
        }

        // 3. Create Levels
        $levelsNames = ['Beginner', 'Intermediate', 'Advanced'];
        $levelIds = [];
        foreach ($levelsNames as $lvl) {
            $levelIds[] = Level::firstOrCreate(['name' => $lvl], ['status' => 1])->id;
        }

        // 4. Create Languages
        $languagesNames = ['English', 'Bengali'];
        $languageIds = [];
        foreach ($languagesNames as $lang) {
            $languageIds[] = Language::firstOrCreate(['name' => $lang], ['status' => 1])->id;
        }

        // 5. Course Data Array (20 Real-like CSE Courses)
        $coursesData = [
            [
                'title' => 'Mastering Data Structures & Algorithms in C++',
                'description' => 'A comprehensive, step-by-step guide to mastering Data Structures and Algorithms. Deep dive into Arrays, Linked Lists, Trees, Graphs, and Dynamic Programming. Perfect for university students and coding interview preparation at top tech companies.',
                'price' => 2500, 'cross_price' => 5000, 'is_featured' => 'yes',
                'category_id' => $categoryIds[0], 'level_id' => $levelIds[1], 'language_id' => $languageIds[1],
            ],
            [
                'title' => 'Full-Stack Web Development React & Laravel',
                'description' => 'Become a full-stack developer by building real-world projects. Learn everything from HTML, CSS, React on the frontend to Laravel and MySQL on the backend.',
                'price' => 4500, 'cross_price' => 8000, 'is_featured' => 'yes',
                'category_id' => $categoryIds[1], 'level_id' => $levelIds[0], 'language_id' => $languageIds[0],
            ],
            [
                'title' => 'Machine Learning & AI for Beginners',
                'description' => 'A practical introduction to Machine Learning using Python. Learn about supervised algorithms like Linear Regression, Logistic Regression, and unsupervised algorithms.',
                'price' => 3000, 'cross_price' => 6000, 'is_featured' => 'no',
                'category_id' => $categoryIds[2], 'level_id' => $levelIds[0], 'language_id' => $languageIds[0],
            ],
            [
                'title' => 'Advanced Python Programming',
                'description' => 'Take your Python skills to the next level. Covering decorators, generators, context managers, metaclasses, and multi-threading/multiprocessing techniques.',
                'price' => 2000, 'cross_price' => 4000, 'is_featured' => 'yes',
                'category_id' => $categoryIds[3], 'level_id' => $levelIds[2], 'language_id' => $languageIds[0],
            ],
            [
                'title' => 'Introduction to Cyber Security',
                'description' => 'Learn the fundamentals of cyber security, including network security, cryptography, common vulnerabilities, and ethical hacking.',
                'price' => 3500, 'cross_price' => 7000, 'is_featured' => 'no',
                'category_id' => $categoryIds[4], 'level_id' => $levelIds[0], 'language_id' => $languageIds[1],
            ],
            [
                'title' => 'Cloud Computing with AWS',
                'description' => 'Master Amazon Web Services (AWS). Learn about EC2, S3, RDS, Lambda, and IAM. Prepare for the AWS Certified Solutions Architect exam.',
                'price' => 5000, 'cross_price' => 9000, 'is_featured' => 'yes',
                'category_id' => $categoryIds[5], 'level_id' => $levelIds[1], 'language_id' => $languageIds[0],
            ],
            [
                'title' => 'Complete Guide to Database Design',
                'description' => 'Understand relational database mapping, normalization (1NF, 2NF, 3NF), ER diagrams, and complex SQL queries using MySQL and PostgreSQL.',
                'price' => 1500, 'cross_price' => 3000, 'is_featured' => 'no',
                'category_id' => $categoryIds[0], 'level_id' => $levelIds[0], 'language_id' => $languageIds[1],
            ],
            [
                'title' => 'Backend Development with Node.js',
                'description' => 'Build fast and scalable backend APIs using Node.js, Express, and MongoDB. Includes JWT authentication and deployment.',
                'price' => 2800, 'cross_price' => 5000, 'is_featured' => 'yes',
                'category_id' => $categoryIds[1], 'level_id' => $levelIds[1], 'language_id' => $languageIds[0],
            ],
            [
                'title' => 'Fundamentals of Software Engineering',
                'description' => 'Learn SDLC models (Agile, Scrum, Waterfall), requirement engineering, software architecture, and testing methodologies.',
                'price' => 2200, 'cross_price' => 4500, 'is_featured' => 'no',
                'category_id' => $categoryIds[3], 'level_id' => $levelIds[0], 'language_id' => $languageIds[1],
            ],
            [
                'title' => 'Deep Learning and Neural Networks',
                'description' => 'Dive deep into Artificial Neural Networks, CNNs, and RNNs using TensorFlow and Keras. Build image classifiers and text generators.',
                'price' => 6000, 'cross_price' => 10000, 'is_featured' => 'yes',
                'category_id' => $categoryIds[2], 'level_id' => $levelIds[2], 'language_id' => $languageIds[0],
            ],
            [
                'title' => 'Mobile App Development with Flutter',
                'description' => 'Create beautiful, natively compiled cross-platform (Android & iOS) mobile applications from a single codebase using Flutter and Dart.',
                'price' => 3200, 'cross_price' => 6500, 'is_featured' => 'yes',
                'category_id' => $categoryIds[7], 'level_id' => $levelIds[0], 'language_id' => $languageIds[0],
            ],
            [
                'title' => 'Introduction to Operating Systems',
                'description' => 'Understand the core concepts of OS: processes, threads, CPU scheduling, deadlocks, and memory management. Examines Linux internals.',
                'price' => 1800, 'cross_price' => 3500, 'is_featured' => 'no',
                'category_id' => $categoryIds[0], 'level_id' => $levelIds[1], 'language_id' => $languageIds[1],
            ],
            [
                'title' => 'Blockchain and Cryptocurrency Technology',
                'description' => 'Learn the mechanics of Bitcoin, cryptography, hashing, distributed consensus, and how to write smart contracts using Solidity for Ethereum.',
                'price' => 4000, 'cross_price' => 8000, 'is_featured' => 'yes',
                'category_id' => $categoryIds[9], 'level_id' => $levelIds[1], 'language_id' => $languageIds[0],
            ],
            [
                'title' => 'DevOps Engineering Bootcamp',
                'description' => 'Master CI/CD pipelines, Docker, Kubernetes, Jenkins, and Ansible. Automate your infrastructure and software deployment processes.',
                'price' => 5500, 'cross_price' => 9500, 'is_featured' => 'yes',
                'category_id' => $categoryIds[8], 'level_id' => $levelIds[1], 'language_id' => $languageIds[0],
            ],
            [
                'title' => 'Mastering Java for Enterprise Applications',
                'description' => 'Learn Java from the ground up and master Spring Boot, Hibernate, microservices architectures, and REST APIs for enterprise systems.',
                'price' => 3800, 'cross_price' => 7500, 'is_featured' => 'no',
                'category_id' => $categoryIds[3], 'level_id' => $levelIds[2], 'language_id' => $languageIds[0],
            ],
            [
                'title' => 'Embedded Systems & Internet of Things (IoT)',
                'description' => 'Program microcontrollers, work with sensors/actuators, and connect devices to the internet using Arduino and Raspberry Pi.',
                'price' => 2500, 'cross_price' => 5000, 'is_featured' => 'no',
                'category_id' => $categoryIds[0], 'level_id' => $levelIds[1], 'language_id' => $languageIds[0],
            ],
            [
                'title' => 'Computer Graphics & Game Development',
                'description' => 'Learn the mathematics behind 3D graphics, OpenGL basics, and how to build your own 2D/3D games using the Unity engine and C#.',
                'price' => 4200, 'cross_price' => 8500, 'is_featured' => 'yes',
                'category_id' => $categoryIds[3], 'level_id' => $levelIds[0], 'language_id' => $languageIds[1],
            ],
            [
                'title' => 'Natural Language Processing Fundamentals',
                'description' => 'Build applications that can process, understand, and generate human language. Covers tokenization, sentiment analysis, and transformer models.',
                'price' => 4500, 'cross_price' => 8000, 'is_featured' => 'no',
                'category_id' => $categoryIds[2], 'level_id' => $levelIds[2], 'language_id' => $languageIds[0],
            ],
            [
                'title' => 'Big Data Analytics using Hadoop & Spark',
                'description' => 'Process huge datasets using distributed computing. Learn HDFS, MapReduce, Apache Spark, and big data querying with Hive.',
                'price' => 4800, 'cross_price' => 9000, 'is_featured' => 'yes',
                'category_id' => $categoryIds[6], 'level_id' => $levelIds[2], 'language_id' => $languageIds[0],
            ],
            [
                'title' => 'Artificial Intelligence in Robotics',
                'description' => 'Combine AI algorithms with robotics. Learn about path planning, kinematics, computer vision, and building autonomous systems with ROS.',
                'price' => 5200, 'cross_price' => 10500, 'is_featured' => 'yes',
                'category_id' => $categoryIds[2], 'level_id' => $levelIds[2], 'language_id' => $languageIds[0],
            ]
        ];

        // 6. Loop and Insert Data
        foreach ($coursesData as $c_data) {
            $course = Course::create([
                'title' => $c_data['title'],
                'user_id' => $user->id,
                'category_id' => $c_data['category_id'],
                'level_id' => $c_data['level_id'],
                'language_id' => $c_data['language_id'],
                'description' => $c_data['description'],
                'price' => $c_data['price'],
                'cross_price' => $c_data['cross_price'],
                'status' => 1,
                'is_featured' => $c_data['is_featured'],
                'image' => 'demo_img.jpg', // All courses use this image
            ]);

            // Add standard Outcomes
            $outcomes = ['Master the core concepts', 'Build real-world projects', 'Enhance career opportunities'];
            foreach ($outcomes as $index => $outText) {
                Outcome::create([
                    'course_id' => $course->id,
                    'text' => $outText,
                    'sort_order' => $index + 1
                ]);
            }

            // Add standard Requirements
            $requirements = ['Basic computer skills', 'A strong desire to learn', 'Stable internet connection'];
            foreach ($requirements as $index => $reqText) {
                Requirement::create([
                    'course_id' => $course->id,
                    'text' => $reqText,
                    'sort_order' => $index + 1
                ]);
            }

            // Add Chapters & Lessons
            $chapter1 = Chapter::create([
                'title' => 'Introduction to the Course',
                'course_id' => $course->id,
                'sort_order' => 1,
                'status' => 1
            ]);

            Lesson::create([
                'title' => 'Course Overview',
                'chapter_id' => $chapter1->id,
                'is_free_preview' => 'yes',
                'duration' => '05:00',
                'description' => 'Welcome to the course.',
                'sort_order' => 1,
                'status' => 1
            ]);
            
            Lesson::create([
                'title' => 'Setting up the Environment',
                'chapter_id' => $chapter1->id,
                'is_free_preview' => 'no',
                'duration' => '15:30',
                'description' => 'Install necessary tools.',
                'sort_order' => 2,
                'status' => 1
            ]);

            $chapter2 = Chapter::create([
                'title' => 'Core Concepts & Fundamentals',
                'course_id' => $course->id,
                'sort_order' => 2,
                'status' => 1
            ]);

            Lesson::create([
                'title' => 'Deep Dive into Topics',
                'chapter_id' => $chapter2->id,
                'is_free_preview' => 'no',
                'duration' => '25:00',
                'description' => 'Detailed explanation of main concepts.',
                'sort_order' => 1,
                'status' => 1
            ]);
        }
    }
}
