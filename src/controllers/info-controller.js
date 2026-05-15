const info = (req, res) => {
    return res.json({
        success: true,
        message: "api is live",
        error: {},
        data: {}

    });
};

module.exports = {
    info
};  