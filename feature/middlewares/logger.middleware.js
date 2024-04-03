import { log } from "console";
import fs from "fs";
import winston from "winston";

const fspromise = fs.promises;

// async function log(logData){
//     try {
//         const data=`\n${new Date().toString()} Log Data: ${logData}`;
//         await fspromise.appendFile("log.txt",data);
//     } catch (error) {
//         console.log(error);
//     }
// }

const logger = winston.createLogger({
    level : 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'request-logging'},
    transports: [
        new winston.transports.File({filename: 'logs.txt'})
    ]
});

const loggerMiddleware= async (req, res, next)=>{
    if(!req.url.includes('signin'))
    {
        const logData = `${req.url} - ${JSON.stringify(req.body)}`;
        // await log(logData);
        logger.info(logData)
        next();
    }
    next();
    
} 

export default loggerMiddleware;