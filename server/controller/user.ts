import express from 'express'

const User = require('../model/models');

exports.test = (req: express.Request, res: express.Response) => {
    res.send("tets");
}

exports.getUsers = async (req: Request, res: Response) => {
    
    User.find().then((data: any) => console.log(data))

}

exports.createUser = async (req: express.Request, res: express.Response) => {

    const {name, email, password, hobbies} = req.body;

    try {

        console.log(name, email, password, hobbies)

        // const user = new User({
        //     name: name,
        //     email: email,
        //     password: password,
        //     hobbies: hobbies,
        // })

        // await user.save().then((data: any) => {
        //     console.log(data);
        //     res.json("Successfully Added User!");
        // })
        // .catch((err: Error) => console.log(err));

    } catch(err) {
        console.log(err)
    }

}

