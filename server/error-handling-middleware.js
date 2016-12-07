import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
export default function errorHandlingMiddleware({ logger }) {
    return (err, req, res, next) => {

        if (!err) {
            return next();
        }

        logger.error(err);

        return res.sendStatus(INTERNAL_SERVER_ERROR);
    }
}
