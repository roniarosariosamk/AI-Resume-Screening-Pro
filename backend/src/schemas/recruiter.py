from pydantic import BaseModel


class RecruiterRegister(BaseModel):

    name: str

    email: str

    password: str

class RecruiterLogin(BaseModel):

    email: str

    password: str   
