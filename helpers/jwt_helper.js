const JWT = require('jsonwebtoken')
const path = require('path');
const fs = require('fs');

const privateKey = fs.readFileSync('./private.key', 'utf8');
const publicKey = fs.readFileSync('./public.key', 'utf8');

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const options = {
                expiresIn: '1h',
                issuer: 'rainier-technologies',
                algorithm: "RS256"
            }
            JWT.sign({ user_id: userId }, privateKey, options, (err, asyncToken) => {
                if (err) {
                    console.log(err.message)
                    reject(err)
                    return
                }
                resolve(asyncToken)
            });

        })
    },
    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            const options = {
                expiresIn: '1d',
                issuer: 'rainier-technologies',
                algorithm: "RS256"
            }
            JWT.sign({ user_id: userId }, privateKey, options, (err, asyncToken) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(asyncToken)
            });
        })
    },
    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) {
            const err = new Error('you are unauthorized');
            err.statusCode = 401
            next(err)
        }
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        JWT.verify(token, publicKey, (err, payload) => {
            if (err) {
                err.name === 'JsonWebTokenError' ? 'Unauthorized': err.message
                return next(err)
            }
            req.user_id = payload.user_id
            next()
        })
    },

    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(
                refreshToken,
                publicKey,
                (err, payload) => {
                    if (err) return reject(err)
                    resolve(payload)                   
                }
            )
        })
    },
}