const collegeModel = require('../model/collegeModel')
const internModel = require('../model/internModel')

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) {
        return false
    }
    if (typeof value === 'string' && value.trim().length == 0) {
        return false
    }
    return true
}
const isValidRequestBody = function (request) {
    return Object.keys(request).length > 0
}
const nameRegex = /^([a-zA-Z]+)$/
const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/ // -------------


const createCollege = async function(req,res){
    try{
        const collegeData =req.body
        if(isValidRequestBody(collegeData)){
            return res.status(400).send({status:false,message:"No data is provided"})
        }
        const {name ,fullName ,logoLink} = collegeData
        if(!isValid(name))return res.status(400).send({status:false,message:"college name is required"})
        if(!nameRegex(name))return res.status(400).send({status:false,message:"college name should be in alphabets only"})

        if(!isValid(fullName))return res.status(400).send({status:false,message:"college full name is required"})
        if(!nameRegex(fullName))return res.status(400).send({status:false,message:"college full name should be in alphabets only"})

        if(!isValid(logoLink))return res.status(400).send({status:false,message:"logo link is required"})
        if(!urlRegex(logoLink))return res.status(400).send({status:false,message:"logo link is invalid"})

        const findCollegeName = await collegeModel.findOne(name)
        if(findCollegeName) return res.status(400).send({status:false,message:`${name} is already registered`})

        const newCollege = await collegeModel.create(collegeData)
        res.status(201).send({status:true,message:"college created succesfully",data:newCollege})

    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})

    }
}


module.exports.createCollege=createCollege