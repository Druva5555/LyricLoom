const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt"); // for password hashing
const admin = require('../middleware/admin')

const validateObjectId = require('../middleware/validateObjectId')
const auth = require('../middleware/auth')
// create user
router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });
        const {name , password , email ,gender, isArtist} = req.body
        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res
                .status(403)
                .send({ message: "User with given email already exists!" });
    
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user nd directly mark as verified
        let newUser = await new User({
            ...req.body,
            password: hashPassword,
            verified: true ,
			isArtist: isArtist || false 
        })

        newUser.save()
    
        res.status(201).send({ message: "User created successfully." });
    
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
});


router.get("/:id/verify/:token", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const vreftoken = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!vreftoken) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ _id: user._id }, { verified: true });
		await vreftoken.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// get all users
router.get("/", admin, async (req, res) => {
	const users = await User.find().select("-password -__v");
	res.status(200).send({ data: users });
});


// get user by id
router.get("/:id", [validateObjectId, auth], async (req, res) => {
	const user = await User.findById(req.params.id).select("-password -__v");
	res.status(200).send({ data: user });
});

// update user by id
router.put("/:id", [validateObjectId, auth], async (req, res) => {
	const user = await User.findByIdAndUpdate(
		req.params.id,
		{ $set: req.body },
		{ new: true }
	).select("-password -__v");
	res.status(200).send({ data: user, message: "Profile updated successfully" });
});

// delete user by id
router.delete("/:id", [validateObjectId, admin], async (req, res) => {
	await User.findByIdAndDelete(req.params.id);
	res.status(200).send({ message: "Successfully deleted user." });
});

module.exports = router;
