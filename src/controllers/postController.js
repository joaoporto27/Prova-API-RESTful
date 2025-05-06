const postModel = require('../models/postModel');

const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.getAllPosts();
    res.json(posts)
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    res.status(500).json({ error: 'Erro ao buscar posts.' });
  }
}

const getPostById = async (req, res) => {
  try {
    const post = await postModel.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado.' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar post.' });
  }
}

const createPost = async (req, res) => {
  try {
    const { title, image, user_id } = req.body;
    const newPost = await postModel.createPost(title, image, user_id);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar post.' });
  }
}

const updatePost = async (req, res) => {
  try {
    const { title, image } = req.body;
    const post = await postModel.updatePost(req.params.id, title, image);
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado.' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar post.' });
  }
}

const deletePost = async (req, res) => {
  try {
    const result = await postModel.deletePost(req.params.id);
    if (result.error) {
      return res.status(404).json(result);
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar post.' });
  }
}

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };