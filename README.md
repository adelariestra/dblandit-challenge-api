# DBlandIt Challenge - API
To understand the **branch structure** check [here!](#branch-structure)

For the **available scripts** go [here!](#available-scripts)

Check the **routes documentation** [here!](#routes)

## Branch Structure
Main branches: 
- **`dev`**: for **merging new features and bug fixes**.
- **`main` (prev `master`)**: used only for **releases**

Auxiliary branches:
- **`feature`**: **new modules or use cases**.
eg: `feature/support-dark-theme`
- **`bugfix`**: to **fix** changes **rejected on a feature**.
eg: `bugfix/more-gray-shades`
- **`hotfix`**: **patches** or config changes. **can skip testing phase**.
eg: `hotfix/increase-scaling-threshold`
- **`merge`**: temporary for **resolving conflicts**.
eg: `merge/combined-device-support`
- **`experimental`** to test new features or **ideas**.
eg: `experimental/dark-theme-support`

> Once done, all **auxiliary branches will have `done` added as a prefix**.
eg: `done/feature/support-dark-theme`

## Routes
+ [Student](#student)
    - [Create a new student](#create-a-new-student)
    - [Get all Students](#get-all-students)
    - [Delete a specific student](#delete-a-specific-student)
+ [Courses](#courses)
    - [Create a new course](#create-a-new-course)
    - [Get all Courses](#get-all-courses)
    - [Get a specific course](#get-a-specific-course)
    - [Delete a specific course](#delete-a-specific-course)
    - [Add a student to a course](#add-a-student-to-a-course)
    - [Remove a Student from a course](#remove-a-student-from-a-course)
    - [Get Students](#get-students)
    - [Get the best student](#get-the-best-student)
    
### Student
#### Create a new student
Allows the creation of a new student.

URL: `/students`
Method: `POST`

Body Example:
```json
{
    "fname":"Susana",
    "lname":"Casas",
    "dni":33338455,
    "address":"Real Madrid 444"
}
```

Responses:
`201 CREATED`: when the student was successfully created
eg body response:
```json
{
    "_id": "607ad8e174601a3ac83f1087",
    "fname": "Susana",
    "lname": "Casas",
    "dni": 33338455,
    "address": "Real Madrid 444",
    "createdAt": "2021-04-17T12:47:29.611Z",
    "updatedAt": "2021-04-17T12:47:29.611Z"
}
```

`400 BAD REQUEST`: when any of the required fields are missing.
eg body response:
```json
{
    "message": "Invalid data or missing."
}
```


#### Get all Students
Show all the students of all courses.

URL: `/students`
Method: `GET`

Responses:
`200 OK`: when no students are available
eg body response:
```json
[]
```

`200 OK`: when there are students available
eg body response:
```json
[    
    {
        "_id": "6077104b2e418a1d34ea6ace",
        "fname": "Marcelo",
        "lname": "Torres",
        "dni": 46525455,
        "address": "Calle falsa 123",
        "createdAt": "2021-04-14T15:54:51.263Z",
        "updatedAt": "2021-04-14T15:54:51.263Z"
    },
    {
        "_id": "607713a02e418a1d34ea6acf",
        "fname": "Fernando",
        "lname": "Gimenez",
        "dni": 46588455,
        "address": "Calle real 123",
        "createdAt": "2021-04-14T16:09:04.989Z",
        "updatedAt": "2021-04-14T16:09:04.989Z"
    },
]

```

#### Delete a specific student
Delete an existing student.

URL: `/students/:id`
Method: `DELETE`

Responses:
`204 NO CONTENT`: when the student was found and deleted
eg body response:
```json
{}
```

`404 NOT FOUND`: when the student was not found
eg body response:
```json
{
    "message": "Student not found."
}
```

### Courses
#### Create a new course
Allows the creation of a new course.

URL: `/courses`
Method: `POST`

Body Example:
```json
{
    "theme":"Matematica",
    "year":2020,
    "duration":100
}
```

Responses:
`201 CREATED`: when the course was successfully created
eg body response:
```json
{
    "_id": "607aded55e8cd321a466d669",
    "theme": "Matematica",
    "year": 2020,
    "duration": 100,
    "students": [],
    "createdAt": "2021-04-17T13:12:53.348Z",
    "updatedAt": "2021-04-17T13:12:53.348Z"
}
```

`400 BAD REQUEST`: when any of the required fields are missing.
eg body response:
```json
{
    "message": "Invalid data or missing."
}
```

#### Get all Courses
Show all the courses.

URL: `/courses`
Method: `GET`

Responses:
`200 OK`: when no courses are available
eg body response:
```json
[]
```

`200 OK`: when there are courses available
eg body response:
```json
[    
    {
        "_id": "6070a60c40e6ae27ec606d79",
        "theme": "ADR",
        "year": 2020
    },
    {
        "_id": "6070aff2f841ef4df877802b",
        "theme": "ADR",
        "year": 2021
    },
]

```

#### Get a specific course
Show the data of an already existing course with its students.

URL: `/courses/:id`
Method: `GET`

Responses:
`200 OK`: when course has students
eg body response:
```json
{
    "_id": "6070a60c40e6ae27ec606d79",
    "theme": "ADR",
    "year": 2020,
    "duration": 100,
    "createdAt": "2021-04-09T19:07:56.969Z",
    "updatedAt": "2021-04-16T02:23:59.446Z",
    "students": [
        {
            "student": {
                "_id": "6077104b2e418a1d34ea6ace",
                "fname": "Marcelo",
                "lname": "Torres",
                "dni": 46525455,
                "address": "Calle falsa 123"
            },
            "score": 6
        },
        {
            "student": {
                "_id": "6071dd410a7ca2254412a005",
                "fname": "Arturo Hector",
                "lname": "De la Riestra",
                "dni": 41780699,
                "address": "Psherman Calle Wallaby 42 sidney"
            },
            "score": 10
        }
    ]
}
```

`200 OK`: when course has no students
eg body response:
```json
{
    "_id": "6075ffd60bbe4d3f1855c252",
    "theme": "Science",
    "year": 2021,
    "duration": 100,
    "students": [],
    "createdAt": "2021-04-13T20:32:22.752Z",
    "updatedAt": "2021-04-13T20:32:22.752Z"
}
```

`422 UNPROCESSABLE ENTITY`: when the id isn't in the correct format.
eg body response:
```json
{
    "message": "Invalid ID."
}
```

`404 NOT FOUND`: when ...
eg body response:
```json
{
    "message": "Course not found."
}
```

#### Delete a specific course
Delete an existing course.

URL: `/courses/:id`
Method: `DELETE`

Responses:
`204 NO CONTENT`: when the course was found and deleted
eg body response:
```json
{}
```

`404 NOT FOUND`: when the course was not found
eg body response:
```json
{
    "message": "Course not found."
}
```

`422 UNPROCESSABLE ENTITY`: when the id isn't in the correct format.
eg body response:
```json
{
    "message": "Invalid ID."
}
```

#### Add a student to a course
Add an existing student to an existing course.

URL: `/courses/:courseid/students`
Method: `POST`

Body Example:
```json
{
    "student":"607a0f75fbfc453af42ac091",
    "score":6
}
```

Responses:
`200 OK`: when addition was successfully done
eg body response:
```json
{
    "_id": "6070a60c40e6ae27ec606d79",
    "theme": "ADR",
    "year": 2020,
    "duration": 100,
    "createdAt": "2021-04-09T19:07:56.969Z",
    "updatedAt": "2021-04-17T13:49:29.450Z",
    "students": [
        {
            "student": "607a0f75fbfc453af42ac091",
            "score": 6
        }
    ]
}
```

`409 CONFLICT`: when student was already in course
eg body response:
```json
{
    "message": "Student already in course."
}
```

`422 UNPROCESSABLE ENTITY`: when the course's or student's id is invalid.
eg body response:
```json
{
    "message": "Invalid ID."
}
```

#### Remove a Student from a course
Remove an existing student from an existing course.

URL: `/courses/:courseid/students/:studentId`
Method: `DELETE`

Responses:
`204 NO CONTENT`: when the student was found and removed
eg body response:
```json
{}
```

`404 NOT FOUND`: when the course was not found
eg body response:
```json
{
    "message": "Course not found."
}
```

`422 UNPROCESSABLE ENTITY`: when the course's or student's id is invalid.
eg body response:
```json
{
    "message": "Invalid ID."
}
```

#### Get Students
Show only the students from a specific course

URL: `/courses/:id/students`
Method: `GET`

Responses:
`200 OK`: when the students are correctly retreived
eg body response:
```json
[
    {
        "_id": "6077104b2e418a1d34ea6ace",
        "fname": "Marcelo",
        "lname": "Torres",
        "dni": 46525455,
        "address": "Calle falsa 123"
    },
    {
        "_id": "6071dd410a7ca2254412a005",
        "fname": "Arturo Hector",
        "lname": "De la Riestra",
        "dni": 41780699,
        "address": "Psherman Calle Wallaby 42 sidney"
    }
]
```

`200 OK`: when there are no students in the course 
eg body response:
```json
[]
```

`404 NOT FOUND`: when the course was not found
eg body response:
```json
{
    "message": "Course not found."
}
```

`422 UNPROCESSABLE ENTITY`: when the course's id is invalid.
eg body response:
```json
{
    "message": "Invalid ID."
}
```

#### Get the best student
Show the student with the highest score from an existing course.

URL: `/courses/:id/students/best`
Method: `GET`

Responses:
`200 OK`: when the best student was successfully retreived.
eg body response:
```json
{
    "_id": "6071dd410a7ca2254412a005",
    "fname": "Arturo",
    "lname": "De la Riestra",
    "dni": 41780699,
    "address": "Psherman Calle Wallaby 42 sidney"
}
```

`200 OK`: when there are no students in the course 
eg body response:
```json
{}
```

`404 NOT FOUND`: when the course was not found
eg body response:
```json
{
    "message": "Course not found."
}
```

`422 UNPROCESSABLE ENTITY`: when the course's id is invalid.
eg body response:
```json
{
    "message": "Invalid ID."
}
```

## Available Scripts
#### `npm run dev`
Runs the app in the **development mode**.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm run test`
Runs ***all the tests*** in `src/tests`.
Tests done using **Mocha, Chai and Supertest**

#### `npm run build`
**Builds the app** for production to the `build` folder using **babel**.

#### `npm run start`
Runs the **built production release** created with `npm run build`.
