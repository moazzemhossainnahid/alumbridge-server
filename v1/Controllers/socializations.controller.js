const express = require("express");
const Socializations = require('../Models/socializations.model');
require('dotenv').config();



// add a Post
exports.addAPost = async (req, res) => {
    try {
        const post = req.body;
        // console.log(req.file);
        // console.log(req.body);
        const posts = await Socializations.create(post);
        res.status(200).json({
            status: "Successful",
            message: "Data added Successfully",
            data: posts
        });
    } catch (error) {
        res.json(error);
    }
}


// update a Post
exports.updateAPost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = req.body;
        const filter = { _id: id }
        const options = { upsert: true };
        const updateDoc = {
            $set: post
        };
        const posts = await Socializations.updateOne(filter, updateDoc, options);
        res.status(200).json({
            status: "Successful",
            message: "Data updated Successfully",
            data: posts
        });
    } catch (error) {
        res.json(error);
    }
}


// add a Comment
exports.addAComment = async (req, res) => {
    const postId = req.params.id;
    const newComment = req.body;
    try {
        const post = await Socializations.findById(postId);

        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
    
        // Update the comments array
        post.comments.push(newComment);
    
        // Save the updated Post
        await post.save();
    
        res.status(200).json({
            status: "Successful",
            message: "Comment add Successfully",
            data: post
        });
    } catch (error) {
        res.json(error);
    }
}


// Delete a Comment
exports.deleteAComment = async (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
  
    try {
      const post = await Socializations.findById(postId);
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      // Find the index of the comment with the given commentId
      const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);
  
      if (commentIndex === -1) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      // Remove the comment from the array
      post.comments.splice(commentIndex, 1);
  
      // Save the updated blog
      await post.save();
  
      res.status(200).json({
        status: 'Successful',
        message: 'Comment deleted Successfully',
        data: post,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// get single Post
exports.getSinglePost = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: id }
        const post = await Socializations.findOne(query);
        return res.status(200).json(post);
    } catch (err) {
        res.status(404).json(err.message);
    }
}


// get all Posts
exports.getAllPosts = async (req, res) => {
    try {
        let filters = { ...req.query };

        // sort - page - limit => exclude
        const excludesFields = ['sort', 'page', 'limit'];
        excludesFields.forEach(field => delete filters[field]);

        // gt, lt, gte, lte
        let filterString = JSON.stringify(filters)
        filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        // parsing algorithm
        filters = JSON.parse(filterString);

        // limit, sort, select ->  Are store Here    
        const queries = {};

        //  queries by sort anything

        if (req.query.sort) {
            // price, quantity => 'price quantity'
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
        };


        // queries by limit of data

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
        };

        // queries by limit

        if (req.query.limit) {
            const limit = req.query.limit;
            queries.limit = (limit * 1);
        };


        // Pagination

        if (req.query.page) {

            const { page = 1, limit = 6 } = req.query;   //'2' '5'

            queries.limit = limit;

            const skip = (page - 1) * parseInt(limit);

            queries.skip = skip
            queries.limit = parseInt(limit)
        };


        const result = await Socializations.find(filters)
            .skip(queries.skip)
            .limit(queries.limit)
            .sort(queries.sortBy)
            .select(queries.fields)
            ;


        const totalPosts = await Socializations.countDocuments(filters);
        const pageCount = Math.ceil(totalPosts / queries.limit);


        // if not data
        if (Socializations.length === 0) {
            return res.status(200).json({
                message: "You've no Data or Entered a Wrong Queries. Please insert first then Find data or check your Queries",
            });
        };


        res.status(200).json({
            status: "success",
            message: "Data Get Successfull",
            data: { totalPosts, pageCount, result }
        });


    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Can't Get Data",
            error: error.message
        });
    }
}


// delete a Post
exports.deleteAPost = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id);
        const query = { _id: id };
        // console.log(query);
        const result = await Socializations.deleteOne(query);
        res.send(result)
    } catch (err) {
        res.status(404).json(err);
    }
}

