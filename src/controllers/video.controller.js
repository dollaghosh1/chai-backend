import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import { Video} from "../models/video.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

const publishAVideo = asyncHandler(async (req, res) => {
    try{
    const { title, description, duration, views} = req.body
    
   const user_id =  req.user?._id
 //  console.log({ title, description, duration, views})
  
    if(!title && !description && !duration && !views ){
        throw new ApiError(400, "All fields are required")
    } 
    const videoLocalPath = req.files?.videoFile[0]?.path;
    if (!videoLocalPath) {
        throw new ApiError(400, "Video file is required")
    }
    const thumbnailPath = req.files?.thumbnail[0]?.path;
    if (!thumbnailPath) {
        throw new ApiError(400, "Video file is required")
    }
    //console.log(thumbnailPath)
    const video = await Video.create({
        title,
        description,
        videoFile: videoLocalPath,
        thumbnail: thumbnailPath,
        owner: user_id,
        duration,
        views
    
    })
    //console.log(video)
    return res.status(200).json(
        new ApiResponse(200, video, "User registered Successfully")
    )
}catch (error){
    throw new ApiError(500, "Something went wrong")
}
})
const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const videoDetails = await Video.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(videoId)
            }
        },
    ])
    return res
    .status(200)
    .json(
        new ApiResponse(200, videoDetails, "fetched video details")
    )
    //TODO: get video by id

})
const updateVideo = asyncHandler(async (req, res) => {
    try{
    const { videoId } = req.params
    const { title, description, duration, views} = req.body
    //console.log({ videoId })
    // const { title } = req.body
    //  console.log({title})

     if(!title && !description && !duration && !views ){
         throw new ApiError(400, "All fields are required")
     } 

  
    // const videoLocalPath = req.file?.path
 
    // if (!videoLocalPath) {
    //     throw new ApiError(400, "Video file is missing")
    // }
    // const thumbnailPath = req.file?.path
    // if (!thumbnailPath) {
    //     throw new ApiError(400, "Thumbnail file is missing")
    // }
    
    const updateVideo = await Video.findByIdAndUpdate(
        videoId,
        {
            $set:{
                title:title,
                description:description,
                duration:duration,
                views:views
                // videoFile: videoLocalPath,
                // thumbnail: thumbnailPath

            }
        },
        {new: true}
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, updateVideo, "Video updated successfully")
    )
}catch (error){
    throw new ApiError(500, "Something went wrong")
}

})
const updateVideoFile = asyncHandler(async(req, res) => {
    try{
    const { videoId } = req.params
    const videoLocalPath = req.file?.path
    //console.log(avatarLocalPath);

    if (!videoLocalPath) {
        throw new ApiError(400, "Video file is missing")
    }

    const videoFile = await Video.findByIdAndUpdate(
        videoId,
        {
            $set:{
                videoFile: videoLocalPath
            }
        },
        {new: true}
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, videoFile, "Video File updated successfully")
    )
}catch (error){
    throw new ApiError(500, "Something went wrong")
}
})
const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    const all_video = await Video.find();
    const user_id =  req.user?._id
    const allVideo = await Video.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(user_id)
            }
        },
    ])
    //console.log(all_video)
    return res
    .status(200)
    .json(new ApiResponse(200, allVideo, "video list fetched successfully"))

})

const deleteVideo = asyncHandler(async (req, res) => {
    try{
    const { videoId } = req.params
    //TODO: delete video
    const result = await Video.deleteOne({ _id: videoId });
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one video.");
      return res
      .status(200)
      .json(new ApiResponse(200, result, "video deleted successfully"))
    } else {
        throw new ApiError(400, "No documents matched the query. Deleted 0 video.")
    }
}catch (error){
    throw new ApiError(500, "Something went wrong")
}
})
const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})
export { publishAVideo, getVideoById, updateVideo, updateVideoFile,getAllVideos,deleteVideo,togglePublishStatus}