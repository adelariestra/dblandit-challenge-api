# DBlandIt Challenge - API
## Available Scripts
### `npm run dev`
Runs the app in the **development mode**.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`
Runs ***all the tests*** in `src/tests`.
Tests done using **Mocha, Chai and Supertest**

### `npm run build`
**Builds the app** for production to the `build` folder using **babel**.

### `npm run start`
Runs the **built production release** created with `npm run build`.

## Routes
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
__description__

URL: ``
Method: ``

Body Example:
```json

```

Responses:
``: when ...
eg body response:
```json

```
#### Get a specific course
__description__

URL: ``
Method: ``

Body Example:
```json

```

Responses:
``: when ...
eg body response:
```json

```
#### Delete a specific course
__description__

URL: ``
Method: ``

Body Example:
```json

```

Responses:
``: when ...
eg body response:
```json

```
#### Add a student to a course
__description__

URL: ``
Method: ``

Body Example:
```json

```

Responses:
``: when ...
eg body response:
```json

```
#### Remove a Student from a course
__description__

URL: ``
Method: ``

Body Example:
```json

```

Responses:
``: when ...
eg body response:
```json

```
#### Get Students
__description__

URL: ``
Method: ``

Body Example:
```json

```

Responses:
``: when ...
eg body response:
```json

```
#### Get the best student
__description__

URL: ``
Method: ``

Body Example:
```json

```

Responses:
``: when ...
eg body response:
```json

```
#### ACTION_NAME
__description__

URL: ``
Method: ``

Body Example:
```json

```

Responses:
``: when ...
eg body response:
```json

```
#### ACTION_NAME
__description__

URL: ``
Method: ``

Body Example:
```json

```

Responses:
``: when ...
eg body response:
```json

```
