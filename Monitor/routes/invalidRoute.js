const express = require('express');
const router = express.Router();

const invalidRoute = (req, res) => {
    res.status(404).json({
        status: 404,
        errorCode: "RESOURCE_NOT_FOUND"
        }
    )
}

router.post("*",invalidRoute)
router.get("*",invalidRoute)
router.patch("*",invalidRoute)
router.delete("*",invalidRoute)



module.exports = router