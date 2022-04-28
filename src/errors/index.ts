type Errors400 = 35 | 276 | 1

type Errors500 = 1 | 2

type StatusCode = 400 | 500

const errorsMessage400: Record<Errors400, string>
= {
    1: 'error1',
    35: 'error1',
    276: 'error3',
}

const errorsMessage500: Record<Errors500, string> = {
    1: 'error1',
    2: 'error3',
}

const errorsMessage = {
  400: errorsMessage400,
  500: errorsMessage500,
}


type Errors<T> = T extends 400 ? Errors400 : Errors500

function getError<T extends StatusCode>(statusCode: T, genericCode: Errors<T>) {
    return errorsMessage[statusCode as 400][genericCode as Errors400]
}

getError(400, 35)


export { getError }