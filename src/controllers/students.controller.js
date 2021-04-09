export const get = (req, res) => {
    res.json([{
        name: "manolo",
        lname: "sanchez"
    },
    {
        name: "manolo",
        lname: "manoles"
    }])
}