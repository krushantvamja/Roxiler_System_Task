export const validateUser = (req, res, next) => {
    const { name, email, address, password } = req.body;

    if (!name || name.length < 3 || name.length > 60) {
        return res.status(400).json({
            message: "Name must be between 3 and 60 characters",
        });
    }

    if (address && address.length > 400) {
        return res.status(400).json({
            message: "Address must not exceed 400 characters",
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
            message: "Invalid email format",
        });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/;
    if (!password || !passwordRegex.test(password)) {
        return res.status(400).json({
            message:
                "Password must be 8-16 chars, include 1 uppercase & 1 special character",
        });
    }

    next();
};

export const validateRating = (req, res, next) => {
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({
            message: "Rating must be between 1 and 5",
        });
    }

    next();
};
