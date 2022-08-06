

const home = (req, res) => {
    res.send('Homepage');
}

const about = (req, res) => {
    res.send('About Page');
}

const contact = (req, res) => {
    res.send('Contact Page')
}

module.exports = { home, about, contact }