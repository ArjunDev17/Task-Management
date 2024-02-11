// admin.js
const jwt = require('jsonwebtoken');
const secretKey = "!@#ASD$%";

const isAdmin = (req, res, next) => {
  const token = req.header('Authorization');
  console.log('Executing isAdmin middleware');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey);

    if (decoded.isAdmin) {
      req.user = decoded;
      next();
    } else {
      res.status(403).json({ error: 'Forbidden: Admin access required.' });
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized: Token expired' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = isAdmin;

// // admin.js
// const jwt = require('jsonwebtoken');
// const secretKey = "!@#ASD$%";


// const isAdmin = (req, res, next) => {
//   // console.log('Executing isAdmin middleware');
  
//   // const token = req.header('Authorization').replace('Bearer ', '');

//   // console.log('Token:', token);

//   try {
//     const decoded = jwt.verify(token, secretKey);
//     console.log('Decoded:', decoded);

//     if (decoded.isAdmin) {
//       req.user = decoded;
//       next();
//     } else {
//       res.status(403).json({ error: 'Forbidden: Admin access required.' });
//     }
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// module.exports = isAdmin;