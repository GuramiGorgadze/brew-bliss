import Users from '../models/users.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" })
        }

        const existingUser = await Users.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" })
        }

        const hashedPassword = await bcrypt.hash(password + process.env.BCRYPT_PEPPER, 11)

        const newUser = new Users({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        })
        await newUser.save()

        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
        res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 })

        const newUserData = returnAllExceptPassword(newUser)

        res.status(200).json({ data: newUserData })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await Users.findOne({ email: email })

        if (!user) {
            return res.status(400).json({ message: 'Incorrect Email or Password' })
        }

        const isPasswordValid = await bcrypt.compare(password + process.env.BCRYPT_PEPPER, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Incorrect Email or Password' })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
        res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 })

        const newUserData = returnAllExceptPassword(user)
        return res.status(200).json({ data: newUserData })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error' })
    }
}

//helper functions
const returnAllExceptPassword = (user) => {
    const { password, ...safeUser } = user._doc || user;
    return safeUser
}