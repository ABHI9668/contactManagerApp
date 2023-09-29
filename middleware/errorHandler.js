 const constants=require("../constants")
const errorHandler=(err,req,resp,next)=>{
    const statusCode=resp.statusCode ? resp.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            resp.json({title:"validation error",message:err.message,stackTrace:err.stack})
            break;
        
            case constants.NOT_FOUND:
            resp.json({title:"Not Found",message:err.message,stackTrace:err.stack})
            break;

            case constants.UNAUTHORIZED:
            resp.json({title:"unauthorized",message:err.message,stackTrace:err.stack})
            break;

            case constants.FORBIDDEN:
            resp.json({title:"forbidden error",message:err.message,stackTrace:err.stack})
            break;

            case constants.SERVER_ERROR:
            resp.json({title:"server_error",message:err.message,stackTrace:err.stack})
            break;
        default:
            console.log("NO error all things are good");
            break;
    }

  
   
}
module.exports=errorHandler;